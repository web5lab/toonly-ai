import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserData } from '../../services/userService';

// Async thunk for fetching user session
export const fetchUserSession = createAsyncThunk(
  'auth/fetchUserSession',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No token found');
      }
      
      const userData = await fetchUserData(token);
      return {
        user: userData.user,
        userId: userData._id,
        token,
      };
    } catch (error) {
      localStorage.removeItem('authToken');
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for signing out
export const signOut = createAsyncThunk(
  'auth/signOut',
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem('authToken');
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isAuthenticated: false,
  user: null,
  userId: null,
  token: null,
  credits: 0,
  isSubscribed: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredits: (state, action) => {
      state.credits = action.payload;
    },
    updateCredits: (state, action) => {
      state.credits = Math.max(0, state.credits + action.payload);
    },
    clearError: (state) => {
      state.error = null;
    },
    setAuthLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch user session
      .addCase(fetchUserSession.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.userId = action.payload.userId;
        state.token = action.payload.token;
        state.credits = action.payload.user?.credits || 0;
        state.isSubscribed = action.payload.user?.subscription_active || false;
        state.error = null;
      })
      .addCase(fetchUserSession.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.userId = null;
        state.token = null;
        state.credits = 0;
        state.isSubscribed = false;
        state.error = action.payload;
      })
      // Sign out
      .addCase(signOut.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.userId = null;
        state.token = null;
        state.credits = 0;
        state.isSubscribed = false;
        state.error = null;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setCredits, updateCredits, clearError, setAuthLoading } = authSlice.actions;
export default authSlice.reducer;