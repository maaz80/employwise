import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, loadMoreUsers, setSearch, updateUser, deleteUser } from "../redux/usersSlice";
import Navbar from "./Navbar";

const UsersList = () => {
  const dispatch = useDispatch();
  const { users, page, totalPages, search, loading, successMessage, error } = useSelector((state) => state.users);

  const [editingUser, setEditingUser] = useState(null); // Track user being edited
  const [formData, setFormData] = useState({ first_name: "", last_name: "", email: "" });

  useEffect(() => {
    dispatch(fetchUsers(page));
  }, [dispatch, page, search]);

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setFormData({ first_name: user.first_name, last_name: user.last_name, email: user.email });
  };

  const handleSave = () => {
    dispatch(updateUser({ id: editingUser, userData: formData }));
    setEditingUser(null);
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const filteredUsers = users.filter(user =>
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-green-100 to-green-5200 flex flex-col items-center px-4 pt-14">


        {/* Users List */}
        <div className="grid pb-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-8xl overflow-hidden">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className="relative bg-white bg-opacity-80 p-2 rounded-2xl shadow-lg flex items-center space-x-4 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                <img
                  src={user.avatar}
                  alt={user.first_name}
                  className="rounded-full w-28 h-28 object-cover border-4 border-blue-500 shadow-md"
                />

                <div className="flex-1">
                  {editingUser === user.id ? (
                    <div className="w-full space-y-2">
                      <input
                        type="text"
                        value={formData.first_name}
                        onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                        className="border p-2 w-full rounded-lg focus:ring-2 focus:ring-blue-400"
                      />
                      <input
                        type="text"
                        value={formData.last_name}
                        onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                        className="border p-2 w-full rounded-lg focus:ring-2 focus:ring-blue-400"
                      />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="border p-2 w-full rounded-lg focus:ring-2 focus:ring-blue-400"
                      />
                      <button
                        onClick={handleSave}
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-200 w-full"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-xl font-bold text-gray-800">{user.first_name} {user.last_name}</h2>
                      <p className="text-gray-500">{user.email}</p>
                      <div className="flex space-x-3 mt-4">
                        <button
                          onClick={() => handleEdit(user)}
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md font-medium transition-all duration-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md font-medium transition-all duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

            ))
          ) : (
            <p className="text-gray-500">No users found.</p>
          )}
        </div>

        {/* Load More Button */}
        {page < totalPages && filteredUsers.length > 0 && (
          <button
            onClick={() => dispatch(loadMoreUsers())}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default UsersList;
