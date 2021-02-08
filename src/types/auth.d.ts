declare namespace Register {
  interface ApiPayload {
    email: string;
    password: string;
    name: string;
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
