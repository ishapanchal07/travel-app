# How to Run ROAMSTER Project

## Prerequisites

Before running the project, make sure you have:

1. **Node.js** (v20.19.4 or higher, v22.x LTS recommended) - [Download here](https://nodejs.org/)
2. **npm** (comes with Node.js) or **yarn**
3. **Expo CLI** (optional - can use npx instead)
4. **Expo Go App** (for physical device) - Available on [iOS App Store](https://apps.apple.com/app/expo-go/id982107779) and [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

### For iOS Development (Mac only):
- Xcode (from App Store)
- iOS Simulator

### For Android Development:
- Android Studio
- Android Emulator

---

## Step-by-Step Instructions

### Method 1: Using Physical Device (Recommended for Quick Testing)

#### Step 1: Install Dependencies
Open terminal/command prompt in the project directory and run:

```bash
npm install
```

This will install all required packages listed in `package.json`.

#### Step 2: Start the Development Server
```bash
npm start
```

Or if you prefer using npx:
```bash
npx expo start
```

#### Step 3: Run on Your Phone
1. **Install Expo Go** on your phone:
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - Android: [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **Connect to the same WiFi** as your computer

3. **Scan the QR Code**:
   - **iOS**: Open Camera app and scan the QR code
   - **Android**: Open Expo Go app and tap "Scan QR Code"

4. The app will load on your device!

---

### Method 2: Using iOS Simulator (Mac only)

#### Step 1: Install Dependencies
```bash
npm install
```

#### Step 2: Start Expo and Open iOS Simulator
```bash
npm start
```

Then press `i` in the terminal, or run:
```bash
npm run ios
```

This will:
- Start the Expo development server
- Open iOS Simulator automatically
- Load the app in the simulator

---

### Method 3: Using Android Emulator

#### Step 1: Install Dependencies
```bash
npm install
```

#### Step 2: Start Android Emulator
Make sure Android Studio is installed and an emulator is running.

#### Step 3: Start Expo and Open Android
```bash
npm start
```

Then press `a` in the terminal, or run:
```bash
npm run android
```

This will:
- Start the Expo development server
- Open Android Emulator
- Load the app in the emulator

---

## Quick Commands Reference

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on iOS (Mac only)
npm run ios

# Run on Android
npm run android

# Run on Web (limited functionality)
npm run web

# Clear cache and restart
npx expo start -c
```

---

## Troubleshooting

### Issue: "Command not found: expo"
**Solution**: Use `npx expo start` instead of `expo start`, or install Expo CLI globally:
```bash
npm install -g expo-cli
```

### Issue: "Metro bundler errors" or "Module not found"
**Solution**: Clear cache and reinstall:
```bash
# Clear cache
npx expo start -c

# Or delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Issue: "Unable to connect to Expo"
**Solution**: 
- Make sure your phone and computer are on the same WiFi network
- Try using tunnel mode: `npx expo start --tunnel`
- Check firewall settings

### Issue: "Port 19000 already in use"
**Solution**: Kill the process using the port:
```bash
# On Mac/Linux
lsof -ti:19000 | xargs kill -9

# On Windows
netstat -ano | findstr :19000
taskkill /PID <PID> /F
```

### Issue: App crashes on startup
**Solution**:
1. Check that all dependencies are installed: `npm install`
2. Clear cache: `npx expo start -c`
3. Check console for error messages
4. Make sure you're using a compatible Node.js version (v20.19.4+)

### Issue: "Cannot connect to Metro bundler"
**Solution**:
- Restart the development server
- Check your network connection
- Try switching to tunnel mode: `npx expo start --tunnel`

---

## Development Workflow

1. **Make changes** to any file in `src/`
2. **Save the file** - Expo will automatically reload
3. **See changes** instantly on your device/emulator (Hot Reload)

### Useful Development Tips

- **Shake your device** (or press `Cmd+D` on iOS simulator, `Cmd+M` on Android) to open developer menu
- **Enable Fast Refresh** in developer menu for instant updates
- **View logs** in the terminal where you ran `npm start`
- **Reload manually** by pressing `r` in the terminal

---

## Project Structure Reminder

```
roamster/
├── App.js              # Entry point
├── src/
│   ├── screens/        # All app screens
│   ├── services/       # Business logic
│   ├── navigation/     # Navigation setup
│   └── context/        # State management
└── package.json        # Dependencies
```

---

## First Time Running?

1. **Complete Onboarding**: When you first open the app, you'll go through a 3-step onboarding process
2. **Create a Trip**: After onboarding, you must create a trip to see recommendations
3. **Try Different Travel Groups**: Create trips with different groups (Solo, Family, Kids, etc.) to see how recommendations change

---

## Need More Help?

- Check `README.md` for project overview
- See `SETUP.md` for detailed setup instructions
- Read `QUICKSTART.md` for quick testing guide
- Visit [Expo Documentation](https://docs.expo.dev/) for Expo-specific help

---

## Expected Output

When you run `npm start`, you should see:

```
› Metro waiting on exp://192.168.x.x:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)

› Press a │ open Android
› Press i │ open iOS simulator
› Press w │ open web

› Press r │ reload app
› Press m │ toggle menu
› Press ? │ show all commands
```

The app should then load and you'll see the onboarding screen!

---

Happy Coding! 🚀

