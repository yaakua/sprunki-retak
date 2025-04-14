# 本地开发指南

## 项目说明
- 当前源码的设计是为FaFaFa.ai工具创建的代码模板，可以通过无需编写代码方式实现快速上站。如果是自行开发需要遵守一些约定配置，否则会导致FaWeb工具站无法读取和生成
- 项目支持多游戏站点（首页是某个具体的游戏），也支持聚合类型（盒子类型）的网站（首页是一个游戏分类聚合入口）

## 项目结构
- app/[locale]/(public) 网站首页（支持多语言）
    - blogs  博客列表页面
    - games  游戏列表页面，以及所有子游戏所在目录
    - t  博客详情页面，每个博客一个子目录，直接访问/t会重定向到/blogs
    - terms-of-service  服务条款页面(默认noindex)
    - privacy-policy  隐私政策页面(默认noindex)
    - views 一些页面组件，用于首页和games目录下的子游戏页面
- lib
    - components 一些常用的组件
    - games-template 针对聚合类型的网站（盒子模板），会将当前目录下的c/[[...]]/page.tsx 复制到app/[locale]/(public)目录下，作为每个游戏分类的页面
        - page.tsx与config目录 每个子游戏都会复制这个文件到具体的games/xxx(子游戏名称)目录下
        - game-box.tsx用于生成盒子模板的首页，会替换app/[locale]/(public)/page.tsx这个文件
    - t-file-page-template 是用于博客文章的页面模板，会替换app/[locale]/(public)/t/{每个博客slug}/page.tsx这个文件
    - config/site.json 网站的基本配置，用于配置域名、主体风格等信息
        - theme.name  主题名称，修改为themes/目录下的任意主题名称

- messages目录 用于配置网站的多语言配置
    - 根目录下的多语言json文件用于首页的信息
    - en/games/demo.json 用于配置demo游戏的多语言信息 这里的demo是游戏名称与games/目录下的文件目录保持一致，包括里面的key名称也需要保持一致，不同的语言下都有这个文件
- resources目录 一些页面需要用到的资源文件
    - faqs 目录 用于配置网站的FAQs，每个语言都会有一个json文件
    - game-box 目录，用于聚合类型的网站分类信息和首页推荐信息的配置，每个语言都会有一个json文件
    - navbar 目录，用于配置网站的导航栏，每个语言都会有一个json文件
    - recommendations 目录，用于配置网站的推荐游戏(每个子游戏的右侧和下方推荐游戏列表），每个语言都会有一个json文件

## 本地开发
- 当前项目建议使用bun或者yarn方式进行本地开发
- 执行`bun i` 或者`yarn install` 命令安装依赖
- 执行`bun run dev` 或者`yarn dev` 命令启动本地开发环境
- 访问首页时，由于没有任何游戏数据，页面会提示错误如下所示，均为正常现象。

``` log
⚠ ./app/[locale]/(public)/page.tsx
Module not found: Can't resolve './config/features' in '/Users/yangkui/WebstormProjects/game-website-template-v2/app/[locale]/(public)'

Import trace for requested module:
./app/[locale]/(public)/page.tsx
features2 section can not find zh-CN.mdx Error: Cannot find module 'undefined'
    at webpackMissingModule (webpack:///app/[locale]/(public)/page.tsx?646f:52:29)
    at Page (webpack:///app/[locale]/(public)/page.tsx?646f:52:29)
  50 |   if(siteConfig2.customizeFeatures){
  51 |     try {
> 52 |       const Content = (await import(`!!raw-loader!./config/features/${locale}.mdx`)).default;
     |                             ^
  53 |       const { content } = matter(Content);
  54 |       features2ContentResult = content;
  55 |     } catch (error) { {
  code: 'MODULE_NOT_FOUND'
}
features2 section can not find zh-CN.mdx Error: Cannot find module 'undefined'
    at webpackMissingModule (webpack:///app/[locale]/(public)/page.tsx?646f:52:29)
    at Page (webpack:///app/[locale]/(public)/page.tsx?646f:52:29)
  50 |   if(siteConfig2.customizeFeatures){
  51 |     try {
> 52 |       const Content = (await import(`!!raw-loader!./config/features/${locale}.mdx`)).default;
     |                             ^
  53 |       const { content } = matter(Content);
  54 |       features2ContentResult = content;
  55 |     } catch (error) { {
  code: 'MODULE_NOT_FOUND'
}
Error: MISSING_MESSAGE: Could not resolve `loadingTitle` in messages for locale `zh-CN`.
    at t (webpack:///app/[locale]/(public)/views/LazyIframe.tsx?1e8a:29:43)
  27 |   const [showIframeOnly, setShowIframeOnly] = useState(false);
  28 |   const t = useTranslations();
> 29 |   const loadingTitleText = loadingTitle || t('loadingTitle');
     |                                           ^
  30 |   useEffect(() => {
  31 |     // 页面加载后3秒自动加载iframe
  32 |     const timer = setTimeout(() => { {
  code: 'MISSING_MESSAGE',
  originalMessage: 'Could not resolve `loadingTitle` in messages for locale `zh-CN`.'
}
Error: MISSING_MESSAGE: Could not resolve `loadingTitle` in messages for locale `zh-CN`.
    at t (webpack:///app/[locale]/(public)/views/LazyIframe.tsx?1e8a:29:43)
  27 |   const [showIframeOnly, setShowIframeOnly] = useState(false);
  28 |   const t = useTranslations();
> 29 |   const loadingTitleText = loadingTitle || t('loadingTitle');
     |                                           ^
  30 |   useEffect(() => {
  31 |     // 页面加载后3秒自动加载iframe
  32 |     const timer = setTimeout(() => { {
  code: 'MISSING_MESSAGE',
  originalMessage: 'Could not resolve `loadingTitle` in messages for locale `zh-CN`.'
```

## 如何修改

- 删除messages目录，并将messages_bak目录修改为messages目录
- 修改lib/config/site.ts代码，如下：

``` typescript
import { SiteConfig } from '../types';
import siteConfigJSON from './site.json';
import defaultConfigJSON from './default.json';

let config = {...siteConfigJSON} as unknown as SiteConfig;

if (process.env.NODE_ENV === 'development') {
    config = {
        ...siteConfigJSON,
        ...defaultConfigJSON
    } 
}

export const siteConfig: SiteConfig = config;


```
- 重新启动，访问浏览器即可看到示例的网站


## 如何添加游戏
- 1.在app/[locale]/(public)/games目录下新建一个游戏目录，并将lib/components/games-template/page.tsx文件和config目录复制一份到新建目录下
- 2.修改新建目录下的config目录里面的配置文件/config.json ，具体修改的参数可以参考lib/types/site.ts声明文件，有一些配置属性在子游戏下不需要重复配置
- 3.为游戏添加游戏介绍内容，在config目录下新建features目录，并在其中新建对应的语言文件，如en.mdx,zh-TW.mdx，每个语言一个文件，文件的内容可以是任意的markdown格式的内容（这一块的内容会显示在游戏的介绍页面里面）
- 4.为游戏添加FAQ,在config目录下有一个faqs目录，为每个语言新建一个json文件，如en.json,zh-TW.json，每个json文件都是一个数组，数组的每一项都是一个FAQ的配置，每个FAQ配置具体属性可以参考lib/types/site.ts声明文件
- 5.为游戏添加国际化SEO等信息，在messages/{语言}/games/{新建游戏名称}.json文件内按照messages/game_page_template/games/new-game.json格式填充每个key值对应的内容
- 6.修改lib/config/game-page-messages.json这个配置文件，每个语言一个key对应的数组，将所有新建的子游戏访问的路径都加到这个数组里面，示例：
``` json
{
  "en": [
    "/games/sprunki-skibidi-toilet-2-0.json",
    "/games/sprunki-remastered.json",
    "/games/sprunki-infected.json",
    "/games/sprunked-2-0.json"
  ],
  "zh-CN": [
    "/games/sprunki-skibidi-toilet-2-0.json",
    "/games/sprunki-remastered.json",
    "/games/sprunki-infected.json",
    "/games/sprunked-2-0.json"
  ],
  // 其他 语言
}
```
- 7.如果需要配置游戏页面右侧和下方的游戏推荐列表，可以修改一下resources/recommendation这个目录下的文件，示例
``` json
[
  {
    "title": "Sprunki Retake",
    "cover": "/game_screenshot.webp",
    "url": "/",
    "category": "TOP",
    "visible": true,
    "position": "bottom"
  },
  {
    "title": "Sprunki: Skibidi Toilet 2.0",
    "cover": "https://public-image.fafafa.ai/cm3tvyn990002mp4f5v0tdr5g/2025-02-07/images/1738909317338-bs1p9.png",
    "url": "/games/sprunki-skibidi-toilet-2-0",
    "category": "",
    "visible": true,
    "position": "all"
  },
  {
    "title": "Sprunki Remastered",
    "cover": "https://public-image.fafafa.ai/cm3tvyn990002mp4f5v0tdr5g/2025-02-07/images/1738909404185-v2zzpn.avif",
    "url": "/games/sprunki-remastered",
    "category": "",
    "visible": true,
    "position": "all"
  },
  {
    "title": "Sprunki Infected",
    "cover": "https://public-image.fafafa.ai/cm3tvyn990002mp4f5v0tdr5g/2025-01-07/images/1736252447476-xxuii9.webp",
    "url": "/games/sprunki-infected",
    "category": "TOP",
    "visible": true,
    "position": "all"
  },
  {
    "title": "Sprunked 2.0",
    "cover": "https://public-image.fafafa.ai/cm3tvyn990002mp4f5v0tdr5g/2025-02-07/images/1738909504406-c9xwjw.png",
    "url": "/games/sprunked-2-0",
    "category": "",
    "visible": true,
    "position": "all"
  }
]
```
