import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressBarModule } from "@angular/material/progress-bar";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
  ],
  template: `
    <div class="dashboard-container">
      <div class="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to the Ahoy Dashboard</p>
      </div>

      <div class="dashboard-grid">
        <!-- Statistics Cards -->
        <mat-card class="dashboard-card">
          <mat-card-header>
            <mat-card-title>
              <mat-icon>people</mat-icon>
              Users
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="stat-number">1,234</div>
            <div class="stat-label">Total Users</div>
            <mat-progress-bar
              mode="determinate"
              value="75"
              class="stat-progress"
            ></mat-progress-bar>
          </mat-card-content>
        </mat-card>

        <mat-card class="dashboard-card">
          <mat-card-header>
            <mat-card-title>
              <mat-icon>inventory</mat-icon>
              Projects
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="stat-number">567</div>
            <div class="stat-label">Active Projects</div>
            <mat-progress-bar
              mode="determinate"
              value="60"
              class="stat-progress"
            ></mat-progress-bar>
          </mat-card-content>
        </mat-card>

        <mat-card class="dashboard-card">
          <mat-card-header>
            <mat-card-title>
              <mat-icon>trending_up</mat-icon>
              Revenue
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="stat-number">$89,432</div>
            <div class="stat-label">Monthly Revenue</div>
            <mat-progress-bar
              mode="determinate"
              value="85"
              class="stat-progress"
            ></mat-progress-bar>
          </mat-card-content>
        </mat-card>

        <mat-card class="dashboard-card">
          <mat-card-header>
            <mat-card-title>
              <mat-icon>notifications</mat-icon>
              Alerts
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="stat-number">12</div>
            <div class="stat-label">Active Alerts</div>
            <mat-progress-bar
              mode="determinate"
              value="30"
              class="stat-progress"
            ></mat-progress-bar>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Recent Activity Section -->
      <mat-card class="activity-card">
        <mat-card-header>
          <mat-card-title>Recent Activity</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="activity-list">
            <div class="activity-item">
              <mat-icon class="activity-icon">person_add</mat-icon>
              <div class="activity-content">
                <div class="activity-title">New user registered</div>
                <div class="activity-time">2 minutes ago</div>
              </div>
            </div>
            <div class="activity-item">
              <mat-icon class="activity-icon">project</mat-icon>
              <div class="activity-content">
                <div class="activity-title">
                  Project "Ahoy Dashboard" updated
                </div>
                <div class="activity-time">15 minutes ago</div>
              </div>
            </div>
            <div class="activity-item">
              <mat-icon class="activity-icon">backup</mat-icon>
              <div class="activity-content">
                <div class="activity-title">System backup completed</div>
                <div class="activity-time">1 hour ago</div>
              </div>
            </div>
            <div class="activity-item">
              <mat-icon class="activity-icon">security</mat-icon>
              <div class="activity-content">
                <div class="activity-title">Security scan completed</div>
                <div class="activity-time">2 hours ago</div>
              </div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Quick Actions -->
      <mat-card class="actions-card">
        <mat-card-header>
          <mat-card-title>Quick Actions</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="actions-grid">
            <button mat-raised-button color="primary">
              <mat-icon>add</mat-icon>
              Create Project
            </button>
            <button mat-raised-button color="accent">
              <mat-icon>person_add</mat-icon>
              Add User
            </button>
            <button mat-raised-button>
              <mat-icon>settings</mat-icon>
              Settings
            </button>
            <button mat-raised-button>
              <mat-icon>help</mat-icon>
              Help
            </button>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .dashboard-container {
        padding: 24px;
        max-width: 1400px;
        margin: 0 auto;
      }

      .dashboard-header {
        text-align: center;
        margin-bottom: 32px;
      }

      .dashboard-header h1 {
        margin: 0 0 8px 0;
        color: #333;
        font-size: 2.5rem;
        font-weight: 300;
      }

      .dashboard-header p {
        margin: 0;
        color: #666;
        font-size: 1.1rem;
      }

      .dashboard-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 24px;
        margin-bottom: 32px;
      }

      .dashboard-card {
        transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
      }

      .dashboard-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }

      .dashboard-card mat-card-header {
        margin-bottom: 16px;
      }

      .dashboard-card mat-card-title {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 1.1rem;
        color: #555;
      }

      .stat-number {
        font-size: 2rem;
        font-weight: bold;
        color: #1976d2;
        margin-bottom: 4px;
      }

      .stat-label {
        color: #666;
        font-size: 0.9rem;
        margin-bottom: 12px;
      }

      .stat-progress {
        margin-top: 8px;
      }

      .activity-card,
      .actions-card {
        margin-bottom: 24px;
      }

      .activity-list {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .activity-item {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 12px 0;
        border-bottom: 1px solid #f0f0f0;
      }

      .activity-item:last-child {
        border-bottom: none;
      }

      .activity-icon {
        color: #1976d2;
        background: #e3f2fd;
        border-radius: 50%;
        padding: 8px;
      }

      .activity-content {
        flex: 1;
      }

      .activity-title {
        font-weight: 500;
        color: #333;
        margin-bottom: 4px;
      }

      .activity-time {
        font-size: 0.85rem;
        color: #666;
      }

      .actions-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
      }

      .actions-grid button {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 24px;
        height: auto;
      }

      @media (max-width: 768px) {
        .dashboard-container {
          padding: 16px;
        }

        .dashboard-grid {
          grid-template-columns: 1fr;
          gap: 16px;
        }

        .actions-grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class DashboardComponent {
  constructor() {
    console.log("Dashboard component loaded from shell");
  }
}
