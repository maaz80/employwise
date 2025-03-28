import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk("auth/loginUser", async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post("https://reqres.in/api/login", { email, password });
    localStorage.setItem("token", response.data.token);
    return response.data.token;
  } catch (error) {
    return rejectWithValue("Invalid email or password");
  }
});

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  localStorage.removeItem("token");
  return null;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    email: "",
    password: "",
    token: localStorage.getItem("token") || null,
    error: null,
  },
  reducers: {
    setEmail: (state, action) => { state.email = action.payload; },
    setPassword: (state, action) => { state.password = action.payload; },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        state.email = "";
        state.password = "";
        state.error = null;
      });
  },
});

export const { setEmail, setPassword, logout } = authSlice.actions;
export default authSlice.reducer;