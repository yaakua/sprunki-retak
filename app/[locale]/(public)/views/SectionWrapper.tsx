import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  className?: string;
}>;

export default async function SectionWrapper({ className, children }: Props) {
  return (
    <div
      className={cn(
        'bg-emerald-800 bg-opacity-35 text-gray-100 p-8 max-w-6xl mx-auto rounded-lg shadow-lg border-2 border-opacity-45 border-yellow-300',
        className,
      )}
    >
      {children}
    </div>
  );
}
