import { api } from "./axios";

export const uploadTattoos = async (data: any): Promise<RestApi.Response> => {
  try {
    return await api
      .post("/api/v1/tattoos/batch-create", data)
      .then((response) => {
        return { error: false, data: response.data, errors: "" };
      })
      .catch((e) => {
        const errors = [];

        if (e.response.data && typeof e.response.data === "string") {
          errors.push(e.response.data);
        }

        if (e.response.data && typeof e.response.data === "object") {
          Object.keys(e.response.data).map((name: any) => {
            // String error format
            if (e.response.data[name] && typeof e.response.data[name] === "string") {
              errors.push(e.response.data[name]);
            }

            // Array error format
            if (typeof e.response.data[name] === "object" && e.response.data[name].length > 0) {
              e.response.data[name].map((item: { attribute: any; message: any }) => {
                errors.push(`${item.attribute} ${item.message}`);
              });
            }
          });
        }

        return { error: true, data: null, errors };
      });
  } catch (e) {
    return { error: true, data: null, errors: "Internal Server Error" };
  }
};

export const updateTattoos = async (artistId: number, tattooId: number, data: any, role: string): Promise<RestApi.Response> => {
  try {
    return await api
      .put(`/api/v1/${role}s/${artistId}/tattoos/${tattooId}`, data)
      .then((response) => {
        return { error: false, data: response.data, errors: "" };
      })
      .catch((e) => {
        const errors = [];

        if (e.response.data && typeof e.response.data === "string") {
          errors.push(e.response.data);
        }

        if (e.response.data && typeof e.response.data === "object") {
          Object.keys(e.response.data).map((name: any) => {
            // String error format
            if (e.response.data[name] && typeof e.response.data[name] === "string") {
              errors.push(e.response.data[name]);
            }

            // Array error format
            if (typeof e.response.data[name] === "object" && e.response.data[name].length > 0) {
              e.response.data[name].map((item: { attribute: any; message: any }) => {
                errors.push(`${item.attribute} ${item.message}`);
              });
            }
          });
        }

        return { error: true, data: null, errors };
      });
  } catch (e) {
    return { error: true, data: null, errors: "Internal Server Error" };
  }
};
