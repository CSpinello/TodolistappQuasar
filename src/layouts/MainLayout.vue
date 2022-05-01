<template>
  <q-layout view="lHh lpR lfr">

    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer"/>

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" behavior="mobile" elevated show-if-above>
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
        <q-list padding>
          <EssentialLink
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
            @click="toggleLeftDrawer()"
          />
        </q-list>
      </q-scroll-area>
      <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Home",
    caption: "Home",
    icon: "home",
    link: "/#/home",
  },
  {
    title: "Overview",
    caption: "Overview",
    icon: "code",
    link: "/#/overview",
  },
  {
    title: "Add Todo",
    caption: "Add Todo",
    icon: "chat",
    link: "/#/addtodo",
  },
  {
    title: "RoutingTest",
    caption: "RoutingTest",
    icon: "chat",
    link: "/#/routingtest",
  },
];

import {defineComponent, ref} from "vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },
  setup() {
    const leftDrawerOpen = ref(false);
    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        console.log("Zeitstempel: Routing | Anfang")
        console.log(Date.now())
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
