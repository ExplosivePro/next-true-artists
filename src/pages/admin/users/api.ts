import { api } from "src/api/axios";

// ---- Users
export const getUserList = async (filter = "") => {
  const { data } = await api.get(`/api/v1/admin/users${filter}`);
  return data;
};

export const getUser = async (userId: string) => {
  const { data } = await api.get(`/api/v1/admin/users/${userId}`);
  return data;
};

export const updateUser = async (payload: any, userId: number) => {
  const { data } = await api.patch(`/api/v1/admin/users/${userId}`, payload);
  return data;
};

// reset password
export const resetUserPassword = async (payload: { email: string }) => {
  const { data } = await api.post(`/api/v1/admin/passwords`, payload);
  return data;
};
