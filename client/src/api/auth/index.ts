import { fetchWrapper } from "../helpers";

const GET_CURRENT_USER_PATH = "/api/auth/current_user";
const LOGIN_PATH = "/api/auth/login";
const SIGNUP_PATH = "/api/auth/signup";
export const getCurrentUserApi = async () => {
  return await fetchWrapper(GET_CURRENT_USER_PATH);
};

export const loginApi = async (email: string, password: string) => {
  return await fetchWrapper(LOGIN_PATH, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

export const signupApi = async (email: string, password: string) => {
  return await fetchWrapper(SIGNUP_PATH, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};
