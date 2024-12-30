import { getPathnameWithLocale } from '@/lib/i18n/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { loadSiteConfig } from '@/lib/utils/resource';
import PopupWindows from './PopupWindows';
import { SiteConfig } from '@/lib/types';
import Ad from './Ad';
import LazyIframe from './LazyIframe';

function getYoutubeVideoId(url: string): string {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : '';
}

export default async function IframeSection({pageName}:{pageName:string|null}) {
  const locale = await getLocale();
  const prefix = pageName ? pageName + '.' : '';
  const t = await getTranslations(`${prefix}HomeIframe`);
  const siteConfig = await loadSiteConfig(pageName);
  const isIframe = siteConfig.gameType === 'iframe';
  const isPopup = siteConfig.gameType === 'popup';
  const screenshot_prefix = pageName ? '/games/' + pageName : '';
  const game_screenshot_path = `${screenshot_prefix}/game_screenshot.webp`;
  return (
    <section className="bg-black text-white flex flex-col items-center justify-center p-4 pt-0 relative mb-6 min-h-[calc(40vh-6rem)] md:min-h-[600px]">
      {/* 背景图片处理 */}
      {siteConfig.bgType === 'image' && siteConfig.bgImage && (
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${siteConfig.bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}
      
      {/* 视频背景处理 */}
      {siteConfig.bgType === 'video' && siteConfig.bgVideo && (
        <div className="absolute inset-0 w-full h-full">
          {siteConfig.bgVideo.includes('youtube.com') || siteConfig.bgVideo.includes('youtu.be') ? (
            <>
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${getYoutubeVideoId(siteConfig.bgVideo)}?autoplay=1&mute=1&controls=0&loop=1&playlist=${getYoutubeVideoId(siteConfig.bgVideo)}&playsinline=1&rel=0`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <div className="absolute inset-0 bg-black/50 pointer-events-none" />
            </>
          ) : (
            <>
              <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={siteConfig.bgVideo} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/50 pointer-events-none" />
            </>
          )}
        </div>
      )}

      {/* 内容区域 - 调整内边距 */}
      {/* <div className="relative z-10 text-gray-100 p-4 md:p-6 pt-2 max-w-6xl mx-auto rounded-lg shadow-lg w-full">
        <div className="flex flex-col">
          <h1 className="text-2xl md:text-5xl font-bold text-center mb-4 text-yellow-300 font-leckerli">
            {t('title')}
          </h1>
          <p className="text-sm md:text-xl mb-4 text-gray-200 w-full max-w-3xl mx-auto text-center">
            {t('description')}
          </p>
        </div>
      </div> */}

      {/* iframe 容器 - 调整高度 */}
      <div className="relative z-10 rounded w-full max-w-6xl">
        {isIframe && <LazyIframe gameIframeUrl={siteConfig.gameIframeUrl} title={t('title')}  gameImage={game_screenshot_path}
          description={t('description')} playGameButtonText={t('playGame')}
          pageName={pageName} />}
        {siteConfig.gameType === 'download' && siteConfig.gameDownload?.showDownloadButton && (
          <div className="flex justify-center items-center py-8">
            <a 
              href="#download-game" 
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {t('downloadGame')}
            </a>
          </div>
        )}
        {isPopup && (
          <div className="flex justify-center items-center py-8">
            <PopupWindows pageName={pageName} siteConfig={{...siteConfig}} />
          </div>
        )}
      </div>
      <Ad/>
    </section>
  );
}
