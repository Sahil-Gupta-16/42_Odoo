/**
 * DynamicBackground Component (Subtle Version)
 * 
 * Purpose:
 * - Elegant, minimal animated background for auth pages
 * - Subtle particle movement with gentle interactions
 * - Professional and non-distracting
 * 
 * Features:
 * - Subtle floating particles
 * - Gentle mouse interaction
 * - Smooth animations
 * - Dark mode support
 * - Performance optimized
 */

'use client';

import { useEffect, useRef } from 'react';
import { useUIStore } from '@/store/useUIStore';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  baseOpacity: number;
}

export default function DynamicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useUIStore();
  const isDark = theme === 'dark';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle configuration - More subtle
    const particles: Particle[] = [];
    const particleCount = 40; // Reduced from 80
    const particleSpeed = 0.15; // Slower movement
    
    // More subtle colors
    const particleColor = isDark 
      ? 'rgba(96, 165, 250, 0.15)'  // Very light blue for dark mode
      : 'rgba(37, 99, 235, 0.1)';   // Very light blue for light mode

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      const baseOpacity = Math.random() * 0.3 + 0.1; // Lower base opacity
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * particleSpeed,
        vy: (Math.random() - 0.5) * particleSpeed,
        size: Math.random() * 2 + 0.5, // Smaller particles
        opacity: baseOpacity,
        baseOpacity: baseOpacity,
      });
    }

    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let animationId: number;
    const animate = () => {
      // Subtle fade effect instead of clear
      ctx.fillStyle = isDark 
        ? 'rgba(17, 24, 39, 0.05)'   // Dark background fade
        : 'rgba(255, 255, 255, 0.05)'; // Light background fade
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle) => {
        // Very gentle mouse interaction
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200) {
          const force = (200 - distance) / 200;
          particle.vx -= (dx / distance) * force * 0.02; // Reduced force
          particle.vy -= (dy / distance) * force * 0.02;
          
          // Subtle opacity increase near mouse
          particle.opacity = Math.min(particle.baseOpacity * 2, 0.5);
        } else {
          // Fade back to base opacity
          particle.opacity = particle.baseOpacity;
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Strong damping for smooth movement
        particle.vx *= 0.98;
        particle.vy *= 0.98;

        // Add slight random movement for organic feel
        particle.vx += (Math.random() - 0.5) * 0.01;
        particle.vy += (Math.random() - 0.5) * 0.01;

        // Keep velocity in check
        const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
        if (speed > particleSpeed) {
          particle.vx = (particle.vx / speed) * particleSpeed;
          particle.vy = (particle.vy / speed) * particleSpeed;
        }

        // Wrap around edges with smooth transition
        if (particle.x < -20) particle.x = canvas.width + 20;
        if (particle.x > canvas.width + 20) particle.x = -20;
        if (particle.y < -20) particle.y = canvas.height + 20;
        if (particle.y > canvas.height + 20) particle.y = -20;

        // Draw particle with glow effect
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        
        // Add subtle glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        );
        
        const color = isDark ? '96, 165, 250' : '37, 99, 235';
        gradient.addColorStop(0, `rgba(${color}, ${particle.opacity})`);
        gradient.addColorStop(1, `rgba(${color}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // Draw very subtle connections - only nearby particles
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Only connect very close particles
          if (distance < 80) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const opacity = (1 - distance / 80) * 0.08; // Very subtle lines
            ctx.strokeStyle = isDark 
              ? `rgba(96, 165, 250, ${opacity})`
              : `rgba(37, 99, 235, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.4 }} // Reduced overall opacity
    />
  );
}
