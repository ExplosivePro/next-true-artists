import { api } from "src/api/axios";

// ---- Styles
export const getStyleList = async (filter = "") => {
  const { data } = await api.get(`/api/v1/admin/styles${filter}`);
  return data;
};

export const getStyle = async (styleId: string | undefined) => {
  const { data } = await api.get(`/api/v1/admin/styles/${styleId}`);
  return data;
};

export const editStyle = async (payload: any, styleId: string) => {
  const { data } = await api.patch(`/api/v1/admin/styles/${styleId}`, payload);
  return data;
};

export const updateStyle = async (payload: any, styleId: number) => {
  const { data } = await api.put(`/api/v1/admin/styles/${styleId}`, payload);
  return data;
};

export const deleteStyle = async (styleId: string) => {
  const { data } = await api.delete(`/api/v1/admin/styles/${styleId}`);
  return data;
};

export const createStyle = async (payload: any) => {
  const { data } = await api.post(`/api/v1/admin/styles`, payload);
  return data;
};
