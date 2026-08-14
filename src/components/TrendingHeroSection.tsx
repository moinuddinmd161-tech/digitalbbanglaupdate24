import React from 'react';
import { Post, Category } from '../types';
import { Clock, Eye, Flame, TrendingUp, Sparkles } from 'lucide-react';

interface TrendingHeroSectionProps {
  posts: Post[];
  categories: Category[];
  onSelectPost: (post: Post) => void;
  onSelectCategory: (categoryId: string) => void;
}

export const TrendingHeroSection: React.FC<TrendingHeroSectionProps> = ({
  posts,
  categories,
  onSelectPost,
  onSelectCategory,
}) => {
  const featuredPost = posts.find(p => p.isFeatured) || posts[0];
  const trendingPosts = posts.filter(p => p.id !== featuredPost?.id).slice(0, 4);

  const getCategory = (catId: string) => {
    return categories.find(c => c.id === catId);
  };

  const getCategoryColorClass = (catId: string) => {
    switch (catId) {
      case 'tech': return 'bg-blue-600 text-white';
      case 'agro': return 'bg-emerald-600 text-white';
      case 'health': return 'bg-teal-600 text-white';
      case 'digital-bd': return 'bg-indigo-600 text-white';
      case 'education': return 'bg-amber-600 text-white';
      case 'income': return 'bg-violet-600 text-white';
      case 'islamic': return 'bg-green-700 text-white';
      case 'national':
      default: return 'bg-rose-600 text-white';
    }
  };

  if (!featuredPost) return null;

  return (
    <section className="my-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-6 bg-rose-600 rounded-full"></div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-1.5 font-serif-bn">
            <TrendingUp className="w-5 h-5 text-rose-600" />
            <span>আলোচিত ও শীর্ষ সংবাদ</span>
          </h2>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>আজকের স্পেশাল আপডেট</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Main Big Featured Post (7 Columns on large screen) */}
        <div className="lg:col-span-7">
          <div 
            onClick={() => onSelectPost(featuredPost)}
            className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-gray-900 cursor-pointer h-[380px] sm:h-[430px] flex flex-col justify-end p-6"
          >
            {/* Background Image with Zoom & Dark Gradient */}
            <img 
              src={featuredPost.coverImage} 
              alt={featuredPost.title} 
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent"></div>

            {/* Content Overlay */}
            <div className="relative z-10 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span 
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCategory(featuredPost.categoryId);
                  }}
                  className={`px-3 py-1 text-xs font-bold rounded-md shadow-xs ${getCategoryColorClass(featuredPost.categoryId)}`}
                >
                  {getCategory(featuredPost.categoryId)?.name || 'সংবাদ'}
                </span>
                {featuredPost.isBreaking && (
                  <span className="px-2.5 py-0.5 text-xs font-bold rounded-md bg-red-600 text-white flex items-center gap-1">
                    <Flame className="w-3 h-3" /> ব্রেকিং
                  </span>
                )}
                <span className="text-xs text-gray-300 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {featuredPost.readTimeMinutes} মিনিট পড়ার সময়
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-snug group-hover:text-rose-300 transition-colors font-serif-bn">
                {featuredPost.title}
              </h1>

              <p className="text-sm text-gray-300 line-clamp-2 leading-relaxed">
                {featuredPost.excerpt}
              </p>

              {/* Author & Meta */}
              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs text-gray-300">
                <div className="flex items-center gap-2">
                  <img 
                    src={featuredPost.author.avatar} 
                    alt={featuredPost.author.name}
                    className="w-7 h-7 rounded-full object-cover border border-white/30"
                  />
                  <span>{featuredPost.author.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>{featuredPost.date}</span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    {featuredPost.views.toLocaleString('bn-BD')} বার পঠিত
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Trending Cards (5 Columns on large screen) */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
          {trendingPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => onSelectPost(post)}
              className="group flex gap-3 p-3 rounded-xl bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700/80 hover:border-rose-300 dark:hover:border-rose-700 shadow-2xs hover:shadow-md transition-all cursor-pointer items-center"
            >
              {/* Thumbnail */}
              <div className="relative w-28 h-20 sm:w-32 sm:h-24 shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className={`absolute top-1 left-1 px-1.5 py-0.5 text-[10px] font-bold rounded ${getCategoryColorClass(post.categoryId)}`}>
                  {getCategory(post.categoryId)?.name || 'নিউজ'}
                </span>
              </div>

              {/* Title & Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 line-clamp-2 leading-snug font-serif-bn transition-colors">
                  {post.title}
                </h3>
                <div className="flex items-center gap-3 mt-2 text-[11px] text-gray-500 dark:text-gray-400">
                  <span>{post.date}</span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3 text-gray-400" />
                    {post.views.toLocaleString('bn-BD')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
