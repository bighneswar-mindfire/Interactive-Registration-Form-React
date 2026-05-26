import type { User } from '../types/types';

export const validateUser = (data: Omit<User, 'id'>) => {
  const errors: Record<string, string> = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;

  if (!data.name.trim()) errors.name = 'Full name is empty';

  if (!data.mail.trim()) {
    errors.mail = 'Email address is empty';
  } else if (!emailRegex.test(data.mail)) {
    errors.mail = 'Invalid email format';
  }

  if (!data.phone.trim()) {
    errors.phone = 'Phone number is empty';
  } else if (!phoneRegex.test(data.phone)) {
    errors.phone = 'Phone number must be 10 digits';
  }

  if (!data.gender) errors.gender = 'Gender is empty';

  return errors;
};

export const createRecord = (data: Omit<User, 'id'>): User => ({
  ...data,
  id: Date.now().toString(),
});
