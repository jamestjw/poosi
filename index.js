var firebase = require('firebase');

const config = {
    apiKey: "AIzaSyD2ZgXlBjrIqMWfp279hZUIL74_kYdxV5s",
    authDomain: "poosi-4701d.firebaseapp.com",
    databaseURL: "https://poosi-4701d.firebaseio.com",
    projectId: "poosi-4701d",
    storageBucket: "poosi-4701d.appspot.com",
    messagingSenderId: "963840332394"
  };

firebase.initializeApp(config)

const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

firebase.firestore().collection('users')
  .doc('6NRImtPotiZPKDBGeeWd2Ob9HGe2')
  .collection('ratings')
  .get().then(function(querySnapshot) {
    querySnapshot.forEach((e)=>console.log(e.data()))
});