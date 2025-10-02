// firebase-config.js

// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
// Import Firestore specific modules
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7h2iqH-RN4uXjPAELmYtJfOtyZq5iY3U",
  authDomain: "lifeonadeadlineapp.firebaseapp.com",
  projectId: "lifeonadeadlineapp",
  storageBucket: "lifeonadeadlineapp.appspot.com",
  messagingSenderId: "573691334631",
  appId: "1:573691334631:web:899a12ef2fa52fc391b742",
  measurementId: "G-JFY3ZHS55M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app); // Define db here

// Export all initialized Firebase services for use in other files
export { app, analytics, auth, db }; // <-- Now 'db' is exported!

// Remove the problematic setDoc call from here.
// This logic belongs in your main app code (e.g., in index.html's script block)
// where you have access to a 'user' object after authentication.
