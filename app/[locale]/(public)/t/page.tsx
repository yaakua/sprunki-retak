import { locales } from '@/lib/i18n/locales';
import { Link } from '@/lib/i18n/navigation';
import fs from 'fs';
import matter from 'gray-matter';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import path from 'path';

// 定义文章元数据接口
interface ArticleMetadata {
  title: string;
  image?: string;
  createdAt?: string;
  slug: string;
}

// 获取所有子目录的文章数据
async function getArticlesData(locale: string): Promise<ArticleMetadata[]> {
  const currentDir = path.join(process.cwd(), 'app', '[locale]', '(public)', 't');
  const directories = fs.readdirSync(currentDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const articles: ArticleMetadata[] = [];

  for (const dir of directories) {
    try {
      const filePath = path.join(currentDir, dir, `${locale}.mdx`);
      // 如果当前语言的文件不存在，尝试读取英文版
      const fallbackPath = path.join(currentDir, dir, 'en.mdx');
      
      let content;
      if (fs.existsSync(filePath)) {
        content = fs.readFileSync(filePath, 'utf-8');
      } else if (fs.existsSync(fallbackPath)) {
        content = fs.readFileSync(fallbackPath, 'utf-8');
      } else {
        continue;
      }

      const { data: frontMatter } = matter(content);
      articles.push({
        title: frontMatter.title,
        image: frontMatter.image,
        createdAt: frontMatter.createdAt,
        slug: dir
      });
    } catch (error) {
      console.error(`Error reading directory ${dir}:`, error);
    }
  }

  return articles;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Page({params}: {params: Promise<{locale: string}>}) {
  try {
    const {locale} = await params;
    const articles = await getArticlesData(locale);
    const t = await getTranslations({ locale });
    return (
      <div className="max-w-6xl mx-auto py-10 px-4 min-h-[65vh]">
        <h1 className="text-2xl font-bold mb-6">文章列表</h1>
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
                  {article.createdAt && (
                    <p className="text-gray-500 text-sm">
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
    notFound();
  }
}