import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import firebase from 'firebase';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

const firebaseConfig = {
  apiKey: "AIzaSyDBARQkJXCiELqwdaq6wAEiJ1SJdKyLpDQ",
  authDomain: "badget-7d2e5.firebaseapp.com",
  databaseURL: "https://badget-7d2e5-default-rtdb.firebaseio.com",
  projectId: "badget-7d2e5",
  storageBucket: "badget-7d2e5.appspot.com",
  messagingSenderId: "388376641692",
  appId: "1:388376641692:web:e74eff1e379f24e43eed59"
};

firebase.initializeApp(firebaseConfig);

function App() {

  const [login,setlogin] = useState(false)

 
  
function toggleSignIn() {
  if (!firebase.auth().currentUser) {
    var provider = new firebase.auth.GoogleAuthProvider();
    // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      console.log(token)
      // The signed-in user info. 
      var user = result.user;
      console.log(user)
      setlogin(true)
      // document.getElementById('quickstart-oauthtoken').textContent = token;
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      if (errorCode === 'auth/account-exists-with-different-credential') {
        alert('You have already signed up with a different auth provider for that email.');
        // If you are using multiple auth providers on your app you should handle linking
        // the user's accounts here.
      } else {
        console.error(error);
      }
    });
  } else {
    firebase.auth().signOut();
  }
}


function initApp() {
  // Listening for auth state changes.
  console.log("dsad")
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      setlogin(true)
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      console.log(email)
    } else {
      // toggleSignIn()
      // User is signed out.
    }
  });
}
initApp()
  const logingoole = () => {
    toggleSignIn()
    console.log("dsada")
  }
  const logout = () => {
    firebase.auth().signOut();
    setlogin(false)
    console.log("logout")
  }
  
  function loginfacebookauth(){
    var provider = new firebase.auth.FacebookAuthProvider();
    // provider.addScope('user_birthday');
    firebase
  .auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // The signed-in user info.
    var user = result.user;
    console.log(user)
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var accessToken = credential.accessToken;
    console.log(accessToken)
    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;

    // ...
  });

  }


  const callit = () => {
    axios.get(`https://107.23.113.233:8080/MentalcareCommunity/community/dashboard/feeds?page=1`)
    .then(res => {
      console.log(res)
    })
  }

  const loginfacebook = () => {
    loginfacebookauth();
  }

  return (
    <div className="App">
     { login ?  
          <button onClick={()=>{logout()}}>Logout</button> : 
             <>
             <button onClick={()=>{logingoole()}}>login google</button> 
              
              <button onClick={()=>{loginfacebook()}}>login facebook</button>
              <button onClick={()=>{callit()}}>call</button>
              </>
    } 
  </div>
  );
}

export default App;
