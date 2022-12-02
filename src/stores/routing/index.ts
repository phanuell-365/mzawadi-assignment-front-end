import { defineStore } from "pinia";

interface Routes {
  path: string;
  name: string;
  active: boolean;
}

const allRoutes: Routes[] = [
  {
    path: "/dashboard",
    name: "dashboard-page",
    active: false,
  },
  {
    path: "/consumers",
    name: "consumers-page",
    active: false,
  },
  {
    path: "/distributors",
    name: "distributors-page",
    active: false,
  },
  {
    path: "/points",
    name: "points-page",
    active: false,
  },
  {
    path: "/products",
    name: "products-page",
    active: false,
  },
  {
    path: "/rewards",
    name: "rewards-page",
    active: false,
  },
  {
    path: "/sales",
    name: "sales-page",
    active: false,
  },
  {
    path: "/targets",
    name: "targets-page",
    active: false,
  },
];

interface CurrentRoute {
  routeName: string;
  routePath: string;
  active: boolean;
}

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
