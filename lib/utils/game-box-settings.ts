import { GameBoxSettings, RecommendationItem } from "../types";

/**
 * 获取首页设置
 * @param locale 语言
 */
export const getHomeSettings = async (locale: string) => {
  let settings: GameBoxSettings = {
    recommended: [],
    categories: [],
  };

  try {
    // 1. 加载基础配置
    try {
      settings = (await import(`@/resources/game-box/${locale}.json`)).default;
    } catch {
      settings = (await import(`@/resources/game-box/en.json`)).default as GameBoxSettings;
    }

    // 2. 读取games目录下的所有游戏配置
    const fs = require('fs').promises;
    const path = require('path');
    const gamesDir = path.join(process.cwd(), 'app', '[locale]', '(public)', 'games');
    
    const gameDirs = await fs.readdir(gamesDir);
    
    // 收集所有游戏信息，用于后续排序
    const allGames: Array<{
      config: any,
      item: RecommendationItem
    }> = [];
    
    for (const gameDir of gameDirs) {
      const gamePath = path.join(gamesDir, gameDir);
      const stat = await fs.stat(gamePath);
      
      if (!stat.isDirectory()) continue;
      
      try {
        // 读取游戏配置
        const siteConfigPath = path.join(gamePath, 'config', 'site.json');
        const siteConfig = JSON.parse(await fs.readFile(siteConfigPath, 'utf8'));
        
        // 读取游戏多语言配置
        const messagesPath = path.join(process.cwd(), 'messages', locale, 'games', `${siteConfig.pageName}.json`);
        let gameTitle;
        try {
          const messages = JSON.parse(await fs.readFile(messagesPath, 'utf8'));
          gameTitle = messages[siteConfig.pageName]?.title;
        } catch {
          // 如果找不到对应语言的配置，使用pageName作为标题
          gameTitle = siteConfig.pageName;
        }
        
        // 创建游戏项
        const gameItem: RecommendationItem = {
          title: gameTitle,
          url: siteConfig.pagePath,
          cover: siteConfig.screenshotUrl,
          visible: true
        };
        
        allGames.push({
          config: siteConfig,
          item: gameItem
        });
        
      } catch (error) {
        console.error(`Error processing game directory ${gameDir}:`, error);
      }
    }
    
    // 根据更新时间排序
    allGames.sort((a, b) => {
      const aTime = a.config.updatedTime || a.config.createdTime || '0';
      const bTime = b.config.updatedTime || b.config.createdTime || '0';
      return bTime.localeCompare(aTime); // 倒序排列
    });
    
    // 设置position并添加到对应分类
    allGames.forEach((game, index) => {
      game.item.position = allGames.length - index; // 位置值越大越靠前
      
      // 将游戏添加到对应的分类中
      if (Array.isArray(game.config.tags)) {
        for (const tag of game.config.tags) {
          const category = settings.categories.find(c => c.name === tag);
          if (category) {
            if (!category.games) {
              category.games = [];
            }
            category.games.push(game.item);
          }
        }
      }
    });
    
  } catch (error) {
    console.error('Failed to load game box settings:', error);
  }
  
  return settings;
};