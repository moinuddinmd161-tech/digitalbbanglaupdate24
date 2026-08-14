import { Category, Post, LayoutConfig, PostIdea } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'national',
    name: 'জাতীয় সংবাদ',
    slug: 'national-news',
    iconName: 'Newspaper',
    color: 'rose',
    subCategories: [
      { id: 'latest', name: 'সর্বশেষ খবর', slug: 'latest-news' },
      { id: 'politics', name: 'রাজনীতি', slug: 'politics' },
      { id: 'international', name: 'আন্তর্জাতিক', slug: 'international' },
      { id: 'crime', name: 'অপরাধ সংবাদ', slug: 'crime-news' },
      { id: 'viral', name: 'ভাইরাল নিউজ', slug: 'viral-news' },
    ],
  },
  {
    id: 'tech',
    name: 'টেক নিউজ',
    slug: 'tech-news',
    iconName: 'Laptop',
    color: 'blue',
    subCategories: [
      { id: 'mobile-review', name: 'মোবাইল রিভিউ', slug: 'mobile-review' },
      { id: 'ai-tech', name: 'AI ও প্রযুক্তি', slug: 'ai-technology' },
      { id: 'internet-tips', name: 'ইন্টারনেট টিপস', slug: 'internet-tips' },
      { id: 'facebook-tips', name: 'ফেসবুক টিপস', slug: 'facebook-tips' },
      { id: 'youtube-update', name: 'ইউটিউব আপডেট', slug: 'youtube-updates' },
    ],
  },
  {
    id: 'agro',
    name: 'কৃষি ও খামার',
    slug: 'agro-farming',
    iconName: 'Wheat',
    color: 'emerald',
    subCategories: [
      { id: 'vegetable', name: 'সবজি চাষ', slug: 'vegetable-farming' },
      { id: 'cattle', name: 'গরু খামার', slug: 'cattle-farming' },
      { id: 'fishery', name: 'মাছ চাষ', slug: 'fish-farming' },
      { id: 'poultry', name: 'হাঁস-মুরগি পালন', slug: 'poultry-farming' },
      { id: 'agro-tech', name: 'কৃষি প্রযুক্তি', slug: 'agro-tech' },
    ],
  },
  {
    id: 'health',
    name: 'স্বাস্থ্য সংবাদ',
    slug: 'health-news',
    iconName: 'HeartPulse',
    color: 'teal',
    subCategories: [
      { id: 'health-tips', name: 'স্বাস্থ্য টিপস', slug: 'health-tips' },
      { id: 'diabetes', name: 'ডায়াবেটিস', slug: 'diabetes-control' },
      { id: 'heart', name: 'হার্ট সমস্যা', slug: 'heart-care' },
      { id: 'mother-child', name: 'মা ও শিশু স্বাস্থ্য', slug: 'mother-child' },
      { id: 'islamic-health', name: 'ইসলামিক স্বাস্থ্য টিপস', slug: 'islamic-health-tips' },
    ],
  },
  {
    id: 'digital-bd',
    name: 'ডিজিটাল বাংলাদেশ',
    slug: 'digital-bangladesh',
    iconName: 'Landmark',
    color: 'indigo',
    subCategories: [
      { id: 'birth-cert', name: 'জন্ম নিবন্ধন', slug: 'birth-registration' },
      { id: 'nid-card', name: 'ভোটার আইডি কার্ড', slug: 'nid-card-services' },
      { id: 'passport', name: 'পাসপোর্ট তথ্য', slug: 'passport-services' },
      { id: 'online-apply', name: 'অনলাইন আবেদন', slug: 'online-application' },
      { id: 'gov-service', name: 'সরকারি সেবা', slug: 'government-services' },
    ],
  },
  {
    id: 'education',
    name: 'শিক্ষা ও চাকরি',
    slug: 'education-jobs',
    iconName: 'GraduationCap',
    color: 'amber',
    subCategories: [
      { id: 'job-news', name: 'চাকরির খবর', slug: 'job-circular' },
      { id: 'admission', name: 'ভর্তি তথ্য', slug: 'admission-info' },
      { id: 'online-income-edu', name: 'অনলাইন ইনকাম', slug: 'online-income-guide' },
      { id: 'freelancing-edu', name: 'ফ্রিল্যান্সিং', slug: 'freelancing-career' },
      { id: 'scholarship', name: 'স্কলারশিপ', slug: 'scholarships' },
    ],
  },
  {
    id: 'income',
    name: 'অনলাইন ইনকাম',
    slug: 'online-income',
    iconName: 'Smartphone',
    color: 'violet',
    subCategories: [
      { id: 'blogging', name: 'ব্লগিং', slug: 'blogging-guide' },
      { id: 'affiliate', name: 'অ্যাফিলিয়েট মার্কেটিং', slug: 'affiliate-marketing' },
      { id: 'youtube-income', name: 'ইউটিউব ইনকাম', slug: 'youtube-earning' },
      { id: 'fb-monetization', name: 'ফেসবুক মনিটাইজেশন', slug: 'fb-monetization' },
      { id: 'freelance-tips', name: 'ফ্রিল্যান্স টিপস', slug: 'freelance-tips' },
    ],
  },
  {
    id: 'islamic',
    name: 'ইসলামিক কর্নার',
    slug: 'islamic-corner',
    iconName: 'MoonStar',
    color: 'green',
    subCategories: [
      { id: 'islamic-quotes', name: 'ইসলামিক উক্তি', slug: 'islamic-quotes' },
      { id: 'namaz', name: 'নামাজ শিক্ষা', slug: 'namaz-shikkha' },
      { id: 'dua-amol', name: 'দোয়া ও আমল', slug: 'dua-o-amol' },
      { id: 'ramadan', name: 'রমজান বিষয়ক', slug: 'ramadan-rules' },
      { id: 'islamic-video', name: 'ইসলামিক ভিডিও', slug: 'islamic-videos' },
    ],
  },
];

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post-1',
    title: 'কৃত্রিম বুদ্ধিমত্তা (AI) দিয়ে মাসে ৫০ হাজার টাকা আয় করার সেরা ৫টি প্রমাণিত উপায় ২০২৬',
    slug: 'earn-money-with-ai-tools-bangla',
    excerpt: 'চ্যাটজিপিটি, মিডজার্নি এবং আধুনিক এআই টুলস ব্যবহার করে ফ্রিল্যান্সিং ও কনটেন্ট ক্রিয়েশনে ক্যারিয়ার গড়ার সম্পূর্ণ গাইড।',
    content: `বর্তমানে কৃত্রিম বুদ্ধিমত্তা বা AI প্রযুক্তির প্রসার পুরো বিশ্বের কাজের ধরন বদলে দিয়েছে। আপনি যদি সাধারণ কম্পিউটার বা স্মার্টফোন ব্যবহার করতে পারেন, তবে সঠিক এআই টুলস আয়ত্ত করে সহজেই ফ্রিল্যান্সিং ও অনলাইন থেকে স্মার্ট ইনকাম করতে পারেন।

### ১. এআই দিয়ে ব্লগিং ও এসইও কনটেন্ট রাইটিং
এআই ব্যবহার করে তথ্যবহুল ও এসইও ফ্রেন্ডলি আর্টিকেল তৈরি করা যায়। তবে সরাসরি কপি না করে নিজের রিসার্চ ও বাংলা ভাষায় নিজস্ব অভিব্যক্তি যুক্ত করা জরুরি।

### ২. সোশ্যাল মিডিয়া ও ইউটিউব ভিডিও স্ক্রিপ্টিং
ইউটিউব অটোমেশন চ্যানেল এবং ফেসবুক রিলসের জন্য AI প্রম্পটের মাধ্যমে আকর্ষণীয় স্ক্রিপ্ট তৈরি করে চমৎকার অডিও ও ভিডিও বানানো যায়।

### ৩. গ্রাফিক্স ডিজাইন ও থাম্বনেইল সার্ভিস
মিডজার্নি বা ক্যানভা এআই দিয়ে আকর্ষণীয় সোশ্যাল মিডিয়া পোস্টার, বুক কভার ও ইউটিউব থাম্বনেইল বানিয়ে ক্লায়েন্ট সার্ভিস দেওয়া সম্ভব।

### ৪. কোডিং ও ওয়েবসাইট টেমপ্লেট কাস্টমাইজেশন
এআই কোডিং অ্যাসিস্ট্যান্ট দিয়ে এইচটিএমএল, সিএসএস এবং ব্লগার বা ওয়ার্ডপ্রেস থিম সহজে তৈরি ও এডিট করা যায়।

### ৫. ডাটা এন্ট্রি ও ট্রান্সক্রিপশন
অডিও থেকে টেক্সট রূপান্তর এবং ডাটা সামারাইজেশন করে দ্রুত কাজ সম্পন্ন করা সম্ভব।

**পরামর্শ:** সবসময় নিজের সততা ও দক্ষতার মান বজায় রাখুন। AI হলো আপনার সহকারী, মূল দক্ষতা আপনার নিজের।`,
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80',
    categoryId: 'tech',
    subCategoryId: 'ai-tech',
    tags: ['AI', 'টেক', 'অনলাইন ইনকাম', 'ফ্রিল্যান্সিং', 'প্রযুক্তি'],
    author: {
      name: 'তানভীর আহমেদ',
      role: 'টেক এডিটর ও এআই রিসার্চার',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    date: '১৪ আগস্ট, ২০২৬',
    views: 14250,
    readTimeMinutes: 4,
    isBreaking: true,
    isTrending: true,
    isFeatured: true,
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    comments: [
      {
        id: 'c1',
        author: 'রাকিবুল হাসান',
        date: '২ ঘণ্টা আগে',
        content: 'খুবই প্রয়োজনীয় ও সময়োপযোগী তথ্য। বিশেষ করে এআই স্ক্রিপ্টিং এর পয়েন্টটা দারুণ লেগেছে।',
        likes: 12,
      },
      {
        id: 'c2',
        author: 'শামিমা আক্তার',
        date: '৪ ঘণ্টা আগে',
        content: 'ধন্যবাদ ভাইয়া, আমি ব্লগার থিমে এআই কনটেন্ট নিয়ে কাজ শুরু করতে চাচ্ছি।',
        likes: 8,
      },
    ],
    reactions: { like: 245, love: 180, wow: 35, insightful: 92 },
  },
  {
    id: 'post-2',
    title: 'অনলাইনে ই-পাসপোর্ট আবেদন ও পুলিশ ভেরিফিকেশন সহজ নিয়ম: ২০২৬ এর নতুন আপডেট',
    slug: 'e-passport-online-application-guide-bangladesh',
    excerpt: 'ঘরে বসেই ই-পাসপোর্ট ফরম পূরণ, ফি প্রদান এবং দ্রুত পাসপোর্ট পাওয়ার সঠিক ধাপগুলো জেনে নিন।',
    content: `বর্তমানে বাংলাদেশ সরকার পাসপোর্ট সেবা পুরোপুরি ডিজিটাল করেছে। দালাল ছাড়া আপনি নিজেই ঘরে বসে ই-পাসপোর্ট আবেদন করতে পারেন।

### প্রয়োজনীয় কাগজপত্র:
* জাতীয় পরিচয়পত্র (NID) অথবা অনলাইন জন্ম নিবন্ধন সনদ (১৭ ডিজিট)
* নাগরিক সনদপত্র বা বিদ্যুৎ বিলের কপি (প্রয়োজনে)
* আগের পাসপোর্ট থাকলে তার মূল কপি ও ফটোকপি
* পেশাগত প্রমাণপত্র বা শিক্ষার্থী আইডি কার্ড

### আবেদনের সহজ ধাপসমূহ:
১. অফিসিয়াল ওয়েবসাইট **epassport.gov.bd** এ প্রবেশ করুন।
২. বর্তমান ঠিকানা অনুযায়ী সঠিক পাসপোর্ট অফিস নির্বাচন করুন।
৩. ব্যক্তিগত তথ্য এনআইডি কার্ড অনুযায়ী হুবহু লিখুন।
৪. ফি পরিশোধ করুন (বিকাশ, রকেট, নগদ বা চালানের মাধ্যমে)।
৫. অ্যাপয়েন্টমেন্ট তারিখ নিয়ে বায়োমেট্রিক ও ছবি তোলার জন্য উপস্থিত হোন।`,
    coverImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
    categoryId: 'digital-bd',
    subCategoryId: 'passport',
    tags: ['পাসপোর্ট', 'ডিজিটাল বাংলাদেশ', 'অনলাইন আবেদন', 'সরকারি সেবা', 'NID'],
    author: {
      name: 'মাহমুদুল করিম',
      role: 'ডিজিটাল সেবা স্পেশালিস্ট',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    date: '১৩ আগস্ট, ২০২৬',
    views: 19800,
    readTimeMinutes: 5,
    isBreaking: false,
    isTrending: true,
    isFeatured: true,
    comments: [
      {
        id: 'c3',
        author: 'জাকির হোসেন',
        date: '১ দিন আগে',
        content: 'পোস্টটি পড়ে কোনো দালালের সাহায্য ছাড়াই নিজের পাসপোর্ট আবেদন সফলভাবে সম্পন্ন করেছি!',
        likes: 27,
      },
    ],
    reactions: { like: 310, love: 140, wow: 19, insightful: 120 },
  },
  {
    id: 'post-3',
    title: 'ছাদে ও আধুনিক পদ্ধতিতে ড্রাগন ও উন্নত জাতের সবজি চাষ করে লাখ টাকা আয়ের কৌশল',
    slug: 'dragon-fruit-vegetable-farming-guide-bangladesh',
    excerpt: 'কম পুঁজিতে বাড়ির ছাদে অথবা জমিতে লাভজনক আধুনিক কৃষি উদ্যোগ শুরু করার সম্পূর্ণ কারিগরি পরামর্শ।',
    content: `ড্রাগন ফল এবং উন্নত জাতের হাইব্রিড সবজি চাষ বর্তমানে বাংলাদেশে অত্যন্ত লাভজনক কৃষি ব্যবসা হিসেবে পরিচিতি পেয়েছে।

### কেন ড্রাগন ও সবজি চাষ করবেন?
* একবার চারা রোপণ করলে ১৫ থেকে ২০ বছর ফলন পাওয়া যায়।
* পোকামাকড়ের আক্রমণ তুলনামূলক অনেক কম।
* ছাদে ড্রাম বা টবে এবং স্বল্প জমিতেও প্রচুর ফলন হয়।
* বাজারে সারাবছরই এর ব্যাপক চাহিদা ও চড়া দাম রয়েছে।

### মাটি তৈরি ও সার প্রয়োগ:
দোআঁশ ও বেলে দোআঁশ মাটি ড্রাগনের জন্য উপযুক্ত। মাটির সাথে ৫০% গোবর সার বা কেঁচো কম্পোস্ট, ট্রাইকোডার্মা ও সামান্য টিএসপি সার মিশিয়ে ড্রাম প্রস্তুত করতে হবে।`,
    coverImage: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef2396d?auto=format&fit=crop&w=1200&q=80',
    categoryId: 'agro',
    subCategoryId: 'vegetable',
    tags: ['কৃষি', 'সবজি চাষ', 'ড্রাগন ফল', 'ছাদ কৃষি', 'খামার'],
    author: {
      name: 'কৃষিবিদ রফিকুল ইসলাম',
      role: 'কৃষি সম্প্রসারণ কর্মকর্তা',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    },
    date: '১২ আগস্ট, ২০২৬',
    views: 11340,
    readTimeMinutes: 4,
    isBreaking: false,
    isTrending: true,
    isFeatured: false,
    comments: [],
    reactions: { like: 190, love: 95, wow: 12, insightful: 65 },
  },
  {
    id: 'post-4',
    title: 'ডায়াবেটিস নিয়ন্ত্রণে রাখার ১০টি প্রাকৃতিক ভেষজ ও ঘরোয়া খাদ্যাভ্যাস',
    slug: 'diabetes-control-natural-diet-tips-bangla',
    excerpt: 'ওষুধের পাশাপাশি প্রতিদিনের খাবারে যেসব ছোটখাটো পরিবর্তন ডায়াবেটিস নিয়ন্ত্রণে রাখে ও হার্ট ভালো রাখে।',
    content: `ডায়াবেটিস সম্পূর্ণ নিরাময় না হলেও সুশৃঙ্খল জীবনযাপন ও সঠিক খাদ্যাভ্যাসের মাধ্যমে একে শতভাগ নিয়ন্ত্রণে রাখা সম্ভব।

### সেরা ৫টি প্রাকৃতিক খাবার:
১. **মেথি ও দারুচিনি পানি:** সকালে খালি পেটে মেথি ভিজানো পানি ইনসুলিন সংবেদনশীলতা বাড়াতে সহায়তা করে।
২. **করল্লা ও নিমপাতার রস:** রক্তে শর্করার মাত্রা দ্রুত কমাতে অত্যন্ত কার্যকরী।
৩. **সবুজ শাকসবজি:** পালং শাক, লাউ শাক ও ব্রকলিতে রয়েছে প্রচুর ফাইবার ও অ্যান্টিঅক্সিডেন্ট।
৪. **চিয়া সিডস ও তিসির বীজ:** ওমেগা-৩ ফ্যাটি এসিড যা হার্ট ও ব্লাড সুগার স্বাভাবিক রাখে।
৫. **পর্যাপ্ত হাঁটাচলা:** প্রতিদিন অন্তত ৩০ মিনিট মুক্ত বাতাসে দ্রুত হাঁটার অভ্যাস গড়ে তুলুন।`,
    coverImage: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
    categoryId: 'health',
    subCategoryId: 'diabetes',
    tags: ['স্বাস্থ্য', 'ডায়াবেটিস', 'স্বাস্থ্য টিপস', 'খাদ্যাভ্যাস', 'হার্ট'],
    author: {
      name: 'ডা. নাজনীন নাহার',
      role: 'মেডিসিন ও পুষ্টি বিশেষজ্ঞ',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    },
    date: '১৪ আগস্ট, ২০২৬',
    views: 16400,
    readTimeMinutes: 4,
    isBreaking: false,
    isTrending: true,
    isFeatured: false,
    comments: [],
    reactions: { like: 412, love: 189, wow: 28, insightful: 156 },
  },
  {
    id: 'post-5',
    title: 'ভোটার আইডি কার্ড সংশোধন ও নতুন এনআইডি ডাউনলোড করার সহজ উপায় ২০২৬',
    slug: 'nid-card-correction-download-online-bd',
    excerpt: 'নাম, জন্মতারিখ বা ঠিকানা ভুল হলে অনলাইনে আবেদন করে দ্রুত জাতীয় পরিচয়পত্র সংশোধনের নিয়মাবলী।',
    content: `নির্বাচন কমিশনের সার্ভিস পোর্টাল **services.nidw.gov.bd** ব্যবহার করে ঘরে বসেই এনআইডি সংশোধন করা যায়।

### যেসব প্রমাণপত্র লাগে:
- এসএসসির সনদপত্র বা শিক্ষাগত যোগ্যতার সার্টিফিকেট
- অনলাইন জন্ম নিবন্ধন সনদ
- পাসপোর্ট বা ড্রাইভিং লাইসেন্স
- পিতা/মাতার এনআইডি কপি

আবেদনের পর ফি প্রদান করে অনলাইনে ট্র্যাক নম্বর দিয়ে অগ্রগতি যাচাই করতে পারবেন।`,
    coverImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
    categoryId: 'digital-bd',
    subCategoryId: 'nid-card',
    tags: ['NID', 'ভোটার আইডি', 'ডিজিটাল বাংলাদেশ', 'অনলাইন আবেদন'],
    author: {
      name: 'মাহমুদুল করিম',
      role: 'ডিজিটাল সেবা স্পেশালিস্ট',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    date: '১১ আগস্ট, ২০২৬',
    views: 8900,
    readTimeMinutes: 3,
    comments: [],
    reactions: { like: 145, love: 48, wow: 9, insightful: 77 },
  },
  {
    id: 'post-6',
    title: 'ব্লগিং ও গুগল অ্যাডসেন্স থেকে প্রতি মাসে প্যাসিভ ইনকাম করার মাস্টার গাইড',
    slug: 'blogging-google-adsense-income-guide-bangla',
    excerpt: 'কিভাবে একটি সফল নিশ ব্লগ ওয়েবসাইট বানিয়ে গুগল অ্যাডসেন্স ও স্পন্সরশিপের মাধ্যমে আয় করবেন।',
    content: `বাংলা ভাষায় মানসম্মত কনটেন্ট তৈরি করে অ্যাডসেন্স অ্যাপ্রুভাল পাওয়া এখন আগের চেয়ে অনেক সহজ।

### সফল ব্লগিংয়ের মূল সূত্র:
১. **একটি নির্দিষ্ট নিশ নির্বাচন করুন:** টেকনোলজি, কৃষি, স্বাস্থ্য বা সরকারি সেবা যেকোনো একটি নির্দিষ্ট টপিক বেছে নিন।
২. **ইউনিক ও তথ্যবহুল পোস্ট:** অন্য কোনো সাইট থেকে হুবহু কপি না করে নিজের ভাষায় সমাধান দিন।
৩. **দ্রুত লোডিং থিম ব্যবহার:** ক্লাসিক ও রেসপন্সিভ ব্লগার বা ওয়ার্ডপ্রেস থিম ব্যবহার করুন যা মোবাইল ফ্রেন্ডলি।
৪. **প্রয়োজনীয় পেজ যুক্ত করুন:** About Us, Contact Us, Privacy Policy এবং Disclaimer পেজ থাকা বাধ্যতামূলক।
৫. **নিয়মিত পোস্ট পাবলিশ করুন:** সপ্তাহে অন্তত ৩-৪টি কোয়ালিটি আর্টিকেল পোস্ট করুন।`,
    coverImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
    categoryId: 'income',
    subCategoryId: 'blogging',
    tags: ['ব্লগিং', 'অনলাইন ইনকাম', 'গুগল অ্যাডসেন্স', 'ওয়েবসাইট', 'এসইও'],
    author: {
      name: 'সোহেল রানা',
      role: 'এসইও কনসালট্যান্ট ও ব্লগার',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
    },
    date: '১০ আগস্ট, ২০২৬',
    views: 21300,
    readTimeMinutes: 5,
    isBreaking: false,
    isTrending: true,
    isFeatured: true,
    comments: [],
    reactions: { like: 520, love: 310, wow: 42, insightful: 210 },
  },
  {
    id: 'post-7',
    title: 'দৈনন্দিন জীবনে দুশ্চিন্তা ও মানসিক অস্থিরতা দূর করার শক্তিশালী ৫টি দোয়া ও আমল',
    slug: 'islamic-dua-for-anxiety-mental-peace',
    excerpt: 'রাসূলুল্লাহ (সা.) কঠিন সময়ে এবং মানসিক চাপের মুহূর্তে যেসব দোয়া পড়তে সাহাবিদের শিখিয়ে দিয়েছেন।',
    content: `দৈনন্দিন ব্যস্ততা, আর্থিক চিন্তা ও বিভিন্ন প্রতিকূলতায় মন অস্থির হওয়া স্বাভাবিক। ইসলামে মানসিক প্রশান্তির জন্য সুন্দর দিকনির্দেশনা ও দোয়া রয়েছে।

### ১. লা হাওলা ওয়ালা কুওয়াতা ইল্লা বিল্লাহ
এটি জান্নাতের রত্নভাণ্ডারগুলোর একটি এবং ৯৯টি রোগের মহৌষধ, যার সবচেয়ে ক্ষুদ্র রোগ হলো দুশ্চিন্তা।

### ২. সাইয়্যিদুল ইস্তিগফার পাঠ
যে ব্যক্তি নিয়মিত ইস্তিগফার করে, আল্লাহ তায়ালা তার সমস্ত সংকট থেকে উত্তরণের পথ সহজ করে দেন।

### ৩. ইয়া হাইয়্যু ইয়া কাইয়্যুমু বিরাহমাতিকা আস্তাগিস
রাসূলুল্লাহ (সা.) যখন কোনো কঠিন পরিস্থিতির মুখোমুখি হতেন, তখন এই দোয়াটি পাঠ করতেন।

### ৪. সুরা আদ-দুহা ও সুরা ইনশিরাহ তিলাওয়াত
এই সুরাগুলো হৃদয়ে আশার আলো সঞ্চার করে এবং অন্তরে প্রগাঢ় প্রশান্তি ফিরিয়ে আনে।`,
    coverImage: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1200&q=80',
    categoryId: 'islamic',
    subCategoryId: 'dua-amol',
    tags: ['ইসলামিক', 'দোয়া ও আমল', 'নামাজ', 'মানসিক প্রশান্তি', 'উক্তি'],
    author: {
      name: 'মাওলানা আব্দুল্লাহ আল-মামুন',
      role: 'ইসলামিক স্কলার',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    },
    date: '১৪ আগস্ট, ২০২৬',
    views: 18900,
    readTimeMinutes: 4,
    isBreaking: false,
    isTrending: true,
    isFeatured: false,
    comments: [],
    reactions: { like: 620, love: 490, wow: 30, insightful: 240 },
  },
  {
    id: 'post-8',
    title: 'স্মার্টফোন কেনার আগে যেসব বিষয় অবশ্যই যাচাই করবেন: ২০২৬ মোবাইল গাইড',
    slug: 'smartphone-buying-guide-tips-bangla',
    excerpt: 'প্রসেসর, ক্যামেরা সেন্সর, ব্যাটারি হেলথ ও ডিসপ্লে কোয়ালিটি দেখে সঠিক বাজেটে সেরা ফোন নির্বাচনের নিয়ম।',
    content: `বর্তমানে বাজারে শত শত মডেলের স্মার্টফোন রয়েছে। শুধু মেগাপিক্সেল দেখে প্রতারিত না হয়ে প্রসেসর ও চিপসেটের পারফরম্যান্স দেখে ফোন কেনা উচিত।`,
    coverImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
    categoryId: 'tech',
    subCategoryId: 'mobile-review',
    tags: ['মোবাইল', 'টেক', 'রিভিউ', 'স্মার্টফোন'],
    author: {
      name: 'তানভীর আহমেদ',
      role: 'টেক এডিটর ও এআই রিসার্চার',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    date: '৯ আগস্ট, ২০২৬',
    views: 7400,
    readTimeMinutes: 3,
    comments: [],
    reactions: { like: 120, love: 35, wow: 15, insightful: 45 },
  },
  {
    id: 'post-9',
    title: 'জাতীয় মেধাভিত্তিক সরকারি ও আন্তর্জাতিক স্কলারশিপ পাওয়ার সম্পূর্ণ আবেদন প্রক্রিয়া',
    slug: 'higher-education-scholarship-application-guide',
    excerpt: 'উচ্চশিক্ষায় দেশের ভেতর ও বিদেশের বিশ্ববিদ্যালয়গুলোতে ফুল-ফান্ডেড স্কলারশিপ পেতে করণীয়।',
    content: `স্কলারশিপ পাওয়ার জন্য স্টেটমেন্ট অব পারপাস (SOP), রিকমেন্ডেশন লেটার ও ভাষাগত দক্ষতা (IELTS/Duolingo) সঠিকভাবে প্রস্তুত করতে হয়।`,
    coverImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    categoryId: 'education',
    subCategoryId: 'scholarship',
    tags: ['শিক্ষা', 'স্কলারশিপ', 'চাকরি', 'ভর্তি'],
    author: {
      name: 'অধ্যাপক শফিকুর রহমান',
      role: 'শিক্ষা পরামর্শক',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    },
    date: '৮ আগস্ট, ২০২৬',
    views: 9600,
    readTimeMinutes: 4,
    comments: [],
    reactions: { like: 190, love: 85, wow: 12, insightful: 98 },
  },
];

export const INITIAL_LAYOUT_CONFIG: LayoutConfig = {
  siteName: 'বাংলা এক্সপ্রেস',
  siteTagline: 'প্রযুক্তি, কৃষি, স্বাস্থ্য ও ডিজিটাল তথ্যের নির্ভরযোগ্য বাংলা প্ল্যাটফর্ম',
  themeStyle: 'red-news',
  sidebarPosition: 'right',
  showBreakingTicker: true,
  showTrendingHero: true,
  showCategoryBlocks: true,
  showVideoGallery: true,
  showPopularTags: true,
  showLeaderboardAd: true,
  showSidebarAd: true,
  primaryColor: '#e11d48',
  enabledCategories: ['national', 'tech', 'agro', 'health', 'digital-bd', 'education', 'income', 'islamic'],
  sidebarWidgets: {
    trendingPosts: true,
    prayerTimes: true,
    categoriesList: true,
    socialCounters: true,
    newsletter: true,
    adBanner: true,
    popularTags: true,
  },
};

export const POST_IDEAS: PostIdea[] = [
  {
    id: 'idea-1',
    category: 'টেক নিউজ',
    title: '২০২৬ সালে সেরা ৫টি এআই টুলস যা প্রতিটি ছাত্র ও ফ্রিল্যান্সারের জানা উচিত',
    seoKeywords: ['AI Tools Bangla', 'ChatGPT Bangla', 'Best Tech Tools 2026'],
    targetAudience: 'শিক্ষার্থী, ফ্রিল্যান্সার, কন্টেন্ট ক্রিয়েটর',
    description: 'এআই ব্যবহার করে পড়াশোনা ও অনলাইন কাজের গতি ৫ গুণ বাড়ানোর বাস্তব গাইড।',
  },
  {
    id: 'idea-2',
    category: 'ডিজিটাল বাংলাদেশ',
    title: 'অনলাইনে নতুন জন্ম নিবন্ধন সনদ আবেদন ও ভুল সংশোধনের সহজ নিয়ম ২০২৬',
    seoKeywords: ['Birth Certificate Online BD', 'Jonmo Nibondhon Shongshodhon'],
    targetAudience: 'সাধারণ নাগরিক, অভিভাবক',
    description: '১৮ ডিজিটের ডিজিটাল জন্ম নিবন্ধন সংক্রান্ত সকল প্রশ্নের উত্তর।',
  },
  {
    id: 'idea-3',
    category: 'কৃষি ও খামার',
    title: 'বাণিজ্যিক দেশি হাঁস ও কোয়েল পাখি পালনে মাসিক ৫০ হাজার টাকা মুনাফার হিসাব',
    seoKeywords: ['Duck Farming BD', 'Poultry Farm Tips Bangla', 'Deshi Hash Palon'],
    targetAudience: 'গ্রাম ও শহরের নতুন কৃষি উদ্যোক্তা',
    description: 'স্বল্প পুঁজিতে ঘরোয়া পরিবেশে খামার স্থাপন ও লাভজনক বিক্রয় ব্যবস্থাপনা।',
  },
  {
    id: 'idea-4',
    category: 'স্বাস্থ্য সংবাদ',
    title: 'উচ্চ রক্তচাপ ও হার্ট অ্যাটাকের ঝুঁকি কমাতে যেসব লক্ষণ কখনই অবহেলা করবেন না',
    seoKeywords: ['High Blood Pressure Control', 'Heart Attack Symptoms Bangla'],
    targetAudience: '৩০+ বয়সী প্রাপ্তবয়স্ক ও পরিবার প্রধান',
    description: 'হার্ট সুস্থ রাখার জন্য প্রতিদিনের খাদ্যাভ্যাস ও জরুরি সতর্কতা।',
  },
  {
    id: 'idea-5',
    category: 'অনলাইন ইনকাম',
    title: 'ফেসবুক পেজ ও রিলস মনিটাইজেশন সেটআপ: বাংলাদেশ থেকে ব্যাংক একাউন্ট যুক্ত করার নিয়ম',
    seoKeywords: ['Facebook Monetization BD', 'FB Reels Earning Tips'],
    targetAudience: 'সোশ্যাল মিডিয়া কন্টেন্ট ক্রিয়েটর',
    description: 'পলিসি ইস্যু ছাড়া দ্রুত পেজ গ্রো ও ব্যাংক অ্যাকাউন্টে টাকা পাওয়ার নিয়ম।',
  },
  {
    id: 'idea-6',
    category: 'শিক্ষা ও চাকরি',
    title: 'বিসিএস ও সরকারি প্রাথমিক সহকারী শিক্ষক নিয়োগ পরীক্ষার পূর্ণাঙ্গ সিলেবাস ও পড়ার রুটিন',
    seoKeywords: ['Primary Teacher Exam Preparation', 'BCS Study Routine Bangla'],
    targetAudience: 'চাকরি প্রত্যাশী শিক্ষার্থী',
    description: 'স্বল্প সময়ে সাধারণ জ্ঞান, বাংলা, ইংরেজি ও গণিতে ভালো করার টিপস।',
  },
  {
    id: 'idea-7',
    category: 'ইসলামিক কর্নার',
    title: 'তাহাজ্জুদ নামাজের সঠিক নিয়ম, ফজিলত এবং মনের আশা পূরণের বিশেষ দোয়া',
    seoKeywords: ['Tahajjud Namaz Rules', 'Dua for wishes fulfill Bangla'],
    targetAudience: 'ধার্মিক মুসলিম ভাই ও বোন',
    description: 'রাতের শেষ তৃতীয়াংশে তাহাজ্জুদ পড়ার নিয়ম ও হাদিসের বর্ণনা।',
  },
  {
    id: 'idea-8',
    category: 'কৃষি ও খামার',
    title: 'বায়োফ্লক ও পুকুরে পাঙ্গাস-তেলাপিয়া মাছ চাষে খাদ্যের খরচ কমানোর জাদুকরি উপায়',
    seoKeywords: ['Biofloc Fish Farming Bangla', 'Fish Feed Cost Reduction'],
    targetAudience: 'মৎস্য চাষি ও কৃষি খামারি',
    description: 'প্রাকৃতিক প্ল্যাঙ্কটন তৈরি ও কম খরচে সর্বোচ্চ মাছ উৎপাদন কৌশল।',
  },
  {
    id: 'idea-9',
    category: 'টেক নিউজ',
    title: 'ফেসবুক আইডি হ্যাক হওয়া থেকে রক্ষা করার ৫টি টু-ফ্যাক্টর অথেনটিকেশন সিকিউরিটি টিপস',
    seoKeywords: ['Facebook Account Security', '2FA Setup Bangla', 'Prevent FB Hack'],
    targetAudience: 'সকল ইন্টারনেট ও সোশ্যাল মিডিয়া ব্যবহারকারী',
    description: 'হ্যাকারদের হাত থেকে সোশ্যাল মিডিয়া সুরক্ষিত রাখার বাস্তব গাইড।',
  },
  {
    id: 'idea-10',
    category: 'ডিজিটাল বাংলাদেশ',
    title: 'অনলাইনে ড্রাইভিং লাইসেন্স আবেদন (BRTA BSP Portal) ও মেডিকেল সার্টিফিকেট নিয়মাবলী',
    seoKeywords: ['BRTA Driving License Online', 'BSP Portal BD Guide'],
    targetAudience: 'বাইকার ও গাড়ি চালক',
    description: 'স্মার্ট ড্রাইভিং কার্ড দ্রুত পাওয়ার সরাসরি সরকারি প্রসিডিউর।',
  },
];

export const FACEBOOK_PAGE_TEMPLATES = [
  {
    name: 'বাংলা এক্সপ্রেস - ডিজিটাল আপডেট',
    category: 'News & Media Website',
    bio: '📰 প্রযুক্তি, কৃষি, স্বাস্থ্য ও ডিজিটাল বাংলাদেশ সেবার দ্রুত ও নির্ভরযোগ্য আপডেট। প্রতিদিনের নতুন খবর জানতে যুক্ত থাকুন!',
    hashtags: '#BanglaNews #TechNewsBD #DigitalBangladesh #KrishiBD #HealthTips',
  },
  {
    name: 'ডিজিটাল সেবা ও টেক বাংলা',
    category: 'Information Technology Company',
    bio: '💻 অনলাইন সেবা, পাসপোর্ট, জন্ম নিবন্ধন, এনআইডি এবং ফ্রিল্যান্সিং টিপসের পূর্ণাঙ্গ সমাধান বাংলা ভাষায়।',
    hashtags: '#DigitalBD #PassportBD #NIDServices #OnlineIncome #TechBangla',
  },
  {
    name: 'কৃষি বিপ্লব ও খামার বাংলা',
    category: 'Agriculture & Farm',
    bio: '🌾 আধুনিক কৃষি প্রযুক্তি, ছাদ বাগান, মাছ ও পশু পালন সংক্রান্ত লাভজনক উদ্যোগের পরামর্শদাতা।',
    hashtags: '#KrishiKhamar #AgricultureBD #ShobjiChash #FishFarming',
  },
];

export const BLOGGER_XML_TEMPLATE_SAMPLE = `<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html>
<html b:css='false' b:responsive='true' b:version='2' class='v2' expr:dir='data:blog.languageDirection' xmlns='http://www.w3.org/1999/xhtml' xmlns:b='http://www.google.com/2005/gml/b' xmlns:data='http://www.google.com/2005/gml/data' xmlns:expr='http://www.google.com/2005/gml/expr'>
<head>
  <meta charset='utf-8'/>
  <meta content='width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1' name='viewport'/>
  <title><data:blog.pageTitle/></title>
  <b:include data='blog' name='all-head-content'/>
  <link href='https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&amp;display=swap' rel='stylesheet'/>
  
  <!-- Responsive Blogger CSS Styles -->
  <style>
    /*<![CDATA[*/
    :root {
      --primary: #e11d48;
      --primary-dark: #be123c;
      --bg: #f8fafc;
      --text: #0f172a;
    }
    body {
      margin: 0;
      font-family: 'Hind Siliguri', sans-serif;
      background: var(--bg);
      color: var(--text);
    }
    .header-wrapper {
      background: #ffffff;
      border-bottom: 2px solid var(--primary);
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    }
    .main-nav {
      background: var(--primary);
      color: #fff;
    }
    .main-nav ul {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      flex-wrap: wrap;
    }
    .main-nav li a {
      color: #fff;
      padding: 12px 18px;
      display: block;
      text-decoration: none;
      font-weight: 600;
    }
    .breaking-ticker {
      background: #be123c;
      color: #fff;
      padding: 8px 16px;
      font-size: 14px;
    }
    .container {
      max-width: 1240px;
      margin: 20px auto;
      padding: 0 16px;
    }
    .content-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 24px;
    }
    @media(max-width: 768px) {
      .content-grid { grid-template-columns: 1fr; }
    }
    /*]]>*/
  </style>
</head>
<body>
  <!-- Header Section -->
  <div class='header-wrapper'>
    <div class='container' style='display:flex; justify-content:space-between; align-items:center; padding: 15px;'>
      <div>
        <h1 style='margin:0; color:var(--primary); font-size: 28px;'><data:blog.title/></h1>
        <p style='margin:4px 0 0 0; font-size:13px; color:#64748b;'>প্রযুক্তি, কৃষি, স্বাস্থ্য ও ডিজিটাল তথ্যের নির্ভরযোগ্য বাংলা প্ল্যাটফর্ম</p>
      </div>
      <div class='header-ads'>
        <!-- Leaderboard Ad 728x90 -->
        <div style='background:#f1f5f9; border:1px dashed #cbd5e1; padding:15px; border-radius:6px; font-size:12px; color:#64748b;'>বিজ্ঞাপন স্পেস (৭২৮ x ৯০)</div>
      </div>
    </div>
    
    <!-- Main Menu -->
    <nav class='main-nav'>
      <div class='container' style='margin:0 auto;'>
        <ul>
          <li><a href='/'>হোম</a></li>
          <li><a href='/search/label/জাতীয় সংবাদ'>জাতীয় সংবাদ</a></li>
          <li><a href='/search/label/টেক নিউজ'>টেক নিউজ</a></li>
          <li><a href='/search/label/কৃষি ও খামার'>কৃষি ও খামার</a></li>
          <li><a href='/search/label/স্বাস্থ্য সংবাদ'>স্বাস্থ্য সংবাদ</a></li>
          <li><a href='/search/label/ডিজিটাল বাংলাদেশ'>ডিজিটাল বাংলাদেশ</a></li>
          <li><a href='/search/label/শিক্ষা ও চাকরি'>শিক্ষা ও চাকরি</a></li>
          <li><a href='/search/label/অনলাইন ইনকাম'>অনলাইন ইনকাম</a></li>
          <li><a href='/search/label/ইসলামিক কর্নার'>ইসলামিক কর্নার</a></li>
        </ul>
      </div>
    </nav>
  </div>

  <!-- Breaking News Bar -->
  <div class='breaking-ticker'>
    <div class='container' style='margin:0 auto;'>
      <strong>🚨 ব্রেকিং আপডেট:</strong> কৃত্রিম বুদ্ধিমত্তা ও ডিজিটাল সেবায় নতুন দিগন্ত...
    </div>
  </div>

  <!-- Main Body Section -->
  <div class='container'>
    <div class='content-grid'>
      <!-- Blog Posts Area -->
      <main>
        <b:section id='main-content' showaddelement='yes'>
          <b:widget id='Blog1' locked='true' title='Blog Posts' type='Blog'>
            <b:includable id='main'>
              <b:loop values='data:posts' var='post'>
                <article style='background:#fff; border-radius:8px; padding:20px; margin-bottom:20px; box-shadow:0 1px 3px rgba(0,0,0,0.1);'>
                  <h2><a expr:href='data:post.url'><data:post.title/></a></h2>
                  <div style='font-size:13px; color:#64748b; margin-bottom:12px;'><data:post.dateHeader/> | <data:post.author/></div>
                  <p><data:post.snippet/></p>
                </article>
              </b:loop>
            </b:includable>
          </b:widget>
        </b:section>
      </main>

      <!-- Sidebar Area -->
      <aside>
        <b:section id='sidebar' showaddelement='yes'>
          <b:widget id='PopularPosts1' locked='false' title='জনপ্রিয় পোস্ট' type='PopularPosts'/>
          <b:widget id='Label1' locked='false' title='ক্যাটাগরি সমূহ' type='Label'/>
        </b:section>
      </aside>
    </div>
  </div>

  <!-- Footer Section -->
  <footer style='background:#0f172a; color:#cbd5e1; padding:40px 0; margin-top:40px;'>
    <div class='container' style='text-align:center;'>
      <p>© ২০২৬ বাংলা এক্সপ্রেস | প্রযুক্তি, কৃষি, স্বাস্থ্য ও ডিজিটাল তথ্যের নির্ভরযোগ্য বাংলা প্ল্যাটফর্ম</p>
    </div>
  </footer>
</body>
</html>`;
