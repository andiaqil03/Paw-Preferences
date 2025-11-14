import React from 'react';
import type { Cat } from '../types';

interface ResultsPageProps {
  likedCats: Cat[];
  totalCats: number;
  onReset: () => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({ 
  likedCats, 
  totalCats, 
  onReset 
}) => {
  const percentage = Math.round((likedCats.length / totalCats) * 100);

  const getMessage = () => {
    if (percentage > 80) return '🐱 Cat Lover Extraordinaire! You have got excellent taste!';
    if (percentage >= 50) return '😺 Great Taste! You know a quality cat when you see one!';
    if (percentage >= 20) return '🤔 Particular Preferences! You know exactly what you like!';
    return '😼 Pretty Picky! You are a true connoisseur!';
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-primary to-secondary py-8 px-4 overflow-y-auto">
      {/* Header */}
      <div className="max-w-2xl mx-auto text-center mb-8 animate-bounce-in">
        <h1 className="text-5xl font-bold text-white mb-2">🎉 Results! 🎉</h1>
        <p className="text-xl text-white opacity-90">Your cat preferences revealed</p>
      </div>

      {/* Stats Card */}
      <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 shadow-2xl mb-8 animate-bounce-in">
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="text-center">
            <div className="text-5xl font-bold text-primary">{likedCats.length}</div>
            <p className="text-gray-600 mt-2 text-lg">Cats Liked</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-secondary">{percentage}%</div>
            <p className="text-gray-600 mt-2 text-lg">Approval Rating</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-4 mb-4">
          <p className="text-center text-gray-700 text-lg font-semibold">
            {getMessage()}
          </p>
        </div>

        <div className="text-center text-sm text-gray-500">
          You reviewed {totalCats} amazing cats!
        </div>
      </div>

      {/* Liked Cats Gallery */}
      {likedCats.length > 0 && (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-6 shadow-2xl mb-8 animate-bounce-in">
          <h2 className="text-2xl font-bold text-dark mb-4">Your Favorite Felines ❤️</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {likedCats.map((cat, index) => (
              <div
                key={cat.id}
                className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                style={{
                  animationDelay: `${index * 0.05}s`
                }}
              >
                <img
                  src={cat.url}
                  alt={`Liked cat ${index + 1}`}
                  className="w-full h-32 object-cover hover:scale-105 transition-transform"
                  onError={(e) => {
                    e.currentTarget.src = `https://cataas.com/cat?timestamp=${Date.now() + index}`;
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Likes Message */}
      {likedCats.length === 0 && (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-2xl text-center">
          <p className="text-2xl text-gray-700 mb-2">😹 No cats caught your eye?</p>
          <p className="text-lg text-gray-600">Everyone likes different cats! Give it another go.</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="max-w-2xl mx-auto flex flex-col gap-4 mt-8 mb-8">
        <button
          onClick={onReset}
          className="w-full bg-white text-primary font-bold py-4 px-6 rounded-xl hover:bg-gray-50 transition shadow-lg text-lg"
        >
          🔄 Try Again
        </button>
        <a
          href="https://cataas.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-dark text-white font-bold py-4 px-6 rounded-xl hover:bg-opacity-80 transition shadow-lg text-lg text-center"
        >
          🐾 Explore More Cats
        </a>
      </div>

      {/* Fun Facts */}
      <div className="max-w-2xl mx-auto bg-white bg-opacity-20 rounded-xl p-6 text-white text-center">
        <p className="text-lg opacity-90">
          💡 Did you know? Cats have over 230 bones in their body and can rotate their ears 180 degrees!
        </p>
      </div>
    </div>
  );
};
