export interface Company {
    _id: string;
    name: string;
    about: string;
    industry: string;
    number: string;
    city: string;
    country: string;
    address: string;
    email: string;
    password: string;
    numberOfemployee: number;
    isBlocked: boolean;
    tokens: Token[];
    OTP: string;
    __v: number;
    confirmed: boolean;
  }
  
  export interface Token {
    token: string;
    _id: string;
  }
  