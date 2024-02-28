import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
  } from "firebase/auth";
  
  import {
    getReactNativePersistence,
    initializeAuth,
  } from "firebase/auth/react-native";
  
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
    apiKey: "AIzaSyC-Wi1Vn8avDrKRF8jxPqkWFIzK5QU3Uy4",
    authDomain: "mealstogo-3e0ba.firebaseapp.com",
    projectId: "mealstogo-3e0ba",
    storageBucket: "mealstogo-3e0ba.appspot.com",
    messagingSenderId: "909641411095",
    appId: "1:909641411095:web:58dc51a66bb12d47a58a52"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });


export const loginRequest = async (email, password) => 
  signInWithEmailAndPassword(auth, email, password);

export const registerRequest = async (email, password) => 
    createUserWithEmailAndPassword(auth, email, password);

export const logoutRequest = async () => 
    signOut(auth);

export const checkAuthStateChangedRequest = async () =>
    onAuthStateChanged(auth, (u) => {
        if (u) {
        setUser(u);
        } else {
        }
    });