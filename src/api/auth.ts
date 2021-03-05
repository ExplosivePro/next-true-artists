import { api } from "./axios";

export const registerUser = async ({ email, password, name, role = "regular" }: Register.ApiPayload) => {
  return await api
    .post("/api/v1/users", {
      email,
      password,
      password_confirmation: password,
      full_name: name,
      role,
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

export const editUser = async ({ id, streetAddress, zipCode, country, styles }: Register.ApiEditUserPayload) => {
  // Parse data, only submit valid data
  const submitData = {};

  if (streetAddress) {
    submitData["streetAddress"] = streetAddress;
  }

  if (zipCode) {
    submitData["zipCode"] = zipCode;
  }

  if (country) {
    submitData["country"] = country;
  }

  if (styles) {
    submitData["styles"] = styles;
  }

  return await api
    .put(`/api/v1/artists/${id}`, {
      street_address: streetAddress,
      zip_code: zipCode,
      country,
    })
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
