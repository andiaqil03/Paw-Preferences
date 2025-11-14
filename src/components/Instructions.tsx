import React from 'react';

interface InstructionsProps {
  isVisible: boolean;
  onStart?: () => void;
}

export const Instructions: React.FC<InstructionsProps> = ({ isVisible, onStart }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-sm animate-bounce-in">
        <h2 className="text-3xl font-bold mb-4 text-dark">🐱 Cat Swipe Guide</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <span className="text-3xl">👉</span>
            <div>
              <p className="font-semibold text-dark">Swipe Right = Like</p>
              <p className="text-sm text-gray-600">Love this adorable kitty!</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-3xl">👈</span>
            <div>
              <p className="font-semibold text-dark">Swipe Left = Nope</p>
              <p className="text-sm text-gray-600">Not your cup of tea</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-3xl">🎯</span>
            <div>
              <p className="font-semibold text-dark">Go Through All</p>
              <p className="text-sm text-gray-600">Rate all 20 cats to see your results!</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => onStart?.()}
          className="w-full mt-6 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition"
        >
          Let's Start! 🚀
        </button>
      </div>
    </div>
  );
};
