import { RecommendationItem } from '@/lib/types';
import React from 'react';
import GameCard from './GameCard';
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
    <div className="hidden lg:block w-full lg:w-80 px-4">
      <div className="bg-gray-900/50 rounded-lg p-3">
        <div className="grid grid-cols-2 auto-rows-auto gap-2">
        <GameCard groupedGames={groupedGames} />
        </div>
      </div>
    </div>
  );
}
