import { useState } from 'react';
import { Form } from '../components/Form/Form';
import { Table } from '../components/Table/Table';
import { validateUser, createRecord } from './app.logic';
import type { AppState } from '../types/types';

const initialState: AppState = {
  users: [],
  errors: {},
  editingId: null,
  formData: { name: '', mail: '', phone: '', gender: '' },
};

function App() {
  const [state, setState] = useState<AppState>(initialState);

  const handleInputChange = (field: string, value: string) => {
    setState((prev) => ({
      ...prev,
      formData: { ...prev.formData, [field]: value },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateUser(state.formData);

    if (Object.keys(validationErrors).length === 0) {
      if (state.editingId) {
        const updatedUsers = state.users.map((u) =>
          u.id === state.editingId ? { ...u, ...state.formData } : u
        );
        setState((prev) => ({
          ...prev,
          users: updatedUsers,
          editingId: null,
          formData: initialState.formData,
        }));
      } else {
        const newUser = createRecord(state.formData);
        setState((prev) => ({
          ...prev,
          users: [...prev.users, newUser],
          formData: initialState.formData,
        }));
      }
    } else {
      setState((prev) => ({ ...prev, errors: validationErrors }));
    }
  };

  const handleEdit = (id: string) => {
    const userToEdit = state.users.find((u) => u.id === id);
    if (userToEdit) {
      setState((prev) => ({
        ...prev,
        editingId: id,
        formData: { ...userToEdit },
        errors: {},
      }));
    }
  };

  return (
    <div className="grid">
      <Form
        formData={state.formData}
        errors={state.errors}
        editingId={state.editingId}
        onInputChange={handleInputChange}
        onFormSubmit={handleSubmit}
      />
      <Table
        users={state.users}
        editingId={state.editingId}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default App;
