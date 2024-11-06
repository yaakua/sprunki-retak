import { siteConfig } from '@/lib/config/site';
import { Avatar, AvatarFallback, AvatarImage } from '@/lib/ui/components/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/lib/ui/components/card';
import { getTranslations } from 'next-intl/server';
import { Tweet } from 'react-tweet';

export default async function Comments() {
  if (!siteConfig.isShowComments) {
    return <></>;
  }
  const t = await getTranslations('HomeComments');
  let comments: any = undefined;
  if (siteConfig.isShowTweets) {
    comments = siteConfig.tweets.map((it) => <Tweet id={it} key={it} />);
  } else {
    comments = siteConfig.comments.map((it, index) => (
      <Card key={index} className="h-full bg-gray-800 border-none">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={it.avatar} alt={it.author} />
              <AvatarFallback className="bg-primary font-bold">{it.author[0]}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{it.author}</CardTitle>
              <CardDescription>{it.role}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">{it.content}</p>
        </CardContent>
      </Card>
    ));
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-12">{t('title')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{comments}</div>
    </section>
  );
}
