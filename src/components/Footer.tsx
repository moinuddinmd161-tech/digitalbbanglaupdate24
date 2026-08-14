import React from 'react';
import { Flame, Facebook, Youtube, Send, Twitter, Mail, MapPin, Phone, Heart } from 'lucide-react';
import { Category, LayoutConfig } from '../types';

interface FooterProps {
  categories: Category[];
  layoutConfig: LayoutConfig;
  onSelectCategory: (categoryId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ categories, layoutConfig, onSelectCategory }) => {
  return (
    <footer className="bg-gray-950 text-gray-300 border-t border-gray-800 mt-16 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Brand & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center text-white shadow-lg">
                <Flame className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-white font-serif-bn">
                {layoutConfig.siteName}
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              {layoutConfig.siteTagline}। সঠিক ও নির্ভেজাল তথ্য সবার মাঝে পৌঁছে দিতে আমরা অঙ্গীকারবদ্ধ।
            </p>
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-blue-600 text-gray-400 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook Page"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-red-600 text-gray-400 hover:text-white flex items-center justify-center transition-colors"
                aria-label="YouTube Channel"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-sky-500 text-gray-400 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Telegram Group"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Twitter Page"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Main Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-rose-500 pl-2">
              গুরুত্বপূর্ণ বিভাগসমূহ
            </h4>
            <ul className="space-y-2 text-xs">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onSelectCategory(cat.id)}
                    className="hover:text-rose-400 transition-colors flex items-center gap-1.5"
                  >
                    <span>•</span>
                    <span>{cat.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Digital Bangladesh & Services */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-indigo-500 pl-2">
              ডিজিটাল সেবা ও গাইড
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button onClick={() => onSelectCategory('digital-bd')} className="hover:text-white transition-colors">
                  • ই-পাসপোর্ট অনলাইন আবেদন নিয়ম
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('digital-bd')} className="hover:text-white transition-colors">
                  • ডিজিটাল জন্ম নিবন্ধন সংশোধন
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('digital-bd')} className="hover:text-white transition-colors">
                  • ভোটার আইডি ও স্মার্ট কার্ড ডাউনলোড
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('income')} className="hover:text-white transition-colors">
                  • ফ্রিল্যান্সিং ও অনলাইন ইনকাম গাইড
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('agro')} className="hover:text-white transition-colors">
                  • আধুনিক কৃষি প্রযুক্তি ও খামার পরামর্শ
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Office */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2">
              যোগাযোগ ও সম্পাদকীয়
            </h4>
            <div className="space-y-2.5 text-xs text-gray-400">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>মতিঝিল বাণিজ্যিক এলাকা, ঢাকা-১০০০, বাংলাদেশ</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>editor@banglaexpress.com</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+৮৮০ ১৭০০-০০০০০০</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Terms */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-3">
          <p>© ২০২৬ {layoutConfig.siteName}। সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-gray-400 cursor-pointer">গোপনীয়তা নীতি</span>
            <span className="hover:text-gray-400 cursor-pointer">ব্যবহারের শর্তাবলী</span>
            <span className="hover:text-gray-400 cursor-pointer">বিজ্ঞাপন নীতিমালা</span>
            <span className="hover:text-gray-400 cursor-pointer">সাইটম্যাপ</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
