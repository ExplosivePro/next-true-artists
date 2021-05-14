import { api } from "./axios";
import { errorHandler } from "../utils";

// Tattoo public list
export const getMyStudioList = async (id: number, page = 0, searchKey = "", filters?: any) => {
  try {
    let query = `/api/v1/artists/${id}/studios?page=${page}`;

    // IF search is defined
    if (searchKey) {
      query += `&query=${searchKey}`;
    }

    // IF filter is defined, and this is under object format
    if (filters && typeof filters === "object") {
      Object.keys(filters).map((filterKey) => {
        query += `&${filterKey}=${filters[filterKey].map((filter: any) => filter.name).join(",")}`;
      });
    }

    // IF filter is defined, and this is under string format
    if (filters && typeof filters === "string") {
      query += `&${filters}`;
    }

    const result = await api.get(query);
    return { error: false, data: result.data };
  } catch (e) {
    return errorHandler(e);
  }
};
