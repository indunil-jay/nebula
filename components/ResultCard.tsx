
import React, { useState, useRef, useEffect } from 'react';
import { VideoMetadata, VideoFormat } from '../types';
import { Download, CheckCircle, Eye, Clock, Zap, ExternalLink, Play } from 'lucide-react';
import { BorderBeam } from './BorderBeam';

interface ResultCardProps {
  video: VideoMetadata;
}

export const ResultCard: React.FC<ResultCardProps> = ({ video }) => {
  const [downloading, setDownloading] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadSpeed, setDownloadSpeed] = useState<string>('');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  
  // Ref to manage the simulation interval
  const progressIntervalRef = useRef<number | null>(null);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  const downloadVideo = async (format: VideoFormat) => {
    // Prevent multiple simultaneous downloads
    if (downloading) return;

    if (!format.url) {
        alert("This format does not have a valid download link.");
        return;
    }

    setDownloading(format.quality);
    setDownloadSuccess(null);
    setDownloadProgress(0);
    setDownloadSpeed('Starting...');

    // 1. Start Progress Simulation
    // This gives immediate feedback while the browser initiates the connection
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    
    progressIntervalRef.current = window.setInterval(() => {
      setDownloadProgress(prev => {
        // Stall at 90% until the "action" is complete
        if (prev >= 90) return prev; 
        // Add random increment
        return prev + (Math.random() * 15);
      });
      
      // Simulate speed changes
      const speeds = ['1.2 MB/s', '2.5 MB/s', '3.8 MB/s', '5.1 MB/s', '4.2 MB/s'];
      setDownloadSpeed(speeds[Math.floor(Math.random() * speeds.length)]);
    }, 500);

    try {
        // 2. Trigger Download via Anchor Tag
        // This method is much more reliable for cross-origin video streams (Piped/YouTube)
        // as it bypasses CORS restrictions that block fetch() requests.
        
        await new Promise(resolve => setTimeout(resolve, 1500)); // Small artificial delay for UX

        const link = document.createElement('a');
        link.href = format.url;
        link.target = '_blank'; // Essential for cross-origin downloads
        
        // Clean filename
        const cleanTitle = video.title.replace(/[^a-z0-9]/gi, '_').substring(0, 50);
        const filename = `${cleanTitle}_${format.quality}.${format.format}`;
        
        link.setAttribute('download', filename);
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // 3. Complete State
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
        }

        setDownloadProgress(100);
        setDownloadSpeed('Done');
        setDownloadSuccess(format.quality);
        setDownloading(null);

        // Reset success state after a delay
        setTimeout(() => {
          setDownloadSuccess(null);
          setDownloadProgress(0);
          setDownloadSpeed('');
        }, 4000);

    } catch (error) {
        console.error("Download trigger failed:", error);
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
        }
        setDownloading(null);
        setDownloadProgress(0);
        setDownloadSpeed('Error');
    }
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto group mb-12">
        {/* Border Beam Effect */}
        <BorderBeam duration={4} />

        <div className="relative z-10 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#09090b] shadow-xl overflow-hidden animate-fade-in-up">
            {/* Top Header Section */}
            <div className="p-6 md:p-8 border-b border-zinc-200 dark:border-white/5 flex flex-col md:flex-row gap-8">
                {/* Video Embed Player */}
                <div className="w-full md:w-1/3 aspect-video relative rounded-lg overflow-hidden border border-zinc-200 dark:border-white/10 group shadow-lg bg-black">
                    <iframe 
                        width="100%" 
                        height="100%" 
                        src={`https://www.youtube.com/embed/${video.id}`} 
                        title={video.title} 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        className="absolute inset-0"
                    ></iframe>
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold font-display text-zinc-900 dark:text-white mb-3 leading-tight">{video.title}</h2>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                            <span className="font-medium text-zinc-900 dark:text-zinc-200 flex items-center gap-1.5">
                                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-[10px] text-white font-bold">
                                    {video.author_name.charAt(0).toUpperCase()}
                                </div>
                                {video.author_name}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                            <span className="flex items-center gap-1"><Eye size={14} /> {video.viewCount}</span>
                            <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                            <span className="flex items-center gap-1"><Clock size={14} /> {video.duration}</span>
                        </div>
                        
                        {/* Tags Section */}
                        {video.tags && video.tags.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-white/5">
                                <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-widest">Tags</p>
                                <div className="flex flex-wrap gap-2">
                                    {video.tags.map((tag, idx) => (
                                        <span 
                                            key={idx} 
                                            className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-900/30 hover:bg-purple-200 dark:hover:bg-purple-900/40 transition-colors cursor-pointer"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Formats Table (Supabase Style) */}
            <div className="overflow-x-auto mb-6 md:mb-8">
                <table className="w-full text-left text-sm">
                    <thead className="bg-zinc-50 dark:bg-white/5 border-b border-zinc-200 dark:border-white/5 text-zinc-500 dark:text-zinc-400 font-medium uppercase tracking-wider text-xs">
                        <tr>
                            <th className="px-6 md:px-8 py-4 font-semibold">Quality</th>
                            <th className="px-6 md:px-8 py-4 font-semibold">Format</th>
                            <th className="px-6 md:px-8 py-4 font-semibold">Size</th>
                            <th className="px-6 md:px-8 py-4 font-semibold">Type</th>
                            <th className="px-6 md:px-8 py-4 font-semibold text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-white/5">
                        {video.formats.map((fmt, idx) => (
                            <tr key={idx} className="group hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 md:px-8 py-4 font-bold text-zinc-700 dark:text-zinc-200">
                                    <span className="flex items-center gap-2">
                                        {(fmt.quality.includes('4K') || fmt.quality.includes('2160') || fmt.quality.includes('1080')) && (
                                            <Zap size={14} className="text-amber-500 fill-amber-500" />
                                        )}
                                        {fmt.quality}
                                    </span>
                                </td>
                                <td className="px-6 md:px-8 py-4 text-zinc-500 dark:text-zinc-400 font-mono text-xs">{fmt.format.toUpperCase()}</td>
                                <td className="px-6 md:px-8 py-4 text-zinc-500 dark:text-zinc-400 font-mono">{fmt.size}</td>
                                <td className="px-6 md:px-8 py-4">
                                    {fmt.hasAudio && fmt.hasVideo ? (
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/30">
                                            Video + Audio
                                        </span>
                                    ) : !fmt.hasAudio ? (
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900/30">
                                            Video Only
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-indigo-100 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900/30">
                                            Audio Only
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 md:px-8 py-4 text-right">
                                    <button 
                                        onClick={() => downloadVideo(fmt)}
                                        disabled={!!downloading || (!!downloadSuccess && downloadSuccess !== fmt.quality)}
                                        title={`Download ${fmt.quality}`}
                                        className={`relative inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all min-w-[140px] shadow-lg shadow-purple-500/5 ${
                                            downloading === fmt.quality 
                                            ? 'bg-zinc-100 dark:bg-white/5 text-zinc-500 border border-zinc-200 dark:border-white/5 cursor-wait' 
                                            : downloadSuccess === fmt.quality
                                            ? 'bg-emerald-500 text-white border border-emerald-600 shadow-emerald-500/20'
                                            : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500 hover:shadow-purple-500/25 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0'
                                        }`}
                                    >
                                        {downloading === fmt.quality ? (
                                            <div className="flex flex-col items-center leading-none py-0.5 w-full">
                                                <div className="flex items-center justify-between w-full mb-1">
                                                    <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                                    <span>{Math.round(downloadProgress)}%</span>
                                                </div>
                                                <div className="w-full h-1 bg-zinc-200 dark:bg-white/10 rounded-full overflow-hidden">
                                                    <div 
                                                        className="h-full bg-purple-500 transition-all duration-200"
                                                        style={{ width: `${downloadProgress}%` }}
                                                    />
                                                </div>
                                                <span className="text-[9px] opacity-70 mt-1 font-mono">{downloadSpeed}</span>
                                            </div>
                                        ) : downloadSuccess === fmt.quality ? (
                                            <div className="flex items-center gap-1.5 animate-fade-in">
                                                <CheckCircle size={14} /> Complete
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                Download <Download size={14} />
                                            </div>
                                        )}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
};
