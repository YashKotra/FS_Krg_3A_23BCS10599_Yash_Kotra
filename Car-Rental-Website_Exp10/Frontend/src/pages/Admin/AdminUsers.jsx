import { useEffect, useState } from "react";
import api from "../../utils/api";
import { HiTrash } from "react-icons/hi2";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get("/auth/users");
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await api.delete(`/auth/users/${id}`);
        fetchUsers();
      } catch {
        alert("Failed to delete user");
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>
      <div className="bg-black rounded-lg overflow-hidden border border-gray-800">
        <table className="w-full text-left">
          <thead className="bg-gray-800 text-gray-400">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Admin</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-900">
                <td className="p-4 text-sm text-gray-400">{user._id}</td>
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  {user.isAdmin ? (
                    <span className="text-green-400 font-bold">Yes</span>
                  ) : (
                    <span className="text-gray-500">No</span>
                  )}
                </td>
                <td className="p-4">
                  {!user.isAdmin && (
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <HiTrash className="w-5 h-5" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
