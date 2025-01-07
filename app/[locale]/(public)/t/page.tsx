import { alternatesLanguage, defaultLocale, locales } from '@/lib/i18n/locales';
import { Link } from '@/lib/i18n/navigation';
import { ArticleMetadata, getArticlesData } from '@/lib/utils/blogs';
import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import {siteConfig} from '@/lib/config/site';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export const dynamic = 'force-static'
type Props = {
  params: Promise<{ locale: string}>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale = defaultLocale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  return {
    title: `${t('Common.articleList')} | ${siteConfig.name}`,
    description: t('description'),
    alternates: {
      languages: alternatesLanguage('/t'),
    },
    icons: {
      icon: siteConfig.icon,
      apple: siteConfig.appleIcon,
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}


type PageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  try {
    const { locale,slug } = await params;
    setRequestLocale(locale);
    const articles = getArticlesData()[locale] || [];
    const t = await getTranslations({ locale });
    redirect(`/${locale}/blogs/1`);
    return (
      <>
      </> 
    )
  } catch (error) {
    console.log(`article list page render error`, error);
    notFound();
  }
}