interface ITokenPayload {
  userId: number;
  username: string;
  phoneNumber: string;
  isActive: boolean;
}

interface IDecodedPayload {
  userId: string;
  role: string;
  username: string;
  phoneNumber: string;
  isActive: boolean;
  iat: number;
  exp: number;
  iss: string;
}

export { ITokenPayload, IDecodedPayload };
