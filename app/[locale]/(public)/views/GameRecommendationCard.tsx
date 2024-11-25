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
    <div className="space-y-6">
      {Object.entries(groupedGames).map(([category, categoryGames]) => (
        <div key={category} className="space-y-3">
          <h3 className="text-xl font-bold text-white">{category}</h3>
          <div className="space-y-3">
            {categoryGames.map((game, index) => (
                <Link 
               href={game.url} 
               key={index} 
               target={game.url.startsWith('http') ? "_blank" : "_self"}
                rel={game.url.startsWith('http') ? "noopener noreferrer" : undefined}
              >
                <h4 className="text-white text-sm mb-1">{game.title}</h4>
                <div className="w-full max-w-2xl h-32 relative rounded-lg overflow-hidden">
                  <img 
                    src={game.cover} 
                    alt={game.title} 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
