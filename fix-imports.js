#!/usr/bin/env node

/**
 * This script removes version numbers from all imports in .tsx files
 * Example: "@radix-ui/react-slot@1.1.2" becomes "@radix-ui/react-slot"
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

function getAllTsxFiles(dir, fileList = []) {
  const files = readdirSync(dir);
  
  files.forEach(file => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);
    
    if (stat.isDirectory()) {
      getAllTsxFiles(filePath, fileList);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

function fixImportsInFile(filePath) {
  let content = readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Pattern to match imports with version numbers
  // Matches: from "package@1.2.3" or from 'package@1.2.3'
  const pattern = /(from\s+["'])([^"']+)@\d+\.\d+(\.\d+)?(["'])/g;
  
  const newContent = content.replace(pattern, (match, prefix, packageName, patch, suffix) => {
    modified = true;
    return `${prefix}${packageName}${suffix}`;
  });
  
  if (modified) {
    writeFileSync(filePath, newContent, 'utf8');
    console.log(`✅ Fixed: ${filePath}`);
    return true;
  }
  
  return false;
}

console.log('🔧 Fixing versioned imports...\n');

const tsxFiles = getAllTsxFiles('.');
let fixedCount = 0;

tsxFiles.forEach(file => {
  if (fixImportsInFile(file)) {
    fixedCount++;
  }
});

console.log(`\n✨ Done! Fixed ${fixedCount} files.`);
console.log('\n📦 Now run: npm install');
console.log('🚀 Then run: npm run dev\n');
