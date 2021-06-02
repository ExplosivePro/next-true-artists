import { api } from "src/api/axios";

// ---- Conventions
export const getConventionList = async (filter = "") => {
  const { data } = await api.get(`/api/v1/admin/conventions${filter}`);
  return data;
};

export const getConvention = async (conventionId: string | undefined) => {
  const { data } = await api.get(`/api/v1/admin/conventions/${conventionId}`);
  return data;
};

export const editConvention = async (payload: any, conventionId: number) => {
  const { data } = await api.patch(`/api/v1/admin/conventions/${conventionId}`, payload);
  return data;
};

export const updateConvention = async (payload: any, conventionId: number) => {
  const { data } = await api.put(`/api/v1/admin/conventions/${conventionId}`, payload);
  return data;
};

export const deleteConvention = async (conventionId: string) => {
  const { data } = await api.delete(`/api/v1/admin/conventions/${conventionId}`);
  return data;
};

export const createConvention = async (payload: any) => {
  const { data } = await api.post(`/api/v1/admin/conventions`, payload);
  return data;
};
