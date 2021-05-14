declare namespace Artist {
  interface CreateClientPayload {
    phone_number?: string;
    email?: string;
    name: string;
    comments?: string;
    zip_code?: string;
    date_of_birth?: string;
    email_notifications?: boolean;
    phone_notifications?: boolean;
    marketing_emails?: boolean;
    referral_source?: string;
    inactive?: boolean;
  }

  interface EditClientPayload {
    phone_number?: string;
    email?: string;
    name?: string;
    date_of_birth?: string;
    inactive?: boolean;
    comments?: string;
    zip_code?: string;
    email_notifications?: boolean;
    phone_notifications?: boolean;
    marketing_emails?: boolean;
    referral_source?: string;
  }
}
