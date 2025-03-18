import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "buddyup-92a14.firebaseapp.com",
  projectId: "buddyup-92a14",
  storageBucket: "buddyup-92a14.firebasestorage.app",
  messagingSenderId: "508756983687",
  appId: "1:508756983687:web:b54afaa3816bb3b5e2dd22",
  measurementId: "G-K9H1S85E45"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export default app;
