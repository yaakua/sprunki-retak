import { siteConfig } from '@/lib/config/site';
import { getPathnameWithLocale } from '@/lib/i18n/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import IframeActions from './IframeActions';

function getYoutubeVideoId(url: string): string {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : '';
}

export default async function IframeSection() {
  const locale = await getLocale();
  const t = await getTranslations('HomeIframe');
  const iframeUrl = getPathnameWithLocale('/playground', locale);

  // 检查背景类型和iframe配置
  const isIframe = siteConfig.gameType === 'iframe';
  
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
      <div className="relative z-10 text-gray-100 p-4 md:p-6 pt-2 max-w-6xl mx-auto rounded-lg shadow-lg w-full">
        <div className="flex flex-col">
          <h2 className="text-2xl md:text-5xl font-bold text-center mb-4 text-yellow-300 font-leckerli">
            {t('title')}
          </h2>
          <p className="text-sm md:text-xl mb-4 text-gray-200 w-full max-w-3xl mx-auto text-center">
            {t('description')}
          </p>
        </div>
      </div>

      {/* iframe 容器 - 调整高度 */}
      <div className="relative z-10 rounded w-full max-w-6xl">
        {isIframe ? (
          <>
            <iframe
              title={t('iframeTitle')}
              src={iframeUrl}
              allow="accelerometer; gyroscope; autoplay; payment; fullscreen; microphone; clipboard-read; clipboard-write"
              sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts allow-same-origin allow-downloads allow-popups-to-escape-sandbox"
              className="w-full h-[calc(100vh-20rem)] md:min-h-[600px]"
              allowFullScreen
            />
            <IframeActions />
          </>
        ) : siteConfig.gameType === 'download' && siteConfig.gameDownload?.showDownloadButton && (
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
      </div>
    </section>
  );
}
