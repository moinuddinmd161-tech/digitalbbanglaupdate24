import React, { useState } from 'react';
import { Category, Post } from '../types';
import { ChevronRight, Clock, Eye, ArrowRight, Laptop, Wheat, HeartPulse, Landmark, GraduationCap, Smartphone, MoonStar, Newspaper } from 'lucide-react';

interface CategoryBlockSectionProps {
  categories: Category[];
  posts: Post[];
  enabledCategoryIds: string[];
  onSelectPost: (post: Post) => void;
  onSelectCategory: (categoryId: string, subCategoryId?: string) => void;
}

export const CategoryBlockSection: React.FC<CategoryBlockSectionProps> = ({
  categories,
  posts,
  enabledCategoryIds,
  onSelectPost,
  onSelectCategory,
}) => {
  // Active subcategory filter for each category block
  const [selectedSubCats, setSelectedSubCats] = useState<Record<string, string | null>>({});

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Newspaper': return <Newspaper className="w-4 h-4" />;
      case 'Laptop': return <Laptop className="w-4 h-4" />;
      case 'Wheat': return <Wheat className="w-4 h-4" />;
      case 'HeartPulse': return <HeartPulse className="w-4 h-4" />;
      case 'Landmark': return <Landmark className="w-4 h-4" />;
      case 'GraduationCap': return <GraduationCap className="w-4 h-4" />;
      case 'Smartphone': return <Smartphone className="w-4 h-4" />;
      case 'MoonStar': return <MoonStar className="w-4 h-4" />;
      default: return <Laptop className="w-4 h-4" />;
    }
  };

  const getCategoryThemeStyles = (catId: string) => {
    switch (catId) {
      case 'tech':
        return {
          border: 'border-blue-600',
          bgHeader: 'bg-blue-600',
          textAccent: 'text-blue-600 dark:text-blue-400',
          tagBg: 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300',
        };
      case 'agro':
        return {
          border: 'border-emerald-600',
          bgHeader: 'bg-emerald-600',
          textAccent: 'text-emerald-600 dark:text-emerald-400',
          tagBg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300',
        };
      case 'health':
        return {
          border: 'border-teal-600',
          bgHeader: 'bg-teal-600',
          textAccent: 'text-teal-600 dark:text-teal-400',
          tagBg: 'bg-teal-50 text-teal-700 dark:bg-teal-950/50 dark:text-teal-300',
        };
      case 'digital-bd':
        return {
          border: 'border-indigo-600',
          bgHeader: 'bg-indigo-600',
          textAccent: 'text-indigo-600 dark:text-indigo-400',
          tagBg: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300',
        };
      case 'education':
        return {
          border: 'border-amber-600',
          bgHeader: 'bg-amber-600',
          textAccent: 'text-amber-600 dark:text-amber-400',
          tagBg: 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300',
        };
      case 'income':
        return {
          border: 'border-violet-600',
          bgHeader: 'bg-violet-600',
          textAccent: 'text-violet-600 dark:text-violet-400',
          tagBg: 'bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300',
        };
      case 'islamic':
        return {
          border: 'border-green-700',
          bgHeader: 'bg-green-700',
          textAccent: 'text-green-700 dark:text-green-400',
          tagBg: 'bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-300',
        };
      case 'national':
      default:
        return {
          border: 'border-rose-600',
          bgHeader: 'bg-rose-600',
          textAccent: 'text-rose-600 dark:text-rose-400',
          tagBg: 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300',
        };
    }
  };

  const filteredCategories = categories.filter(c => enabledCategoryIds.includes(c.id));

  return (
    <div className="space-y-10 my-8">
      {filteredCategories.map((category) => {
        const theme = getCategoryThemeStyles(category.id);
        const selectedSubId = selectedSubCats[category.id] || null;

        // Filter posts by category and optional subcategory
        let categoryPosts = posts.filter(p => p.categoryId === category.id);
        if (selectedSubId) {
          const subFiltered = categoryPosts.filter(p => p.subCategoryId === selectedSubId);
          if (subFiltered.length > 0) categoryPosts = subFiltered;
        }

        // If no posts in this category yet, pick fallback from general posts
        if (categoryPosts.length === 0) {
          categoryPosts = posts.slice(0, 3);
        }

        const leadPost = categoryPosts[0];
        const secondaryPosts = categoryPosts.slice(1, 4);

        return (
          <section key={category.id} className="bg-white dark:bg-gray-800/90 rounded-2xl p-5 border border-gray-200 dark:border-gray-700/80 shadow-2xs">
            {/* Category Block Header */}
            <div className={`flex flex-wrap items-center justify-between border-b-2 ${theme.border} pb-2.5 mb-5 gap-3`}>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1.5 rounded-lg text-white font-bold text-sm flex items-center gap-1.5 ${theme.bgHeader}`}>
                  {getCategoryIcon(category.iconName)}
                  <span>{category.name}</span>
                </span>
              </div>

              {/* Subcategories Tabs */}
              <div className="flex items-center gap-1 flex-wrap text-xs">
                <button
                  onClick={() => setSelectedSubCats(prev => ({ ...prev, [category.id]: null }))}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    selectedSubId === null
                      ? `${theme.bgHeader} text-white font-semibold`
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  সবগুলো
                </button>
                {category.subCategories.slice(0, 4).map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubCats(prev => ({ ...prev, [category.id]: sub.id }))}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                      selectedSubId === sub.id
                        ? `${theme.bgHeader} text-white font-semibold`
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {sub.name}
                  </button>
                ))}

                <button
                  onClick={() => onSelectCategory(category.id, selectedSubId || undefined)}
                  className={`flex items-center gap-0.5 ml-2 font-bold ${theme.textAccent} hover:underline`}
                >
                  <span>আরও দেখুন</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Block Body Grid: 1 Large Left Card + 3 List Cards */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              {/* Lead Card (7 cols) */}
              {leadPost && (
                <div 
                  onClick={() => onSelectPost(leadPost)}
                  className="md:col-span-6 lg:col-span-7 group cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative rounded-xl overflow-hidden aspect-16/10 bg-gray-100 dark:bg-gray-700 mb-3">
                    <img
                      src={leadPost.coverImage}
                      alt={leadPost.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className={`absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-xs font-bold ${theme.bgHeader} text-white shadow-xs`}>
                      {category.name}
                    </span>
                  </div>

                  <div>
                    <h3 className={`text-base sm:text-lg font-bold text-gray-900 dark:text-white group-hover:${theme.textAccent} transition-colors font-serif-bn line-clamp-2 leading-snug`}>
                      {leadPost.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2 leading-relaxed">
                      {leadPost.excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-3 text-xs text-gray-500 dark:text-gray-400">
                      <span className="font-medium">{leadPost.author.name} • {leadPost.date}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {leadPost.readTimeMinutes} মিনিট
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Secondary List (5 cols) */}
              <div className="md:col-span-6 lg:col-span-5 flex flex-col justify-between divide-y divide-gray-100 dark:divide-gray-700/60">
                {secondaryPosts.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => onSelectPost(post)}
                    className="group cursor-pointer py-3 first:pt-0 last:pb-0 flex gap-3 items-center"
                  >
                    <div className="w-24 h-18 sm:w-28 sm:h-20 shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 relative">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-gray-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 line-clamp-2 font-serif-bn leading-snug transition-colors">
                        {post.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1.5 text-[11px] text-gray-500 dark:text-gray-400">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5">
                          <Eye className="w-3 h-3" />
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
      })}
    </div>
  );
};
