declare namespace Register {
  interface ApiPayload {
    email: string;
    password: string;
    name: string;
    role?: string;
  }

  interface ApiSocialPayload {
    email: string;
    name: string;
    socialId: number;
    provider: string;
  }

  interface ApiEditUserPayload {
    id: number;
    first_name?: string;
    last_name?: string;
    email?: string;
    street_address?: string;
    zip_code?: string;
    country?: string;
    styles?: number[];
  }

  interface ApiCreateArtistPayload {
    user_id: number;
    first_name?: string;
    last_name?: string;
    email?: string;
    street_address?: string;
    zip_code?: string;
    country?: string;
    styles?: number[];
  }

  interface ApiEditArtistPayload {
    id: number;
    first_name?: string;
    last_name?: string;
    email?: string;
    street_address?: string;
    zip_code?: string;
    country?: string;
    styles?: number[];
  }

  interface ApiCreateStudioPayload {
    user_id: number;
    first_name?: string;
    last_name?: string;
    email?: string;
    street_address?: string;
    zip_code?: string;
    country?: string;
    styles?: number[];
  }

  interface ApiEditStudioPayload {
    id: number;
    first_name?: string;
    last_name?: string;
    email?: string;
    street_address?: string;
    zip_code?: string;
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
