import { VideoMetadata, DownloadFormat, VideoFormat } from "../types";

// Helper to simulate delay for the fallback
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Real API endpoints for fetching actual YouTube video data
const YOUTUBE_OEMBED_API = "https://www.youtube.com/oembed";
const PIPED_API = "https://pipedapi.kavin.rocks";
// Using Invidious API (alternative YouTube frontend with API)
const INVIDIOUS_API = "https://invidious.io/api/v1";
// Yt-dlp server if available locally, or use web versions
const YT_DLPC_API = "http://localhost:5000/api";

export const extractVideoId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

// Helper function to estimate file size from bitrate and duration
const estimateFileSize = (bitrate: number, duration: number): string => {
  if (!bitrate || !duration) return "Unknown";
  
  const sizeInBytes = (bitrate * duration) / 8;
  return formatBytes(sizeInBytes);
};

// Helper function to convert bytes to human readable format
const formatBytes = (bytes: number): string => {
  if (bytes === 0) return "0 B";
  
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round(bytes / Math.pow(k, i) * 10) / 10 + " " + sizes[i];
};

// Helper function to get format extension from mime type
const getFormatType = (mimeType: string): string => {
  if (mimeType.includes("audio")) {
    return mimeType.includes("mp3") ? "mp3" : "m4a";
  }
  if (mimeType.includes("webm")) return "webm";
  if (mimeType.includes("mp4")) return "mp4";
  return "mp4";
};

// Function to get real video formats from API data
const getVideoFormats = (apiData: any, videoId: string): VideoFormat[] => {
  const formats: VideoFormat[] = [];
  
  // Try to extract formats from Piped API data
  if (apiData && apiData.streams && Array.isArray(apiData.streams)) {
    const streams = apiData.streams;
    
    // Process video streams (with quality)
    const videoStreams = streams.filter((s: any) => s.quality && s.width && s.height);
    const audioStreams = streams.filter((s: any) => s.quality === null || !s.quality); // Audio only
    
    // Group video streams by quality and create entries
    videoStreams.forEach((stream: any) => {
      if (!stream.url) return;
      
      const quality = stream.quality || `${stream.height}p`;
      const bitrate = stream.bitrate || 0;
      const size = estimateFileSize(stream.bitrate, apiData.duration);
      
      formats.push({
        quality: quality,
        format: getFormatType(stream.mimeType || 'mp4'),
        size: size,
        fps: stream.fps || 30,
        url: stream.url,
        hasAudio: stream.audioChannels ? stream.audioChannels > 0 : true,
        hasVideo: true,
        bitrate: bitrate,
        realSize: Math.round(bitrate * apiData.duration / 8)
      });
    });
    
    // Add audio-only formats
    audioStreams.forEach((stream: any) => {
      if (!stream.url) return;
      
      const bitrate = stream.bitrate || 128000;
      const size = estimateFileSize(bitrate, apiData.duration);
      
      formats.push({
        quality: `${(bitrate / 1000).toFixed(0)}kbps`,
        format: getFormatType(stream.mimeType || 'mp3'),
        size: size,
        fps: 0,
        url: stream.url,
        hasAudio: true,
        hasVideo: false,
        bitrate: bitrate,
        realSize: Math.round(bitrate * apiData.duration / 8)
      });
    });
  }
  
  // If no formats from API, return fallback formats
  if (formats.length === 0) {
    return getFallbackFormats(videoId);
  }
  
  // Sort by quality (highest first)
  return formats.sort((a, b) => {
    const aQuality = parseInt(a.quality) || 0;
    const bQuality = parseInt(b.quality) || 0;
    return bQuality - aQuality;
  });
};

// Fallback formats when API data is unavailable
const getFallbackFormats = (videoId: string): VideoFormat[] => [
  {
    quality: "4K (2160p)",
    format: "mp4",
    size: "2.5 GB",
    fps: 60,
    url: `https://www.youtube.com/watch?v=${videoId}`,
    hasAudio: true,
    hasVideo: true,
    realSize: 2684354560,
    bitrate: 25000
  },
  {
    quality: "1080p",
    format: "mp4",
    size: "850 MB",
    fps: 60,
    url: `https://www.youtube.com/watch?v=${videoId}`,
    hasAudio: true,
    hasVideo: true,
    realSize: 891289600,
    bitrate: 8000
  },
  {
    quality: "720p",
    format: "mp4",
    size: "450 MB",
    fps: 30,
    url: `https://www.youtube.com/watch?v=${videoId}`,
    hasAudio: true,
    hasVideo: true,
    realSize: 471859200,
    bitrate: 5000
  },
  {
    quality: "480p",
    format: "webm",
    size: "280 MB",
    fps: 30,
    url: `https://www.youtube.com/watch?v=${videoId}`,
    hasAudio: true,
    hasVideo: true,
    realSize: 293601280,
    bitrate: 3000
  },
  {
    quality: "320kbps",
    format: "mp3",
    size: "45 MB",
    fps: 0,
    url: `https://www.youtube.com/watch?v=${videoId}`,
    hasAudio: true,
    hasVideo: false,
    realSize: 47185920,
    bitrate: 320
  },
  {
    quality: "128kbps",
    format: "mp3",
    size: "18 MB",
    fps: 0,
    url: `https://www.youtube.com/watch?v=${videoId}`,
    hasAudio: true,
    hasVideo: false,
    realSize: 18874368,
    bitrate: 128
  }
];

export const fetchVideoMetadata = async (url: string): Promise<VideoMetadata> => {
  const videoId = extractVideoId(url);
  
  if (!videoId) {
    throw new Error("Invalid YouTube URL. Please check the link and try again.");
  }

  try {
    // Try Invidious API first - it provides comprehensive video data from YouTube
    try {
      const invidiousResponse = await fetch(`${INVIDIOUS_API}/videos/${videoId}`);
      
      if (invidiousResponse.ok) {
        const invidiousData = await invidiousResponse.json();
        console.log("Invidious API Response:", invidiousData);
        
        const tags = extractRealTags(invidiousData);
        
        // Invidious uses lengthSeconds as a number for duration
        let duration = "00:00";
        let viewCount = "0";
        
        // lengthSeconds is typically a number in Invidious API
        if (invidiousData.lengthSeconds) {
          const seconds = typeof invidiousData.lengthSeconds === 'string' 
            ? parseInt(invidiousData.lengthSeconds) 
            : invidiousData.lengthSeconds;
          if (!isNaN(seconds)) {
            duration = formatDuration(seconds);
          }
        }
        
        // viewCount is typically a number
        if (invidiousData.viewCount) {
          const views = typeof invidiousData.viewCount === 'string'
            ? parseInt(invidiousData.viewCount)
            : invidiousData.viewCount;
          if (!isNaN(views)) {
            viewCount = formatViewCount(views);
          }
        }
        
        console.log("✓ Duration from Invidious:", duration);
        console.log("✓ Views from Invidious:", viewCount);
        
        return {
          id: videoId,
          title: invidiousData.title || "Untitled Video",
          channel: invidiousData.author || "Unknown Channel",
          author_name: invidiousData.author || "Unknown Author",
          description: invidiousData.description || "No description available",
          thumbnailUrl: invidiousData.videoThumbnails?.[invidiousData.videoThumbnails.length - 1]?.url || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
          duration: duration,
          viewCount: viewCount,
          formats: getVideoFormats(invidiousData, videoId),
          tags: tags,
        };
      }
    } catch (invidiousError) {
      console.warn("Invidious API failed:", invidiousError);
    }

    // Try Piped API as fallback
    try {
      const pipedResponse = await fetch(`${PIPED_API}/streams/${videoId}`, {
        headers: {
          'Accept': 'application/json',
        }
      });
      
      if (pipedResponse.ok) {
        const pipedData = await pipedResponse.json();
        console.log("Piped API Response:", pipedData);
        
        const tags = extractRealTags(pipedData);
        
        // Piped API uses duration (seconds) and views (number)
        let duration = "00:00";
        let viewCount = "0";
        
        if (pipedData.duration) {
          const seconds = typeof pipedData.duration === 'string'
            ? parseInt(pipedData.duration)
            : pipedData.duration;
          if (typeof seconds === 'number' && !isNaN(seconds)) {
            duration = formatDuration(seconds);
          }
        }
        
        if (pipedData.views) {
          const views = typeof pipedData.views === 'string'
            ? parseInt(pipedData.views)
            : pipedData.views;
          if (typeof views === 'number' && !isNaN(views)) {
            viewCount = formatViewCount(views);
          }
        }
        
        console.log("✓ Duration from Piped:", duration);
        console.log("✓ Views from Piped:", viewCount);
        
        return {
          id: videoId,
          title: pipedData.title || "Untitled Video",
          channel: pipedData.uploader || "Unknown Channel",
          author_name: pipedData.uploader || "Unknown Author",
          description: pipedData.description || "No description available",
          thumbnailUrl: pipedData.thumbnailUrl || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
          duration: duration,
          viewCount: viewCount,
          formats: getVideoFormats(pipedData, videoId),
          tags: tags,
        };
      }
    } catch (pipedError) {
      console.warn("Piped API failed:", pipedError);
    }

    // Fallback to oEmbed API
    const oembedUrl = `${YOUTUBE_OEMBED_API}?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    const response = await fetch(oembedUrl);
    
    if (response.ok) {
      const data = await response.json();
      console.log("oEmbed Response:", data);
      
      return {
        id: videoId,
        title: data.title || "Untitled Video",
        channel: data.author_name || "Unknown Channel",
        author_name: data.author_name || "Unknown Author",
        description: "Video description unavailable",
        thumbnailUrl: data.thumbnail_url || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        duration: "00:00",
        viewCount: "0",
        formats: getVideoFormats(null, videoId),
        tags: [],
      };
    }
  } catch (error) {
    console.error("API call failed:", error);
  }

  // Final fallback: construct data from what we know
  return {
    id: videoId,
    title: "YouTube Video",
    channel: "Unknown Channel",
    author_name: "Unknown Author",
    description: "Unable to fetch video details. Please check the URL and try again.",
    thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    duration: "00:00",
    viewCount: "0",
    formats: getVideoFormats(null, videoId),
    tags: [],
  };
};

// Helper function to format duration from seconds to HH:MM:SS
const formatDuration = (seconds: number): string => {
  if (!seconds || seconds <= 0) return "00:00";
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
  return `${minutes}:${String(secs).padStart(2, '0')}`;
};

// Helper function to format view count with K, M, B suffixes
const formatViewCount = (count: number): string => {
  if (count >= 1000000000) {
    return (count / 1000000000).toFixed(1) + 'B';
  } else if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + 'M';
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'K';
  }
  return count.toString();
};

// Helper function to extract real tags from Piped API data
const extractRealTags = (pipedData: any): string[] => {
  const tags: Set<string> = new Set();
  
  // Try to get tags directly from Piped API response
  if (pipedData.tags && Array.isArray(pipedData.tags)) {
    pipedData.tags.forEach((tag: string) => {
      if (tag && tag.length > 0 && tag.length < 50) {
        tags.add(tag.trim().toLowerCase());
      }
    });
  }
  
  // If no tags from API, return empty array (don't split title)
  return Array.from(tags).slice(0, 15);
};

export const getDownloadUrl = async (videoId: string, format: DownloadFormat): Promise<string> => {
  // In a real app, this would request a signed URL from the backend
  await delay(2000); 
  return `https://www.youtube.com/watch?v=${videoId}`; // Placeholder for demo
};
