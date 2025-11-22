'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function DynamicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let points: Point[] = [];
    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const initPoints = () => {
      points = [];
      const numPoints = Math.floor((width * height) / 15000); // Density
      for (let i = 0; i < numPoints; i++) {
        points.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5, // Velocity
          vy: (Math.random() - 0.5) * 0.5,
        });
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initPoints();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Color settings based on theme (approximate, as we don't have direct access to theme variables in canvas easily without parsing)
      // We'll use a subtle color that works for both or check the class
      const isDark = document.documentElement.classList.contains('dark');
      const color = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
      const connectionColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';

      ctx.fillStyle = color;
      ctx.strokeStyle = connectionColor;

      // Update and draw points
      points.forEach((point, i) => {
        point.x += point.vx;
        point.y += point.vy;

        // Bounce off edges
        if (point.x < 0 || point.x > width) point.vx *= -1;
        if (point.y < 0 || point.y > height) point.vy *= -1;

        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < points.length; j++) {
          const p2 = points[j];
          const dx = point.x - p2.x;
          const dy = point.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) { // Connection distance
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-0 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
