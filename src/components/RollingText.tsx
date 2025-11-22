'use client';

import { useRef, useEffect } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
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
      if (Math.abs(xPos.current) >= scrollRef.current.scrollWidth / 2) {
        xPos.current = 0;
      }
      scrollRef.current.style.transform = `translateX(${xPos.current}px)`;
    }
  });

  return (
    <div className="glass-effect rounded-lg p-4 border border-border dark:border-border overflow-hidden">
      <div ref={scrollRef} className="flex gap-8 whitespace-nowrap">
        {[...messages, ...messages].map((message, index) => (
          <span
            key={index}
            className="text-text-primary dark:text-text-primary font-medium"
          >
            {message}
          </span>
        ))}
      </div>
    </div>
  );
}
