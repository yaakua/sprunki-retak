import MdxArticle from '@/lib/components/mdx-article';
import { siteConfig } from '@/lib/config/site';
import { alternatesLanguage, locales,host } from '@/lib/i18n/locales';
import matter from 'gray-matter';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import { Link } from '@/lib/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
const components: any = {
  img: ({src, alt}: { src: string, alt: string }) => {
      return <Image src={src} alt={alt} className="object-cover"/>
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
    // 直接导入 MDX 文件的原始内容
    let Content;
    let hasOther = false;
    try {
      // Check if other locale files exist
      const currentDir = path.dirname(__filename);
      const mdxFiles = fs.readdirSync(currentDir).filter((file: string) => file.endsWith('.mdx'));
      hasOther = mdxFiles.some((file: string) => file !== 'en.mdx');
      
      Content = (await import(`!!raw-loader!./${locale}.mdx`)).default;
    } catch (error) {
      Content = (await import(`!!raw-loader!./en.mdx`)).default;
    }
    const { content, data: frontMatter } = matter(Content);
    // 获取当前文件所在的父级目录名称
    const pathSegments = __filename.split('/');
    const parentDirName = pathSegments[pathSegments.length - 2];
    let slug = parentDirName
    if(!slug.startsWith('/')){
      slug = `/t/${slug}`
    }
    const alternates = hasOther ? {
      languages: alternatesLanguage(slug),
    } : {
      canonical: `${host}${slug}`,
    }
  return {
    title: `${frontMatter.title} | ${siteConfig.name}`,
    description: frontMatter.description,
    alternates: {
      ...alternates,
    },
  };
}

export default async function Page({params}: {params: Promise<{locale: string}>}) {
  try {
    const {locale} = await params;
    // 直接导入 MDX 文件的原始内容
    let Content;
    try {
     
      Content = (await import(`!!raw-loader!./${locale}.mdx`)).default;
    } catch (error) {
      try{
        Content = (await import(`!!raw-loader!./en.mdx`)).default;
      }catch (error) {
        console.log(error);
      }
    }
    const {content, data: frontMatter } = matter(Content);
    const t = await getTranslations({ locale });
    return <>
      <div className="max-w-3xl mx-auto py-2 px-4">
            {/* 添加面包屑导航 */}
            <nav className="text-sm" aria-label="Breadcrumb">
                <ol className="flex space-x-2">
                  <li>
                    <Link href="/" className="text-gray-500 hover:text-gray-700">
                      {t('Common.home')}
                    </Link>
                  </li>
                  <li>/</li>
                  <li>
                    <Link href="/blogs" className="text-gray-500 hover:text-gray-700">
                      {t('Common.articleList')}
                    </Link>
                  </li>
                  <li>/</li>
                  <li className="text-gray-700" aria-current="page">
                    {frontMatter.title}
                  </li>
                </ol>
              </nav>

      </div>
        <article
          className="prose prose-sm md:prose-base lg:prose-lg  rounded-2xl max-w-3xl mx-auto py-5 px-4">
          
          <MdxArticle components={components} source={content} className="max-w-full"/>
        </article>
    </>
  } catch (error) {
    notFound();
  }
}