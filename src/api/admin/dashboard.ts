import { api } from "src/api/axios";

// ---- Dashboard
export const getDashboard = async () => {
  const { data } = await api.get(`/api/v1/admin/dashboard`);
  return data;
};
