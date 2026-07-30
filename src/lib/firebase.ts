import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseConfig = {
  apiKey: "AIzaSyCeII2Bc6XBNsgGqe2-0SIfoguO5YhB74Q",
  authDomain: "mindly-3d692.firebaseapp.com",
  projectId: "mindly-3d692",
  storageBucket: "mindly-3d692.firebasestorage.app",
  messagingSenderId: "603852833892",
  appId: "1:603852833892:web:47bccf6dfb15f4b1260b71",
  measurementId: "G-20R5BBT2PJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize App Check (reCAPTCHA v3)
// if (typeof window !== 'undefined') {
//   initializeAppCheck(app, {
//     // Replace with your actual reCAPTCHA v3 Site Key
//     provider: new ReCaptchaV3Provider('YOUR_RECAPTCHA_V3_SITE_KEY'),
//     isTokenAutoRefreshEnabled: true
//   });
// }

const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
