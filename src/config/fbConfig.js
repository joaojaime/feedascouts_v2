import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Replace this with your own config details
var config = {
  apiKey: "AIzaSyDmpM2tnBPqEjZ1_v8adhWo5dCRAUVwyDQ",
  authDomain: "feedascouts.firebaseapp.com",
  databaseURL: "https://feedascouts.firebaseio.com",
  projectId: "feedascouts",
  storageBucket: "feedascouts.appspot.com",
  messagingSenderId: "682853486079"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;