declare namespace Bolt {
  export interface IClientAdress {
    // Company
    company?: string;
    // 2 letter ISO country code
    country_code: string;
    // Full name of the country
    country: string;
    // Email address
    email: string;
    // First Name
    first_name: string;
    // Last Name
    last_name: string;
    // Refers to a city or something similar
    locality: string;
    // Phone number
    phone?: string;
    // Postal or ZIP code
    postal_code: string;
    // Refers to a state or something similar
    region: string;
    // True to make this credit card visible to the consumer, false for a single use
    save?: boolean;
    // Street address line 1
    street_address1: string;
    // Street address line 2
    street_address2?: string;
    // Street address line 3
    street_address3?: string;
    // Street address line 4
    street_address4?: string;
  }
}
