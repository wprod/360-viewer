import React, { useEffect, useMemo, useRef, useState } from 'react';
import { TextureLoader, VideoTexture } from 'three';
import { Scene } from './scene';
import { Canvas } from 'react-three-fiber';
import { HTMLMediaState, View, ViewContentTypeEnum } from './models/models';

interface ViewerProps {
  views: View<ViewContentTypeEnum>[];
}

export function Viewer(props: ViewerProps): JSX.Element {
  const { views } = props;

  const canvasRef = useRef<HTMLDivElement>(null);
  const videoRef = document.getElementById('viewer-video') as HTMLVideoElement;

  const [currentViewIndex, setCurrentViewIndex] = useState<number>(0);

  const [state, setState] = useState<HTMLMediaState>({
    buffered: [],
    time: 0,
    duration: 0,
    paused: true,
  });

  // Some browsers return `Promise` on `.play()` and may throw errors
  // if one tries to execute another `.play()` or `.pause()` while that
  // promise is resolving. This lock prevent that :
  const [lockPlay, setLockPlay] = useState<boolean>(false);
  function play(): Promise<void> | undefined {
    if (!lockPlay) {
      const promise = videoRef.play();
      const isPromise = typeof promise === 'object';

      if (isPromise) {
        setLockPlay(true);
        const resetLock = (): void => {
          setLockPlay(false);
        };
        promise.then(resetLock, resetLock);
      }

      return promise;
    }
    return undefined;
  }

  function pause(): void {
    if (!lockPlay) {
      return videoRef.pause();
    }
  }

  function seek(time: number): void {
    if (state.duration === undefined) {
      return;
    }
    time = Math.min(state.duration, Math.max(0, time));
    videoRef.currentTime = time;
  }

  function handleVideoStatus(): void {
    setState({ ...state, paused: !state.paused });

    if (state.paused) {
      pause();
    } else {
      play();
    }
  }

  async function handleNextView(): Promise<void> {
    if (currentViewIndex + 1 > views.length) {
      return;
    }

    if (
      views[currentViewIndex + 1].content.type === ViewContentTypeEnum.Image
    ) {
      setCurrentViewIndex(currentViewIndex + 1);
      return;
    }

    videoRef.src = views[currentViewIndex + 1].content.src;
    setCurrentViewIndex(currentViewIndex + 1);
    pause();
    videoRef.load();
    play();
  }

  useEffect(() => {
    if (views[currentViewIndex].content.type === ViewContentTypeEnum.Video) {
      videoRef.pause();
      videoRef.src = views[currentViewIndex].content.src;
      videoRef.load();
      videoRef.play().catch();
    }
  }, [videoRef, views, currentViewIndex]);

  const texture = useMemo(() => {
    switch (views[currentViewIndex].content.type) {
      case ViewContentTypeEnum.Video: {
        return new VideoTexture(videoRef);
      }
      default:
        return new TextureLoader().load(views[currentViewIndex].content.src);
    }
  }, [videoRef, currentViewIndex, views]);

  return (
    <>
      <div className="wrapper controls-wrapper">
        <button
          className="btn"
          disabled={
            views[currentViewIndex].content.type === ViewContentTypeEnum.Image
          }
          onClick={(): void => handleVideoStatus()}
        >
          {state.paused ? 'Pause' : 'Play'}
        </button>

        <button
          className="btn"
          onClick={async (): Promise<void> => await handleNextView()}
          disabled={views.length === currentViewIndex + 1}
        >
          Next
        </button>
      </div>

      <div className="canvas-wrapper" ref={canvasRef}>
        <Canvas
          shadowMap
          pixelRatio={window.devicePixelRatio}
          camera={{ far: 1000 }}
        >
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Scene
            pointsOfInterest={views[currentViewIndex].pointOfInterest}
            texture={texture}
          />
        </Canvas>
      </div>
    </>
  );
}
