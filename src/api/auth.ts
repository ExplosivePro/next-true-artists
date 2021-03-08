import { api } from "./axios";

// Register normal user
export const registerUser = async ({ email, password, name }: Register.ApiPayload) => {
  return await api
    .post("/api/v1/users", {
      email,
      password,
      password_confirmation: password,
      full_name: name,
    })
    .then((response) => {
      return { error: false, data: response.data, errors: "" };
    })
    .catch((e) => {
      const errors = [];

      // return { error: true, data: null, errors: e.response.data.errors };

      if (e.response.data && typeof e.response.data === "string") {
        errors.push(e.response.data);
      }

      if (e.response.data && typeof e.response.data === "object") {
        Object.keys(e.response.data).map((name: any) => {
          if (e.response.data[name].length > 0) {
            e.response.data[name].map((item: { attribute: any; message: any }) => {
              errors.push(`${item.attribute} ${item.message}`);
            });
          }
        });
      }

      return { error: true, data: null, errors };
    });
};

// Edit normal user
export const editUser = async (data: Register.ApiEditUserPayload) => {
  // Parse data, only submit valid data
  const submitData = {};

  Object.keys(data).map((key) => {
    if (data[key]) {
      submitData[key] = data[key];
    }
  });

  return await api
    .put(`/api/v1/users/${data.id}`, submitData)
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
};

// Create artist
export const createArtistProfile = async (data: Register.ApiCreateArtistPayload) => {
  // Parse data, only submit valid data
  const submitData = {};

  Object.keys(data).map((key) => {
    if (data[key]) {
      submitData[key] = data[key];
    }
  });

  return await api
    .post(`/api/v1/artists`, submitData)
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
};

// Edit artist
export const editArtistProfile = async (data: Register.ApiEditArtistPayload) => {
  // Parse data, only submit valid data
  const submitData = {};

  Object.keys(data).map((key) => {
    if (data[key]) {
      submitData[key] = data[key];
    }
  });

  return await api
    .put(`/api/v1/artists/${data.id}`, submitData)
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
};

// Login for normal user
export async function loginUser(email: string, password: string): Promise<RestApi.Response> {
  return await api
    .post("/api/v1/sessions/login", {
      user: { email, password },
    })
    .then((response) => {
      return { error: false, data: response.data, errors: "" };
    })
    .catch((e) => {
      return { error: true, data: null, errors: e.response.data.errors };
    });
}

// Request to reset password
export async function requestResetPassword(email: { email: any }): Promise<RestApi.Response> {
  return await api
    .post("/api/v1/passwords", {
      email,
    })
    .then((response) => {
      return { error: false, data: response.data, errors: "" };
    })
    .catch((e) => {
      return { error: true, data: null, errors: e.response ? e.response.data.errors : e.toString() };
    });
}

// Reset password
export async function resetPassword({
  password,
  confirmPassword,
  token,
}: {
  password: string;
  confirmPassword: string;
  token: string | string[] | undefined;
}): Promise<RestApi.Response> {
  return await api
    .put(`/api/v1/passwords/${token ? token.toString() : ""}`, {
      password,
      password_confirmation: confirmPassword,
    })
    .then((response) => {
      return { error: false, data: response.data, errors: "" };
    })
    .catch((e) => {
      return { error: true, data: null, errors: e.response ? e.response.data.errors : e.toString() };
    });
}

export function verifyUser() {
  return api.get("api/v1/me");
}
