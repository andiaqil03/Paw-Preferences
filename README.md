# 🐱 Cat Swipe Discovery

A delightful single-page web application that helps you discover your cat preferences through swipe gestures, inspired by popular dating apps!

## ✨ Features

- **Swipe-based Cat Discovery**: Swipe right to like, swipe left to pass on adorable felines
- **Beautiful UI**: Smooth animations and a gradient-rich design optimized for mobile devices
- **Real Cat Images**: Fetches random cat pictures from [Cataas API](https://cataas.com/)
- **Results Summary**: View your approval rate and gallery of liked cats
- **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **Gesture Support**: Touch swipes on mobile and mouse dragging on desktop

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Navigate to project directory
cd cat-swipe-discovery

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will automatically open at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 🎮 How to Play

1. **Browse Cats**: View a series of cute cat images
2. **Swipe Right** (👉) or drag right: Like this cat! ❤️
3. **Swipe Left** (👈) or drag left: Not your cup of tea 🚫
4. **Rate All**: Go through all 20 cats to see your results
5. **View Results**: See your approval rate and favorite cats gallery

## 📱 Mobile Experience

The app is optimized for mobile:
- Full-screen immersive experience
- Touch gestures feel natural and responsive
- Smooth card animations
- Portrait orientation support
- Easy thumb access to swipe controls

## 🛠️ Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling and responsive design
- **Vite** - Fast build tool and dev server

## 📂 Project Structure

```
src/
├── components/
│   ├── CatCard.tsx       # Individual card display
│   ├── CatStack.tsx      # Card stack with swipe logic
│   ├── Instructions.tsx  # Help modal
│   └── ResultsPage.tsx   # Final results display
├── hooks/
│   └── index.ts          # Custom React hooks
├── types/
│   └── index.ts          # TypeScript types
├── App.tsx               # Main app component
├── main.tsx              # React entry point
├── index.css             # Global styles
└── App.css               # App-specific styles
```

## 🎨 Customization

### Change Number of Cats
Edit `src/hooks/index.ts`:
```typescript
const CATS_COUNT = 50; // Change from 20 to 50
```

### Customize Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: '#your-color',
  secondary: '#your-color',
  // ...
}
```

## 🐱 About Cataas

This app uses the free [Cataas API](https://cataas.com/) to fetch random cat images. Thanks to the amazing Cataas community!

## 📄 License

MIT License - Feel free to use and modify for your own projects!

## 🐾 Fun Facts

- Cats have over 230 bones in their bodies (humans have 206!)
- A cat's purr vibrates at a frequency that may promote bone healing
- Cats spend 70% of their lives sleeping
- A group of cats is called a "clowder"

---

Made with ❤️ and 🐱 for cat lovers everywhere!
