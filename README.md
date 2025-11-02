# ServiSphere AI

A futuristic AI-powered service marketplace connecting users with trusted local providers in Bangladesh. Built with React, TypeScript, Tailwind CSS, and Motion animations.

## Features

- 🏠 **Home Screen** - Voice search, AI recommendations, service categories
- 💬 **AI Chat Assistant** - Interactive AI assistant "Sphero" for service matching
- 🔍 **Smart Match Results** - AI-powered provider ranking with transparency
- 📊 **Provider Dashboard** - Analytics, forecasts, and AI insights
- 🛡️ **Trust Verification** - Multi-layer verification with NFT badges
- 🌍 **Bangladesh Impact** - Social and economic impact visualization

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS 4.0** - Styling
- **Motion React** - Animations
- **Recharts** - Data visualizations
- **Lucide React** - Icons
- **Radix UI** - Accessible components

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. **Install dependencies:**

```bash
npm install
```

2. **Run development server:**

```bash
npm run dev
```

3. **Open your browser:**

Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Project Structure

```
servisphere-ai/
├── components/
│   ├── HomeScreen.tsx           # Landing page with voice search
│   ├── AIChatAssistant.tsx      # AI chat interface
│   ├── SmartMatchResults.tsx    # Provider search results
│   ├── ProviderDashboard.tsx    # Analytics dashboard
│   ├── TrustVerification.tsx    # Verification center
│   ├── BangladeshImpact.tsx     # Impact metrics
│   ├── figma/
│   │   └── ImageWithFallback.tsx
│   └── ui/                       # Shadcn UI components
├── styles/
│   └── globals.css              # Global styles & Tailwind
├── App.tsx                       # Main app with navigation
├── main.tsx                      # React entry point
└── index.html                    # HTML template
```

## Key Features Explained

### Glassmorphism UI
All cards and overlays use a glassmorphism design with:
- `backdrop-blur-xl` for blur effect
- `bg-white/70` for transparency
- Soft shadows and borders

### Color Palette
- **Primary**: Royal Blue `#2F6CFF`
- **Accent**: Vibrant Orange `#FF8C42`
- **Background**: Off-white `#F7F9FB`
- **Text**: Deep Gray `#1F2937`

### Animations
- Page transitions with Motion
- Floating particles and gradient orbs
- Micro-interactions on all buttons
- Smooth chart animations

## Screens

1. **Home** - Service discovery with AI recommendations
2. **AI Chat** - Conversational interface with Sphero assistant
3. **Smart Match** - Provider results with AI ranking transparency
4. **Dashboard** - Provider analytics with dark mode
5. **Trust Center** - Verification badges and security features
6. **Impact** - Bangladesh-focused social impact metrics

## Development

### Adding New Components

1. Create component in `/components`
2. Import in `App.tsx`
3. Add navigation item

### Customizing Colors

Edit Tailwind classes in components or update `globals.css` for theme-wide changes.

## License

MIT License - feel free to use for your projects!

## Credits

Built with ❤️ for the Bangladesh service marketplace ecosystem.
"# Sheba_AI_BD" 
