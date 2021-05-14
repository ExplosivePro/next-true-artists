declare namespace Studio {
  interface InviteArtistPayload {
    phone_number?: string;
    email?: string;
  }

  interface CreateClientPayload {
    phone_number?: string;
    email?: string;
    date_of_birth?: string;
    name: string;
    comments?: string;
    zip_code?: string;
    email_notifications?: boolean;
    phone_notifications?: boolean;
    marketing_emails?: boolean;
    referral_source?: string;
    inactive?: boolean;
  }

  interface EditClientPayload {
    phone_number?: string;
    email?: string;
    date_of_birth?: string;
    name?: string;
    inactive?: boolean;
    comments?: string;
    zip_code?: string;
    email_notifications?: boolean;
    phone_notifications?: boolean;
    marketing_emails?: boolean;
  }
}
