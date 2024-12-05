import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUserApi, loginApi, signupApi } from "../../api/auth";

interface IAuthState {
  currentUser: { email: string; password: string } | null;
  error: string | null;
}

const initialState: IAuthState = { currentUser: null, error: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getCurrentUserSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    getAuthError: (state, action) => {
      state.currentUser = null;
      state.error = action.payload;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
});

export const { getCurrentUserSuccess, getAuthError, clearAuthError } =
  authSlice.actions;
export const authReducer = authSlice.reducer;

export function useCurrentUser() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.data.auth);

  useEffect(() => {
    getCurrentUserApi()
      .then((response) => dispatch(getCurrentUserSuccess(response.data)))
      .catch((error) => dispatch(getAuthError(error)));
  }, []);

  return currentUser;
}

export function useLogin() {
  const dispatch = useDispatch();
  const { error } = useSelector((state: any) => state.data.auth);

  const login = (email: string, password: string) => {
    loginApi(email, password)
      .then((response) => dispatch(getCurrentUserSuccess(response.data)))
      .catch((error) => dispatch(getAuthError(error)));
  };

  const clearLoginError = () => {
    dispatch(clearAuthError());
  };

  return { login, error, clearLoginError };
}

export function useSignup() {
  const dispatch = useDispatch();
  const { error } = useSelector((state: any) => state.data.auth);

  const signup = (email: string, password: string) => {
    signupApi(email, password)
      .then((response) => dispatch(getCurrentUserSuccess(response.data)))
      .catch((error) => dispatch(getAuthError(error)));
  };

  const clearSignupError = () => {
    dispatch(clearAuthError());
  };

  return { signup, error, clearSignupError };
}
