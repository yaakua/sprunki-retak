import { siteConfig } from '@/lib/config/site';
import { Button } from '@/lib/ui/components/button';
import { DownloadCloud } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

interface FallbackViewProps {
  downloadUrl?: string;
}

export default async function FallbackView({ downloadUrl }: FallbackViewProps) {
  const t = await getTranslations('HomeIframe');

  return (
    <div className="relative w-full min-h-[600px] bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
      {/* 背景图片 */}
      <div className="absolute inset-0">
        <Image
          src={siteConfig.gameDownloadBg ?? '/game-bg.jpg'}
          alt="Game background"
          fill
          className="object-cover opacity-50"
          priority
        />
      </div>

      {/* 下载按钮 */}
      <div className="relative z-10 text-center">
        {downloadUrl && (
          <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
            <Button color="warning" size="lg" className="gap-4">
              <DownloadCloud className="w-5 h-5" />
              {t('downloadGame')}
            </Button>
          </a>
        )}
      </div>
    </div>
  );
}
