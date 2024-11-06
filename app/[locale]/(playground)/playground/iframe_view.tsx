'use client';
import { siteConfig } from '@/lib/config/site';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

type Props = {
  params: { locale: string };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function IframeView({ params: { locale } }: Props) {
  const t = useTranslations();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const iframe = document.querySelector('iframe');
    if (iframe) {
      iframe.onload = () => setIsLoading(false);
    }
    // 3秒后自动取消加载状态
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // 清理定时器
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full min-h-screen flex flex-col">
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm text-white z-10">
          <div className="bg-gray-800 rounded-lg p-4 shadow-lg flex flex-col items-center justify-center">
            <p className="text-xl font-bold mb-4">{t('Loading.title')}</p>
            <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          </div>
        </div>
      )}
      <div className="flex-grow">
        <iframe
          title={t('HomeIframe.iframeTitle')}
          src={siteConfig.gameIframeUrl}
          allow="accelerometer; gyroscope; autoplay; payment; fullscreen; microphone; clipboard-read; clipboard-write"
          sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts allow-same-origin allow-downloads allow-popups-to-escape-sandbox"
          className="w-full h-full"
          style={{ minHeight: '100vh' }}
          allowFullScreen
        />
      </div>
    </div>
  );
}
