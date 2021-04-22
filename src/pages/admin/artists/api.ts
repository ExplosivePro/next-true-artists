import { api } from "src/api/axios";

// ---- Artists
export const getArtistList = async (filter = "") => {
  const { data } = await api.get(`/api/v1/admin/artists${filter}`);
  return data;
};

export const getArtist = async (artistId: string | string[] | undefined) => {
  const { data } = await api.get(`/api/v1/admin/artists/${artistId}`);
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

// ---- Flag tattoo
export const flagTattoo = async (tattooId: number | undefined) => {
  const { data } = await api.put(`/api/v1/admin/tattoos/${tattooId}/flag`);
  return data;
};
