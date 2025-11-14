import React from 'react';
import type { Cat } from '../types';

interface CatStackProps {
  cats: Cat[];
  currentIndex: number;
  onSwipe: (direction: 'left' | 'right') => void;
  loading: boolean;
}

export const CatStack: React.FC<CatStackProps> = ({ 
  cats, 
  currentIndex, 
  onSwipe,
  loading 
}) => {
  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const [swipeOffset, setSwipeOffset] = React.useState(0);
  const [rotation, setRotation] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [nextImageLoaded, setNextImageLoaded] = React.useState(false);

  // Reset state when currentIndex changes (new cat loaded)
  React.useEffect(() => {
    setSwipeOffset(0);
    setRotation(0);
    setIsAnimating(false);
    setTouchStart(null);
    setImageLoaded(false);
    setNextImageLoaded(false);
  }, [currentIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsAnimating(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const currentX = e.targetTouches[0].clientX;
    const distance = currentX - touchStart;
    
    // Limit the swipe distance for smoother feel
    const limitedDistance = Math.max(-250, Math.min(250, distance));
    
    // Calculate rotation based on swipe distance
    const rot = (limitedDistance / window.innerWidth) * 20;
    setRotation(rot);
    setSwipeOffset(limitedDistance);
  };

  const handleTouchEnd = () => {
    const threshold = 100;

    setIsAnimating(true);

    if (swipeOffset > threshold) {
      // Swiped right (like)
      onSwipe('right');
    } else if (swipeOffset < -threshold) {
      // Swiped left (dislike)
      onSwipe('left');
    } else {
      // Not enough swipe, reset
      setSwipeOffset(0);
      setRotation(0);
      setIsAnimating(false);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setTouchStart(e.clientX);
    setIsAnimating(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons !== 1 || !touchStart) return;
    const distance = e.clientX - touchStart;
    
    // Limit the swipe distance for smoother feel
    const limitedDistance = Math.max(-250, Math.min(250, distance));
    
    const rot = (limitedDistance / window.innerWidth) * 20;
    setRotation(rot);
    setSwipeOffset(limitedDistance);
  };

  const handleMouseUp = () => {
    if (!touchStart) return;
    const distance = -swipeOffset;
    const threshold = 100;

    setIsAnimating(true);

    if (distance > threshold) {
      onSwipe('left');
    } else if (distance < -threshold) {
      onSwipe('right');
    } else {
      setSwipeOffset(0);
      setRotation(0);
      setIsAnimating(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-gray-600">Loading adorable cats...</p>
        </div>
      </div>
    );
  }

  if (!cats.length || currentIndex >= cats.length) {
    return null;
  }

  const cat = cats[currentIndex];
  const nextCat = currentIndex + 1 < cats.length ? cats[currentIndex + 1] : null;

  // Preload next image to reduce flicker and cache issues
  React.useEffect(() => {
    if (nextCat) {
      const img = new Image();
      img.src = nextCat.url;
    }
  }, [nextCat]);

  return (
    <div className="relative w-full h-full flex items-center justify-center px-4">
      {/* Stack effect - next cat */}
      {nextCat && (
        <div
          className="absolute w-full max-w-sm h-96 rounded-3xl overflow-hidden shadow-lg"
          style={{
            transform: 'translateY(12px)',
            zIndex: 0,
            opacity: nextImageLoaded ? 0.8 : 0.4,
            transition: 'opacity 0.3s ease-in-out'
          }}
        >
          <img
            src={nextCat.url}
            alt="Next cat"
            className="w-full h-full object-cover"
            onLoad={() => setNextImageLoaded(true)}
            onError={(e) => {
              e.currentTarget.src = `https://cataas.com/cat?timestamp=${Date.now()}`;
            }}
          />
        </div>
      )}

      {/* Current card */}
      <div key={cat.id}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="absolute w-full max-w-sm h-96 rounded-3xl overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing select-none z-10 bg-gradient-to-br from-gray-200 to-gray-300"
        style={{
          transform: isAnimating 
            ? `translateX(${swipeOffset > 0 ? 500 : -500}px) rotateZ(${swipeOffset > 0 ? 20 : -20}deg)`
            : `translateX(${swipeOffset}px) rotateZ(${rotation}deg)`,
          transition: isAnimating ? 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'transform 0.08s linear',
          opacity: imageLoaded ? 1 : 0.7
        }}
      >
        <img
          src={cat.url}
          alt="Cat to swipe"
          className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.currentTarget.src = `https://cataas.com/cat?timestamp=${Date.now()}`;
          }}
        />
      </div>

      {/* UI Indicators */}
      <div className="absolute top-4 left-4 z-20 text-white font-bold text-lg drop-shadow-lg">
        <span className="bg-primary rounded-full px-3 py-1 inline-block">
          {currentIndex + 1} / {cats.length}
        </span>
      </div>

      {/* Like/Dislike Labels */}
      {swipeOffset > 0 && (
        <div className="absolute right-8 top-20 z-20 transform -rotate-12">
          <div className="text-6xl font-bold text-green-500 drop-shadow-lg opacity-75">
            LIKE ❤️
          </div>
        </div>
      )}
      {swipeOffset < 0 && (
        <div className="absolute left-8 top-20 z-20 transform rotate-12">
          <div className="text-6xl font-bold text-red-500 drop-shadow-lg opacity-75">
            NOPE 🚫
          </div>
        </div>
      )}
    </div>
  );
};
