import MdxArticle from '@/lib/components/mdx-article';
import { siteConfig } from '@/lib/config/site';
import { alternatesLanguage, locales,host } from '@/lib/i18n/locales';
import matter from 'gray-matter';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
const components: any = {
  img: ({src, alt}: { src: string, alt: string }) => {
      return <img src={src} alt={alt} className="object-cover"/>
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
      Content = (await import(`!!raw-loader!./en.mdx`)).default;
    }
    const {content } = matter(Content);
    
    return <>
        <article
          className="prose prose-sm md:prose-base lg:prose-lg  rounded-2xl max-w-3xl mx-auto py-10 px-4">
          <MdxArticle components={components} source={content} className="max-w-full"/>
        </article>
    </>
  } catch (error) {
    notFound();
  }
}