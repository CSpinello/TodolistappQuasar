<template>
  <div class="q-pa-md" style="max-width: 500px">
    <q-list bordered class="rounded-borders">
      <q-expansion-item>
        <template v-slot:header>
          <q-item-section>
            Aktuelle To Dos
          </q-item-section>
        </template>

        <q-card>
          <q-card-section>
            <TaskListOpen
              v-for="task in taskListOpen"
              :key="task.title"
              v-bind="task"
            />
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-separator/>

      <q-expansion-item>
        <template v-slot:header>
          <q-item-section>
            Überfällige To Dos
          </q-item-section>
        </template>

        <q-card>
          <q-card-section>
            <TaskListDue
              v-for="task in taskListDue"
              :key="task.title"
              v-bind="task"
            />
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-separator/>

      <q-expansion-item>
        <template v-slot:header>
          <q-item-section>
            Geschlossene To Dos
          </q-item-section>
        </template>

        <q-card>
          <q-card-section>
            <TaskListClosed
              v-for="task in taskListClosed"
              :key="task.title"
              v-bind="task"
            />
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script>
import TaskListOpen from "components/TasklistOpen";
import TaskListDue from "components/TaskListDue";
import TaskListClosed from "components/TaskListClosed";
import {getFirestore, setDoc, addDoc, collection, getDocs} from "firebase/firestore";
import firebase from "src/services/firebase";
import {defineComponent, onMounted} from "vue";


const auth = firebase.auth();
const db = getFirestore()
let currentUser = auth.currentUser;

firebase.auth().onAuthStateChanged(firebase.auth, user => {
  console.log(user);
  currentUser = auth.currentUser;
});


export default defineComponent({
  name: "Overview",
  components: {
    TaskListOpen,
    TaskListClosed,
    TaskListDue
  },

  async created() {
    let openCounter = 0;
    let dueCounter = 0;
    let closedCounter = 0;
    const taskListOpen = []
    const taskListClosed = []
    const taskListDue = []
    console.log("Zeitstempel: Lesezugriff auf die Datenbank | Beginn")
    console.log(Date.now())
    await getDocs(collection(db, "users", currentUser.uid, "todo")
    ).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if (doc.data().due_date.seconds >= Date.now() / 1000 && doc.data().status === true) {
              taskListOpen[openCounter] = {
                title: doc.data().title,
                description: doc.data().description,
                done_date: doc.data().done_date,
                due_date: doc.data().due_date,
                priority: doc.data().priority,
                status: doc.data().status,
                uid: doc.data().uid,
              }
              openCounter++
            }
            if (doc.data().due_date.seconds <= Date.now() / 1000 && doc.data().status === true) {
              taskListDue[dueCounter] = {
                title: doc.data().title,
                description: doc.data().description,
                done_date: doc.data().done_date,
                due_date: doc.data().due_date,
                priority: doc.data().priority,
                status: doc.data().status,
                uid: doc.data().uid,
              }
              dueCounter++
            }
            if (doc.data().status === false) {
              taskListClosed[closedCounter] = {
                title: doc.data().title,
                description: doc.data().description,
                done_date: doc.data().done_date,
                due_date: doc.data().due_date,
                priority: doc.data().priority,
                status: doc.data().status,
                uid: doc.data().uid,
              }
              closedCounter++
            }
          }
        )
      }
    );
    console.log("Zeitstempel: Lesezugriff auf die Datenbank | Ende")
    console.log(Date.now())
    this.taskListOpen = taskListOpen
    this.taskListClosed = taskListClosed
    this.taskListDue = taskListDue
  },
  data() {
    return {
      taskListOpen: '',
      taskListDue: '',
      taskListClosed: ''
    }
  }
});
</script>
