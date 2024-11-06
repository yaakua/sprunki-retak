export interface NavbarItem {
  title: string;
  href: string;
  children?: NavbarItem[];
}

export interface VideoItem {
  title: string;
  url: string;
}

// 评论
export interface CommentItem {
  author: string;
  role: string;
  avatar: string;
  content: string;
}

export interface FAQsItem {
  question: string;
  answer: string;
}

// 推荐游戏
export interface RecommendationItem {
  title: string;
  cover: string;
  url: string;
}

export interface FriendLinkItem {
  title: string;
  url: string;
}

export interface Theme {
  headFont: string;
  primaryColor: string;
  fontColor: string;
  backgroundColor: string;
}

export interface SiteConfig {
  // 网站名称
  name: string;
  // 网站标语
  slogan: string;
  domain: string
  // 网站图标
  icon: string;
  gameType: string;
  // 苹果图标
  appleIcon: string;
  // 主题
  theme: Theme;
  // 网站域名
  gaId: string;
  // 网站分析
  plausible: string;
  // 导航栏
  navbarItems: NavbarItem[];
  // 游戏 iframe url
  gameIframeUrl: string;
  // 游戏下载背景图片
  gameDownloadBg?: string;
  // 游戏下载地址
  gameDownloadUrl?: string;
  // 指南
  isShowGuide: boolean;
  // 常见问题
  isShowFAQs: boolean;
  //
  isShowVideo: boolean;
  videos: VideoItem[];
  isShowComments: boolean;
  isShowTweets: boolean;
  // id
  tweets: string[];
  // 使用真实推特
  useRealTweets: boolean;
  comments: CommentItem[];
  isShowRecommendation: boolean;
  friendLinks: FriendLinkItem[];
}
