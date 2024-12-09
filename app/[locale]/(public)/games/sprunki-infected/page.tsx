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
  
  return (
    <div className="bg-black pt-5 pb-5">
      <IframeSection pageName={pageName} />
      
      <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* 左侧内容 */}
            <div className="lg:flex-1">
              <SectionWrapper className="max-full">
                <Features pageName={pageName} />
                <FAQs locale={locale} pageName={pageName} />
                <RelatedVideo pageName={pageName} siteConfig={siteConfig2} />
                <Comments pageName={pageName} siteConfig={siteConfig2} />
                <Recommendation locale={locale} />
              </SectionWrapper>
            </div>
            
            {/* 右侧推荐列表 */}
            <GameRecommendationCard locale={locale} />
          </div>
        </div>
      
      <DownloadGame pageName={pageName} siteConfig={siteConfig2} />
    </div>
  );
}
