import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
  ],
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button (click)="sidenav.toggle()">
        <mat-icon>menu</mat-icon>
      </button>
      <span>Ahoy Microservices</span>
      <span class="spacer"></span>
      <button mat-icon-button [matMenuTriggerFor]="menu">
        <mat-icon>account_circle</mat-icon>
      </button>
      <mat-menu #menu="matMenu">
        <button mat-menu-item>
          <mat-icon>person</mat-icon>
          <span>Profile</span>
        </button>
        <button mat-menu-item>
          <mat-icon>settings</mat-icon>
          <span>Settings</span>
        </button>
        <button mat-menu-item>
          <mat-icon>exit_to_app</mat-icon>
          <span>Logout</span>
        </button>
      </mat-menu>
    </mat-toolbar>

    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #sidenav mode="side" opened class="sidenav">
        <mat-nav-list>
          <mat-list-item>
            <a routerLink="/dashboard" routerLinkActive="active">
              <mat-icon>dashboard</mat-icon>
              <span>Dashboard</span>
            </a>
          </mat-list-item>
          <mat-list-item>
            <a routerLink="/projects" routerLinkActive="active">
              <mat-icon>inventory</mat-icon>
              <span>Projects</span>
            </a>
          </mat-list-item>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content class="sidenav-content">
        <div class="content">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
      .spacer {
        flex: 1 1 auto;
      }

      .sidenav-container {
        height: calc(100vh - 64px);
      }

      .sidenav {
        width: 250px;
      }

      .sidenav-content {
        padding: 20px;
      }

      .content {
        max-width: 1200px;
        margin: 0 auto;
      }

      .active {
        background-color: rgba(0, 0, 0, 0.1);
      }

      mat-nav-list a {
        display: flex;
        align-items: center;
        gap: 12px;
      }
    `,
  ],
})
export class AppComponent {
  title = "Ahoy Microservices Shell";
}
