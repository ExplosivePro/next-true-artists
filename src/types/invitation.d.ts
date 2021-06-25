declare namespace Invitation {
  interface Detail {
    id: number;
    status: string;
    aritst: Resource.ArtistDetail;
    studio: Resource.StudioDetail;
    created_at: string;
  }
}
