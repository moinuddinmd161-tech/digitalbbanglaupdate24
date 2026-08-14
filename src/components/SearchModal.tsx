import React, { useState, useEffect } from 'react';
import { Search, X, Clock, Eye, ArrowRight, Tag, Flame } from 'lucide-react';
import { Post, Category } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  posts: Post[];
  categories: Category[];
  onSelectPost: (post: Post) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  posts,
  categories,
  onSelectPost,
}) => {
  if (!isOpen) return null;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const filteredPosts = posts.filter((post) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery = !query || 
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.tags.some(t => t.toLowerCase().includes(query));

    const matchesCategory = !selectedCategory || post.categoryId === selectedCategory;

    return matchesQuery && matchesCategory;
  });

  const getCategoryName = (catId: string) => {
    return categories.find(c => c.id === catId)?.name || 'নিউজ';
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-start justify-center p-3 sm:p-6 pt-16 overflow-y-auto">
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 animate-in fade-in zoom-in-95 duration-150 flex flex-col">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-rose-600 shrink-0" />
          <input
            type="text"
            autoFocus
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="খবর বা বিষয় লিখে খুঁজুন (যেমন: AI, পাসপোর্ট, কৃষি, স্বাস্থ্য)..."
            className="flex-1 bg-transparent text-sm sm:text-base font-bold focus:outline-hidden text-gray-900 dark:text-white placeholder-gray-400 font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-bold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200"
          >
            ESC
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 px-5 py-2.5 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1 rounded-full transition-colors whitespace-nowrap ${
              selectedCategory === null
                ? 'bg-rose-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
            }`}
          >
            সবগুলো
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id === selectedCategory ? null : cat.id)}
              className={`px-3 py-1 rounded-full transition-colors whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-rose-600 text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5 space-y-3">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-10 text-gray-400 space-y-2">
              <p className="text-sm font-bold">কোনো ফলাফল পাওয়া যায়নি</p>
              <p className="text-xs">অন্য কোনো শব্দ দিয়ে সার্চ করে দেখুন</p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => {
                  onClose();
                  onSelectPost(post);
                }}
                className="group p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/60 hover:bg-rose-50/50 dark:hover:bg-rose-950/20 border border-gray-200 dark:border-gray-700/80 hover:border-rose-300 cursor-pointer flex gap-3 items-center transition-all"
              >
                <img
                  src={post.coverImage}
                  alt={post.title}
                  referrerPolicy="no-referrer"
                  className="w-18 h-14 sm:w-22 sm:h-16 rounded-xl object-cover shrink-0 bg-gray-200"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-[10px] mb-1">
                    <span className="px-2 py-0.5 rounded font-bold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                      {getCategoryName(post.categoryId)}
                    </span>
                    <span className="text-gray-400">{post.date}</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 truncate font-serif-bn">
                    {post.title}
                  </h4>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate mt-0.5">
                    {post.excerpt}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-rose-600 shrink-0 group-hover:translate-x-1 transition-transform" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
