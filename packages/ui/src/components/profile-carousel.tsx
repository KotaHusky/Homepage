'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image, { StaticImageData } from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { usePrefersReducedMotion } from '../lib/media';

export type CarouselImage = { src: StaticImageData; alt: string };

export interface ProfileCarouselProps {
  /** Images to rotate through. Supplied per app (app-specific assets). */
  images: CarouselImage[];
  autoRotateMs?: number;
  clickPauseMs?: number;
}

export function ProfileCarousel({
  images,
  autoRotateMs = 5000,
  clickPauseMs = 15000,
}: ProfileCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reduceMotion = usePrefersReducedMotion();
  const rotateRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pauseRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (rotateRef.current) { clearInterval(rotateRef.current); rotateRef.current = null; }
    if (pauseRef.current) { clearTimeout(pauseRef.current); pauseRef.current = null; }
  }, []);

  const startAutoRotate = useCallback(() => {
    if (rotateRef.current) clearInterval(rotateRef.current);
    rotateRef.current = setInterval(
      () => setActiveIndex((prev) => (prev + 1) % images.length),
      autoRotateMs,
    );
  }, [images.length, autoRotateMs]);

  useEffect(() => {
    if (!isPaused && !reduceMotion) {
      startAutoRotate();
    } else {
      if (rotateRef.current) { clearInterval(rotateRef.current); rotateRef.current = null; }
    }
    return clearTimers;
  }, [isPaused, reduceMotion, startAutoRotate, clearTimers]);

  const handleArrowClick = (direction: 1 | -1) => {
    setActiveIndex((prev) => (prev + direction + images.length) % images.length);
    clearTimers();
    pauseRef.current = setTimeout(() => startAutoRotate(), clickPauseMs);
  };

  const getOffset = (index: number): number => {
    const diff = (index - activeIndex + images.length) % images.length;
    if (diff === 0) return 0;
    if (diff === 1) return 1;
    return -1;
  };

  return (
    <div
      className="my-8 flex items-center justify-center gap-2 md:gap-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Profile photos"
    >
      <button
        onClick={() => handleArrowClick(-1)}
        className="rounded-full text-brand-400/60 hover:text-brand-300 transition-colors p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        aria-label="Previous photo"
      >
        <ChevronLeftIcon className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      <div className="relative h-32 md:h-64 w-[280px] md:w-[560px]">
        {images.map((img, index) => {
          const offset = getOffset(index);
          const isCenter = offset === 0;

          return (
            <div
              key={img.alt}
              className="absolute top-1/2 left-1/2 w-32 h-32 md:w-64 md:h-64 rounded-full overflow-hidden border border-brand-700/70 transition-all duration-700 ease-in-out"
              style={{
                // Inline opacity (not an `opacity-*` class) so it actually wins —
                // a Tailwind class here would be overridden by this inline style.
                transform: `translate(-50%, -50%) translateX(${offset * 85}%) scale(${isCenter ? 1 : 0.5})`,
                opacity: 0.9,
                zIndex: isCenter ? 10 : 0,
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={256}
                height={256}
                className="w-full h-full object-cover"
                placeholder="blur"
                priority={index === 0}
              />
            </div>
          );
        })}
      </div>

      <button
        onClick={() => handleArrowClick(1)}
        className="rounded-full text-brand-400/60 hover:text-brand-300 transition-colors p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        aria-label="Next photo"
      >
        <ChevronRightIcon className="w-6 h-6 md:w-8 md:h-8" />
      </button>
    </div>
  );
}

export default ProfileCarousel;
