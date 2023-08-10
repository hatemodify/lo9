// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

require('dotenv').config();

import { getStorage, ref, uploadBytes } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: 'lo9today-c3cbc.firebaseapp.com',
	databaseURL:
		'https://lo9today-c3cbc-default-rtdb.asia-southeast1.firebasedatabase.app',
	projectId: 'lo9today-c3cbc',
	storageBucket: 'lo9today-c3cbc.appspot.com',
	messagingSenderId: '1048619015844',
	appId: '1:1048619015844:web:2a2b37c6114625dc0a5031',
	measurementId: 'G-HKHXS4JGRV',
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
export const rdb = getDatabase(firebase);

export const storage = getStorage(firebase);
