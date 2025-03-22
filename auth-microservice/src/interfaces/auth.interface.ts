interface IUserPayload {
  email: string;
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
  password: string;
  countryISO: string;
}

interface ITokenPayload {
  userId: number;
  username: string;
  phoneNumber: string;
  isActive: boolean;
}

export { IUserPayload, ITokenPayload };
