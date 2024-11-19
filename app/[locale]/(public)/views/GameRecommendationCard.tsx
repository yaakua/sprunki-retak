import { RecommendationItem } from '@/lib/types';

type GroupedGames = {
  [key: string]: RecommendationItem[];
};

export default async function GameRecommendationCard({ locale }: { locale: string }) {
  let games: RecommendationItem[] = [];
  try {
    try {
      games = (await import(`@/resources/right-games/${locale}.json`)).default;
    } catch {
      games = (await import(`@/resources/right-games/en.json`)).default;
    }
  } catch {
    console.error('Failed to load recommendation games');
  }
  let groupedGames: GroupedGames = {};
  // 按分类对游戏进行分组
  groupedGames = games.reduce((acc: GroupedGames, game) => {
    if (!acc[game.category]) {
      acc[game.category] = [];
    }
    acc[game.category].push(game);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {Object.entries(groupedGames).map(([category, categoryGames]) => (
        <div key={category} className="space-y-3">
          <h3 className="text-xl font-bold text-white">{category}</h3>
          <div className="space-y-3">
            {categoryGames.map((game, index) => (
              <a
                key={index}
                href={game.url || '#'}
                className="block hover:bg-opacity-50 hover:bg-gray-600 transition-colors p-2 hover:rounded-lg"
              >
                <h4 className="text-white text-sm mb-1">{game.title}</h4>
                <div className="w-full max-w-2xl h-32 relative rounded-lg overflow-hidden">
                  <img 
                    src={game.cover} 
                    alt={game.title} 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
