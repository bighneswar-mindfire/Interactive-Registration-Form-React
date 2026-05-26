import type { User } from '../../types/types';

interface TableProps {
  users: User[];
}

export const Table = ({ users }: TableProps) => {
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
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.mail}</td>
                <td>{user.phone}</td>
                <td>{user.gender}</td>
                <td>
                  <button className="edit-btn">Edit</button>
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
