import { api } from "./axios";

import { errorHandler } from "../utils";

// Tattoo public list
export const getMyArtistList = async (id: number, page = 0, searchKey = "", filters?: any) => {
  try {
    let query = `/api/v1/studios/${id}/artists?page=${page}`;

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

// Invite an artist to studio
export const inviteArtist = async (data: Studio.InviteArtistPayload) => {
  return await api
    .post(`/api/v1/studio-invites/invite-artist`, data)
    .then((response) => {
      return { error: false, data: response.data, errors: "" };
    })
    .catch((e) => {
      return errorHandler(e);
    });
};

// Remove an artist from studio
export const removeArtist = async (studioId: number, artistId: number) => {
  return await api
    .delete(`/api/v1/studios/${studioId}/studio_artists/${artistId}`)
    .then((response) => {
      return { error: false, data: response.data, errors: "" };
    })
    .catch((e) => {
      return errorHandler(e);
    });
};

// Submit for review
export const submitStudioProfileForReview = async (id: number) => {
  return await api.put(`/api/v1/studios/${id}/submit_for_review`);
};

// Get client list
export const getStudioClientList = async (id: number, page = 0, searchKey = "", filters?: any) => {
  try {
    let query = `/api/v1/studios/${id}/clients?page=${page}`;

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

// Get client detail
export const getStudioClientDetail = async (id: number, clientId: number) => {
  return await api
    .get(`/api/v1/studios/${id}/clients/${clientId}`)
    .then((response) => {
      return { error: false, data: response.data, errors: "" };
    })
    .catch((e) => {
      return errorHandler(e);
    });
};

// Create client
export const createStudioClient = async (id: number, data: Studio.CreateClientPayload) => {
  return await api
    .post(`/api/v1/studios/${id}/clients`, data)
    .then((response) => {
      return { error: false, data: response.data, errors: "" };
    })
    .catch((e) => {
      return errorHandler(e);
    });
};

// Update client
export const updateStudioClient = async (artistId: number, clientId: number, data: Studio.EditClientPayload) => {
  return await api
    .put(`/api/v1/studios/${artistId}/clients/${clientId}`, data)
    .then((response) => {
      return { error: false, data: response.data, errors: "" };
    })
    .catch((e) => {
      return errorHandler(e);
    });
};
