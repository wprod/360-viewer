export interface View<T extends ViewContentTypeEnum> {
  name: string;
  description: string;
  pointOfInterest: PointOfInterest[];
  content: { type: T } & ViewContentByType[T];
}

export enum ViewContentTypeEnum {
  Image = 'Image',
  Video = 'Video',
}

export interface ViewContentByType {
  [ViewContentTypeEnum.Image]: ImageType;
  [ViewContentTypeEnum.Video]: VideoType;
}

export interface ImageType {
  src: string;
  pollingInterval: number;
}

export interface VideoType {
  src: string;
}

export interface PointOfInterest {
  position: {
    x: number;
    y: number;
    z: number;
  };
  name: string;
  link: string;
}

export interface HTMLMediaState {
  buffered: any[];
  duration: number;
  paused: boolean;
  time: number;
}

export interface HTMLMediaControls {
  play: () => Promise<void> | void;
  pause: () => void;
  seek: (time: number) => void;
}
