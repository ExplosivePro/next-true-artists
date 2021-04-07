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
    phone_number?: string;
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
    city: string;
    state: string;
    phone_number: string;
    instagram_ur?: string;
    website?: string;
    facebook_url?: string;
    instagram_url?: string;
    twitter_url?: string;
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
    minimum_spend?: number;
    price_per_hour?: number;
    currency_code?: string;
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
