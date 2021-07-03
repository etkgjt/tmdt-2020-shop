import firebase from 'firebase'

const config={
    apiKey: "AIzaSyApLHvwr-WgJG-8Dmzh1ugiYqz3jYwZsko",
    authDomain: "tmdt-2fa.firebaseapp.com",
    projectId: "tmdt-2fa",
    storageBucket: "tmdt-2fa.appspot.com",
    messagingSenderId: "1033227830492",
    appId: "1:1033227830492:web:e6d3090e333a5c2a2be019"
}
firebase.initializeApp(config);
export default firebase