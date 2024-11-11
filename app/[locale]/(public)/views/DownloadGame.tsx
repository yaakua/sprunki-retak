'use client';
import { siteConfig } from '@/lib/config/site';
import { Button } from '@/lib/ui/components/button';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FaAndroid, FaApple, FaSteam, FaWindows } from 'react-icons/fa';


export default function DownloadGame() {
  const t = useTranslations('HomeIframe');
  if (siteConfig.gameType !== 'download') {
    return <></>;
  }

  if (!siteConfig.gameDownload?.downloadUrls) {
    return <></>;
  }

  const downloadUrls = siteConfig.gameDownload.downloadUrls;
  
  const platforms = [
    downloadUrls.ios && { key: 'ios', Icon: FaApple, url: downloadUrls.ios, label: 'iOS' },
    downloadUrls.android && { key: 'android', Icon: FaAndroid, url: downloadUrls.android, label: 'Android' },
    downloadUrls.pc && { key: 'pc', Icon: FaWindows, url: downloadUrls.pc, label: 'Windows' },
    downloadUrls.steam && { key: 'steam', Icon: FaSteam, url: downloadUrls.steam, label: 'Steam' },
  ].filter(Boolean) as Array<{
    key: string;
    Icon: React.ComponentType<{ className?: string }>;
    url: string;
    label: string;
  }>;

  if (platforms.length === 0) {
    return <></>;
  }

  return (
    <div id="download-game" className="relative w-full min-h-[300px] mt-10 bg-emerald-800 bg-opacity-35 rounded-lg overflow-hidden">
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-12"
        >
          <h1 className="text-4xl font-bold text-yellow-300 text-center relative z-10 px-12 py-6">
            {t('downloadGame')}
          </h1>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-600/20 to-transparent backdrop-blur-sm rounded-lg -skew-y-1" />
          <div className="absolute inset-0 bg-yellow-300/5 rounded-lg skew-y-1" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-6 w-full max-w-5xl"
        >
          {platforms.map(({ key, Icon, url, label }) => (
            <a 
              key={key}
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-64"
            >
              <Button 
                color="primary" 
                size="lg" 
                className="w-full gap-3 bg-emerald-700/30 hover:bg-emerald-600/40 backdrop-blur-sm transition-all duration-300 border border-yellow-300/20 text-yellow-300"
              >
                <Icon className="w-6 h-6" />
                {label}
              </Button>
            </a>
          ))}
        </motion.div>
      </div>
      
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-600/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl" />
    </div>
  );
}
