import type { AppState } from '../../types/types';

interface FormProps {
  formData: AppState['formData'];
  errors: AppState['errors'];
  onInputChange: (field: string, value: string) => void;
  onFormSubmit: (e: React.FormEvent) => void;
}

export const Form = ({
  formData,
  errors,
  onInputChange,
  onFormSubmit,
}: FormProps) => {
  return (
    <div className="form-section">
      <h2>Registration Form</h2>
      <form onSubmit={onFormSubmit}>
        <label>Full name:</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => onInputChange('name', e.target.value)}
        />
        <span className={`validation ${errors.name ? '' : 'hide'}`}>
          {errors.name}
        </span>

        <label>Email address:</label>
        <input
          type="text"
          value={formData.mail}
          onChange={(e) => onInputChange('mail', e.target.value)}
        />
        <span className={`validation ${errors.mail ? '' : 'hide'}`}>
          {errors.mail}
        </span>

        <label>Phone number:</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => onInputChange('phone', e.target.value)}
        />
        <span className={`validation ${errors.phone ? '' : 'hide'}`}>
          {errors.phone}
        </span>

        <label>Gender:</label>
        <div className="radio-group">
          {['Male', 'Female', 'Other'].map((g) => (
            <label key={g} className="radio-label">
              <input
                type="radio"
                name="gender"
                value={g}
                checked={formData.gender === g}
                onChange={() => onInputChange('gender', g)}
              />{' '}
              {g}
            </label>
          ))}
        </div>
        <span className={`validation ${errors.gender ? '' : 'hide'}`}>
          {errors.gender}
        </span>

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};
