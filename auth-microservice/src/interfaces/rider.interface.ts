enum VechileTypeEnum {
  BIKE = 'bike',
  CAR = 'car',
}

interface ICreateRider {
  riderName: string;
  riderPlateNumber: string;
  vechileType: VechileTypeEnum;
}

interface IIncludeId extends ICreateRider {
  userId: number;
}

interface IConfidentallyUpdate {
  phoneNumber?: string;
  accountStatus?: boolean;
  userId: number;
}

export { VechileTypeEnum, ICreateRider, IIncludeId, IConfidentallyUpdate };
