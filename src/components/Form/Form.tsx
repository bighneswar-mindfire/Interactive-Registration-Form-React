import type { AppState } from '../../types/types';

interface FormProps {
  formData: AppState['formData'];
  errors: AppState['errors'];
  editingId: string | null;
  onInputChange: (field: string, value: string) => void;
  onFormSubmit: (e: React.FormEvent) => void;
}

export const Form = ({
  formData,
  errors,
  editingId,
  onInputChange,
  onFormSubmit,
}: FormProps) => {
  return (
    <div className="form-section">
      <h2>Registration Form</h2>
      <form id="regForm" onSubmit={onFormSubmit}>
        <label htmlFor="name">Full name:</label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => onInputChange('name', e.target.value)}
        />
        <span className={`validation ${errors.name ? '' : 'hide'}`}>
          {errors.name}
        </span>

        <label htmlFor="mail">Email address:</label>
        <input
          id="mail"
          type="text"
          value={formData.mail}
          onChange={(e) => onInputChange('mail', e.target.value)}
        />
        <span className={`validation ${errors.mail ? '' : 'hide'}`}>
          {errors.mail}
        </span>

        <label htmlFor="phone">Phone number:</label>
        <input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => onInputChange('phone', e.target.value)}
        />
        <span className={`validation ${errors.phone ? '' : 'hide'}`}>
          {errors.phone}
        </span>

        <label>Gender:</label>
        <div className="radio-group">
          {['Male', 'Female', 'Other'].map((g) => {
            const radioId = `gender-${g.toLowerCase()}`;

            return (
              <div key={g} className="radio-option">
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  id={radioId}
                  checked={formData.gender === g}
                  onChange={() => onInputChange('gender', g)}
                />
                <label htmlFor={radioId} className="radio-label">
                  {g}
                </label>
              </div>
            );
          })}
        </div>
        <span className={`validation ${errors.gender ? '' : 'hide'}`}>
          {errors.gender}
        </span>

        <input type="submit" value={editingId ? 'Update' : 'Submit'} />
      </form>
    </div>
  );
};
