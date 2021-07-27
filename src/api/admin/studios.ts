import { api } from "src/api/axios";

// ---- Studios
export const getStudioList = async (filter = "") => {
  const { data } = await api.get(`/api/v1/admin/studios${filter}`);
  return data;
};

export const getStudio = async (studioId: string | string[] | undefined) => {
  const { data } = await api.get(`/api/v1/admin/studios/${studioId}`);
  return data;
};

// ---- Approve-Reject studios
export const approveStudio = async (studioId: number | undefined) => {
  const { data } = await api.put(`/api/v1/admin/studios/${studioId}/approve`);
  return data;
};

export const rejectStudio = async (studioId: number | undefined) => {
  const { data } = await api.put(`/api/v1/admin/studios/${studioId}/reject`);
  return data;
};

export const rejectStudioImage = async (imageId: number | undefined) => {
  const { data } = await api.put(`/api/v1/admin/studios/reject-image/${imageId}`);
  return data;
};

// ---- Flag tattoo
export const flagTattoo = async (tattooId: number | undefined) => {
  const { data } = await api.put(`/api/v1/admin/tattoos/${tattooId}/flag`);
  return data;
};
