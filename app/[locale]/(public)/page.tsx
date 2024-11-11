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
  return (
    <div className="bg-black pt-5 pb-5 ">
      <IframeSection />
      <SectionWrapper>
        <Features />
        <FAQs locale={locale} />
        <RelatedVideo />
        <Comments />
        <Recommendation locale={locale} />
      </SectionWrapper>
      <DownloadGame />
    </div>
  );
}
