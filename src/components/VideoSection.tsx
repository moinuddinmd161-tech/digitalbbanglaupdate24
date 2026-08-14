import React, { useState } from 'react';
import { Play, Youtube, X, Clock, ExternalLink } from 'lucide-react';
import { Post } from '../types';

interface VideoSectionProps {
  posts: Post[];
  onSelectPost: (post: Post) => void;
}

export const VideoSection: React.FC<VideoSectionProps> = ({ posts, onSelectPost }) => {
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  const videoPosts = posts.filter(p => p.videoUrl || p.categoryId === 'tech' || p.categoryId === 'islamic' || p.categoryId === 'income').slice(0, 4);

  const sampleVideos = [
    {
      id: 'v1',
      title: 'চ্যাটজিপিটি ও এআই দিয়ে বাংলায় কনটেন্ট ও ভিডিও তৈরির লাইভ টিউটোরিয়াল',
      channel: 'বাংলা টেক হাব',
      duration: '১২:৪৫',
      embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
      thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'v2',
      title: 'ঘরে বসে ৫ মিনিটে ই-পাসপোর্ট ফরম পূরণের নির্ভুল নিয়ম ও প্রয়োজনীয় ডকুমেন্ট',
      channel: 'ডিজিটাল সেবা বিডি',
      duration: '০৮:২০',
      embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
      thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'v3',
      title: 'ছাদে ড্রাম পদ্ধতিতে মিষ্টি ড্রাগন ফল চাষে অভাবনীয় ফলন পাওয়ার জাদুকরি ট্রিকস',
      channel: 'কৃষি বিপ্লব',
      duration: '১৫:১০',
      embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
      thumbnail: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef2396d?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'v4',
      title: 'দৈনন্দিন জীবনে দুশ্চিন্তা ও বিপদ থেকে মুক্তির কোরআনি ৫টি বিশেষ আমল ও দোয়া',
      channel: 'ইসলামিক নলেজ',
      duration: '০৯:১৫',
      embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
      thumbnail: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <section className="my-10 bg-gray-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Section Header */}
      <div className="flex items-center justify-between mb-6 relative z-10 border-b border-gray-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-lg">
            <Youtube className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-serif-bn">ভিডিও গ্যালারি ও ইউটিউব আপডেট</h2>
            <p className="text-xs text-gray-400">প্রযুক্তি, কৃষি ও ডিজিটাল সেবার সেরা ভিডিও গাইড</p>
          </div>
        </div>

        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white transition-colors text-xs font-semibold border border-red-500/30"
        >
          <span>ইউটিউব চ্যানেল সাবস্ক্রাইব</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        {sampleVideos.map((video) => (
          <div
            key={video.id}
            onClick={() => setActiveVideoUrl(video.embedUrl)}
            className="group bg-gray-800/80 hover:bg-gray-800 border border-gray-700/60 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:border-red-500/50 transition-all duration-200 flex flex-col"
          >
            {/* Thumbnail with Play Button */}
            <div className="relative aspect-16/10 overflow-hidden bg-gray-950">
              <img
                src={video.thumbnail}
                alt={video.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                </div>
              </div>
              <span className="absolute bottom-2 right-2 bg-black/80 text-[10px] font-mono px-2 py-0.5 rounded text-white flex items-center gap-1">
                <Clock className="w-2.5 h-2.5" />
                {video.duration}
              </span>
            </div>

            {/* Video Title & Meta */}
            <div className="p-3.5 flex-1 flex flex-col justify-between">
              <h3 className="text-sm font-bold text-gray-100 group-hover:text-red-400 line-clamp-2 leading-snug font-serif-bn transition-colors">
                {video.title}
              </h3>
              <div className="flex items-center justify-between text-xs text-gray-400 mt-3 pt-2 border-t border-gray-700/60">
                <span>{video.channel}</span>
                <span className="text-red-400 font-semibold text-[11px]">দেখুন</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal Player */}
      {activeVideoUrl && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl overflow-hidden max-w-3xl w-full border border-gray-700 shadow-2xl relative">
            <div className="flex items-center justify-between p-3 bg-gray-800 border-b border-gray-700">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <Youtube className="w-4 h-4 text-red-500" />
                <span>ভিডিও প্লেয়ার</span>
              </span>
              <button
                onClick={() => setActiveVideoUrl(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              <iframe
                src={`${activeVideoUrl}?autoplay=1`}
                title="Video Player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
