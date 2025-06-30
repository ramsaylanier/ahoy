import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <div class="widget-container">
      <mat-card class="time-card">
        <mat-card-header>
          <mat-card-title>
            <mat-icon>schedule</mat-icon>
            Current Time
          </mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="time-display">
            <div class="time">{{ currentTime | date : 'HH:mm:ss' }}</div>
            <div class="date">{{ currentTime | date : 'EEEE, MMMM d, y' }}</div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .widget-container {
        padding: 16px;
        max-width: 400px;
        margin: 0 auto;
      }

      .time-card {
        background: linear-gradient(135deg, #3f51b5 0%, #5c6bc0 100%);
        color: white;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(63, 81, 181, 0.3);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }

      .time-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 40px rgba(63, 81, 181, 0.4);
      }

      mat-card-header {
        margin-bottom: 16px;
      }

      mat-card-title {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 1.25rem;
        font-weight: 500;
      }

      mat-icon {
        color: #c5cae9;
      }

      .time-display {
        text-align: center;
      }

      .time {
        font-size: 3rem;
        font-weight: 300;
        font-family: 'Roboto Mono', monospace;
        margin-bottom: 8px;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .date {
        font-size: 1rem;
        opacity: 0.9;
        font-weight: 400;
      }

      @media (max-width: 480px) {
        .time {
          font-size: 2.5rem;
        }

        .date {
          font-size: 0.9rem;
        }
      }
    `,
  ],
})
export class App implements OnInit, OnDestroy {
  currentTime = new Date();
  private intervalId: any;

  ngOnInit() {
    // Update time every second
    this.intervalId = setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
