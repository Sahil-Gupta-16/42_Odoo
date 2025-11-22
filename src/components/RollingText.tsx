'use client';

import { useRef } from 'react';
import { useAnimationFrame } from 'framer-motion';
import { useUIStore } from '@/store/useUIStore';

interface RollingTextProps {
  messages: string[];
}

export default function RollingText({ messages }: RollingTextProps) {
  const { rollingTextSpeed } = useUIStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const xPos = useRef(0);

  useAnimationFrame(() => {
    if (scrollRef.current) {
      xPos.current -= rollingTextSpeed / 60; // 60fps
      const scrollWidth = scrollRef.current.scrollWidth;
      
      // Reset position when we've scrolled halfway through the duplicated content
      if (Math.abs(xPos.current) >= scrollWidth / 2) {
        xPos.current = 0;
      }
      
      scrollRef.current.style.transform = `translateX(${xPos.current}px)`;
    }
  });

  return (
    <div className="glass-effect rounded-lg p-4 border border-border dark:border-border overflow-hidden">
      <div 
        ref={scrollRef} 
        className="flex gap-8 whitespace-nowrap"
        style={{ willChange: 'transform' }}
      >
        {/* Duplicate messages for seamless loop */}
        {[...messages, ...messages].map((message, index) => (
          <span
            key={index}
            className="text-sm md:text-base text-text-primary dark:text-text-primary font-medium"
          >
            {message}
          </span>
        ))}
      </div>
    </div>
  );
}
