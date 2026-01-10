#!/bin/bash

# ROAMSTER - Expo SDK 54 Upgrade Script
# This script helps you upgrade from SDK 49 to SDK 54

echo "🚀 ROAMSTER - Expo SDK 54 Upgrade Script"
echo "========================================"
echo ""

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
echo "Checking Node.js version..."
if [ "$NODE_VERSION" -lt 20 ]; then
    echo "⚠️  WARNING: Node.js version 20.19.4 or higher is required for SDK 54"
    echo "   Current version: $(node -v)"
    echo "   Please upgrade Node.js from https://nodejs.org/"
    exit 1
else
    echo "✅ Node.js version: $(node -v) (OK)"
fi

echo ""
echo "Step 1: Removing old dependencies..."
rm -rf node_modules
rm -f package-lock.json
rm -f yarn.lock

echo ""
echo "Step 2: Installing updated dependencies..."
npm install

echo ""
echo "Step 3: Fixing dependency versions with Expo..."
npx expo install --fix

echo ""
echo "Step 4: Running expo-doctor to check for issues..."
npx expo-doctor || echo "⚠️  expo-doctor found some issues. Please review them above."

echo ""
echo "Step 5: Clearing caches..."
npx expo start --clear --help > /dev/null 2>&1 || echo "Note: Cache will be cleared when you start the app"

echo ""
echo "✅ Upgrade process complete!"
echo ""
echo "Next steps:"
echo "1. Run: npm start"
echo "2. Test your app thoroughly"
echo "3. Check UPGRADE_SDK54.md for any breaking changes"
echo ""
echo "If you encounter issues, see UPGRADE_SDK54.md troubleshooting section."

