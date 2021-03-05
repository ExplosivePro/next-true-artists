import { api } from "./axios";

export const getWorkingStyleList = async () => {
  try {
    const result = await api.get("/api/v1/styles");
    return result.data;
  } catch (e) {
    return [];
  }
};
