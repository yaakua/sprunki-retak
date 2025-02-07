'use client';

import { useState, useEffect } from 'react';
import IframeActions from './IframeActions';
import { useTranslations } from 'next-intl';

export default function LazyIframe({ 
  gameIframeUrl, 
  title, 
  pageName,
  description,
  gameImage,
  playGameButtonText,
  loadingTitle,
  type = 'iframe'
}: { 
  gameIframeUrl: string, 
  title: string,
  pageName: string|null,
  description?: string,
  gameImage?: string,
  playGameButtonText?: string,
  loadingTitle?:string,
  type?: 'iframe' | 'download'
}) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [showIframeOnly, setShowIframeOnly] = useState(false);
  const t = useTranslations();
  const loadingTitleText = loadingTitle || t('loadingTitle');
  useEffect(() => {
    // 页面加载后3秒自动加载iframe
    const timer = setTimeout(() => {
      setIframeLoaded(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const containerClassName = "w-full h-[calc(100vh-20rem)] md:min-h-[600px] rounded-2xl relative overflow-hidden";

  const handlePlayClick = () => {
    if (type === 'download') {
      window.location.href = "#download-game";
    } else {
      setShowIframeOnly(true);
    }
  };

  const renderInitialContent = () => (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-lazy-iframe-background/90 backdrop-blur-md">
      <div className="absolute inset-0 bg-gradient-to-br from-lazy-iframe-glow-1 via-lazy-iframe-overlay to-lazy-iframe-glow-2" />
      
      <div className="absolute top-0 left-1/4 w-full h-1/2 bg-lazy-iframe-glow-1 rotate-12 transform-gpu blur-3xl opacity-70" />
      <div className="absolute bottom-0 right-1/4 w-full h-1/2 bg-lazy-iframe-glow-2 -rotate-12 transform-gpu blur-3xl opacity-70" />
      
      <div className="absolute top-1/4 right-0 w-1/2 h-1/2 bg-lazy-iframe-glow-1 rotate-45 transform-gpu blur-3xl opacity-70" />
      <div className="absolute bottom-1/4 left-0 w-1/2 h-1/2 bg-lazy-iframe-glow-2 -rotate-45 transform-gpu blur-3xl opacity-70" />
      
      <div className="relative z-10 w-full  mx-auto">
        <div className="flex flex-col items-center gap-8">
          <div className="relative group w-full max-w-[480px] cursor-pointer" onClick={handlePlayClick}>
            <div className="w-full aspect-video rounded-2xl overflow-hidden border border-lazy-iframe-glow-1 backdrop-blur-sm">
              {gameImage ? (
                <img 
                  src={gameImage} 
                  alt={title}
                  width={480}
                  height={270}
                  className="w-full h-full object-cover will-change-transform group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-lazy-iframe-glow-1 backdrop-blur-sm flex items-center justify-center">
                  <svg className="w-12 h-12 text-lazy-iframe-glow-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  </svg>
                </div>
              )}
            </div>
            <div className="absolute inset-0 rounded-2xl bg-lazy-iframe-glow-1 blur-xl -z-10 group-hover:bg-lazy-iframe-glow-2 transition-colors duration-300" />
            <div className="absolute inset-0 rounded-2xl bg-lazy-iframe-glow-2 blur-2xl -z-20 group-hover:bg-lazy-iframe-glow-1 transition-colors duration-300" />
          </div>

          <div className="text-center">
            <h1 className="text-2xl md:text-5xl font-bold text-lazy-iframe-title mb-8 leading-tight backdrop-blur-sm">
              {title}
            </h1>
            <div className="flex justify-center">
              <button
                onClick={handlePlayClick}
                className="group relative flex items-center gap-2 md:gap-3 text-lazy-iframe-button-foreground px-4 py-2 md:py-3 rounded-full font-bold text-lg md:text-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-lazy-iframe-button-from to-lazy-iframe-button-to group-hover:from-lazy-iframe-button-hover-from group-hover:to-lazy-iframe-button-hover-to transition-all duration-300 shadow-[0_0_40px_var(--tw-shadow-color)] shadow-lazy-iframe-button-shadow-color" />
                
                <span className="relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-lazy-iframe-button-bg group-hover:bg-lazy-iframe-button-bg-hover transition-colors backdrop-blur-sm">
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
        <div className="w-full h-full flex items-center justify-center bg-lazy-iframe-background/90 backdrop-blur-md">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-lazy-iframe-loading mx-auto mb-4"></div>
            <p className="text-lazy-iframe-loading text-lg">{loadingTitleText}</p>
          </div>
        </div>
      )}
      
      <IframeActions pageName={pageName} />
    </div>
  );
}