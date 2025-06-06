import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyBw9cubz288QPT8qQYx-T421dt1y6-wffw",
    authDomain: "dca-lab6-a00402766.firebaseapp.com",
    projectId: "dca-lab6-a00402766",
    storageBucket: "dca-lab6-a00402766.appspot.com",
    messagingSenderId: "668206951397",
    appId: "1:668206951397:web:96b38c7dd4c43f163e9d0c",
    measurementId: "G-6RL58JY800"
};

const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);


export { firebaseConfig };


auth.onAuthStateChanged((user) => {
    if (user) {
        console.log('Usuario autenticado:', user.email);
    } else {
        console.log('No hay usuario autenticado');
    }
}, (error) => {
    console.error('Error de autenticación:', error);
}); 