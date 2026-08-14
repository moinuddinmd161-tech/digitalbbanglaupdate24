export interface SubCategory {
  id: string;
  name: string;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  color: string;
  subCategories: SubCategory[];
}

export interface Comment {
  id: string;
  author: string;
  avatar?: string;
  date: string;
  content: string;
  likes: number;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  categoryId: string;
  subCategoryId?: string;
  tags: string[];
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  views: number;
  readTimeMinutes: number;
  isBreaking?: boolean;
  isTrending?: boolean;
  isFeatured?: boolean;
  videoUrl?: string;
  comments: Comment[];
  reactions?: {
    like: number;
    love: number;
    wow: number;
    insightful: number;
  };
}

export type ThemeStyle = 'red-news' | 'blue-digital' | 'green-krishi' | 'blogger-classic' | 'purple-tech';

export interface WidgetConfig {
  id: string;
  name: string;
  enabled: boolean;
  title?: string;
}

export interface LayoutConfig {
  siteName: string;
  siteTagline: string;
  themeStyle: ThemeStyle;
  sidebarPosition: 'right' | 'left' | 'none';
  showBreakingTicker: boolean;
  showTrendingHero: boolean;
  showCategoryBlocks: boolean;
  showVideoGallery: boolean;
  showPopularTags: boolean;
  showLeaderboardAd: boolean;
  showSidebarAd: boolean;
  primaryColor: string;
  enabledCategories: string[];
  sidebarWidgets: {
    trendingPosts: boolean;
    prayerTimes: boolean;
    categoriesList: boolean;
    socialCounters: boolean;
    newsletter: boolean;
    adBanner: boolean;
    popularTags: boolean;
  };
}

export interface PostIdea {
  id: string;
  category: string;
  title: string;
  seoKeywords: string[];
  targetAudience: string;
  description: string;
}

export interface SocialLink {
  platform: 'facebook' | 'youtube' | 'telegram' | 'twitter' | 'whatsapp';
  name: string;
  url: string;
  followers?: string;
}
