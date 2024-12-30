'use client';

import { useState } from 'react';
import IframeActions from './IframeActions';

export default function LazyIframe({ 
  gameIframeUrl, 
  title, 
  pageName,
  description,
  gameImage,
  playGameButtonText
}: { 
  gameIframeUrl: string, 
  title: string,
  pageName: string|null,
  description?: string,
  gameImage?: string,
  playGameButtonText?: string
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  const containerClassName = "w-full h-[calc(100vh-20rem)] md:min-h-[600px] rounded-xl relative overflow-hidden";

  if (!isLoaded) {
    return (
      <div className={containerClassName + " flex flex-col items-center justify-center p-4 md:p-8"}>
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        
        <div className="absolute top-0 left-1/4 w-full h-1/2 bg-yellow-500/30 rotate-12 transform-gpu blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-full h-1/2 bg-yellow-600/20 -rotate-12 transform-gpu blur-3xl" />
        
        <div className="absolute top-1/4 right-0 w-1/2 h-1/2 bg-orange-500/20 rotate-45 transform-gpu blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-1/2 h-1/2 bg-yellow-400/15 -rotate-45 transform-gpu blur-3xl" />
        
        <div className="relative z-10 w-full max-w-4xl mx-auto">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-between md:gap-12">
            {/* 游戏图片 - 移动端显示在顶部 */}
            <div className="relative group block md:hidden w-full max-w-[200px]">
              <div className="w-full aspect-square rounded-full overflow-hidden border-4 border-yellow-500/50">
                {gameImage ? (
                  <img 
                    src={gameImage} 
                    alt={title}
                    loading="lazy"
                    decoding="async"
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
              <div className="absolute inset-0 rounded-full bg-yellow-500/30 blur-xl -z-10 group-hover:bg-yellow-500/40 transition-colors duration-300" />
              <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-2xl -z-20 group-hover:bg-orange-500/30 transition-colors duration-300" />
            </div>

            {/* 文字内容 */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl md:text-4xl font-bold text-yellow-400 mb-3 md:mb-6 font-leckerli leading-tight">
                {title}
              </h1>
              
              {description && (
                <p className="text-base md:text-xl text-gray-300 mb-4 md:mb-8 leading-relaxed line-clamp-3 md:line-clamp-none">
                  {description}
                </p>
              )}

              <button
                onClick={() => setIsLoaded(true)}
                className="group relative flex items-center gap-2 md:gap-3 bg-yellow-500 hover:bg-yellow-400 text-black px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-base md:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_40px_rgba(234,179,8,0.4)] mx-auto md:mx-0"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <span className="relative flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/10 group-hover:bg-black/20 transition-colors">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 md:h-6 md:w-6" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" 
                    />
                  </svg>
                </span>
                <span className="relative uppercase tracking-wider text-sm md:text-base">{playGameButtonText || 'Play Game'}</span>
              </button>
            </div>

            {/* 游戏图片 - 桌面端显示在右侧 */}
            <div className="relative group hidden md:block">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-yellow-500/50">
                {gameImage ? (
                  <img 
                    src={gameImage} 
                    alt={title}
                    loading="lazy"
                    decoding="async"
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
              <div className="absolute inset-0 rounded-full bg-yellow-500/30 blur-xl -z-10 group-hover:bg-yellow-500/40 transition-colors duration-300" />
              <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-2xl -z-20 group-hover:bg-orange-500/30 transition-colors duration-300" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 md:h-24 bg-gradient-to-t from-black to-transparent" />
      </div>
    );
  }

  return (
    <div className={containerClassName}>
      <iframe
        title={title}
        src={gameIframeUrl}
        allow="accelerometer; gyroscope; autoplay; payment; fullscreen; microphone; clipboard-read; clipboard-write"
        sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts allow-same-origin allow-downloads allow-popups-to-escape-sandbox"
        className="w-full h-full"
        allowFullScreen
      />
      <IframeActions pageName={pageName} />
    </div>
  );
}