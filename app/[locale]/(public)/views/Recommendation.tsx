import { siteConfig } from '@/lib/config/site';
import { PropsWithLocale, RecommendationItem } from '@/lib/types';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
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
    // 过滤掉不可见和以及右边位置的游戏
    games = games.filter(game => {
      return game?.visible !== false && game?.position !== 'right';
    });
    if(games.length === 0) {
      return <></>;
    }
    return (
      <div className="container mx-auto py-8 px-4 md:px-8">
       <h2 className="text-3xl font-bold mb-8 text-white text-center">{t('title')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
          {games.map((game, index) => (
            <Link 
            href={game.url} 
            key={index} 
            target={game.url.startsWith('http') ? "_blank" : "_self"}
            rel={game.url.startsWith('http') ? "noopener noreferrer" : undefined}
            className="group block overflow-hidden rounded-lg bg-gray-900/40
            hover:ring-2 hover:ring-primary hover:bg-gray-900/60 
            transition-all duration-300 hover:shadow-lg" 
          >
            <div className="aspect-[4/3] md:aspect-[16/9] relative">
              <Image
                src={game.cover}
                alt={game.title}
                loading="lazy"
                decoding="async"
                width={100}
                height={100}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                <div className="px-3 py-2 md:px-4 md:py-3">
                  <h4 className="text-sm md:text-base font-semibold text-white group-hover:text-primary transition-colors line-clamp-1">
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
