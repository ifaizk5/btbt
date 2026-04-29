import { createSlice } from '@reduxjs/toolkit';
import { readStorage, writeStorage, removeStorage } from '../../utils/storage.js';

const ACTIVE_USER_KEY = 'btbt:activeUser';
const PROFILES_KEY = 'btbt:userProfiles';

const loadUserProfiles = () => readStorage(PROFILES_KEY, {});

const saveUserProfiles = (profiles) => {
  writeStorage(PROFILES_KEY, profiles);
};

const getStoredActiveUser = () => readStorage(ACTIVE_USER_KEY, null);

const initialState = {
  user: getStoredActiveUser(),
  accessToken: readStorage('accessToken', null),
  refreshToken: readStorage('refreshToken', null),
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const profiles = loadUserProfiles();
      const email = action.payload?.email;
      const mergedUser = email && profiles[email] ? { ...profiles[email], ...action.payload } : action.payload;

      state.user = mergedUser;

      if (mergedUser?.email) {
        profiles[mergedUser.email] = mergedUser;
        saveUserProfiles(profiles);
      }

      writeStorage(ACTIVE_USER_KEY, mergedUser);
    },
    setTokens: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      writeStorage('accessToken', action.payload.accessToken);
      writeStorage('refreshToken', action.payload.refreshToken);
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      removeStorage(ACTIVE_USER_KEY);
      removeStorage('accessToken');
      removeStorage('refreshToken');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setUser, setTokens, setLoading, setError, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
