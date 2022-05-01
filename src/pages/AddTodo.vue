<template>
  <div class="q-pa-md" style="max-width: 400px">

    <q-form
      @submit="onSubmit"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="title"
        label="Titel *"
        hint="Titel der Aufgabe"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        filled
        v-model="description"
        label="Description *"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        filled
        type="number"
        v-model="priority"
        label="Priorität *"
        hint="Priorität auf einer Skala von 1 bis 5"
        lazy-rules
        :rules="[  val => val !== null && val !== '' || 'Please type your age',
          val => val > 0 && val < 6 || 'Please type a real age']"
      />

      <q-input
        filled
        type="date"
        v-model="due_date"
        label="Fälligkeitsdatum"
        lazy-rules
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
      </div>
    </q-form>
  </div>
</template>

<script>

import {getFirestore, setDoc, addDoc, collection, getDocs, Timestamp} from "firebase/firestore";
import firebase from "src/services/firebase";


const auth = firebase.auth();
const db = getFirestore()
let currentUser = auth.currentUser;

firebase.auth().onAuthStateChanged(firebase.auth, user => {
  console.log(user);
  currentUser = auth.currentUser;
});

export default {
  data() {
    return {
      title: '',
      priority: '',
      description: '',
      due_date: ''
    }
  },
  methods: {
    async onSubmit() {
      const data = {
        title: this.title,
        priority: this.priority,
        due_date: this.due_date,
        description: this.description
      }
      var due_date = data.due_date.split("-");
      var newDate = new Date(due_date[0], due_date[1] - 1, due_date[2]);
      console.log("Zeitstempel: Schreibzugriff auf die Datenbank | Beginn")
      console.log(Date.now())
      await addDoc(collection(db, "users", currentUser.uid, "todo"), {
        created_At: new Timestamp(Date.now() / 1000, 0),
        description: data.description,
        done_date: null,
        due_date: new Timestamp(newDate.getTime() / 1000, 0),
        priority: parseInt(data.priority),
        status: false,
        title: data.title,
        uid: currentUser.uid
      });
      console.log("Zeitstempel: Schreibzugriff auf die Datenbank | Ende")
      console.log(Date.now())
      await getDocs(collection(db, "users", currentUser.uid, "todo")
      ).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data())
        })
      })


    }
  }
}
</script>
