import { z } from 'zod';

const GENDER_VALUES = ['Male', 'Female', 'Other'] as const;

export const UserSchema = z.object({
  name: z.string().trim().min(1, 'Full name is empty'),
  mail: z.string().trim().email('Invalid email format'),
  phone: z
    .string()
    .trim()
    .regex(/^\d{10}$/, 'Phone number must be 10 digits'),

  gender: z.enum(GENDER_VALUES, {
    message: 'Gender is empty',
  }),
});

export type UserFormData = z.infer<typeof UserSchema>;

export interface User extends UserFormData {
  id: string;
}

export interface AppState {
  users: User[];
  errors: Record<string, string>;
  editingId: string | null;
  formData: UserFormData;
}
