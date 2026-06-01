import type { User } from '../../types/types';

interface TableProps {
  users: User[];
  editingId: string | null;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const Table = ({ users, editingId, onEdit, onDelete }: TableProps) => {
  return (
    <div className="w-full min-w-0">
      <h2>Registered User Details</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[500px]">
          <thead>
            <tr className="bg-[#f1f3f5]">
              <th className="p-[12px_15px] border-b border-border-custom text-left font-bold">
                Name
              </th>
              <th className="p-[12px_15px] border-b border-border-custom text-left font-bold">
                Email
              </th>
              <th className="p-[12px_15px] border-b border-border-custom text-left font-bold">
                Phone
              </th>
              <th className="p-[12px_15px] border-b border-border-custom text-left font-bold">
                Gender
              </th>
              <th className="p-[12px_15px] border-b border-border-custom text-left font-bold">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className={`hover:bg-[#f8f9fa] transition-colors ${user.id === editingId ? 'bg-edit-bg!' : ''}`}
              >
                <td className="p-[12px_15px] border-b border-border-custom">
                  {user.name}
                </td>
                <td className="p-[12px_15px] border-b border-border-custom">
                  {user.mail}
                </td>
                <td className="p-[12px_15px] border-b border-border-custom">
                  {user.phone}
                </td>
                <td className="p-[12px_15px] border-b border-border-custom">
                  {user.gender}
                </td>
                <td className="p-[12px_15px] border-b border-border-custom">
                  <button
                    className="p-[6px_12px] bg-[#e7f5ff] text-[#1971c2] rounded text-xs font-bold mr-[5px] hover:bg-[#d0ebff] cursor-pointer"
                    onClick={() => onEdit(user.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="p-[6px_12px] bg-[#fff5f5] text-[#e03131] rounded text-xs font-bold hover:bg-[#ffe3e3] cursor-pointer"
                    onClick={() => onDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
