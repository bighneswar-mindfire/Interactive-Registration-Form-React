import type { User } from '../../types/types';

interface TableProps {
  users: User[];
  editingId: string | null;
  onEdit: (id: string) => void;
}

export const Table = ({ users, editingId, onEdit }: TableProps) => {
  return (
    <div className="table-section">
      <h2>Registered User Details</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className={user.id === editingId ? 'editing-row' : ''}
              >
                <td>{user.name}</td>
                <td>{user.mail}</td>
                <td>{user.phone}</td>
                <td>{user.gender}</td>
                <td>
                  <button className="edit-btn" onClick={() => onEdit(user.id)}>
                    Edit
                  </button>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
