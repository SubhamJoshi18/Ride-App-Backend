import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BIKE_TYPE, CAR_TYPE } from '../../constants/modules.constant';
import { Users } from './user.entity';

@Entity({ name: 'Rider' })
export class Rider extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id!: number;

  @Column({
    type: 'text',
  })
  riderName!: string;

  @Column({
    type: 'varchar',
    length: 4,
  })
  riderPlateNumber!: number;

  @Column({
    type: 'simple-enum',
    enum: [BIKE_TYPE, CAR_TYPE],
  })
  vechileType: string;

  @Column({
    type: 'bool',
    default: true,
  })
  isActiveRider: boolean;

  @OneToOne(() => Users, (user) => user.riderId)
  @JoinColumn()
  userId: Users;
}
