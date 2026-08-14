import React from 'react';
import { Tag, Sparkles } from 'lucide-react';

interface PopularTagsProps {
  tags: string[];
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
}

export const PopularTags: React.FC<PopularTagsProps> = ({ tags, selectedTag, onSelectTag }) => {
  const defaultPopularTags = [
    { name: 'AI', count: 18, color: 'hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300' },
    { name: 'কৃষি', count: 24, color: 'hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-300' },
    { name: 'স্বাস্থ্য', count: 31, color: 'hover:bg-teal-50 hover:text-teal-600 hover:border-teal-300' },
    { name: 'চাকরি', count: 15, color: 'hover:bg-amber-50 hover:text-amber-600 hover:border-amber-300' },
    { name: 'টেক', count: 42, color: 'hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-300' },
    { name: 'পাসপোর্ট', count: 12, color: 'hover:bg-sky-50 hover:text-sky-600 hover:border-sky-300' },
    { name: 'অনলাইন ইনকাম', count: 28, color: 'hover:bg-violet-50 hover:text-violet-600 hover:border-violet-300' },
    { name: 'ব্লগিং', count: 19, color: 'hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300' },
    { name: 'NID', count: 14, color: 'hover:bg-cyan-50 hover:text-cyan-600 hover:border-cyan-300' },
    { name: 'ডায়াবেটিস', count: 16, color: 'hover:bg-red-50 hover:text-red-600 hover:border-red-300' },
    { name: 'দোয়া ও আমল', count: 22, color: 'hover:bg-green-50 hover:text-green-600 hover:border-green-300' },
    { name: 'ফ্রিল্যান্সিং', count: 20, color: 'hover:bg-purple-50 hover:text-purple-600 hover:border-purple-300' },
  ];

  return (
    <section className="my-6 bg-white dark:bg-gray-800/90 rounded-2xl p-5 border border-gray-200 dark:border-gray-700/80 shadow-2xs">
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-rose-600 dark:text-rose-400" />
          <h3 className="font-bold text-gray-900 dark:text-white font-serif-bn text-base">
            জনপ্রিয় ট্যাগ ও বিষয়সমূহ
          </h3>
        </div>
        {selectedTag && (
          <button
            onClick={() => onSelectTag(null)}
            className="text-xs text-rose-600 dark:text-rose-400 font-semibold hover:underline"
          >
            ফিল্টার রিসেট
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {defaultPopularTags.map((tagItem) => {
          const isSelected = selectedTag === tagItem.name;
          return (
            <button
              key={tagItem.name}
              id={`tag-${tagItem.name}`}
              onClick={() => onSelectTag(isSelected ? null : tagItem.name)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 ${
                isSelected
                  ? 'bg-rose-600 text-white border-rose-600 shadow-xs scale-105'
                  : `bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 ${tagItem.color}`
              }`}
            >
              <span>#{tagItem.name}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                isSelected ? 'bg-white/20 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
              }`}>
                {tagItem.count}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
