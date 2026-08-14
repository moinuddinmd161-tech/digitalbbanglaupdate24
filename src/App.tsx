import React, { useState, useEffect } from 'react';
import { 
  INITIAL_CATEGORIES, INITIAL_POSTS, INITIAL_LAYOUT_CONFIG 
} from './data/initialData';
import { Category, Post, LayoutConfig, ThemeStyle } from './types';
import { Header } from './components/Header';
import { BreakingNewsTicker } from './components/BreakingNewsTicker';
import { TrendingHeroSection } from './components/TrendingHeroSection';
import { CategoryBlockSection } from './components/CategoryBlockSection';
import { VideoSection } from './components/VideoSection';
import { PopularTags } from './components/PopularTags';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { PostDetailModal } from './components/PostDetailModal';
import { LayoutEditorModal } from './components/LayoutEditorModal';
import { PostManagerModal } from './components/PostManagerModal';
import { BloggerToolsModal } from './components/BloggerToolsModal';
import { SearchModal } from './components/SearchModal';
import { 
  Flame, Layout, PlusCircle, Sparkles, Filter, 
  ArrowUpDown, Grid, List, Clock, Eye, Tag, ChevronRight, Home
} from 'lucide-react';

export default function App() {
  // 1. Storage & State Initialization
  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);

  const [posts, setPosts] = useState<Post[]>(() => {
    try {
      const saved = localStorage.getItem('bangla_express_posts');
      return saved ? JSON.parse(saved) : INITIAL_POSTS;
    } catch {
      return INITIAL_POSTS;
    }
  });

  const [layoutConfig, setLayoutConfig] = useState<LayoutConfig>(() => {
    try {
      const saved = localStorage.getItem('bangla_express_layout');
      return saved ? JSON.parse(saved) : INITIAL_LAYOUT_CONFIG;
    } catch {
      return INITIAL_LAYOUT_CONFIG;
    }
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('bangla_express_dark') === 'true';
    } catch {
      return false;
    }
  });

  // Navigation Filter State
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'latest' | 'views' | 'trending'>('latest');

  // Modals
  const [readingPost, setReadingPost] = useState<Post | null>(null);
  const [isLayoutEditorOpen, setIsLayoutEditorOpen] = useState(false);
  const [isPostManagerOpen, setIsPostManagerOpen] = useState(false);
  const [isBloggerToolsOpen, setIsBloggerToolsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('bangla_express_posts', JSON.stringify(posts));
    } catch (e) {
      console.error(e);
    }
  }, [posts]);

  useEffect(() => {
    try {
      localStorage.setItem('bangla_express_layout', JSON.stringify(layoutConfig));
    } catch (e) {
      console.error(e);
    }
  }, [layoutConfig]);

  useEffect(() => {
    try {
      localStorage.setItem('bangla_express_dark', String(isDarkMode));
    } catch (e) {
      console.error(e);
    }
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Post Handlers
  const handleCreatePost = (newPost: Post) => {
    setPosts(prev => [newPost, ...prev]);
  };

  const handleUpdatePost = (updatedPost: Post) => {
    setPosts(prev => prev.map(p => p.id === updatedPost.id ? updatedPost : p));
    if (readingPost?.id === updatedPost.id) {
      setReadingPost(updatedPost);
    }
  };

  const handleDeletePost = (postId: string) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
    if (readingPost?.id === postId) {
      setReadingPost(null);
    }
  };

  const handleSelectCategory = (catId: string | null, subCatId?: string | null) => {
    setActiveCategory(catId);
    setActiveSubCategory(subCatId || null);
    setSelectedTag(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTag = (tag: string | null) => {
    setSelectedTag(tag);
    if (tag) {
      setActiveCategory(null);
      setActiveSubCategory(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectThemeStyle = (style: ThemeStyle) => {
    setLayoutConfig(prev => ({
      ...prev,
      themeStyle: style,
    }));
  };

  const handleResetDefaultLayout = () => {
    if (confirm('আপনি কি ডিফল্ট লেআউট ও কালার ফিরিয়ে আনতে চান?')) {
      setLayoutConfig(INITIAL_LAYOUT_CONFIG);
    }
  };

  // Filtered Posts for Category / Tag Archive View
  const getArchivePosts = () => {
    let list = [...posts];

    if (activeCategory) {
      list = list.filter(p => p.categoryId === activeCategory);
    }
    if (activeSubCategory) {
      list = list.filter(p => p.subCategoryId === activeSubCategory);
    }
    if (selectedTag) {
      list = list.filter(p => p.tags && p.tags.includes(selectedTag));
    }

    if (sortOrder === 'views') {
      list.sort((a, b) => b.views - a.views);
    } else if (sortOrder === 'trending') {
      list.sort((a, b) => (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0));
    }

    return list;
  };

  const isArchiveView = activeCategory !== null || activeSubCategory !== null || selectedTag !== null;
  const currentCategoryObj = categories.find(c => c.id === activeCategory);
  const currentSubCategoryObj = currentCategoryObj?.subCategories.find(s => s.id === activeSubCategory);

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark bg-gray-950 text-gray-100' : 'bg-gray-50/70 text-gray-900'}`}>
      {/* 1. Header Navigation & Branding */}
      <Header
        categories={categories}
        layoutConfig={layoutConfig}
        activeCategory={activeCategory}
        activeSubCategory={activeSubCategory}
        onSelectCategory={handleSelectCategory}
        onOpenLayoutEditor={() => setIsLayoutEditorOpen(true)}
        onOpenPostManager={() => setIsPostManagerOpen(true)}
        onOpenBloggerTools={() => setIsBloggerToolsOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onSelectThemeStyle={handleSelectThemeStyle}
      />

      {/* 2. Breaking News Scroll Ticker */}
      {layoutConfig.showBreakingTicker && (
        <BreakingNewsTicker
          posts={posts}
          onSelectPost={(post) => setReadingPost(post)}
        />
      )}

      {/* 3. Main Body Container with Dynamic Sidebar Layout */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 w-full py-4">
        {/* If Not in Archive View -> Show Full Rich Homepage Layout */}
        {!isArchiveView ? (
          <div>
            {/* Top Trending & Featured Hero Section */}
            {layoutConfig.showTrendingHero && (
              <TrendingHeroSection
                posts={posts}
                categories={categories}
                onSelectPost={(post) => setReadingPost(post)}
                onSelectCategory={(catId) => handleSelectCategory(catId, null)}
              />
            )}

            {/* Popular Tags Pills */}
            {layoutConfig.showPopularTags && (
              <PopularTags
                tags={['AI', 'কৃষি', 'স্বাস্থ্য', 'চাকরি', 'টেক', 'পাসপোর্ট', 'অনলাইন ইনকাম']}
                selectedTag={selectedTag}
                onSelectTag={handleSelectTag}
              />
            )}

            {/* Content & Sidebar Grid depending on user sidebarPosition preference */}
            <div className={`grid grid-cols-1 ${
              layoutConfig.sidebarPosition === 'none'
                ? 'grid-cols-1'
                : 'lg:grid-cols-12 gap-8'
            }`}>
              {/* Left Sidebar if position is 'left' */}
              {layoutConfig.sidebarPosition === 'left' && (
                <div className="lg:col-span-4 order-2 lg:order-1">
                  <Sidebar
                    posts={posts}
                    categories={categories}
                    layoutConfig={layoutConfig}
                    onSelectPost={(post) => setReadingPost(post)}
                    onSelectCategory={(catId) => handleSelectCategory(catId, null)}
                  />
                </div>
              )}

              {/* Center / Main Content Area */}
              <div className={layoutConfig.sidebarPosition === 'none' ? 'col-span-1' : 'lg:col-span-8 order-1 lg:order-1'}>
                {/* Category Block Sections (Tech, Agro, Health, Digital BD, etc.) */}
                {layoutConfig.showCategoryBlocks && (
                  <CategoryBlockSection
                    categories={categories}
                    posts={posts}
                    enabledCategoryIds={layoutConfig.enabledCategories}
                    onSelectPost={(post) => setReadingPost(post)}
                    onSelectCategory={(catId, subCatId) => handleSelectCategory(catId, subCatId)}
                  />
                )}

                {/* Latest YouTube Videos Section */}
                {layoutConfig.showVideoGallery && (
                  <VideoSection
                    posts={posts}
                    onSelectPost={(post) => setReadingPost(post)}
                  />
                )}
              </div>

              {/* Right Sidebar if position is 'right' */}
              {layoutConfig.sidebarPosition === 'right' && (
                <div className="lg:col-span-4 order-2 lg:order-2">
                  <Sidebar
                    posts={posts}
                    categories={categories}
                    layoutConfig={layoutConfig}
                    onSelectPost={(post) => setReadingPost(post)}
                    onSelectCategory={(catId) => handleSelectCategory(catId, null)}
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Archive / Filter View (When user clicks a Category, Subcategory, or Tag) */
          <div>
            {/* Archive Header Banner */}
            <div className="bg-white dark:bg-gray-800/90 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-2xs mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-gray-500 mb-1">
                  <button 
                    onClick={() => handleSelectCategory(null, null)}
                    className="hover:text-rose-600 flex items-center gap-1"
                  >
                    <Home className="w-3.5 h-3.5" />
                    <span>হোম</span>
                  </button>
                  {currentCategoryObj && (
                    <>
                      <span>/</span>
                      <span className="text-rose-600">{currentCategoryObj.name}</span>
                    </>
                  )}
                  {currentSubCategoryObj && (
                    <>
                      <span>/</span>
                      <span className="text-gray-800 dark:text-gray-200">{currentSubCategoryObj.name}</span>
                    </>
                  )}
                  {selectedTag && (
                    <>
                      <span>/</span>
                      <span className="text-rose-600">ট্যাগ: #{selectedTag}</span>
                    </>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white font-serif-bn">
                  {currentSubCategoryObj?.name || currentCategoryObj?.name || (selectedTag ? `বিষয়: #${selectedTag}` : 'খবর আর্কাইভ')}
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  মোট {getArchivePosts().length}টি পোস্ট পাওয়া গেছে
                </p>
              </div>

              {/* Sort Order & Reset */}
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-gray-100 dark:bg-gray-700 p-1 rounded-xl text-xs font-bold">
                  <button
                    onClick={() => setSortOrder('latest')}
                    className={`px-3 py-1.5 rounded-lg transition-colors ${sortOrder === 'latest' ? 'bg-white dark:bg-gray-900 text-rose-600 shadow-2xs' : 'text-gray-600 dark:text-gray-300'}`}
                  >
                    সর্বশেষ
                  </button>
                  <button
                    onClick={() => setSortOrder('views')}
                    className={`px-3 py-1.5 rounded-lg transition-colors ${sortOrder === 'views' ? 'bg-white dark:bg-gray-900 text-rose-600 shadow-2xs' : 'text-gray-600 dark:text-gray-300'}`}
                  >
                    জনপ্রিয়
                  </button>
                </div>

                <button
                  onClick={() => handleSelectCategory(null, null)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-300 border border-rose-200 dark:border-rose-800 hover:bg-rose-100"
                >
                  সব দেখুন
                </button>
              </div>
            </div>

            {/* Archive Layout Grid with Sidebar */}
            <div className={`grid grid-cols-1 ${layoutConfig.sidebarPosition === 'none' ? 'grid-cols-1' : 'lg:grid-cols-12 gap-8'}`}>
              <div className={layoutConfig.sidebarPosition === 'none' ? 'col-span-1' : 'lg:col-span-8'}>
                {getArchivePosts().length === 0 ? (
                  <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 text-center border border-gray-200 dark:border-gray-700 space-y-3">
                    <p className="text-base font-bold text-gray-700 dark:text-gray-300">এই বিভাগে এখনও কোনো পোস্ট নেই</p>
                    <button
                      onClick={() => setIsPostManagerOpen(true)}
                      className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold shadow-xs"
                    >
                      নতুন পোস্ট লিখুন
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {getArchivePosts().map((post) => (
                      <div
                        key={post.id}
                        onClick={() => setReadingPost(post)}
                        className="group bg-white dark:bg-gray-800/90 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-rose-300 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                      >
                        <div className="aspect-16/10 overflow-hidden bg-gray-100 dark:bg-gray-700 relative">
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded text-[11px] font-bold bg-rose-600 text-white shadow-xs">
                            {categories.find(c => c.id === post.categoryId)?.name || 'নিউজ'}
                          </span>
                        </div>

                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-rose-600 font-serif-bn line-clamp-2 leading-snug transition-colors">
                              {post.title}
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                              {post.excerpt}
                            </p>
                          </div>

                          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-700/60 text-xs text-gray-500 dark:text-gray-400">
                            <span>{post.date}</span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-3.5 h-3.5" />
                              {post.views.toLocaleString('bn-BD')}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Sidebar */}
              {layoutConfig.sidebarPosition !== 'none' && (
                <div className="lg:col-span-4">
                  <Sidebar
                    posts={posts}
                    categories={categories}
                    layoutConfig={layoutConfig}
                    onSelectPost={(post) => setReadingPost(post)}
                    onSelectCategory={(catId) => handleSelectCategory(catId, null)}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* 4. Footer */}
      <Footer
        categories={categories}
        layoutConfig={layoutConfig}
        onSelectCategory={(catId) => handleSelectCategory(catId, null)}
      />

      {/* 5. Modals */}
      <PostDetailModal
        post={readingPost}
        categories={categories}
        allPosts={posts}
        onClose={() => setReadingPost(null)}
        onSelectPost={(p) => setReadingPost(p)}
        onSelectCategory={(catId) => handleSelectCategory(catId, null)}
        onUpdatePost={handleUpdatePost}
      />

      <LayoutEditorModal
        layoutConfig={layoutConfig}
        categories={categories}
        isOpen={isLayoutEditorOpen}
        onClose={() => setIsLayoutEditorOpen(false)}
        onSaveConfig={(newConfig) => setLayoutConfig(newConfig)}
        onResetDefault={handleResetDefaultLayout}
      />

      <PostManagerModal
        isOpen={isPostManagerOpen}
        onClose={() => setIsPostManagerOpen(false)}
        posts={posts}
        categories={categories}
        onCreatePost={handleCreatePost}
        onUpdatePost={handleUpdatePost}
        onDeletePost={handleDeletePost}
        onSelectPost={(p) => setReadingPost(p)}
      />

      <BloggerToolsModal
        isOpen={isBloggerToolsOpen}
        onClose={() => setIsBloggerToolsOpen(false)}
        categories={categories}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        posts={posts}
        categories={categories}
        onSelectPost={(p) => setReadingPost(p)}
      />
    </div>
  );
}
