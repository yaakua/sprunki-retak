/**
 * 加载站点配置工具类
 * @param pageName 页面名称,可选
 * @returns 站点配置对象
 */
export async function loadSiteConfig(pageName?: string) {
  let siteConfig;
  try {
    // 首先加载默认配置
    siteConfig = await import(`@/lib/config/site.json`);
    // 如果提供了页面名称,尝试加载页面特定配置
    if (pageName) {
      try {
        siteConfig = await import(`@/app/[locale]/(public)/games/${pageName}/config/config.json`);
      } catch (e) {
        console.warn(`未找到页面 ${pageName} 的配置,使用默认配置`);
      }
    }

    return siteConfig;
  } catch (e) {
    console.error('加载站点配置失败:', e);
    throw new Error('加载站点配置失败');
  }
}
