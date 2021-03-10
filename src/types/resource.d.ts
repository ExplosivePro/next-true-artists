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

  interface Image {
    id: number;
    image_url: string;
    name: string;
  }

  interface Tattoos {
    src: string;
    thumbnail: string;
    thumbnailWidth: number;
    thumbnailHeight: number;
  }

  interface ArtistDetail {
    id: number;
    first_name?: string;
    last_name?: string;
    street_address?: string;
    city?: string;
    styles?: WorkingStyle[];
    tattoos: Tattoos[];
    avatar?: string;
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
    tattoos: Image[];
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
}
