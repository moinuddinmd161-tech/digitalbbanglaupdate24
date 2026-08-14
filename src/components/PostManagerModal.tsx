import React, { useState } from 'react';
import { 
  X, Plus, Edit, Trash2, Image, Check, Sparkles, 
  Search, Eye, Flame, Star, Tag, Upload, FileText, ArrowLeft 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Post, Category } from '../types';

interface PostManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  posts: Post[];
  categories: Category[];
  onCreatePost: (newPost: Post) => void;
  onUpdatePost: (updatedPost: Post) => void;
  onDeletePost: (postId: string) => void;
  onSelectPost: (post: Post) => void;
}

export const PostManagerModal: React.FC<PostManagerModalProps> = ({
  isOpen,
  onClose,
  posts,
  categories,
  onCreatePost,
  onUpdatePost,
  onDeletePost,
  onSelectPost,
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'list' | 'create' | 'edit'>('list');
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || 'national');
  const [subCategoryId, setSubCategoryId] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [tagsString, setTagsString] = useState('');
  const [authorName, setAuthorName] = useState('অ্যাডমিন');
  const [authorRole, setAuthorRole] = useState('সম্পাদক ও কনটেন্ট রাইটার');
  const [isBreaking, setIsBreaking] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isTrending, setIsTrending] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  // Sample curated images for quick pick
  const presetImages = [
    { label: 'এআই ও প্রযুক্তি', url: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80' },
    { label: 'ডিজিটাল সার্ভিস / পাসপোর্ট', url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80' },
    { label: 'কৃষি ও খামার', url: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef2396d?auto=format&fit=crop&w=1200&q=80' },
    { label: 'স্বাস্থ্য ও চিকিৎসা', url: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80' },
    { label: 'অনলাইন ইনকাম ও ব্লগিং', url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80' },
    { label: 'ইসলামিক কর্নার', url: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1200&q=80' },
    { label: 'শিক্ষা ও স্কলারশিপ', url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80' },
  ];

  const handleOpenCreate = () => {
    setTitle('');
    setCategoryId(categories[0]?.id || 'national');
    setSubCategoryId('');
    setExcerpt('');
    setContent('');
    setCoverImage(presetImages[0].url);
    setTagsString('বাংলা, নিউজ, আপডেট');
    setAuthorName('অ্যাডমিন');
    setAuthorRole('সম্পাদক ও কনটেন্ট রাইটার');
    setIsBreaking(false);
    setIsFeatured(false);
    setIsTrending(false);
    setVideoUrl('');
    setEditingPostId(null);
    setMode('create');
  };

  const handleOpenEdit = (post: Post) => {
    setTitle(post.title);
    setCategoryId(post.categoryId);
    setSubCategoryId(post.subCategoryId || '');
    setExcerpt(post.excerpt);
    setContent(post.content);
    setCoverImage(post.coverImage);
    setTagsString(post.tags.join(', '));
    setAuthorName(post.author.name);
    setAuthorRole(post.author.role);
    setIsBreaking(!!post.isBreaking);
    setIsFeatured(!!post.isFeatured);
    setIsTrending(!!post.isTrending);
    setVideoUrl(post.videoUrl || '');
    setEditingPostId(post.id);
    setMode('edit');
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('অনুগ্রহ করে শিরোনাম ও বিস্তারিত বিবরণ লিখুন');
      return;
    }

    const tags = tagsString.split(',').map(t => t.trim()).filter(Boolean);
    const readTimeMinutes = Math.max(1, Math.ceil(content.split(/\s+/).length / 150));

    if (mode === 'create') {
      const newPost: Post = {
        id: `post-${Date.now()}`,
        title: title.trim(),
        slug: title.toLowerCase().replace(/\s+/g, '-').slice(0, 50),
        excerpt: excerpt.trim() || title.trim(),
        content: content.trim(),
        coverImage: coverImage.trim() || presetImages[0].url,
        categoryId,
        subCategoryId: subCategoryId || undefined,
        tags: tags.length > 0 ? tags : ['নিউজ', 'আপডেট'],
        author: {
          name: authorName.trim() || 'অ্যাডমিন',
          role: authorRole.trim() || 'লেখক',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        },
        date: new Date().toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' }),
        views: 1,
        readTimeMinutes,
        isBreaking,
        isFeatured,
        isTrending,
        videoUrl: videoUrl.trim() || undefined,
        comments: [],
        reactions: { like: 1, love: 0, wow: 0, insightful: 0 },
      };

      onCreatePost(newPost);
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    } else if (mode === 'edit' && editingPostId) {
      const existing = posts.find(p => p.id === editingPostId);
      if (!existing) return;

      const updatedPost: Post = {
        ...existing,
        title: title.trim(),
        excerpt: excerpt.trim(),
        content: content.trim(),
        coverImage: coverImage.trim() || existing.coverImage,
        categoryId,
        subCategoryId: subCategoryId || undefined,
        tags: tags.length > 0 ? tags : existing.tags,
        author: {
          ...existing.author,
          name: authorName.trim() || existing.author.name,
          role: authorRole.trim() || existing.author.role,
        },
        readTimeMinutes,
        isBreaking,
        isFeatured,
        isTrending,
        videoUrl: videoUrl.trim() || undefined,
      };

      onUpdatePost(updatedPost);
    }

    setMode('list');
  };

  const selectedCategoryObj = categories.find(c => c.id === categoryId);

  const filteredPosts = posts.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategoryFilter || p.categoryId === selectedCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-3xl max-w-4xl w-full my-auto overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700/80 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center shadow-xs">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-serif-bn">
                {mode === 'list' ? 'পোস্ট ম্যানেজার ও কনটেন্ট কন্ট্রোল' : mode === 'create' ? 'নতুন পোস্ট লিখুন ও প্রকাশ করুন' : 'পোস্ট এডিট করুন'}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {mode === 'list' ? `মোট ${posts.length}টি পোস্ট প্রকাশিত আছে` : 'সকল তথ্য বাংলায় লিখে পাবলিশ করুন'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {mode !== 'list' ? (
              <button
                onClick={() => setMode('list')}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>তালিকায় ফিরুন</span>
              </button>
            ) : (
              <button
                onClick={handleOpenCreate}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-rose-600 text-white hover:bg-rose-700 transition-colors shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>নতুন পোস্ট লিখুন</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="overflow-y-auto p-6 flex-1">
          {/* 1. LIST VIEW */}
          {mode === 'list' && (
            <div className="space-y-4">
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-gray-50 dark:bg-gray-800/40 p-3 rounded-2xl border border-gray-200 dark:border-gray-700">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="পোস্টের নাম লিখে খুঁজুন..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
                  <button
                    onClick={() => setSelectedCategoryFilter(null)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                      selectedCategoryFilter === null
                        ? 'bg-rose-600 text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    সব ক্যাটাগরি
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCategoryFilter(c.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                        selectedCategoryFilter === c.id
                          ? 'bg-rose-600 text-white'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Post List */}
              <div className="space-y-3">
                {filteredPosts.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <p className="text-sm font-bold">কোনো পোস্ট পাওয়া যায়নি</p>
                    <button
                      onClick={handleOpenCreate}
                      className="mt-3 px-4 py-2 bg-rose-600 text-white text-xs font-bold rounded-xl"
                    >
                      প্রথম পোস্ট তৈরি করুন
                    </button>
                  </div>
                ) : (
                  filteredPosts.map((post) => {
                    const cat = categories.find(c => c.id === post.categoryId);
                    return (
                      <div
                        key={post.id}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 hover:border-rose-300 transition-all gap-3"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            referrerPolicy="no-referrer"
                            className="w-16 h-12 rounded-lg object-cover shrink-0 bg-gray-100"
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">
                                {cat?.name || 'নিউজ'}
                              </span>
                              {post.isBreaking && (
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-600 text-white">
                                  ব্রেকিং
                                </span>
                              )}
                              {post.isFeatured && (
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-white">
                                  ফিচার্ড
                                </span>
                              )}
                              <span className="text-[11px] text-gray-400">{post.date}</span>
                            </div>
                            <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate font-serif-bn">
                              {post.title}
                            </h4>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                          <button
                            onClick={() => {
                              onClose();
                              onSelectPost(post);
                            }}
                            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                            title="পোস্ট পড়ুন"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(post)}
                            className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-lg"
                            title="এডিট করুন"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm('আপনি কি সত্যিই এই পোস্টটি ডিলিট করতে চান?')) {
                                onDeletePost(post.id);
                              }
                            }}
                            className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg"
                            title="মুছে ফেলুন"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* 2. CREATE / EDIT POST FORM */}
          {(mode === 'create' || mode === 'edit') && (
            <form onSubmit={handleSavePost} className="space-y-5">
              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  পোস্টের বাংলা শিরোনাম (Post Title) *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="যেমন: ২০২৬ সালে ফ্রিল্যান্সিং ও এআই দিয়ে আয় করার সেরা কৌশল..."
                  className="w-full px-3.5 py-2.5 text-sm font-bold rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-rose-500 focus:outline-hidden font-serif-bn"
                />
              </div>

              {/* Category & SubCategory */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    মূল ক্যাটাগরি (Main Category) *
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => {
                      setCategoryId(e.target.value);
                      setSubCategoryId('');
                    }}
                    className="w-full px-3 py-2 text-xs font-bold rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    উপ-বিভাগ (Sub Category)
                  </label>
                  <select
                    value={subCategoryId}
                    onChange={(e) => setSubCategoryId(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
                  >
                    <option value="">-- সাধারণ উপবিভাগ --</option>
                    {selectedCategoryObj?.subCategories.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Featured Image */}
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  কভার ইমেজ URL (Cover Image URL)
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="url"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 px-3 py-2 text-xs rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 font-mono"
                  />
                </div>

                {/* Preset quick image choices */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] text-gray-400 font-medium">ক্লিক করে ছবি নির্বাচন করুন:</span>
                  {presetImages.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setCoverImage(img.url)}
                      className="px-2 py-0.5 rounded-md text-[11px] bg-gray-100 dark:bg-gray-800 hover:bg-rose-100 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                    >
                      {img.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  সংক্ষিপ্ত সারসংক্ষেপ (Excerpt / Summary)
                </label>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="পোস্টের মূল ১-২ বাক্যের বিবরণ..."
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
                ></textarea>
              </div>

              {/* Content */}
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  বিস্তারিত আর্টিকেল কনটেন্ট (Full Article Content) *
                </label>
                <textarea
                  required
                  rows={8}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="এখানে আপনার পূর্ণাঙ্গ নিউজ বা আর্টিকেল লিখুন... (হেডিং এর জন্য ### এবং পয়েন্টের জন্য * ব্যবহার করতে পারেন)"
                  className="w-full px-3.5 py-3 text-xs leading-relaxed rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 font-sans"
                ></textarea>
              </div>

              {/* Tags & YouTube Video Link */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    ট্যাগসমূহ (Tags - কমা দিয়ে আলাদা করুন)
                  </label>
                  <input
                    type="text"
                    value={tagsString}
                    onChange={(e) => setTagsString(e.target.value)}
                    placeholder="AI, প্রযুক্তি, অনলাইন ইনকাম, পাসপোর্ট"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    ইউটিউব ভিডিও লিংক (ঐচ্ছিক)
                  </label>
                  <input
                    type="url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://youtube.com/watch?v=..."
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 font-mono"
                  />
                </div>
              </div>

              {/* Highlight Toggles */}
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 flex flex-wrap gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold">
                  <input
                    type="checkbox"
                    checked={isBreaking}
                    onChange={(e) => setIsBreaking(e.target.checked)}
                    className="w-4 h-4 text-rose-600 rounded"
                  />
                  <span>🚨 ব্রেকিং নিউজ স্ক্রল বারে দেখান</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 text-amber-500 rounded"
                  />
                  <span>⭐ টপ ফিচার্ড সেকশনে দেখান</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold">
                  <input
                    type="checkbox"
                    checked={isTrending}
                    onChange={(e) => setIsTrending(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span>🔥 সাইডবার ট্রেন্ডিং তালিকায় দেখান</span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setMode('list')}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>{mode === 'create' ? 'পোস্ট প্রকাশ করুন' : 'পরিবর্তন সংরক্ষণ করুন'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
