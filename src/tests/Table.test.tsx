import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Table } from '../components/Table/Table';

describe('Component: Table', () => {
  const users = [
    {
      id: '1',
      name: 'vigbi',
      mail: 'vigbi@gmail.com',
      phone: '1234567890',
      gender: 'Female',
    },
  ];

  it('renders user data', () => {
    render(
      <Table
        users={users}
        editingId={null}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );
    expect(screen.getByText('vigbi')).toBeInTheDocument();
  });

  it('highlight the editing row', () => {
    render(
      <Table users={users} editingId="1" onEdit={vi.fn()} onDelete={vi.fn()} />
    );
    const row = screen.getByText('vigbi').closest('tr');
    expect(row).toHaveClass('editing-row');
  });
});
