<template>
  <q-list bordered class="inset-shadow-down">
    <q-item tag="label" v-ripple>
      <q-item-section>
        <q-item-label>{{ title }}</q-item-label>
      </q-item-section>
      <q-item-section side top>
        <q-btn  @click="onClick(title, due_date)"> </q-btn>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import {defineComponent, getCurrentInstance} from "vue";
import { ref } from "vue";
import {getFirestore,
  doc,
  getDoc,
  getDocs,
  collection, addDoc, Timestamp, deleteDoc, updateDoc} from "firebase/firestore";
import firebase from "src/services/firebase";
import Vue from 'vue';


const auth = firebase.auth();
const db = getFirestore()
let currentUser = auth.currentUser;

firebase.auth().onAuthStateChanged(firebase.auth, user => {
  console.log(user);
  currentUser = auth.currentUser;
});

export default defineComponent({
  name: "TaskList",
  setup() {
    const btn = ref(null);
    const onClick = (title, due_Date) => {
      console.log(title)
      console.log(due_Date.seconds)
      getDocs(collection(db, "users", currentUser.uid, "todo")
      ).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              if (title === doc.data().title && doc.data().due_date.seconds === due_Date.seconds) {
                updateDoc(doc.ref, {
                  status: !doc.data().status
                });
              }
            }
          )
        }
      )
      this.methods.methodThatForcesUpdate()
      console.log("Test")
    }
    return {btn, onClick}
  },
  props: {
    title: {
      type: String,
    },
    due_date: {
      type: Timestamp,
    },
  },
  methods: {
    methodThatForcesUpdate() {
      console.log("Force")
      this.$forceUpdate();
    }
  }
});
</script>
