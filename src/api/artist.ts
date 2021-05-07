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
    return result.data;
  } catch (e) {
    return errorHandler(e);
  }
};

// Get client list

export const getArtistClientList = async (id: number, page = 0, searchKey = "", filters?: any) => {
  try {
    let query = `/api/v1/artists/${id}/clients?page=${page}`;

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
    return result.data;
  } catch (e) {
    return {
      tattoos: [],
      meta: {
        current_page: 1,
        last_page: true,
        limit_value: 60,
        next_page: 1,
        total_count: 0,
        total_pages: 1,
      },
    };
  }
};

// Create client
export const createArtistClient = async (id: number, data: Artist.CreateClientPayload) => {
  return await api
    .post(`/api/v1/artists/${id}/clients`, data)
    .then((response) => {
      return { error: false, data: response.data, errors: "" };
    })
    .catch((e) => {
      return errorHandler(e);
    });
};

// Update client
export const updateArtistClient = async (artistId: number, clientId: number, data: Artist.EditClientPayload) => {
  return await api
    .put(`/api/v1/artists/${artistId}/clients/${clientId}`, data)
    .then((response) => {
      return { error: false, data: response.data, errors: "" };
    })
    .catch((e) => {
      return errorHandler(e);
    });
};
