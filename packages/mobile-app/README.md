# MoDos Mobile App

## How to launch the app on android
### Pre Steps
- Install Angular CLI
- Install Android Studio
- Clone this repository

### CLI Steps
```
cd packages/mobile-app/
npm ci
npx cap init
ng build
npx cap add android && npx cap copy && npx cap update && npx cap open android

```

## How to develop on android
```
npm run dev:android:watch
```