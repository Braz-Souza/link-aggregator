// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { 
  PUBLIC_FBCLIENT_API_KEY, 
  PUBLIC_FBCLIENT_AUTH_DOMAIN,
  PUBLIC_FBCLIENT_PROJECT_ID,
  PUBLIC_FBCLIENT_STORAGE_BUCKET,
  PUBLIC_FBCLIENT_MESSAGING_SENDER_ID,
  PUBLIC_FBCLIENT_APP_ID 
} from "$env/static/public";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: PUBLIC_FBCLIENT_API_KEY,
  authDomain: PUBLIC_FBCLIENT_AUTH_DOMAIN,
  projectId: PUBLIC_FBCLIENT_PROJECT_ID,
  storageBucket: PUBLIC_FBCLIENT_STORAGE_BUCKET,
  messagingSenderId: PUBLIC_FBCLIENT_MESSAGING_SENDER_ID,
  appId: PUBLIC_FBCLIENT_APP_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();