# CareerPlus — Mobile Career Discovery & Recommendation Application

CareerPlus is a premium React Native (TypeScript) mobile application built with React Native CLI for Android, backed by a high-performance Python FastAPI backend and MongoDB database. It serves as the baseline demonstration application for evaluating adaptive mobile user interfaces and performance under varying mobile device conditions.

---

## 1. Technology Stack

- **Mobile Frontend:** React Native 0.76.9, TypeScript 5.3, React Native CLI (Pure Native Architecture — No Expo)
- **Native Android:** Android Gradle Plugin 8.5+, Gradle 8.10+, Kotlin 1.9.24, Hermes Engine
- **Navigation:** `@react-navigation/native` & `@react-navigation/native-stack`
- **UI & Animation:** `react-native-linear-gradient`, `react-native-vector-icons`, `react-native-reanimated`, React Native `Animated` API
- **Local Persistence:** `@react-native-async-storage/async-storage`
- **Backend API:** Python 3.11+, FastAPI, Uvicorn, Motor (Async MongoDB Driver), Pydantic v2
- **Authentication & Security:** JWT (HMAC-SHA256), Bcrypt password hashing
- **Testing:** Jest (Frontend unit tests), Pytest (Backend API & recommendation engine tests)

---

## 2. Prerequisites & Environment Setup

### Required Tools on Development Machine (Windows):
1. **Node.js:** v18+ or v20+ LTS
2. **Java Development Kit (JDK):** JDK 21 (e.g. `C:\Program Files\Java\jdk-21`)
3. **Android Studio & SDK:**
   - Android SDK Platform 34 or 35
   - Android SDK Build-Tools 34.0.0+
   - Android SDK Platform-Tools (including `adb.exe`)
4. **Python:** v3.10+ (with `fastapi`, `uvicorn`, `motor`, `bcrypt`, `pyjwt`)
5. **MongoDB:** Local MongoDB instance running on `localhost:27017`

### Environment Variables:
Ensure the following are set in your environment:
```powershell
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
$env:JAVA_HOME = "C:\Program Files\Java\jdk-21"
$env:PATH += ";$env:LOCALAPPDATA\Android\Sdk\platform-tools"
```

---

## 3. Physical Android Phone Setup (USB Debugging)

To test the application on a real Android phone:

1. **Enable Developer Options on Android:**
   - Open **Settings** → **About Phone**.
   - Tap **Build Number** 7 times continuously until you see *"You are now a developer!"*.
2. **Enable USB Debugging:**
   - Go to **Settings** → **System** (or **Additional Settings**) → **Developer Options**.
   - Toggle **USB Debugging** to **ON**.
   - (Optional) Toggle **Install via USB** to **ON** if prompted by your manufacturer (MIUI, ColorOS, etc.).
3. **Connect Phone to PC:**
   - Connect the phone to your Windows PC using a high-quality USB data cable.
   - When the phone displays *"Allow USB debugging?"*, check *"Always allow from this computer"* and tap **Allow**.
4. **Verify Device Connection with ADB:**
   ```powershell
   adb devices
   ```
   *Expected output:*
   ```text
   List of devices attached
   <your-device-serial-number>    device
   ```
5. **Set Up Port Forwarding over USB:**
   Forward both the backend API port (8000) and the Metro bundler port (8081) directly through the USB cable:
   ```powershell
   adb reverse tcp:8000 tcp:8000
   adb reverse tcp:8081 tcp:8081
   ```
   > **Note:** With `adb reverse`, the Android phone can communicate with `http://127.0.0.1:8000/api` over USB with zero Wi-Fi network configuration required!

---

## 4. Starting the Backend API

1. Navigate to the backend directory:
   ```powershell
   cd d:\Final_Research_Project\backend
   ```
2. Ensure dependencies are installed:
   ```powershell
   pip install -r requirements.txt
   ```
3. Start the FastAPI server:
   ```powershell
   python run.py
   ```
   *The server starts at `http://0.0.0.0:8000`. On startup, it automatically seeds initial realistic job postings, career paths, and the default demo user (`demo@careerplus.com` / `password123`).*

---

## 5. Running the React Native CLI Application

1. Navigate to the demo app directory:
   ```powershell
   cd d:\Final_Research_Project\demo-app
   ```
2. Start the Metro development server:
   ```powershell
   npm start
   ```
3. In a separate terminal, install and launch the app on your connected Android device:
   ```powershell
   npm run android
   ```
   *(Or run: `npx react-native run-android`)*

---

## 6. API Configuration & Network Options

The application centralizes API connectivity in `src/config/apiConfig.ts`:

| Mode | Configuration | How to Use |
| :--- | :--- | :--- |
| **USB Debugging (Recommended)** | `http://127.0.0.1:8000/api` | Connect phone via USB, run `adb reverse tcp:8000 tcp:8000`. Works offline without Wi-Fi. |
| **Android Emulator** | `http://10.0.2.2:8000/api` | Standard Android emulator loopback host. |
| **Local Wi-Fi Network** | `http://<your-pc-lan-ip>:8000/api` | Connect phone and PC to the same Wi-Fi network. Set via `setApiBaseURL('http://192.168.x.x:8000/api')`. |

---

## 7. Project Structure

```
demo-app/
├── android/                   ← Native Android project (Gradle, Kotlin, Manifest)
│   ├── app/build.gradle       ← Vector icons fonts & React Native autolinking
│   └── src/main/java/         ← MainActivity & MainApplication
├── src/
│   ├── assets/images/         ← High-resolution cover & banner assets
│   ├── components/            ← Reusable UI components (GlassCard, GradientButton, JobCard, etc.)
│   ├── config/                ← Centralized API & runtime configuration (apiConfig.ts)
│   ├── context/               ← Global state providers (AuthContext.tsx)
│   ├── data/                  ← Offline fallback datasets (careers.ts, jobs.ts)
│   ├── navigation/            ← Stack navigation (AppNavigator.tsx)
│   ├── screens/               ← 10 core application screens
│   │   ├── SplashScreen.tsx
│   │   ├── AuthScreen.tsx
│   │   ├── HomeChoiceScreen.tsx
│   │   ├── ExploreCareersScreen.tsx
│   │   ├── CareerDiscoveryScreen.tsx
│   │   ├── FindJobsScreen.tsx
│   │   ├── JobDetailsScreen.tsx
│   │   ├── SavedJobsScreen.tsx
│   │   ├── RecommendationScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── services/              ← Axios API clients (authService, jobService, careerService, etc.)
│   ├── theme/                 ← Theme tokens (colors.ts, shadows.ts, spacing.ts, typography.ts)
│   └── types/                 ← TypeScript navigation & domain models
├── __tests__/                 ← Frontend unit tests (apiConfig.test.ts, authService.test.ts)
├── App.tsx                    ← Root component
├── index.js                   ← React Native AppRegistry entry point
├── metro.config.js            ← Metro bundler configuration
├── babel.config.js            ← Babel configuration with Reanimated plugin
├── jest.config.js             ← Jest configuration
└── package.json               ← React Native CLI dependencies & scripts
```

---

## 8. Authentication & Security Architecture

1. **Zero Plaintext Passwords:** Passwords are never stored in AsyncStorage or logged. Passwords are sent over encrypted payload during auth, hashed with bcrypt + salt on backend.
2. **JWT Session Management:** JWT bearer tokens are signed with secret keys, enforced with expiration (`exp`), and verified independently on every protected endpoint.
3. **Session Restoration & Offline Resilience:** When the app opens, stored tokens restore the session and silently sync with `/api/auth/me`. If offline, cached profile info is retained.
4. **Quick Demo Sign-In:** Authenticates against `demo@careerplus.com` / `password123` through live backend API verification, with safe fallback for live evaluation demonstrations.

---

## 9. Automated Testing

### Frontend Unit Tests (Jest):
```powershell
npm test --prefix demo-app
```
*Runs unit tests for `apiConfig` and `authService` (storage persistence, JWT handling, logout cleanup).*

### Frontend TypeScript Check:
```powershell
npm run lint --prefix demo-app
```
*(Runs `tsc --noEmit`)*

### Backend API & Algorithm Tests (Pytest):
```powershell
pytest backend/tests
```
*Runs 12 unit tests verifying password hashing, JWT lifecycle, skill overlap calculations, and recommendation scoring.*

---

## 10. Troubleshooting Common Issues

| Issue | Solution |
| :--- | :--- |
| **`adb devices` shows `unauthorized`** | Unlock your phone screen, look for the USB Debugging prompt, check *"Always allow"*, and tap **OK**. |
| **`adb devices` is empty** | Reconnect the USB cable, ensure the cable supports data transfer (not charge-only), and verify USB Debugging is ON in Developer Options. |
| **App cannot connect to backend** | Run `adb reverse tcp:8000 tcp:8000` in terminal, and confirm FastAPI server is running (`python run.py`). |
| **Metro bundler port conflict (8081)** | Close conflicting processes or run `npx react-native start --port 8088`, then run `adb reverse tcp:8088 tcp:8088`. |
| **Gradle build error: `JAVA_HOME`** | Ensure `$env:JAVA_HOME` is pointing to JDK 21 (`C:\Program Files\Java\jdk-21`). |
| **Red screen: `Unable to load script`** | Run `adb reverse tcp:8081 tcp:8081` and reload the app by double-tapping `R` on the phone. |
