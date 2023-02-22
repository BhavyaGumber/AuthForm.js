import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "firebase/compat/database"
// import 'firebase/auth';
import { initializeApp } from 'firebase/app';
import 'firebase/database';
import { useNavigate } from 'react-router-dom';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtGzT6rrXDBvAgpf_kkc5h594M4MmOQPM",
  authDomain: "news-bee69.firebaseapp.com",
  projectId: "news-bee69",
  storageBucket: "news-bee69.appspot.com",
  messagingSenderId: "170377362495",
  appId: "1:170377362495:web:bc891892c66b402c32cc8a",
  measurementId: "G-P1ZWQLGHX8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const AuthForm = () => {
  const navigate = useNavigate();
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    await firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log("created");
        // Save user credentials to Realtime Database
        firebase.database().ref(`users/${user.uid}`).set({
          email: email,
          password: password
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode,errorMessage)
      });
  };
  const handleGitHubSignIn = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        // Signed in with GitHub
        const user = result.user;
  
        // Store user data in Firebase Realtime Database
        const db = firebase.database();
        db.ref('users/' + user.uid).set({
          name: user.displayName,
          email: user.email,
          
        
        });
        navigate('/news');
  
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const handleGoogleSignIn = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        // Signed in with Google
        const user = result.user;
  
        // Store user data in Firebase Realtime Database
        const db = firebase.database();
        db.ref('users/' + user.uid).set({
          name: user.displayName,
          email: user.email
        });
        navigate('/news');
  
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div className="signin-container">
      <h1>Sign In</h1>
      <form>
        <div className="form-control">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} />
        </div>
        <div className="form-actions">
          <button className="primary" type="submit" onClick={handleSignIn}>Sign In</button>
          <button className="secondary" type="submit" onClick={handleSignUp}>Sign Up</button>
        </div>
        <div className="form-social">
          <button className="social" onClick={handleGitHubSignIn}>Sign in with GitHub</button>
          <button className="social" onClick={handleGoogleSignIn}>Sign in with Google</button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
