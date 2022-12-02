import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/dashboard",
      name: "dashboard-page",
      component: () => import("../pages/DashboardPage.vue"),
    },
    {
      path: "/consumers",
      name: "consumers-page",
      component: () => import("../pages/ConsumersPage.vue"),
    },
    {
      path: "/distributors",
      name: "distributors-page",
      component: () => import("../pages/DistributorsPage.vue"),
    },
    {
      path: "/points",
      name: "points-page",
      component: () => import("../pages/PointsPage.vue"),
    },
    {
      path: "/products",
      name: "products-page",
      component: () => import("../pages/ProductsPage.vue"),
    },
    {
      path: "/rewards",
      name: "rewards-page",
      component: () => import("../pages/RewardsPage.vue"),
    },
    {
      path: "/sales",
      name: "sales-page",
      component: () => import("../pages/SalesPage.vue"),
    },
    {
      path: "/targets",
      name: "targets-page",
      component: () => import("../pages/TargetsPage.vue"),
    },
  ],
});

export default router;
