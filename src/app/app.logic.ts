import { UserSchema, type User, type UserFormData } from '../types/types';

export const validateUser = (data: UserFormData): Record<string, string> => {
  const result = UserSchema.safeParse(data);

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;
    const errorMap: Record<string, string> = {};

    Object.keys(fieldErrors).forEach((key) => {
      const messages = fieldErrors[key as keyof UserFormData];
      if (messages && messages.length > 0) {
        errorMap[key] = messages[0] as string;
      }
    });

    return errorMap;
  }

  return {};
};

export const createRecord = (data: Omit<User, 'id'>): User => ({
  ...data,
  id: Date.now().toString(),
});
