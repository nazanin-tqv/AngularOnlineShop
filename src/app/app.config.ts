import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import Aura from '@primeng/themes/aura';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { getAnalytics } from 'firebase/analytics';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: 'AIzaSyANNlhMTwvDrwnn1KmLTGBbtCGeOZ3SvHk',
//   authDomain: 'onlineshop-6dac9.firebaseapp.com',
//   projectId: 'onlineshop-6dac9',
//   storageBucket: 'onlineshop-6dac9.firebasestorage.app',
//   messagingSenderId: '336586894485',
//   appId: '1:336586894485:web:ff5f1d4645536078dbff9c',
//   measurementId: 'G-XTSVXJHX5G',
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(),

    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          prefix: 'p',
          darkModeSelector: 'off',
          cssLayer: false,
          ripple: true,
        },
      },
    }),
    provideAnimationsAsync(),
  ],
};
