# 🚀 Quick Setup Guide for ServiSphere AI

## Step-by-Step Installation

### Option 1: Using npm (Recommended)

```bash
# 1. Navigate to project directory
cd servisphere-ai

# 2. Install all dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser to http://localhost:5173
```

### Option 2: Using yarn

```bash
yarn install
yarn dev
```

### Option 3: Using pnpm (Fastest)

```bash
pnpm install
pnpm dev
```

## What Gets Installed

The project will install these key dependencies:

### Core Libraries
- `react` & `react-dom` - UI framework
- `typescript` - Type safety
- `vite` - Fast build tool

### Animation & Motion
- `motion` (v10.18.0) - Smooth animations throughout the app

### UI & Icons
- `lucide-react` - Beautiful icon library
- `@radix-ui/*` - Accessible UI primitives for shadcn components

### Data Visualization
- `recharts` - Charts and graphs

### Styling
- `tailwindcss` (v4.0) - Utility-first CSS
- `clsx` & `tailwind-merge` - Class name management

## Troubleshooting

### Port Already in Use
If port 5173 is busy, Vite will automatically use the next available port (5174, 5175, etc.)

### Installation Errors

**Node version issues:**
```bash
# Check your Node version (should be 18+)
node --version

# If too old, update Node.js from nodejs.org
```

**Clear cache and reinstall:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Windows users - if you get permission errors:**
```bash
# Run terminal as Administrator, or use:
npm install --legacy-peer-deps
```

### Build Errors

If you see TypeScript errors:
```bash
# Clear TypeScript cache
rm -rf node_modules/.vite
npm run dev
```

## Project Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production (outputs to `/dist`) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Check code for errors |

## File Structure Overview

```
servisphere-ai/
├── index.html              ← Entry HTML file
├── main.tsx                ← React app entry point
├── App.tsx                 ← Main app component with navigation
├── components/             ← All React components
│   ├── HomeScreen.tsx
│   ├── AIChatAssistant.tsx
│   ├── SmartMatchResults.tsx
│   ├── ProviderDashboard.tsx
│   ├── TrustVerification.tsx
│   ├── BangladeshImpact.tsx
│   ├── figma/              ← Image handling
│   └── ui/                 ← Shadcn components (buttons, cards, etc.)
├── styles/
│   └── globals.css         ← Global styles & Tailwind config
├── package.json            ← Dependencies list
├── vite.config.ts          ← Vite configuration
├── tsconfig.json           ← TypeScript configuration
└── tailwind.config.js      ← Tailwind configuration
```

## First Time Setup Checklist

- [ ] Node.js 18+ installed
- [ ] Project folder downloaded/cloned
- [ ] Opened terminal in project directory
- [ ] Ran `npm install`
- [ ] Ran `npm run dev`
- [ ] Browser opened to `http://localhost:5173`
- [ ] App loaded successfully! 🎉

## Next Steps After Setup

1. **Explore the screens** - Click through all 6 navigation items
2. **Try mobile view** - Resize browser or open DevTools (F12) mobile view
3. **Test interactions** - Click buttons, hover over cards, try the AI chat
4. **Enable dark mode** - Go to Provider Dashboard and toggle theme
5. **Customize** - Edit colors, text, or add new features!

## Need Help?

### Common First-Time Issues

**"Module not found" errors:**
- Make sure you ran `npm install` first
- Check that you're in the correct directory

**"Port 5173 refused" errors:**
- Try `npm run dev` again
- Check if another app is using port 5173

**Blank white screen:**
- Check browser console (F12) for errors
- Make sure `main.tsx` and `index.html` exist
- Try clearing browser cache

**Styling looks broken:**
- Check that `styles/globals.css` exists
- Make sure Tailwind installed correctly: `npm list tailwindcss`

## Production Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized build in the `/dist` folder.

### Deploy to Platforms

**Vercel (Recommended):**
```bash
npm i -g vercel
vercel
```

**Netlify:**
```bash
npm run build
# Then drag /dist folder to netlify.com/drop
```

**GitHub Pages:**
```bash
npm run build
# Push /dist contents to gh-pages branch
```

## Development Tips

### Hot Reload
Vite automatically reloads when you save files. No need to refresh!

### VS Code Extensions (Recommended)
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar)
- Error Lens

### Performance
Development server loads in ~1 second. Production builds are optimized and tree-shaken.

---

**Ready to start?** Run `npm install` then `npm run dev` 🚀
