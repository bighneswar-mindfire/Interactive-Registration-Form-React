import type { User } from '../types/types';

const STORAGE_KEY = 'react_user_registry';

export const storage = {
  saveUsers: (users: User[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  },

  loadUsers: (): User[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    try {
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Could not parse storage data', error);
      return [];
    }
  },
};
