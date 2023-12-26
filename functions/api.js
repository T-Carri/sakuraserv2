const express = require('express');
const serverless = require('serverless-http');
const app = express();
const router = express.Router();
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { doc, getDoc,  getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { ref, get, child, getDatabase  } from "firebase/database";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
  } from 'firebase/auth';
//require('dotenv').config();

const firebaseConfig = {
    apiKey: "AIzaSyBAjyHJoK042ui2QB8pF9d1mIt5TKbUdLY",
    authDomain: "sakura-b9969.firebaseapp.com",
    databaseURL: "https://sakura-b9969-default-rtdb.firebaseio.com",
    projectId: "sakura-b9969",
    storageBucket: "sakura-b9969.appspot.com",
    messagingSenderId: "808797111816",
    appId: "1:808797111816:web:69f768f2eec728c4b0b3bd"

};

// Initialize Firebase
const app1 = initializeApp(firebaseConfig)
export const auth= getAuth(app1)
export const provider = new GoogleAuthProvider();

export const db = getDatabase(app1);
export const storage = getStorage(app1);



export default app1;

let records = [];

//Get all students
router.get('/', (req, res) => {
  res.send('App is running..');
});

//Create new record
router.post('/add', (req, res) => {
  res.send('New record added.');
});

//delete existing record
router.delete('/', (req, res) => {
  res.send('Deleted existing record');
});

//updating existing record
router.put('/', (req, res) => {
  res.send('Updating existing record');
});

//showing demo records
router.get('/demo', (req, res) => {
  res.json([
    {
      id: '001',
      name: 'Smith',
      email: 'smith@gmail.com',
    },
    {
      id: '002',
      name: 'Sam',
      email: 'sam@gmail.com',
    },
    {
      id: '003',
      name: 'lily',
      email: 'lily@gmail.com',
    },
  ]);
});



//LOGIC AUTH

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
            // Inicio de sesión exitoso
            userCredential.user.getIdToken().then(token => {
                req.session.authToken = token;
                req.session.userId = userCredential.user.uid; // Corregido
                res.redirect('../views/dashboard.html');
            });     
        })
        .catch((error) => {
            // Error en el inicio de sesión
            res.redirect(`/index.html?error=${encodeURIComponent(error.message)}`);
        });
});









app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);