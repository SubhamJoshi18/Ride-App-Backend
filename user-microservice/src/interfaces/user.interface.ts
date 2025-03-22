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

enum VechileTypeEnum {
  BIKE = 'bike',
  CAR = 'car',
}

interface ICreateRider {
  riderName: string;
  riderPlateNumber: string;
  vechileType: VechileTypeEnum;
}

export { ITokenPayload, IDecodedPayload, ICreateRider };
