interface IUserPayload {
  email: string;
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
  password: string;
  countryISO: string;
}

export { IUserPayload };
