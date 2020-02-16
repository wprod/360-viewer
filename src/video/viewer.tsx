import React, { useEffect, useMemo, useRef, useState } from 'react';
import { TextureLoader, VideoTexture } from 'three';
import { Video } from './video';
import { Canvas } from 'react-three-fiber';
import { View, ViewContentTypeEnum } from './models';

interface ViewerProps {
  views: View<ViewContentTypeEnum>[];
}

export function Viewer(props: ViewerProps): JSX.Element {
  const { views } = props;

  const canvasRef = useRef<HTMLDivElement | null>(null);
  const [play, setPlay] = useState<boolean>(true);
  const [currentViewIndex, setCurrentViewIndex] = useState<number>(0);

  // Get video as an html element & create texture
  const video = document.getElementById('viewer-video') as HTMLVideoElement;

  function handleVideoStatus(): void {
    setPlay(!play);

    if (play) {
      video.pause();
    } else {
      video.play();
    }
  }

  async function handleNextView() {
    if (currentViewIndex + 1 > views.length) {
      return;
    }

    if (
      views[currentViewIndex + 1].content.type === ViewContentTypeEnum.Image
    ) {
      setCurrentViewIndex(currentViewIndex + 1);
      return;
    }

    video.src = views[currentViewIndex + 1].content.src;
    setCurrentViewIndex(currentViewIndex + 1);
    video.pause();
    await video.load();
    await video.play();
  }

  useEffect(() => {
    if (views[currentViewIndex].content.type === ViewContentTypeEnum.Video) {
      video.src = views[currentViewIndex].content.src;
      video.load();
      video.play();
    }
  }, [video, views, currentViewIndex]);

  const texture = useMemo(() => {
    switch (views[currentViewIndex].content.type) {
      case ViewContentTypeEnum.Video: {
        return new VideoTexture(video);
      }
      default:
        return new TextureLoader().load(views[currentViewIndex].content.src);
    }
  }, [video, currentViewIndex, views]);

  return (
    <div ref={canvasRef}>
      <button onClick={(): void => handleVideoStatus()}>
        {play ? 'Pause' : 'Play'}
      </button>
      <button onClick={async (): Promise<void> => await handleNextView()}>
        Next video/image
      </button>
      <Canvas
        shadowMap
        pixelRatio={window.devicePixelRatio}
        camera={{ far: 1000 }}
      >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Video
          pointsOfInterest={views[currentViewIndex].pointOfInterest}
          texture={texture}
        />
        {/*<axesHelper></axesHelper>*/}
      </Canvas>
    </div>
  );
}
