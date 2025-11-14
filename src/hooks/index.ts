import { useState, useEffect, useCallback } from 'react';
import type { Cat } from '../types';

const CATS_COUNT = 20;

export const useCats = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        setLoading(true);
        // Fetch cats from Cataas API
        // We'll generate random cat URLs from Cataas
        const generatedCats: Cat[] = Array.from({ length: CATS_COUNT }, (_, i) => ({
          id: `cat-${i}`,
          url: `https://cataas.com/cat?timestamp=${Date.now() + i}`,
          tags: []
        }));
        setCats(generatedCats);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch cats');
        setCats([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCats();
  }, []);

  return { cats, loading, error };
};

export const useSwipeGesture = () => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.targetTouches[0].clientX);
    setSwipeDirection(null);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback((): 'left' | 'right' | null => {
    if (!touchStart || !touchEnd) return null;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setSwipeDirection('left');
      return 'left';
    }
    if (isRightSwipe) {
      setSwipeDirection('right');
      return 'right';
    }

    return null;
  }, [touchStart, touchEnd]);

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    swipeDirection,
    setSwipeDirection
  };
};
