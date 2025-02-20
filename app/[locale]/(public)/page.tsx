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
import {siteConfig} from '@/lib/config/site';
import { SiteConfig} from '@/lib/types';
import GameRecommendationCard from '@/app/[locale]/(public)/views/GameRecommendationCard';
import CustomizeFeatures from './views/CustomizeFeatures';
import { AppLayout } from '@/lib/components/layout/AppLayout';
import { getHomeSettings } from '@/lib/utils/game-box-settings';
import { getFeaturedContent } from '@/lib/utils/blogs';
import path from 'path';
import { fileURLToPath } from 'url';
export const dynamic = 'force-static'
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
    title: `${t('title')}`,
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
  const siteConfig2 = siteConfig as unknown as SiteConfig
  const pageName = null;
  let features2ContentResult = null;
  if(siteConfig2.customizeFeatures){
    const currentDir = path.dirname(fileURLToPath(import.meta.url));
    const { content } = getFeaturedContent(currentDir, locale);
    features2ContentResult = content;
  }

  const PageContent = () => (
    <div className="bg-background pt-5 pb-5">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row">
          {/* 左侧主要内容区域 */}
          <div className="flex-1 min-w-0">
            <IframeSection pageName={pageName} />
           
            <div className="px-4">
              <SectionWrapper className="max-full">
                {siteConfig2.customizeFeatures && features2ContentResult? <CustomizeFeatures content={features2ContentResult} /> : <Features pageName={pageName} />}
                <FAQs locale={locale} pageName={pageName} />
                <RelatedVideo pageName={pageName} siteConfig={siteConfig2} />
                <Comments pageName={pageName} siteConfig={siteConfig2} />
              </SectionWrapper>
            </div>
            <Recommendation locale={locale} />
            <DownloadGame pageName={pageName} siteConfig={siteConfig2} />
          </div>
          
          {/* 右侧推荐卡片 - 移动端隐藏 */}
          <GameRecommendationCard locale={locale} />
        </div>
      </div>
    </div>
  );

  if (siteConfig.templateType === 'game-box') {
    const settings = await getHomeSettings(locale);
    return (
      <AppLayout categories={settings.categories}>
        <PageContent />
      </AppLayout>
    );
  }

  return <PageContent />;
}
