import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyBk2mYeH-3ETNzwk2vXbgP8coLuQD6CW74",
    authDomain: "seedbase-e7ee6.firebaseapp.com",
    databaseURL: "https://seedbase-e7ee6.firebaseio.com",
    projectId: "seedbase-e7ee6",
    storageBucket: "seedbase-e7ee6.appspot.com",
    messagingSenderId: "721731422552"
  };
  firebase.initializeApp(config);
  export default firebase