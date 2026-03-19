import axios, { AxiosInstance, AxiosError } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');

      if (refreshToken) {
        try {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken,
          });

          const { access_token } = response.data.data;
          localStorage.setItem('access_token', access_token);

          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email: string, password: string) =>
    apiClient.post('/auth/login', { email, password }),
  register: (email: string, password: string, fullName: string, role: string) =>
    apiClient.post('/auth/register', { email, password, fullName, role }),
  me: () => apiClient.get('/auth/me'),
};

export const reportsAPI = {
  create: (data: any) => apiClient.post('/reports', data),
  getAll: (params?: any) => apiClient.get('/reports', { params }),
  getById: (id: string) => apiClient.get(`/reports/${id}`),
  update: (id: string, data: any) => apiClient.put(`/reports/${id}`, data),
  delete: (id: string) => apiClient.delete(`/reports/${id}`),
  submit: (id: string) => apiClient.post(`/reports/${id}/submit`, {}),
  uploadEvidence: (id: string, file: File, description?: string) => {
    const formData = new FormData();
    formData.append('file', file);
    if (description) formData.append('description', description);
    return apiClient.post(`/reports/${id}/evidence`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

export const classificationAPI = {
  classify: (text: string) => apiClient.post('/classification/classify', { text }),
  getStats: () => apiClient.get('/classification/stats'),
};

export const casesAPI = {
  getAll: (params?: any) => apiClient.get('/cases', { params }),
  getById: (id: string) => apiClient.get(`/cases/${id}`),
  update: (id: string, data: any) => apiClient.put(`/cases/${id}`, data),
  assign: (id: string, professionalId: string) =>
    apiClient.patch(`/cases/${id}/assign`, { professionalId }),
};

export const analyticsAPI = {
  getDashboard: () => apiClient.get('/analytics/dashboard'),
  getReports: () => apiClient.get('/analytics/reports'),
  getCases: () => apiClient.get('/analytics/cases'),
};

export const professionalsAPI = {
  getAll: (params?: any) => apiClient.get('/professionals', { params }),
  getById: (id: string) => apiClient.get(`/professionals/${id}`),
  update: (id: string, data: any) => apiClient.put(`/professionals/${id}`, data),
};

export const forumAPI = {
  getPosts: (params?: any) => apiClient.get('/forum/posts', { params }),
  createPost: (data: any) => apiClient.post('/forum/posts', data),
  getById: (id: string) => apiClient.get(`/forum/posts/${id}`),
  addComment: (postId: string, content: string) =>
    apiClient.post(`/forum/posts/${postId}/comments`, { content }),
};

export const supportAPI = {
  createTicket: (data: any) => apiClient.post('/support/tickets', data),
  getTickets: (params?: any) => apiClient.get('/support/tickets', { params }),
  getById: (id: string) => apiClient.get(`/support/tickets/${id}`),
  addReply: (id: string, message: string) =>
    apiClient.post(`/support/tickets/${id}/replies`, { message }),
};

export default apiClient;
