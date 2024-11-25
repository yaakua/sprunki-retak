import { alternatesLanguage, defaultLocale, locales } from '@/lib/i18n/locales';
import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Comments from '@/app/[locale]/(public)/views/Comments';
import FAQs from '@/app/[locale]/(public)/views/FAQs';
import Features from '@/app/[locale]/(public)/views/Features';
import IframeSection from '@/app/[locale]/(public)/views/IframeSection';
import Recommendation from '@/app/[locale]/(public)/views/Recommendation';
import RelatedVideo from '@/app/[locale]/(public)/views/RelatedVideo';
import SectionWrapper from '@/app/[locale]/(public)/views/SectionWrapper';
import DownloadGame from '@/app/[locale]/(public)/views/DownloadGame';
import siteConfig from './config/config.json';
import { SiteConfig} from '@/lib/types';
import GameRecommendationCard from '@/app/[locale]/(public)/views/GameRecommendationCard';
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
  const pageName = siteConfig.pageName;
  const pagePath = siteConfig.pagePath;
  return {
    title: `${t(`${pageName}.title`)} | ${t(`${pageName}.slogan`)}`,
    description: t(`${pageName}.description`), 
    alternates: {
      languages: alternatesLanguage(pagePath),
    }
  };
}

export default async function Page({ params }: Props) {
  const { locale = defaultLocale } = await params;
  setRequestLocale(locale);
  const siteConfig2 = siteConfig as unknown as SiteConfig
  const pageName = siteConfig.pageName;
  console.log("###siteConfig2",siteConfig2);
  return (
    <div className="bg-black pt-5 pb-5">
      <IframeSection pageName={pageName} />
      
      {siteConfig2.isShowRightGames ? (
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-2">
            {/* 左侧内容 */}
            <div className="lg:w-5/6">
              <SectionWrapper className="max-full">
                <Features pageName={pageName} />
                <FAQs locale={locale} pageName={pageName} />
                <RelatedVideo pageName={pageName} siteConfig={siteConfig2} />
                <Comments pageName={pageName} siteConfig={siteConfig2} />
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
          <RelatedVideo pageName={pageName} siteConfig={siteConfig2} />
          <Comments pageName={pageName} siteConfig={siteConfig2} />
          <Recommendation locale={locale} />
        </SectionWrapper>
      )}
      
      <DownloadGame pageName={pageName} />
    </div>
  );
}
import { alternatesLanguage, defaultLocale, locales } from '@/lib/i18n/locales';
import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Comments from '@/app/[locale]/(public)/views/Comments';
import FAQs from '@/app/[locale]/(public)/views/FAQs';
import Features from '@/app/[locale]/(public)/views/Features';
import IframeSection from '@/app/[locale]/(public)/views/IframeSection';
import Recommendation from '@/app/[locale]/(public)/views/Recommendation';
import RelatedVideo from '@/app/[locale]/(public)/views/RelatedVideo';
import SectionWrapper from '@/app/[locale]/(public)/views/SectionWrapper';
import DownloadGame from '@/app/[locale]/(public)/views/DownloadGame';
import siteConfig from './config/config.json';
import { SiteConfig} from '@/lib/types';
import GameRecommendationCard from '@/app/[locale]/(public)/views/GameRecommendationCard';
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
  const pageName = siteConfig.pageName;
  const pagePath = siteConfig.pagePath;
  return {
    title: `${t(`${pageName}.title`)} | ${t(`${pageName}.slogan`)}`,
<<<<<<< HEAD
    description: t(`${pageName}.description`),
=======
    description: t(`${pageName}.description`), 
>>>>>>> 64154bd8332dfec9371019d58869721702292fba
    alternates: {
      languages: alternatesLanguage(pagePath),
    }
  };
}

export default async function Page({ params }: Props) {
  const { locale = defaultLocale } = await params;
  setRequestLocale(locale);
  const siteConfig2 = siteConfig as unknown as SiteConfig
  const pageName = siteConfig.pageName;
<<<<<<< HEAD
  
=======
  console.log("###siteConfig2",siteConfig2);
>>>>>>> 64154bd8332dfec9371019d58869721702292fba
  return (
    <div className="bg-black pt-5 pb-5">
      <IframeSection pageName={pageName} />
      
      {siteConfig2.isShowRightGames ? (
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-2">
            {/* 左侧内容 */}
            <div className="lg:w-5/6">
              <SectionWrapper className="max-full">
                <Features pageName={pageName} />
                <FAQs locale={locale} pageName={pageName} />
                <RelatedVideo pageName={pageName} siteConfig={siteConfig2} />
                <Comments pageName={pageName} siteConfig={siteConfig2} />
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
          <RelatedVideo pageName={pageName} siteConfig={siteConfig2} />
          <Comments pageName={pageName} siteConfig={siteConfig2} />
          <Recommendation locale={locale} />
        </SectionWrapper>
      )}
      
<<<<<<< HEAD
      <DownloadGame pageName={pageName} siteConfig={siteConfig2} />
=======
      <DownloadGame pageName={pageName} />
>>>>>>> 64154bd8332dfec9371019d58869721702292fba
    </div>
  );
}
