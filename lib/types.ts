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

export interface Friendship {
  followerId: string;
  followingId: string;
}

// Типы для событий сокетов
export interface TodoUpdatedEvent {
  type: 'created' | 'updated' | 'deleted';
  todo: Todo | { id: string };
}

export interface UserDeletedEvent {
  userId: string;
}

export interface FriendshipUpdatedEvent {
  type: 'added' | 'removed';
  followerId: string;
  followingId: string;
}

export interface RegisterDto {
  username: string;
  password: string;
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