import { useState, useEffect, useCallback } from 'react';
import { Form } from '../components/Form/Form';
import { Table } from '../components/Table/Table';
import { validateUser, createRecord } from './app.logic';
import { storage } from './app.storage';
import type { AppState, UserFormData } from '../types/types';
import '../styles/main.css';

const emptyFormData: UserFormData = {
  name: '',
  mail: '',
  phone: '',
  gender: '' as unknown as UserFormData['gender'],
};

const initialState: AppState = {
  users: [],
  errors: {},
  editingId: null,
  formData: emptyFormData,
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
          formData: emptyFormData,
          errors: {},
        }));
      } else {
        const newUser = createRecord(state.formData);
        setState((prev) => ({
          ...prev,
          users: [...prev.users, newUser],
          formData: emptyFormData,
          errors: {},
        }));
      }
    } else {
      setState((prev) => ({ ...prev, errors: validationErrors }));
    }
  };

  const handleEdit = useCallback(
    (id: string) => {
      const userToEdit = state.users.find((u) => u.id === id);
      if (userToEdit) {
        setState((prev) => ({
          ...prev,
          editingId: id,
          formData: {
            name: userToEdit.name,
            mail: userToEdit.mail,
            phone: userToEdit.phone,
            gender: userToEdit.gender,
          },
          errors: {},
        }));
      }
    },
    [state.users]
  );

  const handleDelete = useCallback((id: string) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      setState((prev) => {
        const updatedUsers = prev.users.filter((u) => u.id !== id);
        const isDeletingActiveEdit = prev.editingId === id;

        return {
          ...prev,
          users: updatedUsers,
          editingId: isDeletingActiveEdit ? null : prev.editingId,
          formData: isDeletingActiveEdit ? emptyFormData : prev.formData,
          errors: isDeletingActiveEdit ? {} : prev.errors,
        };
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-bg-gray pt-2 md:pt-4 px-4 pb-10 md:px-10 flex justify-center items-start">
      <div className="max-w-[1200px] w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 items-start">
          <div className="w-full">
            <Form
              formData={state.formData}
              errors={state.errors}
              editingId={state.editingId}
              onInputChange={handleInputChange}
              onFormSubmit={handleSubmit}
            />
          </div>

          <div className="w-full min-w-0">
            <Table
              users={state.users}
              editingId={state.editingId}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
