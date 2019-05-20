import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: "AIzaSyD2ZgXlBjrIqMWfp279hZUIL74_kYdxV5s",
    authDomain: "poosi-4701d.firebaseapp.com",
    databaseURL: "https://poosi-4701d.firebaseio.com",
    projectId: "poosi-4701d",
    storageBucket: "poosi-4701d.appspot.com",
    messagingSenderId: "963840332394"
};

firebase.initializeApp(config);
firebase.firestore().settings(settings);

export default firebase;