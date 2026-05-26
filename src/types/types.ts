export interface User {
  id: string;
  name: string;
  mail: string;
  phone: string;
  gender: string;
}

export interface AppState {
  users: User[];
  errors: Record<string, string>;
  editingId: string | null;
  formData: Omit<User, 'id'>;
}
