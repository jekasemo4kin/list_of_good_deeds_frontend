import axios from 'axios';
import { store } from '../store';
import { logout } from '../store/slices/auth';
import { RegisterDto, LoginDto, CreateTodoDto, UpdateTodoDto, Todo, User } from './types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // важно для кук 
});

// интерцептор для перехвата 401 ошибки
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Если мы уже на странице логина, не нужно делать редирект
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        store.dispatch(logout());
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  register: (data: RegisterDto) => api.post<User>('/auth/register', data),
  login: (data: LoginDto) => api.post<User>('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  deleteProfile: () => api.delete('/auth/profile'),
  getMe: () => api.get<User>('/auth/me'),
};

export const todosApi = {
  findAll: (params?: { title?: string; name?: string }) => api.get<Todo[]>('/todos', { params }),
  create: (data: CreateTodoDto) => api.post<Todo>('/todos', data),
  update: (id: string, data: UpdateTodoDto) => api.patch<Todo>(`/todos/${id}`, data),
  delete: (id: string) => api.delete(`/todos/${id}`),
};

export const friendsApi = {
  getFriends: () => api.get<User[]>('/friends'), // Возвращает массив друзей
  toggleFriend: (userId: string) => api.post<{ message: string }>(`/friends/${userId}`),
};

export default api;