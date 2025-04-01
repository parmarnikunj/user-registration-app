import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  registrationNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface AuthState {
  isPrivacyPolicyOn: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isPrivacyPolicyOn: false,
  user: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerStart: (state) => {
      state.isLoading = true;
      state.error = null;
      state.user = null;
    },
    registerSuccess: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setPrivatePolicyToggle: (state, action: PayloadAction<boolean>) => {
        state.isPrivacyPolicyOn = action.payload;
    },
  },
});

export const { registerStart, registerSuccess, registerFailure, setPrivatePolicyToggle } = authSlice.actions;
export default authSlice.reducer; 