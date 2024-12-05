import { fetchWrapper } from "../helpers";

const GET_CURRENT_USER_PATH = "/api/auth/current_user";
const LOGIN_PATH = "/api/auth/login";

export const getCurrentUserApi = async () => {
  return await fetchWrapper(GET_CURRENT_USER_PATH);
};

export const loginApi = async (email: string, password: string) => {
  return await fetchWrapper(LOGIN_PATH, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};
