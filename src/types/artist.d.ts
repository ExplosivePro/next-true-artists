declare namespace Artist {
  interface CreateClientPayload {
    phone_number?: string;
    email?: string;
    name: string;
    comments?: string;
  }

  interface EditClientPayload {
    phone_number?: string;
    email?: string;
    name?: string;
    inactive?: boolean;
    comments?: string;
  }
}
