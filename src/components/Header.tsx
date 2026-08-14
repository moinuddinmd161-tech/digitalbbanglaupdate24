import React, { useState } from 'react';
import { 
  Search, Moon, Sun, Layout, PlusCircle, Sparkles, 
  Menu, X, ChevronDown, ChevronRight, Share2, 
  Flame, Laptop, Wheat, HeartPulse, Landmark, GraduationCap, 
  Smartphone, MoonStar, Newspaper, Radio
} from 'lucide-react';
import { Category, LayoutConfig, ThemeStyle } from '../types';

interface HeaderProps {
  categories: Category[];
  layoutConfig: LayoutConfig;
  activeCategory: string | null;
  activeSubCategory: string | null;
  onSelectCategory: (categoryId: string | null, subCategoryId?: string | null) => void;
  onOpenLayoutEditor: () => void;
  onOpenPostManager: () => void;
  onOpenBloggerTools: () => void;
  onOpenSearch: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onSelectThemeStyle: (style: ThemeStyle) => void;
}

export const Header: React.FC<HeaderProps> = ({
  categories,
  layoutConfig,
  activeCategory,
  activeSubCategory,
  onSelectCategory,
  onOpenLayoutEditor,
  onOpenPostManager,
  onOpenBloggerTools,
  onOpenSearch,
  isDarkMode,
  onToggleDarkMode,
  onSelectThemeStyle,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Bengali Date helper
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  const banglaDateString = now.toLocaleDateString('bn-BD', options);
  const englishDateString = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

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
      default: return <Radio className="w-4 h-4" />;
    }
  };

  const getThemeHeaderGradient = () => {
    switch (layoutConfig.themeStyle) {
      case 'blue-digital':
        return 'bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900';
      case 'green-krishi':
        return 'bg-gradient-to-r from-emerald-700 via-teal-700 to-green-800';
      case 'blogger-classic':
        return 'bg-gradient-to-r from-orange-600 via-amber-600 to-rose-700';
      case 'purple-tech':
        return 'bg-gradient-to-r from-violet-700 via-purple-700 to-indigo-800';
      case 'red-news':
      default:
        return 'bg-gradient-to-r from-rose-700 via-red-600 to-rose-800';
    }
  };

  return (
    <header className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors duration-200 sticky top-0 z-40 shadow-sm">
      {/* 1. Top Bar: Date, Tools, Theme Switchers, Social Links */}
      <div className="bg-gray-100 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 text-xs text-gray-600 dark:text-gray-400 py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Bengali Date & Tagline */}
          <div className="flex items-center gap-3">
            <span className="font-medium text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              {banglaDateString}
            </span>
            <span className="hidden md:inline text-gray-400">|</span>
            <span className="hidden md:inline text-gray-500 dark:text-gray-400">{englishDateString}</span>
            <span className="hidden lg:inline text-gray-400">|</span>
            <span className="hidden lg:inline text-rose-600 dark:text-rose-400 font-medium">ঢাকা • বাংলাদেশ</span>
          </div>

          {/* Action Tools: Layout Editor, Post Manager, Blogger Tools, Dark Mode */}
          <div className="flex items-center gap-2">
            {/* Theme Style Color Presets */}
            <div className="hidden sm:flex items-center gap-1 bg-white dark:bg-gray-800 p-0.5 rounded-md border border-gray-200 dark:border-gray-700">
              <button 
                onClick={() => onSelectThemeStyle('red-news')}
                title="Red + White (নিউজ স্টাইল)"
                className={`w-4 h-4 rounded-full bg-rose-600 transition-transform ${layoutConfig.themeStyle === 'red-news' ? 'ring-2 ring-rose-400 scale-110' : 'opacity-70 hover:opacity-100'}`}
              />
              <button 
                onClick={() => onSelectThemeStyle('blue-digital')}
                title="Blue + White (ডিজিটাল স্টাইল)"
                className={`w-4 h-4 rounded-full bg-blue-600 transition-transform ${layoutConfig.themeStyle === 'blue-digital' ? 'ring-2 ring-blue-400 scale-110' : 'opacity-70 hover:opacity-100'}`}
              />
              <button 
                onClick={() => onSelectThemeStyle('green-krishi')}
                title="Green + White (কৃষি ও স্বাস্থ্য স্টাইল)"
                className={`w-4 h-4 rounded-full bg-emerald-600 transition-transform ${layoutConfig.themeStyle === 'green-krishi' ? 'ring-2 ring-emerald-400 scale-110' : 'opacity-70 hover:opacity-100'}`}
              />
              <button 
                onClick={() => onSelectThemeStyle('blogger-classic')}
                title="Blogger Classic Style"
                className={`w-4 h-4 rounded-full bg-orange-500 transition-transform ${layoutConfig.themeStyle === 'blogger-classic' ? 'ring-2 ring-orange-400 scale-110' : 'opacity-70 hover:opacity-100'}`}
              />
            </div>

            {/* Layout Customizer Button */}
            <button
              id="btn-layout-editor"
              onClick={onOpenLayoutEditor}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 hover:bg-amber-100 transition-colors font-medium"
              title="ব্লগার লেআউট কাস্টমাইজ করুন"
            >
              <Layout className="w-3.5 h-3.5" />
              <span>লেআউট এডিটর</span>
            </button>

            {/* Post Manager Button */}
            <button
              id="btn-post-manager"
              onClick={onOpenPostManager}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-rose-600 text-white hover:bg-rose-700 transition-colors font-medium shadow-xs"
              title="নতুন পোস্ট তৈরি বা এডিট করুন"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>পোস্ট ম্যানেজার</span>
            </button>

            {/* Blogger Toolkit / Extra Ideas */}
            <button
              id="btn-blogger-tools"
              onClick={onOpenBloggerTools}
              className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-800 hover:bg-indigo-100 transition-colors font-medium"
              title="ব্লগার XML থিম, লোগো এবং পোস্ট আইডিয়া"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>ব্লগার টুলকিট</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              id="btn-dark-mode"
              onClick={onToggleDarkMode}
              className="p-1.5 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme mode"
              title={isDarkMode ? 'লাইট মোড করুন' : 'ডার্ক মোড করুন'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-gray-600" />}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Middle Brand / Logo Area + Leaderboard Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Main Logo & Tagline */}
        <div 
          onClick={() => onSelectCategory(null, null)}
          className="cursor-pointer flex items-center gap-3 group"
        >
          <div className={`w-12 h-12 rounded-xl ${getThemeHeaderGradient()} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform`}>
            <Flame className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white font-serif-bn">
                {layoutConfig.siteName}
              </span>
              <span className="text-xs uppercase px-2 py-0.5 rounded-full font-bold bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
                PRO BLOGGER
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
              {layoutConfig.siteTagline}
            </p>
          </div>
        </div>

        {/* Header Right Side: Search & Ad Space / Social */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          {layoutConfig.showLeaderboardAd && (
            <div className="hidden lg:flex items-center justify-between border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 px-4 py-2 rounded-lg text-xs text-gray-500 dark:text-gray-400 min-w-[280px]">
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-300">বিজ্ঞাপন ও স্পন্সরশিপ</p>
                <p className="text-[11px]">আপনার বিজ্ঞাপন দিন এখানে (৭২৮ x ৯০)</p>
              </div>
              <span className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-[10px] rounded text-gray-600 dark:text-gray-300 font-mono">
                Ad Space
              </span>
            </div>
          )}

          {/* Search Trigger Button */}
          <button
            id="btn-search-trigger"
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-medium transition-colors border border-gray-200 dark:border-gray-700 shadow-2xs"
          >
            <Search className="w-4 h-4 text-rose-500" />
            <span className="hidden sm:inline">খবর খুঁজুন...</span>
          </button>

          {/* Mobile Menu Hamburger Button */}
          <button
            id="btn-mobile-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
            aria-label="Open Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* 3. Main Navigation Bar with All 8 Requested Categories & Sub-menus */}
      <nav className={`hidden md:block ${getThemeHeaderGradient()} text-white shadow-inner`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ul className="flex items-center flex-wrap">
            {/* Home Button */}
            <li>
              <button
                id="nav-home"
                onClick={() => onSelectCategory(null, null)}
                className={`px-4 py-3 text-sm font-bold flex items-center gap-1.5 transition-colors border-b-2 ${
                  activeCategory === null
                    ? 'bg-black/20 border-white text-white'
                    : 'border-transparent text-white/90 hover:bg-black/10 hover:text-white'
                }`}
              >
                <span>হোম</span>
              </button>
            </li>

            {/* 8 Main Categories with Submenus */}
            {categories.map((category) => {
              const isCatActive = activeCategory === category.id;
              return (
                <li key={category.id} className="relative group">
                  <button
                    id={`nav-${category.id}`}
                    onClick={() => onSelectCategory(category.id, null)}
                    className={`px-3.5 py-3 text-sm font-semibold flex items-center gap-1.5 transition-colors border-b-2 ${
                      isCatActive
                        ? 'bg-black/25 border-white text-white'
                        : 'border-transparent text-white/90 hover:bg-black/15 hover:text-white'
                    }`}
                  >
                    {getCategoryIcon(category.iconName)}
                    <span>{category.name}</span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
                  </button>

                  {/* Dropdown Sub-menu */}
                  {category.subCategories && category.subCategories.length > 0 && (
                    <div className="absolute left-0 top-full hidden group-hover:block z-50 min-w-[200px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-b-lg shadow-xl py-1.5 text-gray-800 dark:text-gray-200 animate-in fade-in slide-in-from-top-1 duration-150">
                      <div className="px-3 py-1.5 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider border-b border-gray-100 dark:border-gray-800">
                        {category.name} এর উপ-বিভাগ
                      </div>
                      {category.subCategories.map((sub) => {
                        const isSubActive = activeSubCategory === sub.id;
                        return (
                          <button
                            key={sub.id}
                            id={`subnav-${sub.id}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectCategory(category.id, sub.id);
                            }}
                            className={`w-full text-left px-4 py-2 text-xs font-medium flex items-center justify-between hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 dark:hover:text-rose-400 transition-colors ${
                              isSubActive ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 font-bold' : ''
                            }`}
                          >
                            <span>{sub.name}</span>
                            <ChevronRight className="w-3 h-3 opacity-60" />
                          </button>
                        );
                      })}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* 4. Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3 max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col gap-1">
            <button
              id="mobile-nav-home"
              onClick={() => {
                onSelectCategory(null, null);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-md font-bold text-sm ${
                activeCategory === null
                  ? 'bg-rose-600 text-white'
                  : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              হোম
            </button>

            {categories.map((cat) => {
              const isExpanded = expandedCategory === cat.id;
              const isCatActive = activeCategory === cat.id;
              return (
                <div key={cat.id} className="border-b border-gray-100 dark:border-gray-800 last:border-0 pb-1">
                  <div className="flex items-center justify-between">
                    <button
                      id={`mobile-nav-${cat.id}`}
                      onClick={() => {
                        onSelectCategory(cat.id, null);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex-1 text-left px-3 py-2 rounded-md text-sm font-semibold flex items-center gap-2 ${
                        isCatActive && !activeSubCategory
                          ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 font-bold'
                          : 'text-gray-800 dark:text-gray-200'
                      }`}
                    >
                      {getCategoryIcon(cat.iconName)}
                      <span>{cat.name}</span>
                    </button>
                    {cat.subCategories && cat.subCategories.length > 0 && (
                      <button
                        onClick={() => setExpandedCategory(isExpanded ? null : cat.id)}
                        className="p-2 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100"
                        aria-label="Toggle subcategories"
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>

                  {isExpanded && cat.subCategories && (
                    <div className="pl-6 pr-2 py-1 flex flex-col gap-1 bg-gray-50 dark:bg-gray-800/40 rounded-lg my-1">
                      {cat.subCategories.map((sub) => (
                        <button
                          key={sub.id}
                          id={`mobile-subnav-${sub.id}`}
                          onClick={() => {
                            onSelectCategory(cat.id, sub.id);
                            setMobileMenuOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 text-xs rounded-md ${
                            activeSubCategory === sub.id
                              ? 'bg-rose-600 text-white font-bold'
                              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                          }`}
                        >
                          • {sub.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-800 flex gap-2">
            <button
              onClick={() => {
                onOpenLayoutEditor();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 text-center text-xs font-semibold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 rounded-md border border-amber-300"
            >
              লেআউট এডিটর
            </button>
            <button
              onClick={() => {
                onOpenPostManager();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 text-center text-xs font-semibold bg-rose-600 text-white rounded-md"
            >
              পোস্ট ম্যানেজার
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
