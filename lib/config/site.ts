import { SiteConfig } from '../types';

export const siteConfig: SiteConfig = {
  name: '',
  slogan: 'slogan',
  domain: '',
  icon: '/favicon.ico',
  appleIcon: '/apple-touch-icon.png',
  theme: {
    headFont: 'Arial, sans-serif',
    primaryColor: '#007bff',
    fontColor: '#333333',
    backgroundColor: '#ffffff',
  },
  gaId: 'G-XXXXXXXXXX',
  plausible: '',
  navbarItems: [
    {
      title: 'home',
      href: '/',
    },
    {
      title: 'guide',
      href: '/guide',
    },
    {
      title: 'information',
      href: '/t',
    },
  ],
  gameType: 'iframe',
  gameIframeUrl: '',
  gameDownloadBg: '',
  gameDownloadUrl: '',
  isShowFAQs: true,
  isShowVideo: true,
  isShowGuide: true,
  videos: [
    {
      title: '',
      url: '',
    },
  ],
  isShowComments: true,
  isShowTweets: false,
  useRealTweets: true,
  tweets: [''],
  comments: [
    {
      author: '',
      role: '',
      content: '',
      avatar: '',
    },
    
  ],
  isShowRecommendation: true,
  friendLinks: [
    {
      title: '',
      url: '',
    }
  ],
};
