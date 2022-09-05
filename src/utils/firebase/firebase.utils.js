import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup,
    GoogleAuthProvider
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

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,  provider);

export const db = getFirestore();

export const createUserDocumentFromAuth  = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot =  await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()) {
        const {  displayName,  email  } =  userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch  (error)  {
            console.log('error creating the user',  error.message);
        }
    }

    return userDocRef;
};