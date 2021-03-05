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

  interface ArtistDetail {}

  interface ArtistListResponse {
    artists: ArtistDetail[];
    meta: Meta;
  }
}
