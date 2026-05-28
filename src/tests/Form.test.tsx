import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Form } from '../components/Form/Form';

describe('Form Component', () => {
  it('should show error messages when validation fails', () => {
    render(
      <Form
        formData={{ name: '', mail: '', phone: '', gender: '' }}
        errors={{ name: 'Full name is empty' }}
        editingId={null}
        onInputChange={vi.fn()}
        onFormSubmit={vi.fn()}
      />
    );

    const errorLabel = screen.getByText('Full name is empty');

    expect(errorLabel).toBeInTheDocument();
    expect(errorLabel).not.toHaveClass('hide');
  });

  it('should show Update button and populate values when editingId is present', () => {
    render(
      <Form
        formData={{
          name: 'Bighneswar',
          mail: 'test@mail.com',
          phone: '1234567890',
          gender: 'Male',
        }}
        errors={{}}
        editingId="user-1"
        onInputChange={vi.fn()}
        onFormSubmit={vi.fn()}
      />
    );

    expect(screen.getByLabelText(/Full name:/i)).toHaveValue('Bighneswar');
    expect(screen.getByLabelText(/Email address:/i)).toHaveValue(
      'test@mail.com'
    );

    expect(screen.getByDisplayValue('Update')).toBeInTheDocument();
  });
});
