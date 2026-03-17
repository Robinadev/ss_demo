import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
  timestamp: string;
  path: string;
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}

class ApiClient {
  private client: AxiosInstance;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Load tokens from localStorage on init
    this.accessToken = localStorage.getItem('accessToken');
    this.refreshToken = localStorage.getItem('refreshToken');

    // Add request interceptor for auth token
    this.client.interceptors.request.use((config) => {
      if (this.accessToken) {
        config.headers.Authorization = `Bearer ${this.accessToken}`;
      }
      return config;
    });

    // Add response interceptor for token refresh
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // If 401 and not already trying to refresh
        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          this.refreshToken
        ) {
          originalRequest._retry = true;

          try {
            const response = await this.refresh();
            this.setTokens(response);
            originalRequest.headers.Authorization = `Bearer ${this.accessToken}`;
            return this.client(originalRequest);
          } catch (refreshError) {
            this.clearTokens();
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      },
    );
  }

  setTokens(tokens: AuthTokens) {
    this.accessToken = tokens.accessToken;
    this.refreshToken = tokens.refreshToken;
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
  }

  clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  // Auth endpoints
  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    roleId: string;
  }) {
    const response = await this.client.post<ApiResponse<any>>('/auth/register', userData);
    return response.data.data;
  }

  async login(email: string, password: string) {
    const response = await this.client.post<ApiResponse<any>>('/auth/login', {
      email,
      password,
    });
    const { tokens, user } = response.data.data;
    this.setTokens(tokens);
    return { tokens, user };
  }

  async refresh() {
    if (!this.refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await this.client.post<ApiResponse<{ tokens: AuthTokens }>>(
      '/auth/refresh',
      {
        refreshToken: this.refreshToken,
      },
    );
    return response.data.data.tokens;
  }

  async logout() {
    try {
      if (this.refreshToken) {
        await this.client.post('/auth/logout', {
          refreshToken: this.refreshToken,
        });
      }
    } finally {
      this.clearTokens();
    }
  }

  async getCurrentUser() {
    const response = await this.client.get<ApiResponse<any>>('/auth/me');
    return response.data.data;
  }

  // Report endpoints
  async getReports(filters?: Record<string, any>) {
    const response = await this.client.get<ApiResponse<any>>('/reports', {
      params: filters,
    });
    return response.data.data;
  }

  async getReportById(id: string) {
    const response = await this.client.get<ApiResponse<any>>(`/reports/${id}`);
    return response.data.data;
  }

  async createReport(reportData: any) {
    const response = await this.client.post<ApiResponse<any>>('/reports', reportData);
    return response.data.data;
  }

  async updateReport(id: string, reportData: any) {
    const response = await this.client.put<ApiResponse<any>>(
      `/reports/${id}`,
      reportData,
    );
    return response.data.data;
  }

  async deleteReport(id: string) {
    await this.client.delete(`/reports/${id}`);
  }

  // Case endpoints
  async getCases(filters?: Record<string, any>) {
    const response = await this.client.get<ApiResponse<any>>('/cases', {
      params: filters,
    });
    return response.data.data;
  }

  async getCaseById(id: string) {
    const response = await this.client.get<ApiResponse<any>>(`/cases/${id}`);
    return response.data.data;
  }

  async createCase(caseData: any) {
    const response = await this.client.post<ApiResponse<any>>('/cases', caseData);
    return response.data.data;
  }

  async updateCase(id: string, caseData: any) {
    const response = await this.client.put<ApiResponse<any>>('/cases/{id}', caseData);
    return response.data.data;
  }

  // Service providers endpoint
  async getServiceProviders(type?: string) {
    const response = await this.client.get<ApiResponse<any>>('/service-providers', {
      params: type ? { type } : {},
    });
    return response.data.data;
  }

  // Analytics endpoint
  async getAnalytics() {
    const response = await this.client.get<ApiResponse<any>>('/analytics');
    return response.data.data;
  }

  // Generic get request
  async get<T>(endpoint: string, config?: any) {
    const response = await this.client.get<ApiResponse<T>>(endpoint, config);
    return response.data.data;
  }

  // Generic post request
  async post<T>(endpoint: string, data?: any, config?: any) {
    const response = await this.client.post<ApiResponse<T>>(endpoint, data, config);
    return response.data.data;
  }

  // Generic put request
  async put<T>(endpoint: string, data?: any, config?: any) {
    const response = await this.client.put<ApiResponse<T>>(endpoint, data, config);
    return response.data.data;
  }

  // Generic delete request
  async delete<T>(endpoint: string, config?: any) {
    const response = await this.client.delete<ApiResponse<T>>(endpoint, config);
    return response.data.data;
  }
}

export default new ApiClient();
