'use client';

import { ReactNode, useEffect, useState } from 'react';
import { CategorySidebar } from '../sidebar/CategorySidebar';
import { GameCategory } from '@/lib/types';
import { useSidebar } from '@/lib/context/SidebarContext';
interface AppLayoutProps {
  children: ReactNode;
  categories: GameCategory[];
}

export function AppLayout({ children, categories }: AppLayoutProps) {
  const { isExpanded, setIsExpanded,setIsGameBox } = useSidebar();
  useEffect(()=>{
    // 有此Layout時，就設定isGameBox為true
    setIsGameBox(true)
    // 检查是否为移动设备（小于 768px）
    const isMobile = window.innerWidth < 768;
    setIsExpanded(!isMobile);

    // 添加窗口大小变化监听器
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setIsExpanded(!isMobile);
    };

    window.addEventListener('resize', handleResize);

    // 清理监听器
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  },[])

  return (
    <div className="relative bg-background min-h-screen">
      {/* Sidebar */}
      <CategorySidebar 
        categories={categories} 
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
      />

        {/* Main Content */}
        <div className={`transition-all duration-300 ${isExpanded ? 'ml-[240px]' : 'ml-[72px]'}`}>
        <main className="p-4 md:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
