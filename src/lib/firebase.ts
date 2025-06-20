// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {
  PUBLIC_FBCLIENT_API_KEY,
  PUBLIC_FBCLIENT_AUTH_DOMAIN,
  PUBLIC_FBCLIENT_PROJECT_ID,
  PUBLIC_FBCLIENT_STORAGE_BUCKET,
  PUBLIC_FBCLIENT_MESSAGING_SENDER_ID,
  PUBLIC_FBCLIENT_APP_ID,
} from "$env/static/public";
import { derived, writable, type Readable } from "svelte/store";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: PUBLIC_FBCLIENT_API_KEY,
  authDomain: PUBLIC_FBCLIENT_AUTH_DOMAIN,
  projectId: PUBLIC_FBCLIENT_PROJECT_ID,
  storageBucket: PUBLIC_FBCLIENT_STORAGE_BUCKET,
  messagingSenderId: PUBLIC_FBCLIENT_MESSAGING_SENDER_ID,
  appId: PUBLIC_FBCLIENT_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();

/**
 * @returns a store with the current firebase user
 */
function userStore() {
  let unsubscribe: () => void;

  if (!auth || !globalThis.window) {
    console.warn("Auth is not initialized or not in browser");
    const { subscribe } = writable<User | null>(null);
    return {
      subscribe,
    };
  }

  const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
    unsubscribe = onAuthStateChanged(auth, (user) => {
      set(user);
    });

    return () => unsubscribe();
  });

  return {
    subscribe,
  };
}

export const user = userStore();

/**
 * @param  {string} path document path or reference
 * @returns a store with realtime updates on document data
 */
export function docStore<T>(path: string) {
  const docRef = doc(db, path);
  const { subscribe } = writable<T | null>(null, (set) => {
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      set((snapshot.data() as T) ?? null);
    });

    return () => unsubscribe();
  });

  return {
    subscribe,
    ref: docRef,
    id: docRef.id,
  };
}

interface UserData {
  username: string;
  bio: string;
  photoURL: string;
  links: any[];
}

export const userData: Readable<UserData | null> = derived(
  user,
  ($user, set) => {
    if ($user) {
      return docStore<UserData>(`users/${$user.uid}`).subscribe(set);
    } else {
      set(null);
    }
  }
);
