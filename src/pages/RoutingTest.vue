<template>
  Test
</template>



<script>
import { defineComponent } from "vue";

export default defineComponent({
  created() {
    console.log("Zeitstempel: Routing | Ende")
    console.log(Date.now())
  }
});
</script>
