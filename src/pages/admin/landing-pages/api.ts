import { api } from "src/api/axios";

// ---- Landing Pages
export const getLandingPageList = async (filter = "") => {
  const { data } = await api.get(`/api/v1/admin/landing_pages${filter}`);
  return data;
};

export const getLandingPage = async (pageId: string | undefined) => {
  const { data } = await api.get(`/api/v1/admin/landing_pages/${pageId}`);
  return data;
};

export const editLandingPage = async (payload: any, pageId: string) => {
  const { data } = await api.patch(`/api/v1/admin/landing_pages/${pageId}`, payload);
  return data;
};

export const updateLandingPage = async (payload: any, pageId: number) => {
  const { data } = await api.put(`/api/v1/admin/landing_pages/${pageId}`, payload);
  return data;
};

export const deleteLandingPage = async (pageId: string) => {
  const { data } = await api.delete(`/api/v1/admin/landing_pages/${pageId}`);
  return data;
};

export const createLandingPage = async (payload: any) => {
  const { data } = await api.post(`/api/v1/admin/landing_pages`, payload);
  return data;
};
