import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
 } from 'firebase/auth';
 import {
    getFirestore, 
    doc,
    getDoc,
    setDoc,
 } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA5B4xD8mWOxOlCrlubPJMogkPoqw_rM9s",
    authDomain: "crwn-clothing-ds.firebaseapp.com",
    projectId: "crwn-clothing-ds",
    storageBucket: "crwn-clothing-ds.appspot.com",
    messagingSenderId: "89837632504",
    appId: "1:89837632504:web:c58825f8ccf6670b1e340d"
  };
  

const firebaseApp = initializeApp(firebaseConfig); 

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => 
    signInWithPopup(auth,  googleProvider);
export const signInWithGoogleRedirect = () => 
    signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth  = async (
    userAuth, 
    additionalInformation = {}
    ) => {
    if  (!userAuth)  return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot =  await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const {  displayName,  email  } =  userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch  (error)  {
            console.log('error creating the user',  error.message);
        }
    }

    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

   return await createAuthUserWithEmailAndPassword(auth,  email,  password);
};

   export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

   return await signInAuthUserWithEmailAndPassword(auth,  email,  password);
};