import firebase from '../Firebase';
import * as Expo from 'expo'

export default signIn = async () => {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId:
          "963840332394-e8th16ntkms2jin6mpdq7la7cims4fnk.apps.googleusercontent.com",
        iosClientId: '963840332394-qg7tqntk0rjsnhcl3rqkrvtv3n53tmn9.apps.googleusercontent.com',
        webClientId: '963840332394-h3ok1nkfrt9pclgjmu633468cmckptph.apps.googleusercontent.com',
        scopes: ["profile", "email"],
        behavior: 'web'
      })

      if (result.type === "success") {
        var credential = firebase.auth.GoogleAuthProvider.credential(
          result.idToken);

        firebase.auth().signInAndRetrieveDataWithCredential(credential)
          .then((results) => {
            const ref = firebase.firestore().collection('users')
            const uid = results.user.uid
            console.log(uid)
            ref.doc(uid).get().then(docSnapshot => {
              if (!docSnapshot.exists) {
                ref.doc(uid).set({
                  created: new Date().toLocaleString(),
                  calibrated: 0
                })
              }
            }).catch(e => console.log(e.message))
          })
          .catch(e => console.log(e.message))
      } else {
        console.log("cancelled")
      }
    } catch (e) {
      console.log("error", e)
    }
  }

