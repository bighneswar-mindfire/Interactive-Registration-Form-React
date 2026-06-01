import { useState, useEffect } from 'react';
import { Form } from '../components/Form/Form';
import { Table } from '../components/Table/Table';
import { validateUser, createRecord } from './app.logic';
import type { AppState } from '../types/types';
import '../styles/main.css';
import { storage } from './app.storage';

const initialState: AppState = {
  users: [],
  errors: {},
  editingId: null,
  formData: { name: '', mail: '', phone: '', gender: '' },
};

function App() {
  const [state, setState] = useState<AppState>(() => ({
    ...initialState,
    users: storage.loadUsers(),
  }));

  useEffect(() => {
    storage.saveUsers(state.users);
  }, [state.users]);

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
          errors: {},
          formData: initialState.formData,
        }));
      } else {
        const newUser = createRecord(state.formData);
        setState((prev) => ({
          ...prev,
          users: [...prev.users, newUser],
          errors: {},
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

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      setState((prev) => {
        const updatedUsers = prev.users.filter((u) => u.id !== id);

        // Check for deleting edited redord
        const isDeletingActiveEdit = prev.editingId === id;

        return {
          ...prev,
          users: updatedUsers,
          editingId: isDeletingActiveEdit ? null : prev.editingId,
          formData: isDeletingActiveEdit
            ? initialState.formData
            : prev.formData,
          errors: isDeletingActiveEdit ? {} : prev.errors,
        };
      });
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto bg-white p-5 rounded-xl shadow-md grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-[30px] items-start">
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
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
