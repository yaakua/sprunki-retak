import { alternatesLanguage, defaultLocale, locales } from '@/lib/i18n/locales';
import { Link } from '@/lib/i18n/navigation';
import { getArticlesData } from '@/lib/utils/blogs';
import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import {siteConfig} from '@/lib/config/site';
import { SiteConfig} from '@/lib/types';
type Props = {
  params: Promise<{ locale: string }>;
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

export default async function Page({params}: {params: Promise<{locale: string}>}) {
  try {
    const {locale} = await params;
    const articles = await getArticlesData()[locale] || [];
    const t = await getTranslations({ locale });
    return (
      <div className="max-w-6xl mx-auto py-10 px-4 min-h-[65vh]">
        <h1 className="text-2xl font-bold mb-6">{t('Common.articleList')}</h1>
        <div className="grid gap-6">
          {articles.map((article) => (
            <Link 
              href={`/t/${article.slug}`} 
              key={article.slug}
              className="block p-4 border rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center gap-4">
                {article.image && (
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-24 h-24 object-cover rounded"
                  />
                )}
                <div>
                  <h2 className="text-xl font-semibold">{article.title}</h2>
                  {article.description && (
                    <p className="text-gray-600 mt-2 text-sm line-clamp-2">
                      {article.description}
                    </p>
                  )}
                  {article.createdAt && (
                    <p className="text-gray-500 text-sm mt-1">
                      {t('Common.createAt')}: {new Date(article.createdAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.log(`article list page render error`,error);
    notFound();
  }
}