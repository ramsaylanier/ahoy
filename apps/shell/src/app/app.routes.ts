import { Routes } from "@angular/router";
import { loadRemoteModule } from "@angular-architects/native-federation";
import { loadRemote } from "@module-federation/enhanced/runtime";
import { DashboardComponent } from "./components/dashboard.component";
import { ReactWrapperComponent } from "./components/react-wrapper.component";

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
  {
    path: "react-app",
    component: ReactWrapperComponent,
  },
  // {
  //   path: "react-app",
  //   loadComponent: () =>
  //     loadRemote("react_frontend/App").then((m: any) => {
  //       console.log(m);
  //       return m;
  //     }),
  // },
];
