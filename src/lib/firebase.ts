// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { 
  FBCLIENT_API_KEY, 
  FBCLIENT_AUTH_DOMAIN,
  FBCLIENT_PROJECT_ID,
  FBCLIENT_STORAGE_BUCKET,
  FBCLIENT_MESSAGING_SENDER_ID,
  FBCLIENT_APP_ID 
} from "$env/static/private";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FBCLIENT_API_KEY,
  authDomain: FBCLIENT_AUTH_DOMAIN,
  projectId: FBCLIENT_PROJECT_ID,
  storageBucket: FBCLIENT_STORAGE_BUCKET,
  messagingSenderId: FBCLIENT_MESSAGING_SENDER_ID,
  appId: FBCLIENT_APP_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();