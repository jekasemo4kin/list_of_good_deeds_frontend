export interface User {
  id: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export interface Todo {
  id: string;
  title: string;
  description: string;
  name: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Friend {
  id: string;
  username: string;
}

export interface TodoUpdatedEvent {
  type: 'created' | 'updated' | 'deleted';
  todo: Todo;
}

export interface UserDeletedEvent {
  userId: string;
}

export interface FriendshipUpdatedEvent {
  type: 'added' | 'removed';
  followerId: string;
  user: Friend; 
}

export interface RegisterDto {
  username: string;
  password: string;
  confirmPassword: string;
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface CreateTodoDto {
  title: string;
  description: string;
}

export interface UpdateTodoDto {
  title?: string;
  description?: string;
}