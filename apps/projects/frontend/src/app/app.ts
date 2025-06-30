import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { loadRemoteModule } from '@angular-architects/native-federation';

import {
  ProjectService,
  Project,
  ProjectStats,
} from '../services/project.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatCardModule,
    MatToolbarModule,
    MatChipsModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  projects: Project[] = [];
  stats: ProjectStats | null = null;
  loading = signal(false);
  loadingStats = signal(false);
  showCreateForm = false;
  createForm: FormGroup;

  // Widget properties
  widgetComponent: any = null;
  loadingWidget = signal(false);

  // Table properties
  displayedColumns: string[] = [
    'name',
    'description',
    'status',
    'priority',
    'progress',
    'budget',
    'actions',
  ];

  // Pagination
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 50];
  currentPage = 0;
  totalItems = 0;

  // Sorting
  currentSort: Sort = { active: 'name', direction: 'asc' };

  constructor(
    private projectService: ProjectService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.createForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      status: ['planning', Validators.required],
      priority: ['medium', Validators.required],
      budget: [0, [Validators.min(0)]],
      startDate: [''],
      endDate: [''],
    });
  }

  ngOnInit() {
    this.loadProjects();
    this.loadStats();
    this.loadWidget();
  }

  loadProjects() {
    console.log('Loading projects...');
    this.loading.set(true);
    this.projectService.getProjects().subscribe({
      next: (response) => {
        console.log('Projects response:', response);
        if (response.success) {
          this.projects = response.data;
          this.totalItems = response.total;
          this.applySorting();
        }
        console.log('Setting loading to false');
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading projects:', error);
        this.snackBar.open('Failed to load projects', 'Close', {
          duration: 3000,
        });
        console.log('Setting loading to false (error)');
        this.loading.set(false);
      },
    });
  }

  loadStats() {
    console.log('Loading stats...');
    this.loadingStats.set(true);
    this.projectService.getProjectStats().subscribe({
      next: (response) => {
        console.log('Stats response:', response);
        if (response.success) {
          this.stats = response.data;
        }
        console.log('Setting loadingStats to false');
        this.loadingStats.set(false);
      },
      error: (error) => {
        console.error('Error loading stats:', error);
        console.log('Setting loadingStats to false (error)');
        this.loadingStats.set(false);
      },
    });
  }

  onCreateProject() {
    if (this.createForm.valid) {
      const newProject = this.createForm.value;
      this.projectService.createProject(newProject).subscribe({
        next: (response) => {
          if (response.success) {
            this.snackBar.open('Project created successfully!', 'Close', {
              duration: 3000,
            });
            this.createForm.reset({
              status: 'planning',
              priority: 'medium',
              budget: 0,
            });
            this.showCreateForm = false;
            this.loadProjects();
            this.loadStats();
          }
        },
        error: (error) => {
          console.error('Error creating project:', error);
          this.snackBar.open('Failed to create project', 'Close', {
            duration: 3000,
          });
        },
      });
    }
  }

  onDeleteProject(project: Project) {
    if (
      project.id &&
      confirm(`Are you sure you want to delete "${project.name}"?`)
    ) {
      this.projectService.deleteProject(project.id).subscribe({
        next: (response) => {
          if (response.success) {
            this.snackBar.open('Project deleted successfully!', 'Close', {
              duration: 3000,
            });
            this.loadProjects();
            this.loadStats();
          }
        },
        error: (error) => {
          console.error('Error deleting project:', error);
          this.snackBar.open('Failed to delete project', 'Close', {
            duration: 3000,
          });
        },
      });
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'active':
        return 'primary';
      case 'completed':
        return 'accent';
      case 'planning':
        return 'warn';
      case 'on-hold':
        return 'warn';
      default:
        return 'primary';
    }
  }

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'high':
        return 'warn';
      case 'medium':
        return 'primary';
      case 'low':
        return 'accent';
      default:
        return 'primary';
    }
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    // In a real app, you'd fetch data for the specific page
    // For now, we'll just apply pagination to the current data
  }

  onSortChange(sort: Sort) {
    this.currentSort = sort;
    this.applySorting();
  }

  private applySorting() {
    if (!this.currentSort.active || !this.currentSort.direction) {
      return;
    }

    this.projects.sort((a, b) => {
      const aValue = this.getPropertyValue(a, this.currentSort.active);
      const bValue = this.getPropertyValue(b, this.currentSort.active);

      if (aValue < bValue) {
        return this.currentSort.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return this.currentSort.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  private getPropertyValue(obj: any, property: string): any {
    return obj[property] || '';
  }

  get paginatedProjects(): Project[] {
    const startIndex = this.currentPage * this.pageSize;
    return this.projects.slice(startIndex, startIndex + this.pageSize);
  }

  loadWidget() {
    this.loadingWidget.set(true);
    loadRemoteModule('widget', './TimeWidget')
      .then((m) => {
        this.widgetComponent = m.App;
        this.loadingWidget.set(false);
      })
      .catch((error) => {
        console.error('Error loading widget:', error);
        this.loadingWidget.set(false);
      });
  }
}
