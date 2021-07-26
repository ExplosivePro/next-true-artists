import { api } from "./axios";
import { Role } from "../constants";
import { errorHandler } from "../utils";

export const getStudioInvitations = async (role: Role, roleId: number, page = 0, searchKey = "", filters?: any) => {
  try {
    let queryRole = "artists";

    if (role === Role.STUDIO) {
      queryRole = "studios";
    }

    let query = `/api/v1/${queryRole}/${roleId}/studio_invites?page=${page}`;

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

export const updateStudioInvitation = async (role: Role, roleId: number, invitationId: number, action: string) => {
  try {
    let query = "";

    if (action === "accept") {
      query = `/api/v1/studio-invites/${invitationId}/accept-invite`;
    }

    if (action === "reject") {
      query = `/api/v1/studio-invites/${invitationId}/reject-invite`;
    }

    if (action === "cancel") {
      query = `/api/v1/studio-invites/${invitationId}/cancel-invite`;
    }

    const result = await api.put(query);
    return result.data;
  } catch (e) {
    return errorHandler(e);
  }
};
