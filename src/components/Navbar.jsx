import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, setSearch } from "../redux/usersSlice";
import { logoutUser } from "../redux/authSlice"; 
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { page, search } = useSelector((state) => state.users);
  const { token } = useSelector((state) => state.auth); 

  useEffect(() => {
    dispatch(fetchUsers(page));
  }, [dispatch, page, search]);

  const handleLogout = () => {
    dispatch(logoutUser()); 
    navigate('/'); 
  };

  return (
    <div className='flex items-center justify-between p-3 bg-gradient-to-r from-green-300 to-green-500 text-white'>
      <h1 className="text-base lg:text-2xl font-bold ">Users List</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
        className="px-2 py-1 mx-4 border-2 border-white/30 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-lg w-full max-w-[50%] lg:max-w-[70%] transition-all duration-300 hover:bg-white/20"
      />

      {/* Logout  */}
      {token && (
        <button 
          onClick={handleLogout}
          className="px-2 lg:px-4 py-1.5 bg-red-500 hover:bg-red-600 rounded-lg transition-colors duration-300 font-semibold shadow-md hover:shadow-lg text-sm lg:text-base"
        >
          Logout
        </button>
      )}
    </div>
  )
}

export default Navbar;