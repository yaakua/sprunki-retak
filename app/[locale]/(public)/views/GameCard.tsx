'use client'
import { motion, AnimatePresence } from 'framer-motion';
import { RecommendationItem } from '@/lib/types';
import Link from 'next/link';
import React from 'react';
type GroupedGames = {
    [key: string]: RecommendationItem[];
};

export default function GameCard({ groupedGames }: { groupedGames: GroupedGames }) {
    return <>
        {Object.entries(groupedGames).map(([category, categoryGames]) => (
            <React.Fragment key={category}>
                <h3 className="text-sm font-bold text-white/80 col-span-2 mt-2 first:mt-0">
                    {category}
                </h3>
                {categoryGames.map((game, index) => (
                    <Link
                        href={game.url}
                        key={index}
                        target={game.url.startsWith('http') ? "_blank" : "_self"}
                        rel={game.url.startsWith('http') ? "noopener noreferrer" : undefined}
                        className="group block relative rounded-lg overflow-hidden bg-gray-800/50
                    hover:ring-1 hover:ring-primary/50
                    transition-all duration-300"
                    >
                        <div className="aspect-[4/3] relative">
                            <motion.img
                                src={game.cover}
                                alt={game.title}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                onLoad={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    const placeholder = target.previousElementSibling;
                                    if (placeholder) {
                                        placeholder.remove();
                                    }
                                }}
                            />

                            {/* 标题悬停效果 */}
                            <motion.div
                                className="absolute inset-0 bg-black/60 flex items-center justify-center"
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.2 }}
                            >
                                <h4 className="text-xs font-medium text-white px-2 text-center">
                                    {game.title}
                                </h4>
                            </motion.div>
                        </div>
                    </Link>
                ))}
            </React.Fragment>
        ))}
    </>
}
