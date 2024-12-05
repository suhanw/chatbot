import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUserApi, loginApi } from "../../api/auth";

interface IAuthSliceState {
  currentUser: { email: string; password: string } | null;
  error: string | null;
}

const initialState: IAuthSliceState = { currentUser: null, error: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getCurrentUserSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    getCurrentUserError: (state, action) => {
      state.currentUser = null;
      state.error = action.payload;
    },
  },
});

export const { getCurrentUserSuccess, getCurrentUserError } = authSlice.actions;
export const authReducer = authSlice.reducer;

export function useCurrentUser() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.data.auth);

  useEffect(() => {
    getCurrentUserApi()
      .then((response) => dispatch(getCurrentUserSuccess(response.data)))
      .catch((error) => dispatch(getCurrentUserError(error)));
  }, []);

  return currentUser;
}

export function useLogin() {
  const dispatch = useDispatch();
  const { error } = useSelector((state: any) => state.data.auth);

  const login = (email: string, password: string) => {
    loginApi(email, password)
      .then((response) => dispatch(getCurrentUserSuccess(response.data)))
      .catch((error) => dispatch(getCurrentUserError(error)));
  };

  return { login, error };
}
