import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import apiReducer from '../Pages/Login/Loginreset/ForgotpasswordApi/resetPasswordSlice'; // Import the apiSlice
import counterReducer from '../features/counter/counterSlice';
import dataReducer from '../Pages/Login/Loginreset/LoginApi/LoginSlice';
import { updatepasswordReducer } from '../Pages/Login/UserCredential/UpdateCredentialApi/UpdateCredSlice';
import resetPasswordSlice from '../Pages/Login/Loginreset/ForgotpasswordApi/resetPasswordSlice';
import verificationSlice from '../Pages/Login/Verification/ResetpasswordApi/verificationSlice'; // Import the verificationSlice

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    data: dataReducer,
    updatePassword: updatepasswordReducer,
    api: apiReducer,
    resetPassword: resetPasswordSlice,
    verification: verificationSlice, 
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const selectUserRole = (state: RootState) => state.data.role;
export const selectUserLogged = (state: RootState) => state.data.isLoggedIn;
export const selectUserEmail = (state: RootState) => state.resetPassword.isSetEmail;