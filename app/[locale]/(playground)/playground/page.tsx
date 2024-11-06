import { siteConfig } from '@/lib/config/site';
import { alternatesLanguage, defaultLocale } from '@/lib/i18n/locales';
import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import IframeView from './iframe_view';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale = defaultLocale } = await params;
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
    // 禁止搜索引擎索引
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale = defaultLocale } = await params;
  setRequestLocale(locale);
  return <IframeView params={{ locale }} />;
}
