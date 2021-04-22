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
    id: number;
    user_id: number;
    name: string;
    status: string;
    avatar: ImageAsset;
    hero_banner: ImageAsset;
    phone_number: string;
    email: string;
    street_address: string;
    price_per_hour: number;
    services: string;
    appointment_only: boolean;
    zipCode: string;
    state: string;
    city: string;
    country: string;
    cosmetic_tattoos: boolean;
    accepted_payment_methods: string;
    accepting_guest_artist: boolean;
    parking: boolean;
    piercings: boolean;
    vegan_ink: boolean;
    services: string;
    specialty: string;
    privacy_dividers: boolean;
    lgbt_friendly: boolean;
    wifi: boolean;
    wheelchair_access: boolean;
    languages: string;
    bio: string;
    website_url: string;
    facebook_url: string;
    instagram_url: string;
    twitter_url: string;
    styles: [];
    tattoos: Tattoo[];
  }
}
