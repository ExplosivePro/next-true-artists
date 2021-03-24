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
    styles?: WorkingStyle[];
    tattoos: TattooDetail[];
    avatar?: Image;
    hero_banner?: Image;
    bio: string;
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
    city: string;
    country: string;
    rating: number;
    totalRating: number;
    tattoos: TattooDetail[];
    avatar: Image;
    bio?: string;
    street_address?: string;
    cover?: string;
    lat?: number;
    long?: number;
  }

  interface StudioListResponse {
    studios: StudioDetail[];
    meta: Meta;
  }

  interface TattooDetail {
    id: number;
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
