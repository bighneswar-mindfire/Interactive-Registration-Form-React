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
      const newUser = createRecord(state.formData);

      setState((prev) => ({
        ...prev,
        users: [...prev.users, newUser],
        formData: initialState.formData,
        errors: {},
      }));
    } else {
      setState((prev) => ({ ...prev, errors: validationErrors }));
    }
  };

  return (
    <div className="grid">
      <Form
        formData={state.formData}
        errors={state.errors}
        onInputChange={handleInputChange}
        onFormSubmit={handleSubmit}
      />
      <Table users={state.users} />
    </div>
  );
}

export default App;
