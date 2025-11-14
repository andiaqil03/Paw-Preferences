import React from 'react';
import type { Cat } from '../types';

interface CatCardProps {
  cat: Cat;
  swipeDirection: 'left' | 'right' | null;
  onSwipeComplete: () => void;
  isVisible: boolean;
}

export const CatCard: React.FC<CatCardProps> = ({ 
  cat, 
  swipeDirection, 
  onSwipeComplete,
  isVisible 
}) => {
  React.useEffect(() => {
    if (swipeDirection) {
      const timer = setTimeout(onSwipeComplete, 600);
      return () => clearTimeout(timer);
    }
  }, [swipeDirection, onSwipeComplete]);

  const animationClass = swipeDirection === 'right' 
    ? 'animate-swipe-out-right' 
    : swipeDirection === 'left' 
    ? 'animate-swipe-out-left' 
    : isVisible 
    ? 'animate-bounce-in' 
    : '';

  return (
    <div
      className={`
        relative w-full h-full rounded-3xl overflow-hidden shadow-2xl
        transition-transform duration-300 ${animationClass}
        bg-gradient-to-br from-gray-100 to-gray-200
      `}
    >
      <img
        src={cat.url}
        alt="Cute cat"
        className="w-full h-full object-cover"
        onError={(e) => {
          e.currentTarget.src = `https://cataas.com/cat?timestamp=${Date.now()}`;
        }}
      />
    </div>
  );
};
