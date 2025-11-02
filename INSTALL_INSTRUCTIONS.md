# 🚀 Installation Instructions

## ⚡ QUICK START (3 Commands)

```bash
# 1. Fix all imports (removes version numbers)
npm run fix-imports

# 2. Install dependencies
npm install

# 3. Start the app
npm run dev
```

Then open **http://localhost:5173** in your browser! 🎉

---

## What Was Fixed ✅

1. ✅ Updated `package.json` to use `@tailwindcss/postcss` for Tailwind 4.0
2. ✅ Updated `postcss.config.js` to use the new Tailwind PostCSS plugin
3. ✅ Changed all `motion/react` imports to `framer-motion`
4. ✅ Added all missing dependencies (Radix UI, react-hook-form, etc.)
5. ✅ Created `fix-imports.js` script to remove version pinning from imports

---

## Manual Installation (If Script Doesn't Work)

### 1. Delete old node_modules and lock file
```bash
# Windows (Command Prompt)
rmdir /s /q node_modules
del package-lock.json

# Windows (PowerShell)
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

# Mac/Linux
rm -rf node_modules package-lock.json
```

### 2. Install dependencies again
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

### 4. Open your browser
Navigate to: **http://localhost:5173**

---

## What Changed?

### package.json
- Added `@tailwindcss/postcss` as a dev dependency
- Changed `motion` to `framer-motion`

### postcss.config.js
- Changed from `tailwindcss: {}` to `@tailwindcss/postcss: {}`

### All Component Files
- Changed imports from `motion/react` → `framer-motion`
- Changed imports from `@radix-ui/react-*@X.X.X` → `@radix-ui/react-*`
- Changed imports from `class-variance-authority@X.X.X` → `class-variance-authority`
- Changed imports from `lucide-react@X.X.X` → `lucide-react`

---

## If You Still Get Errors

### Clear Vite Cache
```bash
# Delete the .vite cache folder
rm -rf node_modules/.vite
```

### Reinstall with Legacy Peer Deps (if needed)
```bash
npm install --legacy-peer-deps
```

### Check Node Version
```bash
node --version
# Should be 18 or higher
```

---

## Expected Output

After running `npm run dev`, you should see:
```
VITE v5.4.11  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h + enter to show help
```

Then open http://localhost:5173 in your browser! 🎉
