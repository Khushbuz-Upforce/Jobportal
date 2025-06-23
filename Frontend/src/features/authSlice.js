import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE = 'http://localhost:3000'; // change to your API URL
// Register Thunk
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ username, email, password, role }, thunkAPI) => {
        try {
            const res = await axios.post(`${API_BASE}/auth/register`, { username, email, password, role }, { withCredentials: true });
            console.log(res.data, "register data");
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || "Registration failed");
        }
    }
);
// Login Thunk
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, thunkAPI) => {
        try {
            const res = await axios.post(`${API_BASE}/auth/login`, { email, password }, { withCredentials: true });
            // console.log(res.data, "login data");
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data.message);
        }
    }
);

// Logout Thunk
export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, thunkAPI) => {
    try {
        await axios.post(`${API_BASE}/auth/logout`, {}, { withCredentials: true });
        return true;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.message);
    }
});


const userFromStorage = localStorage.getItem('user');
const tokenFromStorage = localStorage.getItem('token');

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: userFromStorage ? JSON.parse(userFromStorage) : null,
        token: tokenFromStorage || null,

        loading: false,
        error: null,
        isAuthenticated: !!userFromStorage,
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.Users;
                state.token = action.payload.token;
                state.isAuthenticated = true;

                toast.success('Registration successful!');
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
                toast.error(action.payload);
            })

            .addCase(loginUser.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.Users;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                console.log("[REDUX] Login fulfilled payload:", action.payload);

                // Save to localStorage
                localStorage.setItem('user', JSON.stringify(action.payload.Users));
                localStorage.setItem('token', action.payload.token);

                toast.success('Login successful!');

            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
                toast.error(action.payload);
            })
            .addCase(logoutUser.fulfilled, state => {
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;

                localStorage.removeItem('user');
                localStorage.removeItem('token');

                toast.success('Logged out successfully!');
            });
    },
});

export default authSlice.reducer;
