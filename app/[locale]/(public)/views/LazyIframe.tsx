'use client';

import { useState, useEffect } from 'react';
import IframeActions from './IframeActions';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function LazyIframe({ 
  gameIframeUrl, 
  title, 
  pageName,
  description,
  gameImage,
  playGameButtonText,
  type = 'iframe'
}: { 
  gameIframeUrl: string, 
  title: string,
  pageName: string|null,
  description?: string,
  gameImage?: string,
  playGameButtonText?: string,
  type?: 'iframe' | 'download'
}) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [showIframeOnly, setShowIframeOnly] = useState(false);
  const t = useTranslations();

  useEffect(() => {
    // 页面加载后3秒自动加载iframe
    const timer = setTimeout(() => {
      setIframeLoaded(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const containerClassName = "w-full h-[calc(100vh-20rem)] md:min-h-[600px] rounded-xl relative overflow-hidden";

  const handlePlayClick = () => {
    if (type === 'download') {
      window.location.href = "#download-game";
    } else {
      setShowIframeOnly(true);
    }
  };

  const renderInitialContent = () => (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 md:p-8 bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      
      <div className="absolute top-0 left-1/4 w-full h-1/2 bg-yellow-500/30 rotate-12 transform-gpu blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-full h-1/2 bg-yellow-600/20 -rotate-12 transform-gpu blur-3xl" />
      
      <div className="absolute top-1/4 right-0 w-1/2 h-1/2 bg-orange-500/20 rotate-45 transform-gpu blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-1/2 h-1/2 bg-yellow-400/15 -rotate-45 transform-gpu blur-3xl" />
      
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <div className="flex flex-col items-center gap-8">
          <div className="relative group w-full max-w-[480px] cursor-pointer" onClick={handlePlayClick}>
            <div className="w-full aspect-video rounded-2xl overflow-hidden  border-yellow-500/50">
              {gameImage ? (
                <Image 
                  src={gameImage} 
                  alt={title}
                  width={480}
                  height={270}
                  priority={true}
                  quality={75}
                  className="w-full h-full object-cover will-change-transform group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-yellow-500/30 flex items-center justify-center">
                  <svg className="w-12 h-12 text-yellow-500/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  </svg>
                </div>
              )}
            </div>
            <div className="absolute inset-0 rounded-2xl bg-yellow-500/30 blur-xl -z-10 group-hover:bg-yellow-500/40 transition-colors duration-300" />
            <div className="absolute inset-0 rounded-2xl bg-orange-500/20 blur-2xl -z-20 group-hover:bg-orange-500/30 transition-colors duration-300" />
          </div>

          <div className="text-center ">
            <h1 className="text-2xl md:text-5xl font-bold text-yellow-400 mb-8  leading-tight">
              {title}
            </h1>
            <div className="flex justify-center">
            <button
              onClick={handlePlayClick}
              className="group relative flex items-center gap-2 md:gap-3 bg-yellow-500 hover:bg-yellow-400 text-black px-4  py-2 md:py-3 rounded-full font-bold text-lg md:text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_40px_rgba(234,179,8,0.4)]"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <span className="relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/10 group-hover:bg-black/20 transition-colors">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6 md:h-7 md:w-7" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                </svg>
              </span>
              <span className="relative">{playGameButtonText || 'Play Game'}</span>
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={containerClassName}>
      {!showIframeOnly && renderInitialContent()}
      
      {iframeLoaded && (
        <div className={`w-full h-full ${!showIframeOnly ? 'absolute inset-0 z-10' : ''}`}>
          <iframe
            title={title}
            src={gameIframeUrl}
            allow="accelerometer; gyroscope; autoplay; payment; fullscreen; microphone; clipboard-read; clipboard-write"
            sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts allow-same-origin allow-downloads allow-popups-to-escape-sandbox"
            className="w-full h-full"
            allowFullScreen
          />
        </div>
      )}
      
      {!iframeLoaded && showIframeOnly && (
        <div className="w-full h-full flex items-center justify-center bg-black">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-500 mx-auto mb-4"></div>
            <p className="text-yellow-500 text-lg">{t('Loading.title')}</p>
          </div>
        </div>
      )}
      
      <IframeActions pageName={pageName} />
    </div>
  );
}