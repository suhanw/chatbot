import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUserApi, loginApi, signupApi } from "../../api/auth";

interface IAuthState {
  currentUser: { email: string; password: string } | null;
}

const initialState: IAuthState = { currentUser: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getCurrentUserSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    getAuthError: (state, action) => {
      state.currentUser = null;
    },
  },
});

export const { getCurrentUserSuccess, getAuthError } = authSlice.actions;

export const authReducer = authSlice.reducer;

/** REACT HOOKS */

export function useGetCurrentUser() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.data.auth);

  const getCurrentUser = async () => {
    try {
      const response = await getCurrentUserApi();
      dispatch(getCurrentUserSuccess(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return { getCurrentUser, currentUser, isLoggedIn: Boolean(currentUser) };
}

export function useLogin() {
  const dispatch = useDispatch();
  const [error, setError] = useState<any>(null);

  const login = (email: string, password: string) => {
    loginApi(email, password)
      .then((response) => dispatch(getCurrentUserSuccess(response.data)))
      .catch((error) => {
        dispatch(getAuthError(error));
        setError(error);
      });
  };

  const clearLoginError = () => {
    setError(null);
  };

  return { login, error, clearLoginError };
}

export function useSignup() {
  const dispatch = useDispatch();
  const [error, setError] = useState<any>(null);

  const signup = (email: string, password: string) => {
    signupApi(email, password)
      .then((response) => dispatch(getCurrentUserSuccess(response.data)))
      .catch((error) => {
        dispatch(getAuthError(error));
        setError(error);
      });
  };

  const clearSignupError = () => {
    setError(null);
  };

  return { signup, error, clearSignupError };
}

export function useCurrentUser() {
  const currentUser = useSelector((state: any) => state.data.auth.currentUser);
  return { currentUser, isLoggedIn: Boolean(currentUser) };
}
