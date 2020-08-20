import * as firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth'; // new
import firebaseConfig from './firebaseConfig';
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore()