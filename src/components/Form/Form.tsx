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
      <h2 className="text-2xl font-bold mb-5 pb-[10px] border-b-2 border-bg-gray">
        Registration Form
      </h2>
      <form id="regForm" onSubmit={onFormSubmit} className="flex flex-col">
        <label htmlFor="name" className="block font-semibold mb-1">
          Full name:
        </label>
        <input
          id="name"
          className="w-full p-[10px] border border-border-custom rounded-md text-sm focus:outline-none focus:border-primary transition-colors"
          type="text"
          value={formData.name}
          onChange={(e) => onInputChange('name', e.target.value)}
        />
        <span
          className={`text-error text-xs block min-h-[20px] mb-2.5 ${errors.name ? '' : 'hide'}`}
        >
          {errors.name}
        </span>

        <label htmlFor="mail" className="block font-semibold mb-1">
          Email address:
        </label>
        <input
          id="mail"
          type="text"
          className="w-full p-[10px] border border-border-custom rounded-md text-sm focus:outline-none focus:border-primary transition-colors"
          value={formData.mail}
          onChange={(e) => onInputChange('mail', e.target.value)}
        />
        <span
          className={`text-error text-xs block min-h-[20px] mb-2.5 ${errors.mail ? '' : 'hide'}`}
        >
          {errors.mail}
        </span>

        <label htmlFor="phone" className="block font-semibold mb-1">
          Phone number:
        </label>
        <input
          id="phone"
          className="w-full p-[10px] border border-border-custom rounded-md text-sm focus:outline-none focus:border-primary transition-colors"
          type="tel"
          value={formData.phone}
          onChange={(e) => onInputChange('phone', e.target.value)}
        />
        <span
          className={`text-error text-xs block min-h-[20px] mb-2.5 ${errors.phone ? '' : 'hide'}`}
        >
          {errors.phone}
        </span>

        <label className="block font-semibold mb-1">Gender:</label>
        <div className="flex flex-row gap-5 mt-1 mb-1">
          {['Male', 'Female', 'Other'].map((g) => {
            const radioId = `gender-${g.toLowerCase()}`;

            return (
              <div key={g} className="flex items-center gap-[5px]">
                <input
                  type="radio"
                  name="gender"
                  className="cursor-pointer accent-primary"
                  value={g}
                  id={radioId}
                  checked={formData.gender === g}
                  onChange={() => onInputChange('gender', g)}
                />
                <label htmlFor={radioId} className="cursor-pointer">
                  {g}
                </label>
              </div>
            );
          })}
        </div>
        <span
          className={`text-error text-xs block min-h-[20px] mb-2.5 ${errors.gender ? '' : 'hide'}`}
        >
          {errors.gender}
        </span>

        <input
          type="submit"
          value={editingId ? 'Update' : 'Submit'}
          className="w-full bg-primary hover:bg-primary-hover text-white p-3 rounded-md font-bold cursor-pointer transition-colors shadow-sm"
        />
      </form>
    </div>
  );
};
