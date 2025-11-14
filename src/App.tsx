import React, { useState } from 'react';
import { CatStack } from './components/CatStack';
import { ResultsPage } from './components/ResultsPage';
import { Instructions } from './components/Instructions';
import { useCats } from './hooks';
import type { Cat } from './types';
import './App.css';

function App() {
  const { cats, loading } = useCats();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedCats, setLikedCats] = useState<Cat[]>([]);
  const [showInstructions, setShowInstructions] = useState(true);

  const isComplete = currentIndex >= cats.length;

  const handleSwipe = (direction: 'left' | 'right') => {
    if (currentIndex < cats.length) {
      const currentCat = cats[currentIndex];
      if (direction === 'right') {
        setLikedCats((prev) => [...prev, currentCat]);
      }
      // Small delay before moving to next cat for smooth animation
      setTimeout(() => {
        setCurrentIndex((i) => i + 1);
      }, 100);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setLikedCats([]);
    setShowInstructions(true);
  };

  return (
    <>
      <Instructions 
        isVisible={showInstructions && !loading}
        onStart={() => setShowInstructions(false)}
      />
      
      {!isComplete ? (
        <div className="w-full h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden flex flex-col items-center justify-center">
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 bg-white shadow-sm px-4 py-4 flex justify-between items-center z-20">
            <h1 className="text-2xl font-bold text-primary">🐱 Paw & Preferences</h1>
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="text-sm bg-secondary text-white px-3 py-1 rounded-full hover:bg-opacity-80 transition"
            >
              ℹ️ Help
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1 w-full flex items-center justify-center mt-20">
            <div className="w-full max-w-sm px-4">
              <CatStack
                cats={cats}
                currentIndex={currentIndex}
                onSwipe={handleSwipe}
                loading={loading}
              />
            </div>
          </div>

          {/* Instructions at bottom */}
          <div className="absolute bottom-0 left-0 right-0 bg-white shadow-lg px-4 py-6">
            <div className="max-w-sm mx-auto flex justify-around items-center">
              <div className="text-center">
                <div className="text-2xl mb-1">👈</div>
                <p className="text-xs text-gray-600 font-semibold">Swipe Left = Nope</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-primary bg-primary bg-opacity-10 px-3 py-1 rounded-full">
                  {currentIndex + 1} / {cats.length}
                </span>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">👉</div>
                <p className="text-xs text-gray-600 font-semibold">Swipe Right = Like</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ResultsPage
          likedCats={likedCats}
          totalCats={cats.length}
          onReset={handleReset}
        />
      )}
    </>
  );
}

export default App;
