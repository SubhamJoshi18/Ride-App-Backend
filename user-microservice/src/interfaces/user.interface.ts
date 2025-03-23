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

interface IUpdateUserProfile {
  uniqueName?: string;
  bio?: string;
}

interface IConfidentallyUpdate {
  accountStatus?: boolean;
  phoneNumber: string;
}

export {
  ITokenPayload,
  IDecodedPayload,
  ICreateRider,
  IUpdateUserProfile,
  IConfidentallyUpdate,
};
