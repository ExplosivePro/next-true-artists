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

export const deleteUser = async (userId: number | undefined) => {
  const { data } = await api.delete(`/api/v1/admin/users/${userId}`);
  return data;
};

// ---- Artists
export const getArtistList = async (filter = "") => {
  const { data } = await api.get(`/api/v1/admin/artists${filter}`);
  return data;
};

export const getArtist = async (artistId: string | string[] | undefined) => {
  const { data } = await api.get(`/api/v1/admin/artists/${artistId}`);
  return data;
};

export const deleteArtist = async (artistId: number | undefined) => {
  const { data } = await api.delete(`/api/v1/admin/artists/${artistId}`);
  return data;
};

// ---- Approve-Reject artists
export const approveArtist = async (artistId: number | undefined) => {
  const { data } = await api.put(`/api/v1/admin/artists/${artistId}/approve`);
  return data;
};

export const rejectArtist = async (artistId: number | undefined) => {
  const { data } = await api.put(`/api/v1/admin/artists/${artistId}/reject`);
  return data;
};

export const rejectArtistImage = async (imageId: number | undefined) => {
  const { data } = await api.put(`/api/v1/admin/artists/reject-image/${imageId}`);
  return data;
};

// ---- Studios
export const getStudioList = async (filter = "") => {
  const { data } = await api.get(`/api/v1/admin/studios${filter}`);
  return data;
};

export const getStudio = async (studioId: string | string[] | undefined) => {
  const { data } = await api.get(`/api/v1/admin/studios/${studioId}`);
  return data;
};

export const deleteStudio = async (studioId: number | undefined) => {
  const { data } = await api.delete(`/api/v1/admin/studios/${studioId}`);
  return data;
};

export const deleteStudioArtist = async (studioId: string | undefined, studioArtistId: number | undefined) => {
  const { data } = await api.delete(`/api/v1/admin/studios/${studioId}/studio_artist/${studioArtistId}`);
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

// ---- tattoo
export const flagTattoo = async (tattooId: number | undefined) => {
  const { data } = await api.put(`/api/v1/admin/tattoos/${tattooId}/flag`);
  return data;
};

// reset password
export const resetUserPassword = async (email: string) => {
  const { data } = await api.post(`/api/v1/admin/passwords`, email);
  return data;
};
