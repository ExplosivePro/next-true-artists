declare namespace Admin {
  declare interface User {
    id: number;
    full_name: string;
    email: string;
    slug: string;
    role: string;
    status: string;
    password: string;
  }

  declare interface ImageAsset {
    id: number;
    name: string;
    image_url: strin;
    status: string;
  }

  declare interface Tattoo {
    id: number;
    caption: string;
    color: string;
    size: string;
    status: string;
    placement: string;
    categories: string;
    styles: string;
    description: string;
    featured: boolean;
    tags: [];
    image: ImageAsset;
  }

  declare interface ArtistProfile {
    id: number;
    user_id: number;
    name: string;
    status: string;
    avatar: ImageAsset;
    hero_banner: ImageAsset;
    slug: string;
    currency_code: string;
    price_per_hour: number;
    minimum_spend: number;
    phone_number: string;
    street_address: string;
    zip_code: string;
    city: string;
    state: string;
    country: string;
    licensed: boolean;
    years_of_experience: number;
    guest_artist: boolean;
    seeking_guest_spot: boolean;
    specialty: string;
    bio: string;
    website: string;
    facebook_url: string;
    instagram_url: string;
    twitter_url: string;
    styles: [];
    tattoos: Tattoo[];
  }

  declare interface StudioProfile {
    accepted_payment_methods: string;
    accepting_guest_artist: boolean;
    appointment_only: boolean;
    artists: [];
    avatar: ImageAsset;
    bio: string;
    city: string;
    cosmetic_tattoos: boolean;
    country: string;
    email: string;
    facebook_url: string;
    hero_banner: ImageAsset;
    id: number;
    instagram_url: string;
    languages: string;
    lgbt_friendly: boolean;
    name: string;
    parking: boolean;
    phone_number: string;
    piercings: boolean;
    price_per_hour: number;
    privacy_dividers: boolean;
    services: string;
    slug: string;
    state: string;
    status: string;
    street_address: string;
    tattoos: Tattoo[];
    twitter_url: string;
    user_id: number;
    vegan_ink: boolean;
    website_url: string;
    wheelchair_access: boolean;
    wifi: boolean;
    zip_code: string;
  }
}
