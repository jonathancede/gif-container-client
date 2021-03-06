import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

// Config file
export const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKED,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Functions
export function authenticationObserver(callback) {
  const auth = getAuth();
  onAuthStateChanged(auth, callback);
}

export function registerNewUserFirebase(email, password) {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function getCurrentUserToken() {
  const auth = getAuth();
  const token = await auth.currentUser.getIdToken();
  return token;
}

export function logoutFirebase() {
  const auth = getAuth();
  return signOut(auth);
}

export function loginFirebase(email, password) {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password);
}
