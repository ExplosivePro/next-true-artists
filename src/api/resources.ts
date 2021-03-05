import { api } from "./axios";

// Working styles, used in register selection
export const getWorkingStyleList = async () => {
  try {
    const result = await api.get("/api/v1/styles");
    return result.data;
  } catch (e) {
    return [];
  }
};

// Artist public list
export const getArtistList = async (page: number) => {
  try {
    const result = await api.get(`/api/v1/artists?page=${page}`);
    return result.data;
  } catch (e) {
    return [];
  }
};
