import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Project {
  id?: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'completed' | 'on-hold';
  priority: 'low' | 'medium' | 'high';
  budget?: number;
  startDate?: string;
  endDate?: string;
  progress?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectFilters {
  status?: string;
  priority?: string;
  search?: string;
}

export interface ProjectStats {
  total: number;
  active: number;
  completed: number;
  planning: number;
  totalBudget: number;
  averageProgress: number;
  priorityStats: {
    high: number;
    medium: number;
    low: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = 'http://localhost:3002/api/projects';

  constructor(private http: HttpClient) {}

  getProjects(
    filters?: ProjectFilters
  ): Observable<{ success: boolean; data: Project[]; total: number }> {
    let url = this.apiUrl;
    if (filters) {
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.priority) params.append('priority', filters.priority);
      if (filters.search) params.append('search', filters.search);
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
    }
    return this.http.get<{ success: boolean; data: Project[]; total: number }>(
      url
    );
  }

  getProject(id: string): Observable<{ success: boolean; data: Project }> {
    return this.http.get<{ success: boolean; data: Project }>(
      `${this.apiUrl}/${id}`
    );
  }

  createProject(
    project: Project
  ): Observable<{ success: boolean; message: string; data: Project }> {
    return this.http.post<{ success: boolean; message: string; data: Project }>(
      this.apiUrl,
      project
    );
  }

  updateProject(
    id: string,
    project: Partial<Project>
  ): Observable<{ success: boolean; message: string; data: Project }> {
    return this.http.put<{ success: boolean; message: string; data: Project }>(
      `${this.apiUrl}/${id}`,
      project
    );
  }

  deleteProject(
    id: string
  ): Observable<{ success: boolean; message: string; data: Project }> {
    return this.http.delete<{
      success: boolean;
      message: string;
      data: Project;
    }>(`${this.apiUrl}/${id}`);
  }

  getProjectStats(): Observable<{ success: boolean; data: ProjectStats }> {
    return this.http.get<{ success: boolean; data: ProjectStats }>(
      `${this.apiUrl}/stats`
    );
  }
}
