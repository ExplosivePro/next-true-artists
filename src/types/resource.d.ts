declare namespace Resource {
  interface Meta {
    current_page: number;
    total_pages: number;
    last_page: boolean;
    next_page: number;
    limit_value: number;
    total_count: number;
  }

  interface WorkingStyle {
    id: number;
    name: string;
  }

  interface UserDetail {
    id: number;
    email: string;
    full_name: string;
    role: string;
    status: string;
    registerType?: string;
    artist?: Resource.ArtistDetail;
    studio?: Resource.StudioDetail;
  }

  interface Image {
    id: number;
    image_url: string;
    name: string;
  }

  interface Tattoos {
    id: number;
    src: string;
    alt?: string;
    tags?: any[];
    width?: number;
    height?: number;
  }

  interface ArtistDetail {
    id: number;
    name: string;
    first_name?: string;
    last_name?: string;
    street_address?: string;
    city?: string;
    country?: string;
    years_of_experience?: number;
    website?: string;
    facebook_url?: string;
    instagram_url?: string;
    twitter_url?: string;
    zip_code?: string;
    phone_number?: string;
    specialty?: string;
    styles?: WorkingStyle[];
    tattoos: TattooDetail[];
    avatar?: Image;
    hero_banner?: Image;
    bio?: string;
    lat?: number;
    long?: number;
    currency_code?: string;
    price_per_hour?: number;
    minimum_spend?: number;
    specialties?: string[];
    seeking_guest_spot?: boolean;
    guest_artist?: boolean;
    licensed?: boolean;
    cpr_certified?: boolean;
  }

  interface ArtistListResponse {
    artists: ArtistDetail[];
    meta: Meta;
  }

  interface TopCity {
    name: string;
    image: string;
  }

  interface StudioDetail {
    id: number;
    name: string;
    email?: string;
    state?: string;
    zip_code?: string;
    phone_number?: string;
    instagram_url?: string;
    website_url?: string;
    facebook_url?: string;
    twitter_url?: string;
    accepted_payment_methods?: string;
    price_per_hour?: number;
    languages?: string;
    services?: string;
    minimum_spend?: string;
    currency_code?: string;
    city: string;
    country: string;
    rating: number;
    totalRating: number;
    tattoos: TattooDetail[];
    avatar: Image;
    bio?: string;
    street_address?: string;
    hero_banner?: Image;
    lat?: number;
    long?: number;
    artists: ArtistDetail[];
  }

  interface StudioListResponse {
    studios: StudioDetail[];
    meta: Meta;
  }

  interface TattooDetail {
    id: number;
    name?: string;
    image: Image;
    artist: ArtistDetail;
    color?: string;
    placement?: string;
    size?: string;
    description?: string;
    created_at?: string;
    liked?: number;
  }

  interface TattooListResponse {
    tattoos: TattooDetail[];
    meta: Meta;
  }

  interface Review {
    name: string;
    avatar: Image;
    rate: number;
    comment: string;
  }

  interface Location {
    id: number;
    city: string;
  }

  interface CityListResponse {
    locations: Location[];
    meta: Meta;
  }
}
