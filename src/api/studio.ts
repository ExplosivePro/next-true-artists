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
    return result.data;
  } catch (e) {
    return errorHandler(e);
  }
};

// Edit normal user
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
