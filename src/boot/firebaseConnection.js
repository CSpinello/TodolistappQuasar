import {boot} from 'quasar/wrappers'
import firebase from "../services/firebase";
import {getConfig} from "src/utils/environmentConfig.js"
import { getApp } from "firebase/app";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";




// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files


const app = firebase.fBInit(getConfig())


console.log('Firebase App Instantiation:', app)
console.log('Firebase Auth Module:', firebase.auth())

firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
    }, reject);
  })
};

