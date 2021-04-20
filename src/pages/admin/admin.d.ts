declare namespace Admin {
  declare interface User {
    id?: number;
    full_name: string;
    email: string;
    role: string;
    status: string;
    password: string;
  }

  declare interface ArtistProfile {
    id?: number;
    user_id?: number;
    name: string;
    status: string;
    currency_code: string;
    phone_number: string;
    email: string;
    price_per_hour: number;
    minimum_spend: number;
    zipCode: string;
    city: string;
    country: string;
    licensed: string;
    years_of_experience: number;
    guest_artist: boolean;
    seeking_guest_spot: boolean;
    styles: string;
    bio: string;
  }

  declare interface StudioProfile {
    id?: number;
    user_id?: number;
    name: string;
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
    lat: number;
    lon: number;
    cosmetic_tattoos: boolean;
    accepted_payment_methods: string;
    accepting_guest_artist: boolean;
    parking: string;
    piercings: boolean;
    vegan_ink: boolean;
    services: string;
    specialty: string;
    privacy_dividers: boolean;
    lgbt_friendly: boolean;
    wifi: boolean;
    wheelchair_access: boolean;
    status: string;
    styles: string;
    languages: string;
    bio: string;
  }

  declare interface Contact {
    phone_number: string;
    email: string;
    website_url: string;
    facebook_url: string;
    instagram_url: string;
    twitter_url: string;
  }

  declare interface Tattoo {
    color: string;
    size: string;
    placement: string;
    categories: string;
    styles: string;
    description: string;
    tags: string;
    image: {
      id: number;
      name: string;
      image_url: string;
      status: string;
    };
  }

  declare interface Image {
    avatar: { id: number; name: string; image_url: strin; status: string };
    hero_banner: { id: number; name: string; image_url: string; status: string };
  }
}
