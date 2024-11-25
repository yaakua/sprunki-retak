import { siteConfig } from '@/lib/config/site';
import { alternatesLanguage, defaultLocale, locales } from '@/lib/i18n/locales';
import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Comments from './views/Comments';
import FAQs from './views/FAQs';
import Features from './views/Features';
import IframeSection from './views/IframeSection';
import Recommendation from './views/Recommendation';
import RelatedVideo from './views/RelatedVideo';
import SectionWrapper from './views/SectionWrapper';
import DownloadGame from './views/DownloadGame';
import GameRecommendationCard from './views/GameRecommendationCard';
import { SiteConfig } from '@/lib/types';

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale = defaultLocale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  return {
    title: `${t('title')} | ${t('slogan')}`,
    description: t('description'),
    alternates: {
      languages: alternatesLanguage(''),
    },
    icons: {
      icon: siteConfig.icon,
      apple: siteConfig.appleIcon,
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale = defaultLocale } = await params;
  setRequestLocale(locale);
  // 默认页面名称为空
  const pageName = "";
  return (
    <div className="bg-black pt-5 pb-5 ">
      <IframeSection pageName={pageName} />
      {siteConfig.isShowRightGames ? (
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-2">
            {/* 左侧内容 */}
            <div className="lg:w-5/6">
              <SectionWrapper className="max-full">
                <Features pageName={pageName} />
                <FAQs locale={locale} pageName={pageName} />
                <RelatedVideo pageName={pageName} siteConfig={siteConfig as unknown as SiteConfig} />
                <Comments pageName={pageName} siteConfig={siteConfig as unknown as SiteConfig} />
                <Recommendation locale={locale} />
              </SectionWrapper>
            </div>
            
            {/* 右侧推荐列表 */}
            <div className="lg:w-1/6">
              <div className="bg-gray-900 rounded-lg p-2">
                <div className="space-y-4">
                  {/* 这里需要循环渲染推荐游戏列表 */}
                  <GameRecommendationCard locale={locale} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <SectionWrapper>
          <Features pageName={pageName} />
          <FAQs locale={locale} pageName={pageName} />
          <RelatedVideo pageName={pageName} siteConfig={siteConfig as unknown as SiteConfig} />
          <Comments pageName={pageName} siteConfig={siteConfig as unknown as SiteConfig} />
          <Recommendation locale={locale} />
        </SectionWrapper>
      )}
<<<<<<< HEAD
      <DownloadGame pageName={pageName} siteConfig={siteConfig as unknown as SiteConfig} />
=======
      <DownloadGame pageName={pageName} />
>>>>>>> 64154bd8332dfec9371019d58869721702292fba
    </div>
  );
}
import { siteConfig } from '@/lib/config/site';
import { alternatesLanguage, defaultLocale, locales } from '@/lib/i18n/locales';
import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Comments from './views/Comments';
import FAQs from './views/FAQs';
import Features from './views/Features';
import IframeSection from './views/IframeSection';
import Recommendation from './views/Recommendation';
import RelatedVideo from './views/RelatedVideo';
import SectionWrapper from './views/SectionWrapper';
import DownloadGame from './views/DownloadGame';
import GameRecommendationCard from './views/GameRecommendationCard';
import { SiteConfig } from '@/lib/types';

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale = defaultLocale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  return {
    title: `${t('title')} | ${t('slogan')}`,
    description: t('description'),
    alternates: {
      languages: alternatesLanguage(''),
    },
    icons: {
      icon: siteConfig.icon,
      apple: siteConfig.appleIcon,
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale = defaultLocale } = await params;
  setRequestLocale(locale);
  // 默认页面名称为空
  const pageName = "";
  return (
    <div className="bg-black pt-5 pb-5 ">
      <IframeSection pageName={pageName} />
      {siteConfig.isShowRightGames ? (
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-2">
            {/* 左侧内容 */}
            <div className="lg:w-5/6">
              <SectionWrapper className="max-full">
                <Features pageName={pageName} />
                <FAQs locale={locale} pageName={pageName} />
                <RelatedVideo pageName={pageName} siteConfig={siteConfig as unknown as SiteConfig} />
                <Comments pageName={pageName} siteConfig={siteConfig as unknown as SiteConfig} />
                <Recommendation locale={locale} />
              </SectionWrapper>
            </div>
            
            {/* 右侧推荐列表 */}
            <div className="lg:w-1/6">
              <div className="bg-gray-900 rounded-lg p-2">
                <div className="space-y-4">
                  {/* 这里需要循环渲染推荐游戏列表 */}
                  <GameRecommendationCard locale={locale} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <SectionWrapper>
          <Features pageName={pageName} />
          <FAQs locale={locale} pageName={pageName} />
          <RelatedVideo pageName={pageName} siteConfig={siteConfig as unknown as SiteConfig} />
          <Comments pageName={pageName} siteConfig={siteConfig as unknown as SiteConfig} />
          <Recommendation locale={locale} />
        </SectionWrapper>
      )}
      <DownloadGame pageName={pageName} />
    </div>
  );
}
