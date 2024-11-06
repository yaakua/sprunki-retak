import { siteConfig } from '@/lib/config/site';
import { PropsWithLocale, RecommendationItem } from '@/lib/types';
import { Card, CardHeader, CardTitle } from '@/lib/ui/components/card';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

// 游戏推荐组件
export default async function Recommendation({ locale }: PropsWithLocale) {
  if (!siteConfig.isShowRecommendation) {
    return <></>;
  }

  const t = await getTranslations('HomeRecommendation');
  try {
    let games: RecommendationItem[];
    try {
      games = (await import(`@/resources/recommendation/${locale}.json`)).default;
    } catch {
      try {
        games = (await import(`@/resources/recommendation/${locale.toLowerCase}.json`)).default;
      } catch {
        games = (await import('@/resources/recommendation/en.json')).default;
      }
    }
    return (
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-6">{t('title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {games.map((game, index) => (
            <Link href={game.url} key={index} target="_blank" rel="noopener noreferrer">
              <Card className="h-full border-none bg-gray-800 hover:shadow-lg transition hover:scale-105 duration-200">
                <CardHeader>
                  <div className="relative w-full h-48">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={game.cover} alt={game.title} className="object-cover rounded-t-lg" />
                  </div>
                  <CardTitle className="mt-4 hover:text-primary-100">{game.title}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    );
  } catch (e) {}
}
