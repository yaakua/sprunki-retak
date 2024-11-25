import MdxArticle from '@/lib/components/mdx-article';
import { siteConfig } from '@/lib/config/site';
import { alternatesLanguage, locales } from '@/lib/i18n/locales';
import matter from 'gray-matter';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
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
    try {
      Content = (await import(`!!raw-loader!./${locale}.mdx`)).default;
    } catch (error) {
      Content = (await import(`!!raw-loader!./en.mdx`)).default;
    }
    const { content, data: frontMatter } = matter(Content);
    // 获取当前文件所在的父级目录名称
    const pathSegments = import.meta.url.split('/');
    const parentDirName = pathSegments[pathSegments.length - 2];
  return {
    title: `${frontMatter.title} | ${siteConfig.name}`,
    description: frontMatter.description,
    alternates: {
      languages: alternatesLanguage(frontMatter.slug??parentDirName),
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