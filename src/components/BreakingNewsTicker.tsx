import React, { useState, useEffect } from 'react';
import { Flame, ChevronLeft, ChevronRight, Pause, Play, Volume2 } from 'lucide-react';
import { Post } from '../types';

interface BreakingNewsTickerProps {
  posts: Post[];
  onSelectPost: (post: Post) => void;
}

export const BreakingNewsTicker: React.FC<BreakingNewsTickerProps> = ({ posts, onSelectPost }) => {
  const breakingPosts = posts.filter(p => p.isBreaking || p.isTrending);
  const items = breakingPosts.length > 0 ? breakingPosts : posts.slice(0, 5);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || items.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % items.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, items.length]);

  if (items.length === 0) return null;

  const currentPost = items[currentIndex];

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="w-full bg-red-600 text-white shadow-sm overflow-hidden select-none border-b border-red-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center h-10 gap-2 sm:gap-3 text-xs sm:text-sm">
        {/* Badge Label */}
        <div className="flex items-center gap-1.5 bg-red-800 px-3 py-1 rounded font-bold uppercase tracking-wider text-xs whitespace-nowrap shadow-inner">
          <Flame className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
          <span>ব্রেকিং নিউজ</span>
        </div>

        {/* Dynamic News Headline */}
        <div 
          className="flex-1 overflow-hidden cursor-pointer flex items-center gap-2"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onClick={() => onSelectPost(currentPost)}
        >
          <span className="font-semibold truncate hover:underline hover:text-amber-200 transition-colors">
            {currentPost.title}
          </span>
          <span className="hidden md:inline-block px-1.5 py-0.5 text-[10px] bg-red-700 rounded text-red-100 font-medium">
            {currentPost.date}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1 text-white/80">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-1 hover:text-white hover:bg-red-700 rounded transition-colors"
            title={isPaused ? 'চালু করুন' : 'পজ করুন'}
          >
            {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
          </button>
          <button
            onClick={handlePrev}
            className="p-1 hover:text-white hover:bg-red-700 rounded transition-colors"
            title="পূর্ববর্তী"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono opacity-80 px-0.5">
            {currentIndex + 1}/{items.length}
          </span>
          <button
            onClick={handleNext}
            className="p-1 hover:text-white hover:bg-red-700 rounded transition-colors"
            title="পরবর্তী"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
