import {getFirestore, setDoc, addDoc, collection, getDocs} from "firebase/firestore";
import firebase from "src/services/firebase";

const auth = firebase.auth();
const db = getFirestore()
let currentUser = auth.currentUser;

firebase.auth().onAuthStateChanged(firebase.auth, user => {
  console.log(user);
  currentUser = auth.currentUser;
});

export function submitForm() {
  if (this.tab === 'login') {
    this.signInExistingUser(this.formData.email, this.formData.password)
  } else {
    this.createUser(this.formData.email, this.formData.password)
  }
}

export async function signInExistingUser(email, password) {
  console.log("Zeitstempel: Login über Firebase Firestore | Beginn")
  console.log(Date.now())
  await firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log("Zeitstempel: Login über Firebase Firestore | Ende Abschnitt 1 | Anfang Abschnitt 2")
      console.log(Date.now())
      this.$q.notify({message: 'Sign In Success.'})
      this.$router.push('/home')
    })
    .catch(error => {
      console.log(error)
    })



}

export function google() {
  const provider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().signInWithPopup(provider)
    .then(result => {
      console.log('result', result)
      this.$q.notify({message: 'Sign In Success.'})
      this.$router.push('/home')
    })
    .catch(error => console.log('error', error))
}

export function createUser(email, password) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(auth => {
      this.$q.notify({message: 'Sign In Success.'})
      this.$router.push('/home')
      createUserTable(auth.user.uid)
    })
    .catch(error => {
      console.log(error)
    })

}

export function forgotPassword() {
  this.resetPwdDialog = true
}

export function createUserTable(uid) {
  addDoc(collection(db, "users"), {
    email: currentUser.email,
    uid: uid,
  }).then(r => {
    console.log("Creating Table success")
  });
}



