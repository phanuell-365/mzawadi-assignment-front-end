import { defineStore } from "pinia";

export interface Routes {
  path: string;
  name: string;
  active: boolean;
  description: string;
}

const allRoutes: Routes[] = [
  {
    path: "/users",
    name: "users-page",
    active: false,
    description: "user",
  },
  {
    path: "/dashboard",
    name: "dashboard-page",
    active: false,
    description: "dashboard",
  },
  {
    path: "/consumers",
    name: "consumers-page",
    active: false,
    description: "consumer",
  },
  {
    path: "/distributors",
    name: "distributors-page",
    active: false,
    description: "distributor",
  },
  {
    path: "/points",
    name: "points-page",
    active: false,
    description: "point",
  },
  {
    path: "/products",
    name: "products-page",
    active: false,
    description: "product",
  },
  {
    path: "/rewards",
    name: "rewards-page",
    active: false,
    description: "reward",
  },
  {
    path: "/sales",
    name: "sales-page",
    active: false,
    description: "sale",
  },
  {
    path: "/targets",
    name: "targets-page",
    active: false,
    description: "target",
  },
];

interface RoutingState {
  routes: Routes[];
}

export const useRoutingStore = defineStore({
  id: "routingStore",
  state: (): RoutingState => ({
    routes: allRoutes,
  }),
  getters: {
    getRoutes: (state) => state.routes,
    getCurrentRoute: (state) => {
      return state.routes.find((value) => value.active);
    },
    getCurrentRouteName: (state) => {
      const currentRoute = state.routes.find((value) => value.active);
      return currentRoute?.name;
    },
    getCurrentRoutePath: (state) => {
      const currentRoute = state.routes.find((value) => value.active);
      return currentRoute?.path;
    },
    getCurrentRouteDescription: (state) => {
      const currentRoute = state.routes.find((value) => value.active);
      return currentRoute?.description;
    },
  },
  actions: {
    setCurrentRoute(routeName: string) {
      // find the route
      const route = this.routes.find((route) => route.name === routeName);

      // if the route exists, set it to active and set all other routes to inactive
      if (route) {
        route.active = true;
        this.routes = this.routes.map((route) => {
          if (route.name !== routeName) route.active = false;
          return route;
        });
      } else {
        // if the route doesn't exist, set all routes to inactive
        this.routes = this.routes.map((route) => {
          route.active = false;
          return route;
        });
      }
    },
  },
});
