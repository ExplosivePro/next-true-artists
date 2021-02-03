import { api } from "./axios";

export const registerUser = async (email: string, password: string) => {
  const { data } = await api.post("/api/v1/users", {
    user: { email, password, password_confirmation: password },
  });

  return data;
};

export async function loginUser(email: string, password: string): Promise<RestApi.Response> {
  return await api
    .post("/api/v1/login", {
      user: { email: email, password },
    })
    .then((response) => {
      return { error: false, data: response.data, errors: "" };
    })
    .catch((e) => {
      return { error: true, data: null, errors: e.response.data.errors };
    });
}

export function verifyUser() {
  return api.get("api/v1/me");
}
