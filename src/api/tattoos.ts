import { api } from "./axios";
import { Role } from "../contexts";
import { errorHandler } from "../utils";

export const uploadTattoos = async (data: any): Promise<RestApi.Response> => {
  try {
    return await api
      .post("/api/v1/tattoos/batch-create", data)
      .then((response) => {
        return { error: false, data: response.data, errors: "" };
      })
      .catch((e) => {
        return errorHandler(e);
      });
  } catch (e) {
    return { error: true, data: null, errors: "Internal Server Error" };
  }
};

// Edit tattoos with form data
export const editTattoos = async (
  artistId: number,
  tattooId: string,
  role: string,
  data: any,
): Promise<RestApi.Response> => {
  try {
    let queryRole = "artists";

    if (role === Role.STUDIO) {
      queryRole = "studios";
    }

    return await api
      .put(`/api/v1/${queryRole}/${artistId}/tattoos/${tattooId}`, data)
      .then((response) => {
        return { error: false, data: response.data, errors: "" };
      })
      .catch((e) => {
        return errorHandler(e);
      });
  } catch (e) {
    return { error: true, data: null, errors: "Internal Server Error" };
  }
};

export const updateTattoos = async (
  artistId: number,
  tattooId: number,
  data: any,
  role: string,
): Promise<RestApi.Response> => {
  try {
    return await api
      .put(`/api/v1/${role}s/${artistId}/tattoos/${tattooId}`, data)
      .then((response) => {
        return { error: false, data: response.data, errors: "" };
      })
      .catch((e) => {
        return errorHandler(e);
      });
  } catch (e) {
    return { error: true, data: null, errors: "Internal Server Error" };
  }
};

export const getTattooDetail = async (artistId: number, tattooId: string, role: string): Promise<RestApi.Response> => {
  try {
    let queryRole = "artists";

    if (role === Role.STUDIO) {
      queryRole = "studios";
    }

    return await api
      .get(`/api/v1/${queryRole}/${artistId}/tattoos/${tattooId}`)
      .then((response) => {
        return { error: false, data: response.data, errors: "" };
      })
      .catch((e) => {
        return errorHandler(e);
      });
  } catch (e) {
    return { error: true, data: null, errors: "Internal Server Error" };
  }
};

export const getTattooListByRole = async (
  id: number,
  role: string,
  page: number,
  searchKey?: string,
  filters?: any,
): Promise<Resource.TattooListResponse> => {
  try {
    let queryRole = "artists";

    if (role === Role.STUDIO) {
      queryRole = "studios";
    }

    let query = `/api/v1/${queryRole}/${id}/tattoos?page=${page}`;

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

export const deleteTattooByRole = async (roleId: number, role: string, tattooId: number) => {
  try {
    let queryRole = "artists";

    if (role === Role.STUDIO) {
      queryRole = "studios";
    }

    const query = `/api/v1/${queryRole}/${roleId}/tattoos/${tattooId}`;

    const result = await api.delete(query);
    return result.data;
  } catch (e) {
    return errorHandler(e);
  }
};
