import { alternatesLanguage, defaultLocale, locales } from '@/lib/i18n/locales';
import { Link } from '@/lib/i18n/navigation';
import { ArticleMetadata, getArticlesData } from '@/lib/utils/blogs';
import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import {siteConfig} from '@/lib/config/site';
import Image from 'next/image';

export const dynamic = 'force-static'

type Props = {
  params: Promise<{ locale: string; page: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale = defaultLocale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  return {
    title: `${t('Common.articleList')} | ${siteConfig.name}`,
    description: t('description'),
    alternates: {
      languages: alternatesLanguage('/blogs'),
    },
    icons: {
      icon: siteConfig.icon,
      apple: siteConfig.appleIcon,
    },
  };
}

export async function generateStaticParams() {
  const allParams = [];
  for (const locale of locales) {
    const articles = getArticlesData()[locale] || [];
    const totalPages = Math.ceil(articles.length / 20);
    
    for (let page = 1; page <= totalPages; page++) {
      allParams.push({ locale, page: page.toString() });
    }
  }
  return allParams;
}

type PageProps = {
  params: Promise<{
    locale: string;
    page: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  try {
    const { locale, page } = await params;
    setRequestLocale(locale);
    const articles = getArticlesData()[locale] || [];
    const t = await getTranslations({ locale });

    const currentPage = Number(page) || 1;
    const pageSize = 20;
    const totalPages = Math.ceil(articles.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentArticles = articles.slice(startIndex, endIndex);

    if (currentPage > totalPages) {
      notFound();
    }

    // 生成分页链接
    const paginationLinks = [];
    for (let i = 1; i <= totalPages; i++) {
      paginationLinks.push({
        page: i,
        href: `/blogs/${i}`,
        isCurrent: i === currentPage
      });
    }

    return (
      <div className="max-w-6xl mx-auto py-10 px-4 min-h-[65vh]">
        <h1 className="text-2xl font-bold mb-6">{t('Common.articleList')}</h1>
        <div className="grid gap-6 mb-6">
          {currentArticles.map((article) => (
            <Link 
              href={`/blogs/${article.slug}`} 
              key={article.slug}
              className="block p-4 border rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center gap-4">
                {article.image && (
                  <Image 
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
        {totalPages > 1 && (
          <nav className="flex justify-center gap-2 py-4" aria-label="Pagination">
            {currentPage > 1 && (
              <Link
                href={`/blogs/${currentPage - 1}`}
                className="px-4 py-2 border rounded hover:bg-gray-50"
                aria-label="Previous page"
              >
                {t('Common.previous')}
              </Link>
            )}
            {paginationLinks.map(({ page, href, isCurrent }) => (
              <Link
                key={page}
                href={href}
                className={`px-4 py-2 border rounded ${
                  isCurrent
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-50'
                }`}
                aria-current={isCurrent ? 'page' : undefined}
              >
                {page}
              </Link>
            ))}
            {currentPage < totalPages && (
              <Link
                href={`/blogs/${currentPage + 1}`}
                className="px-4 py-2 border rounded hover:bg-gray-50"
                aria-label="Next page"
              >
                {t('Common.next')}
              </Link>
            )}
          </nav>
        )}
      </div>
    );
  } catch (error) {
    console.log(`article list page render error`, error);
    notFound();
  }
}
