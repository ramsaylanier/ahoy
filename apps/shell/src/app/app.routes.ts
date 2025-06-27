import { Routes } from "@angular/router";
import { loadRemoteModule } from "@angular-architects/native-federation";
import { DashboardComponent } from "src/dashboard/dashboard.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "/dashboard",
    pathMatch: "full",
  },
  {
    path: "dashboard",
    component: DashboardComponent,
  },
  {
    path: "projects",
    loadComponent: () =>
      loadRemoteModule("projects", "./Component").then((m) => {
        console.log(m);
        return m.App;
      }),
  },
];
