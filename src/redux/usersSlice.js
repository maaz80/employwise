import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Fetch Users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async (page, { rejectWithValue }) => {
  try {
    const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Update User
export const updateUser = createAsyncThunk("users/updateUser", async ({ id, userData }, { getState, rejectWithValue }) => {
  try {
    const response = await axios.put(`https://reqres.in/api/users/${id}`, userData);
    const existingUser = getState().users.users.find(user => user.id === id);

    const updatedUser = { ...existingUser, ...userData };
    toast.success("User updated successfully!");
    
    return updatedUser;
  } catch (error) {
    toast.error("Failed to update user!");
    return rejectWithValue(error.message);
  }
});

// Delete User
export const deleteUser = createAsyncThunk("users/deleteUser", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`https://reqres.in/api/users/${id}`);
    toast.success("User deleted successfully!");
    return id;
  } catch (error) {
    toast.error("Failed to delete user!");
    return rejectWithValue(error.message);
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    page: 1,
    totalPages: 1,
    search: "",
    loading: false,
    error: null,
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
      state.page = 1;
      state.users = [];
    },
    loadMoreUsers: (state) => {
      if (state.page <= state.totalPages) {
        state.page += 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => { state.loading = true; })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
         // ✅ Remove Duplicate Users
         const newUsers = action.payload.data.filter(
          (newUser) => !state.users.some((existingUser) => existingUser.id === newUser.id)
        );

        state.users = [...state.users, ...newUsers];
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Failed to fetch users!");
      })

      // Update User
      .addCase(updateUser.fulfilled, (state, action) => {
        state.users = state.users.map(user => user.id === action.payload.id ? action.payload : user);
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Delete User
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user, index, self) => 
          user.id !== action.payload && 
          index === self.findIndex(u => u.id === user.id)
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setSearch, loadMoreUsers } = usersSlice.actions;
export default usersSlice.reducer;
