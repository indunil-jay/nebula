export interface VideoFormat {
  quality: string;
  format: string;
  size: string;
  fps: number;
  url: string;
  hasAudio: boolean;
  hasVideo: boolean;
  realSize?: number;
  bitrate?: number;
}

export interface VideoMetadata {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  author_name: string;
  channel: string;
  duration: string;
  viewCount: string;
  formats: VideoFormat[];
  tags?: string[];
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface AIAnalysisResult {
  summary: string;
  sentiment: string;
  keywords: string[];
  topics: string[];
}

export enum DownloadFormat {
  MP4_1080P = 'MP4 (1080p)',
  MP4_4K = 'MP4 (4K)',
  MP4_720P = 'MP4 (720p)',
  MP3_320 = 'MP3 (320kbps)',
  WEBM_4K = 'WEBM (4K)'
}

export interface DownloadOption {
  format: DownloadFormat;
  size: string;
  badge?: string;
}

export enum AnalysisType {
  SUMMARY = 'Summarize',
  TAGS = 'Generate Tags',
  BLOG = 'Create Blog Post',
  SENTIMENT = 'Sentiment Analysis'
}