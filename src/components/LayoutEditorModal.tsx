import React, { useState } from 'react';
import { 
  X, Layout, Palette, Sliders, Check, RotateCcw, 
  Layers, CheckSquare, Eye, Save, Sparkles, Move
} from 'lucide-react';
import { LayoutConfig, ThemeStyle, Category } from '../types';

interface LayoutEditorModalProps {
  layoutConfig: LayoutConfig;
  categories: Category[];
  isOpen: boolean;
  onClose: () => void;
  onSaveConfig: (newConfig: LayoutConfig) => void;
  onResetDefault: () => void;
}

export const LayoutEditorModal: React.FC<LayoutEditorModalProps> = ({
  layoutConfig,
  categories,
  isOpen,
  onClose,
  onSaveConfig,
  onResetDefault,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'theme' | 'sections' | 'sidebar' | 'general'>('theme');
  const [config, setConfig] = useState<LayoutConfig>({ ...layoutConfig });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    onSaveConfig(config);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  const toggleCategory = (catId: string) => {
    const exists = config.enabledCategories.includes(catId);
    if (exists) {
      if (config.enabledCategories.length <= 1) {
        alert('কমপক্ষে একটি ক্যাটাগরি চালু থাকতে হবে!');
        return;
      }
      setConfig({
        ...config,
        enabledCategories: config.enabledCategories.filter(id => id !== catId),
      });
    } else {
      setConfig({
        ...config,
        enabledCategories: [...config.enabledCategories, catId],
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-3xl max-w-3xl w-full my-auto overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700/80 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-xs">
              <Layout className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-serif-bn">ব্লগার লেআউট ও থিম কাস্টমাইজার</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">ব্লগের রং, সেকশন ও উইজেট আপনার ইচ্ছামতো সাজিয়ে নিন</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 bg-gray-100/50 dark:bg-gray-800/40 px-6 pt-2 gap-2 text-xs font-bold overflow-x-auto">
          <button
            onClick={() => setActiveTab('theme')}
            className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'theme' ? 'border-rose-600 text-rose-600 dark:text-rose-400 font-extrabold' : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>কালার থিম ও ডিজাইন</span>
          </button>
          <button
            onClick={() => setActiveTab('sections')}
            className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'sections' ? 'border-rose-600 text-rose-600 dark:text-rose-400 font-extrabold' : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>হোমপেজ সেকশন কন্ট্রোল</span>
          </button>
          <button
            onClick={() => setActiveTab('sidebar')}
            className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'sidebar' ? 'border-rose-600 text-rose-600 dark:text-rose-400 font-extrabold' : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>সাইডবার ও উইজেট</span>
          </button>
          <button
            onClick={() => setActiveTab('general')}
            className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'general' ? 'border-rose-600 text-rose-600 dark:text-rose-400 font-extrabold' : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>সাইট নাম ও ট্যাগলাইন</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          {/* TAB 1: Theme & Colors */}
          {activeTab === 'theme' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold mb-2 font-serif-bn">
                  কালার কম্বিনেশন সিলেক্ট করুন (Color Combination)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Red + White */}
                  <div
                    onClick={() => setConfig({ ...config, themeStyle: 'red-news' })}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      config.themeStyle === 'red-news'
                        ? 'border-rose-600 bg-rose-50/50 dark:bg-rose-950/30 ring-2 ring-rose-300'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-rose-600"></div>
                        <span className="font-bold text-sm">Red + White</span>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded bg-rose-100 text-rose-700 dark:bg-rose-900/60 dark:text-rose-200 font-semibold">
                        নিউজ স্টাইল
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      ক্লাসিক জাতীয় দৈনিক ও ব্রেকিং নিউজ পোর্টালের মতো আকর্ষণীয় লাল ও সাদা থিম।
                    </p>
                  </div>

                  {/* Blue + White */}
                  <div
                    onClick={() => setConfig({ ...config, themeStyle: 'blue-digital' })}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      config.themeStyle === 'blue-digital'
                        ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 ring-2 ring-blue-300'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-600"></div>
                        <span className="font-bold text-sm">Blue + White</span>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-200 font-semibold">
                        ডিজিটাল স্টাইল
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      ডিজিটাল বাংলাদেশ, পাসপোর্ট ও সরকারি সেবা বিষয়ক টেক ব্লগের জন্য প্রফেশনাল নীল থিম।
                    </p>
                  </div>

                  {/* Green + White */}
                  <div
                    onClick={() => setConfig({ ...config, themeStyle: 'green-krishi' })}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      config.themeStyle === 'green-krishi'
                        ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/30 ring-2 ring-emerald-300'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-emerald-600"></div>
                        <span className="font-bold text-sm">Green + White</span>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-200 font-semibold">
                        কৃষি/স্বাস্থ্য স্টাইল
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      আধুনিক কৃষি, খামার, প্রাকৃতিক স্বাস্থ্য ও ইসলামিক কর্নারের সাথে নিখুঁত সবুজ থিম।
                    </p>
                  </div>

                  {/* Blogger Classic */}
                  <div
                    onClick={() => setConfig({ ...config, themeStyle: 'blogger-classic' })}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      config.themeStyle === 'blogger-classic'
                        ? 'border-orange-500 bg-orange-50/50 dark:bg-orange-950/30 ring-2 ring-orange-300'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-orange-500"></div>
                        <span className="font-bold text-sm">Blogger Classic</span>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded bg-orange-100 text-orange-700 dark:bg-orange-900/60 dark:text-orange-200 font-semibold">
                        ক্লাসিক ব্লগস্পট
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      গুগল ব্লগস্পটের ঐতিহ্যবাহী প্রিমিয়াম ম্যাগাজিন অ্যাম্বার ও অরেঞ্জ ভাইব।
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Homepage Sections */}
          {activeTab === 'sections' && (
            <div className="space-y-4">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                হোমপেজে যেসব সেকশন দেখাতে চান সেগুলো চালু বা বন্ধ রাখুন:
              </p>

              <div className="space-y-3">
                <label className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 cursor-pointer">
                  <span className="text-sm font-bold flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                    ব্রেকিং নিউজ স্ক্রল বার (Breaking News Ticker)
                  </span>
                  <input
                    type="checkbox"
                    checked={config.showBreakingTicker}
                    onChange={(e) => setConfig({ ...config, showBreakingTicker: e.target.checked })}
                    className="w-4 h-4 text-rose-600 rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 cursor-pointer">
                  <span className="text-sm font-bold flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    আলোচিত ও ট্রেন্ডিং হিরো সেকশন (Trending Posts Hero)
                  </span>
                  <input
                    type="checkbox"
                    checked={config.showTrendingHero}
                    onChange={(e) => setConfig({ ...config, showTrendingHero: e.target.checked })}
                    className="w-4 h-4 text-rose-600 rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 cursor-pointer">
                  <span className="text-sm font-bold flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                    ক্যাটাগরি ভিত্তিক ব্লক সেকশন (Category Blocks)
                  </span>
                  <input
                    type="checkbox"
                    checked={config.showCategoryBlocks}
                    onChange={(e) => setConfig({ ...config, showCategoryBlocks: e.target.checked })}
                    className="w-4 h-4 text-rose-600 rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 cursor-pointer">
                  <span className="text-sm font-bold flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
                    ইউটিউব ও ভিডিও গ্যালারি (Latest Videos Gallery)
                  </span>
                  <input
                    type="checkbox"
                    checked={config.showVideoGallery}
                    onChange={(e) => setConfig({ ...config, showVideoGallery: e.target.checked })}
                    className="w-4 h-4 text-rose-600 rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 cursor-pointer">
                  <span className="text-sm font-bold flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                    জনপ্রিয় ট্যাগ ক্লাউড (Popular Tags)
                  </span>
                  <input
                    type="checkbox"
                    checked={config.showPopularTags}
                    onChange={(e) => setConfig({ ...config, showPopularTags: e.target.checked })}
                    className="w-4 h-4 text-rose-600 rounded"
                  />
                </label>
              </div>

              {/* Category selector */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <label className="block text-sm font-bold mb-2 font-serif-bn">
                  সক্রিয় ক্যাটাগরি ব্লকসমূহ (Active Category Blocks)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {categories.map((cat) => {
                    const isChecked = config.enabledCategories.includes(cat.id);
                    return (
                      <button
                        key={cat.id}
                        onClick={() => toggleCategory(cat.id)}
                        className={`p-2.5 rounded-xl text-xs font-bold border flex items-center justify-between transition-all ${
                          isChecked
                            ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800'
                            : 'bg-gray-50 dark:bg-gray-800 text-gray-400 border-gray-200 dark:border-gray-700 opacity-60'
                        }`}
                      >
                        <span>{cat.name}</span>
                        {isChecked && <Check className="w-3.5 h-3.5 text-rose-600" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Sidebar & Position */}
          {activeTab === 'sidebar' && (
            <div className="space-y-6">
              {/* Sidebar Position */}
              <div>
                <label className="block text-sm font-bold mb-2 font-serif-bn">সাইডবার পজিশন (Sidebar Position)</label>
                <div className="grid grid-cols-3 gap-3 text-xs font-bold">
                  <button
                    onClick={() => setConfig({ ...config, sidebarPosition: 'right' })}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      config.sidebarPosition === 'right'
                        ? 'border-rose-600 bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300 font-extrabold ring-2 ring-rose-300'
                        : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    ডান পাশে (Right Sidebar)
                  </button>
                  <button
                    onClick={() => setConfig({ ...config, sidebarPosition: 'left' })}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      config.sidebarPosition === 'left'
                        ? 'border-rose-600 bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300 font-extrabold ring-2 ring-rose-300'
                        : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    বাম পাশে (Left Sidebar)
                  </button>
                  <button
                    onClick={() => setConfig({ ...config, sidebarPosition: 'none' })}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      config.sidebarPosition === 'none'
                        ? 'border-rose-600 bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300 font-extrabold ring-2 ring-rose-300'
                        : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    সাইডবার ছাড়া (Full Width)
                  </button>
                </div>
              </div>

              {/* Sidebar Widgets */}
              <div className="space-y-3">
                <label className="block text-sm font-bold font-serif-bn">সাইডবার উইজেটসমূহ (Sidebar Widgets)</label>
                
                <label className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 cursor-pointer">
                  <span className="text-xs font-bold">🔥 সর্বাধিক পঠিত সংবাদ (Trending Posts)</span>
                  <input
                    type="checkbox"
                    checked={config.sidebarWidgets.trendingPosts}
                    onChange={(e) => setConfig({
                      ...config,
                      sidebarWidgets: { ...config.sidebarWidgets, trendingPosts: e.target.checked }
                    })}
                    className="w-4 h-4 text-rose-600 rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 cursor-pointer">
                  <span className="text-xs font-bold">🌙 নামাজের সময়সূচি ও ইসলামিক উইজেট</span>
                  <input
                    type="checkbox"
                    checked={config.sidebarWidgets.prayerTimes}
                    onChange={(e) => setConfig({
                      ...config,
                      sidebarWidgets: { ...config.sidebarWidgets, prayerTimes: e.target.checked }
                    })}
                    className="w-4 h-4 text-rose-600 rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 cursor-pointer">
                  <span className="text-xs font-bold">📢 সোশ্যাল ফলোয়ার ও কমিউনিটি উইজেট</span>
                  <input
                    type="checkbox"
                    checked={config.sidebarWidgets.socialCounters}
                    onChange={(e) => setConfig({
                      ...config,
                      sidebarWidgets: { ...config.sidebarWidgets, socialCounters: e.target.checked }
                    })}
                    className="w-4 h-4 text-rose-600 rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 cursor-pointer">
                  <span className="text-xs font-bold">✉️ নিউজলেটার সাবস্ক্রিপশন বক্স</span>
                  <input
                    type="checkbox"
                    checked={config.sidebarWidgets.newsletter}
                    onChange={(e) => setConfig({
                      ...config,
                      sidebarWidgets: { ...config.sidebarWidgets, newsletter: e.target.checked }
                    })}
                    className="w-4 h-4 text-rose-600 rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 cursor-pointer">
                  <span className="text-xs font-bold">🖼️ ৩০০x২৫০ ব্যানার বিজ্ঞাপন স্পেস</span>
                  <input
                    type="checkbox"
                    checked={config.showSidebarAd}
                    onChange={(e) => setConfig({ ...config, showSidebarAd: e.target.checked })}
                    className="w-4 h-4 text-rose-600 rounded"
                  />
                </label>
              </div>
            </div>
          )}

          {/* TAB 4: General Branding */}
          {activeTab === 'general' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  ব্লগ / পোর্টালের নাম (Site Name):
                </label>
                <input
                  type="text"
                  value={config.siteName}
                  onChange={(e) => setConfig({ ...config, siteName: e.target.value })}
                  placeholder="যেমন: বাংলা এক্সপ্রেস"
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  ট্যাগলাইন বা স্লোগান (Site Tagline):
                </label>
                <input
                  type="text"
                  value={config.siteTagline}
                  onChange={(e) => setConfig({ ...config, siteTagline: e.target.value })}
                  placeholder="যেমন: প্রযুক্তি, কৃষি, স্বাস্থ্য ও ডিজিটাল তথ্যের নির্ভরযোগ্য বাংলা প্ল্যাটফর্ম"
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
                />
              </div>

              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-900 text-xs text-amber-800 dark:text-amber-200">
                💡 <strong>পরামর্শ:</strong> ট্যাগলাইন সংক্ষিপ্ত ও অর্থবহ রাখলে গুগল সার্চে দ্রুত র‍্যাঙ্ক পেতে সুবিধা হয়।
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Actions */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 dark:bg-gray-800/80 border-t border-gray-200 dark:border-gray-700/80 shrink-0">
          <button
            onClick={onResetDefault}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>ডিফল্ট রিসেট</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              বাতিল
            </button>
            <button
              id="btn-save-layout"
              onClick={handleSave}
              className="flex items-center gap-1.5 px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-md transition-all active:scale-95"
            >
              {savedSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              <span>{savedSuccess ? 'সংরক্ষিত হয়েছে!' : 'লেআউট সেভ করুন'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
