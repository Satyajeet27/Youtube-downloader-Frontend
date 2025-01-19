export interface VideoDetails {
  title: string;
  description: string;
  lengthSeconds: string;
  thumbnailUrl: string;
  author: string;
}

export interface Format {
  url: string;
  qualityLabel: string;
  mimeType: string | null;
  hasAudio: boolean;
  hasVideo: boolean;
}

export interface VideoInfo {
  videoDetails: VideoDetails;
  formats: Format[];
}
