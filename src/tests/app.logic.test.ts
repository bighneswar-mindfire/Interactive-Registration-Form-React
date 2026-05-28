import { describe, it, expect } from 'vitest';
import { validateUser, createRecord } from '../app/app.logic';

describe('Logic: validateUser', () => {
  it('should check empty fields', () => {
    const errors = validateUser({ name: '', mail: '', phone: '', gender: '' });
    expect(errors.name).toBe('Full name is empty');
  });

  it('should check phone length', () => {
    const errors = validateUser({
      name: 'vigbi',
      mail: 'vigbi@gmail.com',
      phone: '123',
      gender: 'Male',
    });
    expect(errors.phone).toBe('Phone number must be 10 digits');
  });
});

describe('Logic: createRecord', () => {
  it('should generate a string ID', () => {
    const data = {
      name: 'vigbi',
      mail: 'vigbi@gmail.com',
      phone: '1234567890',
      gender: 'Male',
    };
    const record = createRecord(data);
    expect(typeof record.id).toBe('string');
  });
});
