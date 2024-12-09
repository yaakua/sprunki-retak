import { siteConfig } from '@/lib/config/site';
import { PropsWithLocale, RecommendationItem } from '@/lib/types';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

// 游戏推荐组件(使用全局配置)
export default async function Recommendation({ locale }: PropsWithLocale) {
  const t = await getTranslations('HomeRecommendation');
  try {
    let games: RecommendationItem[];
    try {
      games = (await import(`@/resources/recommendation/${locale}.json`)).default;
    } catch {
      try {
        games = (await import(`@/resources/recommendation/${locale.toLowerCase()}.json`)).default;
      } catch {
        games = (await import('@/resources/recommendation/en.json')).default;
      }
    }
    console.log("games",games);
    // 过滤掉不可见和以及右边位置的游戏
    games = games.filter(game => {
      return game?.visible !== false && game?.position !== 'right';
    });
    if(games.length === 0) {
      return <></>;
    }
    return (
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-8 text-white text-center">{t('title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {games.map((game, index) => (
            <Link 
            href={game.url} 
            key={index} 
            target={game.url.startsWith('http') ? "_blank" : "_self"}
            rel={game.url.startsWith('http') ? "noopener noreferrer" : undefined}
            className="group block overflow-hidden rounded-lg bg-gray-900/40
            hover:ring-2 hover:ring-primary
             hover:bg-gray-900/60 transition-all duration-300 hover:shadow-lg  hover:scale-102 " 
          >
            <div className="aspect-[2/1] relative">
              <div className="flex-shrink-0 w-fulloverflow-hidden" style={{ maxHeight: '200px' }}>
                <img
                  src={game.cover}
                  alt={game.title}
                  className="w-full h-full object-cover"
                />
              </div>
             
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent pb-2">
                <div className="px-3 pt-6">
                  <h4 className="text-sm font-medium text-white group-hover:text-primary transition-colors line-clamp-1">
                    {game.title}
                  </h4>
                </div>
              </div>
            </div>
          </Link>
          ))}
        </div>
      </div>
    );
  } catch (e) {
    console.error('Error in Recommendation component:', e);
    return null;
  }
}
