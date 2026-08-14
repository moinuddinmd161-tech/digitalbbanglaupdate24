import React, { useState } from 'react';
import { 
  Flame, TrendingUp, Clock, Eye, MoonStar, Send, 
  CheckCircle, Facebook, Youtube, MessageSquare, Twitter, 
  Share2, ArrowRight, ShieldCheck, Mail
} from 'lucide-react';
import { Post, Category, LayoutConfig } from '../types';

interface SidebarProps {
  posts: Post[];
  categories: Category[];
  layoutConfig: LayoutConfig;
  onSelectPost: (post: Post) => void;
  onSelectCategory: (categoryId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  posts,
  categories,
  layoutConfig,
  onSelectPost,
  onSelectCategory,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const trendingPosts = [...posts].sort((a, b) => b.views - a.views).slice(0, 5);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 2000);
  };

  // Prayer times sample for Bangladesh standard time
  const prayerTimes = [
    { name: 'ফজর', time: '০৪:২৮ AM' },
    { name: 'জোহর', time: '১২:০৬ PM' },
    { name: 'আসর', time: '০৪:৩৭ PM' },
    { name: 'মাগরিব', time: '০৬:৩৩ PM' },
    { name: 'ইশা', time: '০৭:৪৮ PM' },
  ];

  return (
    <aside className="space-y-6">
      {/* 1. Trending & Most Read Posts Widget */}
      {layoutConfig.sidebarWidgets.trendingPosts && (
        <div className="bg-white dark:bg-gray-800/90 rounded-2xl p-5 border border-gray-200 dark:border-gray-700/80 shadow-2xs">
          <div className="flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-3 mb-4">
            <div className="w-2 h-5 bg-rose-600 rounded-full"></div>
            <h3 className="font-bold text-gray-900 dark:text-white font-serif-bn text-base flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-rose-600" />
              <span>সর্বাধিক পঠিত সংবাদ</span>
            </h3>
          </div>

          <div className="space-y-3.5">
            {trendingPosts.map((post, idx) => (
              <div
                key={post.id}
                onClick={() => onSelectPost(post)}
                className="group cursor-pointer flex gap-3 items-start"
              >
                <div className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center font-bold text-xs font-mono shadow-2xs ${
                  idx === 0 ? 'bg-rose-600 text-white' :
                  idx === 1 ? 'bg-amber-500 text-white' :
                  idx === 2 ? 'bg-blue-600 text-white' :
                  'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}>
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-gray-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 line-clamp-2 leading-snug font-serif-bn transition-colors">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-500 dark:text-gray-400">
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
      )}

      {/* 2. Social Follow Counters */}
      {layoutConfig.sidebarWidgets.socialCounters && (
        <div className="bg-white dark:bg-gray-800/90 rounded-2xl p-5 border border-gray-200 dark:border-gray-700/80 shadow-2xs">
          <div className="flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-3 mb-4">
            <div className="w-2 h-5 bg-blue-600 rounded-full"></div>
            <h3 className="font-bold text-gray-900 dark:text-white font-serif-bn text-base flex items-center gap-1.5">
              <Share2 className="w-4 h-4 text-blue-600" />
              <span>আমাদের সাথে যুক্ত থাকুন</span>
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-600 hover:text-white transition-all group border border-blue-200 dark:border-blue-800/60"
            >
              <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <div className="text-left leading-tight">
                <p className="text-xs font-bold">Facebook</p>
                <p className="text-[10px] opacity-80">৫০ হাজার+</p>
              </div>
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2.5 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 hover:bg-red-600 hover:text-white transition-all group border border-red-200 dark:border-red-800/60"
            >
              <Youtube className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <div className="text-left leading-tight">
                <p className="text-xs font-bold">YouTube</p>
                <p className="text-[10px] opacity-80">২৫ হাজার+</p>
              </div>
            </a>

            <a
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2.5 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 hover:bg-sky-500 hover:text-white transition-all group border border-sky-200 dark:border-sky-800/60"
            >
              <Send className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <div className="text-left leading-tight">
                <p className="text-xs font-bold">Telegram</p>
                <p className="text-[10px] opacity-80">১০ হাজার+</p>
              </div>
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-100 dark:bg-gray-700/60 text-gray-800 dark:text-gray-200 hover:bg-gray-900 hover:text-white transition-all group border border-gray-200 dark:border-gray-600"
            >
              <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <div className="text-left leading-tight">
                <p className="text-xs font-bold">Twitter (X)</p>
                <p className="text-[10px] opacity-80">৮ হাজার+</p>
              </div>
            </a>
          </div>
        </div>
      )}

      {/* 3. Prayer Times & Islamic Widget */}
      {layoutConfig.sidebarWidgets.prayerTimes && (
        <div className="bg-gradient-to-br from-emerald-800 to-green-900 text-white rounded-2xl p-5 shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-emerald-700/80 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <MoonStar className="w-5 h-5 text-amber-300" />
              <h3 className="font-bold text-white font-serif-bn text-base">নামাজের সময়সূচি</h3>
            </div>
            <span className="text-[11px] bg-emerald-700 px-2 py-0.5 rounded text-emerald-100 font-mono">
              ঢাকা ও আশেপাশের এলাকা
            </span>
          </div>

          <div className="grid grid-cols-5 gap-1.5 text-center my-3">
            {prayerTimes.map((p) => (
              <div key={p.name} className="bg-emerald-900/60 p-2 rounded-lg border border-emerald-700/50">
                <p className="text-xs font-bold text-amber-200">{p.name}</p>
                <p className="text-[10px] text-emerald-100 mt-1 font-mono">{p.time}</p>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-emerald-200 text-center italic mt-2">
            “নিশ্চয় সালাত মুমিনদের উপর নির্দিষ্ট সময়ে ফরজ করা হয়েছে।” (সুরা নিসা: ১০৩)
          </p>
        </div>
      )}

      {/* 4. 300x250 Ad Banner */}
      {layoutConfig.showSidebarAd && (
        <div className="border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl text-center space-y-2">
          <p className="text-xs font-bold text-gray-600 dark:text-gray-400">স্পন্সর বিজ্ঞাপন</p>
          <div className="w-full h-44 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-xl flex flex-col items-center justify-center p-4">
            <span className="text-sm font-bold text-gray-700 dark:text-gray-200 font-serif-bn">
              আপনার ব্যবসার প্রসার বাড়াতে
            </span>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">এখানে ব্যানার বিজ্ঞাপন দিন (৩০০ x ২৫০)</p>
            <button className="mt-3 px-3 py-1 bg-rose-600 text-white text-xs rounded-full font-semibold">
              বিজ্ঞাপন যোগাযোগ
            </button>
          </div>
        </div>
      )}

      {/* 5. Categories List Widget */}
      {layoutConfig.sidebarWidgets.categoriesList && (
        <div className="bg-white dark:bg-gray-800/90 rounded-2xl p-5 border border-gray-200 dark:border-gray-700/80 shadow-2xs">
          <div className="flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-3 mb-4">
            <div className="w-2 h-5 bg-teal-600 rounded-full"></div>
            <h3 className="font-bold text-gray-900 dark:text-white font-serif-bn text-base">
              বিভাগসমূহ
            </h3>
          </div>

          <div className="space-y-1.5">
            {categories.map((cat) => {
              const count = posts.filter(p => p.categoryId === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className="w-full flex items-center justify-between p-2 rounded-lg text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                    {cat.name}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-[10px] text-gray-500 dark:text-gray-300 font-mono">
                    {count || 4}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. Newsletter Subscription Widget */}
      {layoutConfig.sidebarWidgets.newsletter && (
        <div className="bg-rose-50 dark:bg-rose-950/30 rounded-2xl p-5 border border-rose-200 dark:border-rose-900/60 shadow-2xs">
          <div className="flex items-center gap-2 mb-2 text-rose-700 dark:text-rose-400">
            <Mail className="w-5 h-5" />
            <h3 className="font-bold font-serif-bn text-base">নিউজলেটার সাবস্ক্রিপশন</h3>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">
            প্রতিদিনের গুরুত্বপূর্ণ খবর ও টেক টিপস সরাসরি আপনার ইমেইলে পেতে সাবস্ক্রাইব করুন।
          </p>

          {subscribed ? (
            <div className="flex items-center gap-2 p-3 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 rounded-xl text-xs font-bold">
              <CheckCircle className="w-4 h-4" />
              <span>ধন্যবাদ! সাবস্ক্রিপশন সফল হয়েছে।</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="আপনার ইমেইল ঠিকানা দিন"
                className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-rose-500"
              />
              <button
                type="submit"
                className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
              >
                সাবস্ক্রাইব করুন
              </button>
            </form>
          )}
        </div>
      )}
    </aside>
  );
};
