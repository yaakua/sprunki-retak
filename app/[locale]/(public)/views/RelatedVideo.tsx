'use client';

import { siteConfig } from '@/lib/config/site';
import { Card, CardContent } from '@/lib/ui/components/card';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

// 动态导入 ReactPlayer 以避免 SSR 问题
const ReactPlayer = dynamic(() => import('react-player/youtube'), {
  ssr: false,
});

export default function RelatedVideo() {
  const t = useTranslations('HomeRelatedVideo');
  if (!siteConfig.isShowVideo) {
    return null;
  }
  try {
    const videos = siteConfig.videos;
    return (
      <div className="w-full px-4 py-6">
        <h2 className="text-2xl font-bold mb-4">{t('title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {videos.map(({ url, title }, index) => (
            <Card key={index} className="border-none rounded-lg">
              <CardContent className="p-0">
                <div className="aspect-video">
                  <ReactPlayer
                    url={url}
                    width="100%"
                    height="100%"
                    controls={true}
                    light={true} // 览图
                    playing={true}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  } catch (e) {
    console.error(e);
    return null;
  }
}
