// import * as firebase from "firebase/app";
// import 'firebase/firestore';
// import 'firebase/auth'; // new
// import firebaseConfig from './firebaseConfig';
// const firebaseApp = firebase.initializeApp(firebaseConfig);
// export default firebaseApp.firestore()
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage"
import "firebase/database"
import firebaseConfig from "./firebaseConfig";
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();
const firebaseStorage = firebase.storage();
const fdb = firebase.database();
const fbase = firebase;

// export utils/refs
export { db, fdb, auth, firebaseStorage, fbase };