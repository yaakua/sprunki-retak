import { Link } from '@/lib/i18n/navigation';
import { RecommendationItem } from '@/lib/types';

type GroupedGames = {
  [key: string]: RecommendationItem[];
};

export default async function GameRecommendationCard({ locale }: { locale: string }) {
  let games: RecommendationItem[] = [];
  try {
    try {
      games = (await import(`@/resources/recommendation/${locale}.json`)).default;
    } catch {
      games = (await import(`@/resources/recommendation/en.json`)).default;
    }
  } catch {
    console.error('Failed to load recommendation games');
  }
  
  // 过滤掉不可见和底部位置的游戏
  games = games.filter(game => {
    return game?.visible !== false && game?.position !== 'bottom';
  });
  
  let groupedGames: GroupedGames = {};
  // 按分类对游戏进行分组
  groupedGames = games.reduce((acc: GroupedGames, game) => {
    if (!acc[game.category]) {
      acc[game.category] = [];
    }
    acc[game.category].push(game);
    return acc;
  }, {});

  if(Object.keys(groupedGames).length === 0) {
    return null;
  }
  
  return (
    <div className="lg:w-1/6">
      <div className="bg-gray-900 rounded-lg p-2">
        <div className="space-y-4">
          {Object.entries(groupedGames).map(([category, categoryGames]) => (
            <div key={category} className="space-y-3">
              <h3 className="text-lg font-bold text-white">{category}</h3>
              <div className="space-y-5">
                {categoryGames.map((game, index) => (
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
                      <div className="flex-shrink-0 w-fulloverflow-hidden" style={{ maxHeight: '150px' }}>
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
          ))}
        </div>
      </div>
    </div>
  );
}
