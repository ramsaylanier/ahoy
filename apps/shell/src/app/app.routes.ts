import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "/dashboard",
    pathMatch: "full",
  },
  {
    path: "dashboard",
    loadComponent: () =>
      import("./pages/dashboard/dashboard.component").then(
        (m) => m.DashboardComponent
      ),
    title: "Dashboard",
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./features/auth/auth.routes").then((m) => m.AUTH_ROUTES),
    title: "Authentication",
  },
  {
    path: "users",
    loadChildren: () =>
      import("./features/users/users.routes").then((m) => m.USERS_ROUTES),
    title: "User Management",
  },
  {
    path: "products",
    loadChildren: () =>
      import("./features/products/products.routes").then(
        (m) => m.PRODUCTS_ROUTES
      ),
    title: "Product Management",
  },
  {
    path: "orders",
    loadChildren: () =>
      import("./features/orders/orders.routes").then((m) => m.ORDERS_ROUTES),
    title: "Order Management",
  },
  {
    path: "notifications",
    loadChildren: () =>
      import("./features/notifications/notifications.routes").then(
        (m) => m.NOTIFICATIONS_ROUTES
      ),
    title: "Notifications",
  },
  {
    path: "**",
    redirectTo: "/dashboard",
  },
];
