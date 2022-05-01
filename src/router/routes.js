


const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children:
      [{path: "", component: () => import("pages/Auth.vue")},
        {path: "/overview", component: () => import("pages/Overview.vue")},
        {path: "/addTodo", component: () => import("pages/AddTodo.vue"), meta: {requiresAuth: true}},
        {path: '/home', component: () => import('pages/Home.vue'), meta: {requiresAuth: true}},
        {path: '/routingtest', component: () => import('pages/RoutingTest.vue'), meta: {requiresAuth: true}},

      ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];



export default routes;
