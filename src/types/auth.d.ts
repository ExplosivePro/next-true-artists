declare namespace Register {
  interface ApiPayload {
    email: string;
    password: string;
    name: string;
    role?: string;
  }

  interface ApiEditUserPayload {
    id: number;
    streetAddress?: string;
    zipCode?: string;
    country?: string;
    styles?: number[];
  }

  interface FormData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }
}

declare namespace Login {
  interface FormData {
    email: string;
    password: string;
  }
}
