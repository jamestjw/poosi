import firebase from '../../Firebase';
const loadingPhase = () => ({
  type: "LOADING_PHASE"
});

const fetchImagesSuccess = (data) => ({
  type: 'FETCH_SUCCESS',
  payload: data
});

const calibratedUser = () => ({
  type: 'CALIBRATED_USER',
})

export const updateRating = rating => ({
  type: 'UPDATE_RATING',
  payload: rating
});

const submittedRating = () => ({
  type: 'SUBMITTED_RATING',
});

export function fetchImages() {
  return dispatch => {
    dispatch(loadingPhase());
    ref = firebase.firestore().collection('images')
 
    return ref.get()
              .then(function(querySnapshot) {
                len = querySnapshot.size
                var arr = []
                while(arr.length < 10){
                    var r = Math.floor(Math.random()*len);
                    if(arr.indexOf(r) === -1) arr.push(r);
                }
                console.log('Received images from firestore')
                let id =[]
                let uri =[]
                querySnapshot.forEach(function(doc) {
                  id.push(doc.id)
                  uri.push(doc.data().uri)
                })
                return {id, uri, arr}
              })
              .then(data=>{
                  dispatch(fetchImagesSuccess(data)) 
              })
  }
}

export function submitRating(uid, iid, rating, current) {
  return dispatch => {
    console.log('logging now',uid,iid,rating)
    console.log('did i get here')
    dispatch(loadingPhase());
    refRating = firebase.firestore().collection('users').doc(uid)
    return refRating.collection('ratings').doc(iid).set({
              rating: rating,
              dt: new Date().toLocaleString()
            })
            .then( () => {
              if(current==9){
                refRating.update({'calibrated':1})
              }
            })
            .then( () => {
              return dispatch(submittedRating());
            })
  }  
}