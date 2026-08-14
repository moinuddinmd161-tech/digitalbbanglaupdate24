import React, { useState } from 'react';
import { 
  X, Code, Copy, Check, Download, Sparkles, 
  Flame, Facebook, Lightbulb, Image, Compass, ExternalLink, Globe, FileCode
} from 'lucide-react';
import { POST_IDEAS, FACEBOOK_PAGE_TEMPLATES, BLOGGER_XML_TEMPLATE_SAMPLE } from '../data/initialData';
import { STANDALONE_HTML_INDEX_CODE } from '../data/standaloneHtmlTemplate';
import { Category } from '../types';

interface BloggerToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
}

export const BloggerToolsModal: React.FC<BloggerToolsModalProps> = ({
  isOpen,
  onClose,
  categories,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'html' | 'ideas' | 'xml' | 'fb' | 'logo'>('html');
  const [copiedXml, setCopiedXml] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [copiedBioIndex, setCopiedBioIndex] = useState<number | null>(null);

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(STANDALONE_HTML_INDEX_CODE);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2500);
  };

  const handleDownloadHtml = () => {
    const blob = new Blob([STANDALONE_HTML_INDEX_CODE], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyXml = () => {
    navigator.clipboard.writeText(BLOGGER_XML_TEMPLATE_SAMPLE);
    setCopiedXml(true);
    setTimeout(() => setCopiedXml(false), 2500);
  };

  const handleDownloadXml = () => {
    const blob = new Blob([BLOGGER_XML_TEMPLATE_SAMPLE], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bangla-express-blogger-theme.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyBio = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedBioIndex(idx);
    setTimeout(() => setCopiedBioIndex(null), 2000);
  };

  // Logo concepts
  const logoIdeas = [
    {
      title: 'কনসেপ্ট ১: আধুনিক ডিজিটাল বাংলা (Flame & Tech)',
      tagline: 'প্রযুক্তি ও তথ্যের গতিশীল প্ল্যাটফর্ম',
      icon: '🔥 শিখা ও ডিজিটাল সিগন্যাল',
      colors: 'Crimson Red (#E11D48) + Slate Navy (#0F172A)',
      font: 'Noto Serif Bengali (বোল্ড ও মার্জিত)',
    },
    {
      title: 'কনসেপ্ট ২: স্মার্ট ডিজিটাল সেবা (Circuit & BD Landmark)',
      tagline: 'সবার আগে বাংলা ডিজিটাল সেবা',
      icon: '🏛️ স্মৃতিসৌধ ও সার্কিট লাইন গ্রাফিক',
      colors: 'Deep Royal Blue (#2563EB) + Emerald Green (#059669)',
      font: 'Hind Siliguri Bold',
    },
    {
      title: 'কনসেপ্ট ৩: কৃষি ও স্বাস্থ্য বিপ্লব (Leaf & Sun)',
      tagline: 'কৃষি, পুষ্টি ও আধুনিক জীবনের দিগন্ত',
      icon: '🌾 সবুজ ধানের শিষ ও সূর্যোদয়',
      colors: 'Forest Green (#15803D) + Amber Sun (#D97706)',
      font: 'Anek Bangla Extra Bold',
    },
  ];

  // Cover photo prompts
  const coverPhotoPrompts = [
    {
      platform: 'Facebook Cover (820x312)',
      prompt: 'A minimalist Bengali news & tech modern header banner with Dhaka skyline, digital matrix glow, modern laptop, agricultural green field in harmony, high contrast typography "বাংলা এক্সপ্রেস - সবার আগে নির্ভরযোগ্য ডিজিটাল আপডেট"',
    },
    {
      platform: 'YouTube Channel Art (2560x1440)',
      prompt: 'Cinematic YouTube banner featuring tech devices, AI robotics wireframe, smart farming drone and digital Bangladesh passport mockups with bold Bangla font "বাংলা এক্সপ্রেস"',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-3xl max-w-4xl w-full my-auto overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700/80 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-serif-bn">ব্লগার টুলকিট ও গ্রোথ গাইড</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                পোস্ট আইডিয়া, ব্লগার XML থিম, লোগো এবং ফেসবুক পেজ ব্র্যান্ডিং
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 bg-gray-100/50 dark:bg-gray-800/40 px-6 pt-2 gap-2 text-xs font-bold overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('html')}
            className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'html' ? 'border-rose-600 text-rose-600 dark:text-rose-400 font-extrabold' : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>HTML Index ফাইল ডাউনলোড (Single File)</span>
          </button>

          <button
            onClick={() => setActiveTab('ideas')}
            className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'ideas' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-extrabold' : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>প্রথম ২০টি পোস্ট আইডিয়া</span>
          </button>

          <button
            onClick={() => setActiveTab('xml')}
            className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'xml' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-extrabold' : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>ব্লগার XML থিম ডাউনলোড</span>
          </button>

          <button
            onClick={() => setActiveTab('fb')}
            className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'fb' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-extrabold' : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'
            }`}
          >
            <Facebook className="w-3.5 h-3.5" />
            <span>Facebook Page ও Bio</span>
          </button>

          <button
            onClick={() => setActiveTab('logo')}
            className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'logo' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-extrabold' : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'
            }`}
          >
            <Image className="w-3.5 h-3.5" />
            <span>লোগো ও কভার ডিজাইন আইডিয়া</span>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 flex-1 space-y-6">
          {/* TAB 0: Standalone HTML Index */}
          {activeTab === 'html' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-rose-50 dark:bg-rose-950/40 rounded-2xl border border-rose-200 dark:border-rose-900/60">
                <div>
                  <h3 className="text-sm font-bold text-rose-900 dark:text-rose-200 font-serif-bn flex items-center gap-2">
                    <Globe className="w-4 h-4 text-rose-600" />
                    স্ট্যান্ডঅ্যালোন index.html ফাইল (Single-File Website)
                  </h3>
                  <p className="text-xs text-rose-700 dark:text-rose-300 mt-1">
                    সম্পূর্ণ স্বয়ংসম্পূর্ণ রেসপনসিভ বাংলা নিউজ ও ম্যাগাজিন পোর্টাল। যেকোনো ব্রাউজার, হোস্টিং, cPanel বা GitHub Pages-এ সরাসরি চলবে।
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleCopyHtml}
                    className="flex items-center gap-1.5 px-3 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700 transition-colors shadow-xs"
                  >
                    {copiedHtml ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedHtml ? 'কপি হয়েছে' : 'HTML কোড কপি'}</span>
                  </button>

                  <button
                    onClick={handleDownloadHtml}
                    className="flex items-center gap-1.5 px-3 py-2 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-black transition-colors shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>index.html ডাউনলোড</span>
                  </button>

                  <a
                    href="/standalone-index.html"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 rounded-xl text-xs font-bold hover:bg-gray-100 transition-colors shadow-xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>লাইভ প্রিভিউ</span>
                  </a>
                </div>
              </div>

              {/* Code preview block */}
              <div className="relative rounded-2xl overflow-hidden border border-gray-300 dark:border-gray-700 bg-gray-950 text-gray-200 p-4 font-mono text-xs max-h-80 overflow-y-auto">
                <div className="flex justify-between items-center pb-2 mb-2 border-b border-gray-800 text-gray-400 text-[11px]">
                  <span>index.html (HTML5, Tailwind CSS, FontAwesome, Google Fonts, Vanilla JS)</span>
                  <span className="text-emerald-400">● রেডি টু রান</span>
                </div>
                <pre className="whitespace-pre-wrap">{STANDALONE_HTML_INDEX_CODE}</pre>
              </div>
            </div>
          )}

          {/* TAB 1: Post Ideas */}
          {activeTab === 'ideas' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl border border-indigo-200 dark:border-indigo-900/60 text-xs text-indigo-900 dark:text-indigo-200">
                ✨ <strong>এসইও অপ্টিমাইজড পোস্ট আইডিয়া:</strong> এই বিষয়গুলোর সার্চ ভলিউম গুগলে অত্যন্ত বেশি এবং খুব দ্রুত অ্যাডসেন্স অ্যাপ্রুভাল পাওয়ার জন্য উপযুক্ত।
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {POST_IDEAS.map((idea, idx) => (
                  <div
                    key={idea.id}
                    className="p-4 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700/80 space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2 py-0.5 rounded-full font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                        {idea.category}
                      </span>
                      <span className="font-mono text-gray-400">আইডিয়া #{idx + 1}</span>
                    </div>

                    <h4 className="text-sm font-bold text-gray-900 dark:text-white font-serif-bn">
                      {idea.title}
                    </h4>

                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      {idea.description}
                    </p>

                    <div className="pt-2 border-t border-gray-100 dark:border-gray-700 flex flex-wrap gap-1 text-[10px]">
                      <span className="text-gray-400">কীওয়ার্ড:</span>
                      {idea.seoKeywords.map((kw, i) => (
                        <span key={i} className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-gray-600 dark:text-gray-300">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: XML Blogger Theme */}
          {activeTab === 'xml' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-900/60">
                <div>
                  <h3 className="text-sm font-bold text-emerald-900 dark:text-emerald-200 font-serif-bn">
                    Blogger / Blogspot XML থিম কোড
                  </h3>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300">
                    Blogger.com এ আপনার ব্লগের Theme Settings এ গিয়ে `Restore` বা `Edit HTML` করে এই কোড ব্যবহার করতে পারেন।
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleCopyXml}
                    className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors shadow-xs"
                  >
                    {copiedXml ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedXml ? 'কপি হয়েছে' : 'কোড কপি করুন'}</span>
                  </button>

                  <button
                    onClick={handleDownloadXml}
                    className="flex items-center gap-1.5 px-3 py-2 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-black transition-colors shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>.XML ফাইল ডাউনলোড</span>
                  </button>
                </div>
              </div>

              {/* Code preview block */}
              <div className="relative rounded-2xl overflow-hidden border border-gray-300 dark:border-gray-700 bg-gray-950 text-gray-200 p-4 font-mono text-xs max-h-80 overflow-y-auto">
                <pre>{BLOGGER_XML_TEMPLATE_SAMPLE}</pre>
              </div>
            </div>
          )}

          {/* TAB 3: Facebook Page Templates */}
          {activeTab === 'fb' && (
            <div className="space-y-4">
              <p className="text-xs text-gray-500">
                আপনার ফেসবুক পেজ প্রফেশনাল করার জন্য প্রস্তুত নাম, ক্যাটাগরি ও আকর্ষণীয় বায়ো:
              </p>

              <div className="space-y-4">
                {FACEBOOK_PAGE_TEMPLATES.map((tpl, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white font-serif-bn">
                        {tpl.name}
                      </h4>
                      <span className="text-[11px] bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200 px-2 py-0.5 rounded-md font-semibold">
                        {tpl.category}
                      </span>
                    </div>

                    <div className="p-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 text-xs text-gray-700 dark:text-gray-300">
                      {tpl.bio}
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-[11px] text-blue-600 dark:text-blue-400 font-mono">{tpl.hashtags}</span>
                      <button
                        onClick={() => handleCopyBio(`${tpl.name}\n\n${tpl.bio}\n\n${tpl.hashtags}`, idx)}
                        className="flex items-center gap-1 text-xs font-bold text-gray-600 hover:text-rose-600 dark:text-gray-300"
                      >
                        {copiedBioIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedBioIndex === idx ? 'কপি হয়েছে' : 'কপি করুন'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Logo & Cover Concepts */}
          {activeTab === 'logo' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold font-serif-bn mb-3">প্রফেশনাল লোগো আইডিয়া (Logo Concepts)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  {logoIdeas.map((logo, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 space-y-2"
                    >
                      <h4 className="text-xs font-bold text-rose-600 dark:text-rose-400">{logo.title}</h4>
                      <p className="text-xs font-bold text-gray-900 dark:text-white">স্লোগান: “{logo.tagline}”</p>
                      <div className="text-[11px] text-gray-500 dark:text-gray-400 space-y-1 pt-2 border-t border-gray-100 dark:border-gray-700">
                        <p><strong>আইকন:</strong> {logo.icon}</p>
                        <p><strong>কালার:</strong> {logo.colors}</p>
                        <p><strong>ফন্ট:</strong> {logo.font}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold font-serif-bn mb-3">কভার ফটো ডিজাইন প্রম্পট (AI Image Generator Prompt)</h3>
                <div className="space-y-3">
                  {coverPhotoPrompts.map((cp, idx) => (
                    <div key={idx} className="p-3.5 bg-gray-50 dark:bg-gray-800/60 rounded-xl border border-gray-200 dark:border-gray-700 text-xs">
                      <p className="font-bold text-gray-700 dark:text-gray-300 mb-1">{cp.platform}</p>
                      <p className="font-mono text-gray-600 dark:text-gray-400 text-[11px] bg-white dark:bg-gray-900 p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 select-all">
                        {cp.prompt}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
