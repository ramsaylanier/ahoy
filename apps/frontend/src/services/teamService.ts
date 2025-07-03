export interface TeamMember {
  id: number;
  name: string;
  email: string;
  role?: string;
}

export interface Team {
  id?: number;
  name: string;
  description: string;
  status?: 'active' | 'completed' | 'planning';
  start_date?: string;
  end_date?: string;
  progress?: number;
  members?: TeamMember[];
  budget?: number;
  priority?: 'high' | 'medium' | 'low';
  created_at?: string;
  updated_at?: string;
}

export interface TeamStats {
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

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
  total?: number;
}

const API_BASE_URL = 'http://localhost:3002/api';

class TeamService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}/teams${endpoint}`;

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || `HTTP error! status: ${response.status}`,
        );
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Get all teams with optional filters
  async getAllTeams(filters?: {
    status?: string;
    priority?: string;
    search?: string;
  }): Promise<Team[]> {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.priority) params.append('priority', filters.priority);
    if (filters?.search) params.append('search', filters.search);

    const queryString = params.toString();
    const endpoint = queryString ? `?${queryString}` : '';

    const response = await this.request<Team[]>(endpoint);
    return response.data;
  }

  // Get team by ID
  async getTeamById(id: number): Promise<Team> {
    const response = await this.request<Team>(`/${id}`);
    return response.data;
  }

  // Create new team
  async createTeam(
    teamData: Omit<Team, 'id' | 'created_at' | 'updated_at'>,
  ): Promise<Team> {
    const response = await this.request<Team>('', {
      method: 'POST',
      body: JSON.stringify(teamData),
    });
    return response.data;
  }

  // Update team
  async updateTeam(id: number, teamData: Partial<Team>): Promise<Team> {
    const response = await this.request<Team>(`/${id}`, {
      method: 'PUT',
      body: JSON.stringify(teamData),
    });
    return response.data;
  }

  // Delete team
  async deleteTeam(id: number): Promise<Team> {
    const response = await this.request<Team>(`/${id}`, {
      method: 'DELETE',
    });
    return response.data;
  }

  // Get team statistics
  async getTeamStats(): Promise<TeamStats> {
    const response = await this.request<TeamStats>('/stats');
    return response.data;
  }
}

export const teamService = new TeamService();
