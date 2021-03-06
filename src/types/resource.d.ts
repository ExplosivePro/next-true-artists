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
    tattoos?: Tattoos[];
    avatar?: string;
  }

  interface ArtistListResponse {
    artists: ArtistDetail[];
    meta: Meta;
  }
}
