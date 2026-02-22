'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image, { StaticImageData } from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import kotaImg from '../../public/images/kota.webp';
import kota2Img from '../../public/images/kota2.webp';
import meImg from '../../public/images/me.webp';

type CarouselImage = { src: StaticImageData; alt: string };

const images: CarouselImage[] = [
  { src: kotaImg, alt: 'Kota Husky profile photo' },
  { src: kota2Img, alt: 'Kota Husky profile photo 2' },
  { src: meImg, alt: 'Kota Husky profile photo 3' },
];

const AUTO_ROTATE_MS = 5000;
const CLICK_PAUSE_MS = 15000;

export function ProfileCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
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
      AUTO_ROTATE_MS,
    );
  }, []);

  useEffect(() => {
    if (!isPaused) {
      startAutoRotate();
    } else {
      if (rotateRef.current) { clearInterval(rotateRef.current); rotateRef.current = null; }
    }
    return clearTimers;
  }, [isPaused, startAutoRotate, clearTimers]);

  const handleArrowClick = (direction: 1 | -1) => {
    setActiveIndex((prev) => (prev + direction + images.length) % images.length);
    clearTimers();
    pauseRef.current = setTimeout(() => startAutoRotate(), CLICK_PAUSE_MS);
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
    >
      <button
        onClick={() => handleArrowClick(-1)}
        className="text-gray-400 hover:text-white transition-colors p-1"
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
              className="absolute top-1/2 left-1/2 w-32 h-32 md:w-64 md:h-64 rounded-full overflow-hidden transition-all duration-700 ease-in-out"
              style={{
                transform: `translate(-50%, -50%) translateX(${offset * 85}%) scale(${isCenter ? 1 : 0.5})`,
                opacity: 1,
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
        className="text-gray-400 hover:text-white transition-colors p-1"
        aria-label="Next photo"
      >
        <ChevronRightIcon className="w-6 h-6 md:w-8 md:h-8" />
      </button>
    </div>
  );
}

export default ProfileCarousel;
