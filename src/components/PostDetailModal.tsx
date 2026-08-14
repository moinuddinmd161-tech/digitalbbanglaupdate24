import React, { useState } from 'react';
import { 
  X, Clock, Eye, Share2, Facebook, MessageCircle, Twitter, 
  Copy, Check, ThumbsUp, Heart, Sparkles, Lightbulb, 
  Volume2, VolumeX, Send, ArrowLeft, Bookmark, CornerDownRight, Tag
} from 'lucide-react';
import { Post, Category, Comment } from '../types';

interface PostDetailModalProps {
  post: Post | null;
  categories: Category[];
  allPosts: Post[];
  onClose: () => void;
  onSelectPost: (post: Post) => void;
  onSelectCategory: (categoryId: string) => void;
  onUpdatePost: (updatedPost: Post) => void;
}

export const PostDetailModal: React.FC<PostDetailModalProps> = ({
  post,
  categories,
  allPosts,
  onClose,
  onSelectPost,
  onSelectCategory,
  onUpdatePost,
}) => {
  if (!post) return null;

  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [newCommentAuthor, setNewCommentAuthor] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [userReactions, setUserReactions] = useState<Record<string, boolean>>({});

  const category = categories.find(c => c.id === post.categoryId);
  const subCategory = category?.subCategories.find(s => s.id === post.subCategoryId);
  const relatedPosts = allPosts.filter(p => p.categoryId === post.categoryId && p.id !== post.id).slice(0, 3);

  // Copy URL
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Text to speech
  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('আপনার ব্রাউজারে স্পিচ সিন্থেসিস সমর্থিত নয়');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const textToRead = `${post.title}. ${post.excerpt}. ${post.content}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'bn-BD';
      utterance.rate = 0.95;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  // Reactions
  const handleReaction = (type: 'like' | 'love' | 'wow' | 'insightful') => {
    if (userReactions[type]) return;

    const currentReactions = post.reactions || { like: 0, love: 0, wow: 0, insightful: 0 };
    const updatedPost: Post = {
      ...post,
      reactions: {
        ...currentReactions,
        [type]: (currentReactions[type] || 0) + 1,
      },
    };

    setUserReactions(prev => ({ ...prev, [type]: true }));
    onUpdatePost(updatedPost);
  };

  // Add Comment
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      author: newCommentAuthor.trim() || 'নামহীন পাঠক',
      content: newCommentText.trim(),
      date: 'মাত্র কিছুক্ষণ আগে',
      likes: 0,
    };

    const updatedPost: Post = {
      ...post,
      comments: [newComment, ...(post.comments || [])],
    };

    onUpdatePost(updatedPost);
    setNewCommentText('');
    setNewCommentAuthor('');
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'large': return 'text-lg sm:text-xl leading-relaxed';
      case 'xlarge': return 'text-xl sm:text-2xl leading-loose';
      case 'normal':
      default: return 'text-base sm:text-lg leading-relaxed';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-3xl max-w-4xl w-full my-auto overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 max-h-[92vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-gray-50 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700/80 shrink-0">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 overflow-hidden">
            <button 
              onClick={() => {
                onClose();
                onSelectCategory(post.categoryId);
              }}
              className="hover:text-rose-600 dark:hover:text-rose-400 font-bold"
            >
              {category?.name || 'সংবাদ'}
            </button>
            {subCategory && (
              <>
                <span>/</span>
                <span className="text-gray-700 dark:text-gray-300">{subCategory.name}</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Font Size Selector */}
            <div className="flex items-center bg-gray-200 dark:bg-gray-700 rounded-lg p-0.5 text-xs font-bold">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-1 rounded ${fontSize === 'normal' ? 'bg-white dark:bg-gray-900 text-rose-600 shadow-2xs' : 'text-gray-600 dark:text-gray-300'}`}
                title="স্বাভাবিক ফন্ট"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-1 rounded ${fontSize === 'large' ? 'bg-white dark:bg-gray-900 text-rose-600 shadow-2xs' : 'text-gray-600 dark:text-gray-300'}`}
                title="বড় ফন্ট"
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-2 py-1 rounded ${fontSize === 'xlarge' ? 'bg-white dark:bg-gray-900 text-rose-600 shadow-2xs' : 'text-gray-600 dark:text-gray-300'}`}
                title="আরও বড় ফন্ট"
              >
                A++
              </button>
            </div>

            {/* Audio Reader Toggle */}
            <button
              onClick={handleToggleSpeech}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                isSpeaking 
                  ? 'bg-rose-600 text-white animate-pulse' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-rose-100 dark:hover:bg-rose-950'
              }`}
              title="সংবাদটি অডিওতে শুনুন"
            >
              {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isSpeaking ? 'বন্ধ করুন' : 'শুনুন'}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Close reader"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Article Body */}
        <div className="overflow-y-auto px-5 sm:px-8 py-6 space-y-6">
          {/* Article Header */}
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white font-serif-bn leading-snug">
              {post.title}
            </h1>

            {/* Author, Date & Views bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-gray-100 dark:border-gray-800 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full object-cover border border-rose-400"
                />
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">{post.author.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{post.author.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span>{post.date}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-rose-500" />
                  {post.readTimeMinutes} মিনিট পড়া
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4 text-rose-500" />
                  {post.views.toLocaleString('bn-BD')} ভিউ
                </span>
              </div>
            </div>
          </div>

          {/* Featured Cover Image */}
          <div className="relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-16/9 shadow-md">
            <img
              src={post.coverImage}
              alt={post.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Excerpt / Highlight Box */}
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border-l-4 border-rose-600 text-gray-800 dark:text-rose-100 font-medium text-sm sm:text-base italic leading-relaxed">
            {post.excerpt}
          </div>

          {/* Formatted Article Content */}
          <div className={`prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 font-sans ${getFontSizeClass()}`}>
            {post.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={idx} className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white font-serif-bn mt-6 mb-2 border-b border-gray-200 dark:border-gray-800 pb-1">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('* ') || paragraph.startsWith('- ')) {
                const items = paragraph.split('\n').filter(Boolean);
                return (
                  <ul key={idx} className="list-disc pl-5 space-y-1.5 my-3">
                    {items.map((item, i) => (
                      <li key={i}>{item.replace(/^[\*\-]\s*/, '')}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={idx} className="mb-4 leading-relaxed whitespace-pre-line">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-gray-500 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" /> ট্যাগ:
              </span>
              {post.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Reaction Buttons */}
          <div className="bg-gray-50 dark:bg-gray-800/60 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-600 dark:text-gray-300">আপনার প্রতিক্রিয়া:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleReaction('like')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-transform active:scale-95 ${
                    userReactions.like
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-blue-50 hover:text-blue-600 shadow-2xs'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>লাইক ({(post.reactions?.like || 0) + (userReactions.like ? 1 : 0)})</span>
                </button>

                <button
                  onClick={() => handleReaction('love')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-transform active:scale-95 ${
                    userReactions.love
                      ? 'bg-rose-600 text-white'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-rose-50 hover:text-rose-600 shadow-2xs'
                  }`}
                >
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span>লাভ ({(post.reactions?.love || 0) + (userReactions.love ? 1 : 0)})</span>
                </button>

                <button
                  onClick={() => handleReaction('insightful')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-transform active:scale-95 ${
                    userReactions.insightful
                      ? 'bg-amber-600 text-white'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-amber-50 hover:text-amber-600 shadow-2xs'
                  }`}
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>উপকারী</span>
                </button>
              </div>
            </div>

            {/* Social Share Buttons */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-gray-600 dark:text-gray-300 mr-1">শেয়ার করুন:</span>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-blue-600 text-white rounded-full hover:scale-105 transition-transform"
                title="Facebook এ শেয়ার করুন"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + ' ' + window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-emerald-600 text-white rounded-full hover:scale-105 transition-transform"
                title="WhatsApp এ শেয়ার করুন"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1 px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full text-xs font-bold hover:bg-gray-300 transition-colors"
                title="লিংক কপি করুন"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'কপি হয়েছে' : 'লিংক'}</span>
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-800 space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white font-serif-bn">
              পাঠকের মন্তব্য ({(post.comments || []).length})
            </h3>

            {/* Comment Form */}
            <form onSubmit={handleAddComment} className="space-y-3 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-200 dark:border-gray-700">
              <input
                type="text"
                value={newCommentAuthor}
                onChange={(e) => setNewCommentAuthor(e.target.value)}
                placeholder="আপনার নাম (ঐচ্ছিক)"
                className="w-full sm:w-1/2 px-3 py-2 text-xs rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:outline-hidden"
              />
              <textarea
                required
                rows={3}
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="আপনার গঠনমূলক মতামত লিখুন..."
                className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:outline-hidden"
              ></textarea>
              <button
                type="submit"
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>মন্তব্য প্রকাশ করুন</span>
              </button>
            </form>

            {/* Comment List */}
            <div className="space-y-3 pt-2">
              {(post.comments || []).map((comm) => (
                <div key={comm.id} className="p-3.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 shadow-2xs space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-gray-900 dark:text-white">{comm.author}</span>
                    <span className="text-gray-400">{comm.date}</span>
                  </div>
                  <p className="text-xs text-gray-700 dark:text-gray-300">{comm.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white font-serif-bn mb-4">
                সম্পর্কিত আরও সংবাদ
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedPosts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectPost(rel)}
                    className="group cursor-pointer rounded-xl bg-gray-50 dark:bg-gray-800/60 p-2.5 border border-gray-200 dark:border-gray-700 hover:border-rose-400 transition-all"
                  >
                    <div className="aspect-16/10 rounded-lg overflow-hidden mb-2 bg-gray-200 dark:bg-gray-700">
                      <img
                        src={rel.coverImage}
                        alt={rel.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-rose-600 font-serif-bn">
                      {rel.title}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
