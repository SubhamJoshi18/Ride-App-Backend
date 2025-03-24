import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './user.entity';
import { Rider } from './rider.entity';
import {
  CANCEL_MODULE,
  COMPLETED_RIDE_MODULE,
  IDLE_MODULE,
  START_RIDE_MODULE,
} from '../../constants/rides-constant';
import { RideMetadata } from './rides.metaData.entity';

@Entity({
  name: 'Rides',
})
export class Rides extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    type: 'varchar',
  })
  currentLocation: string;

  @Column({
    type: 'varchar',
  })
  destinationLocation: string;

  @Column({
    type: 'int',
  })
  flare: number;

  @Column({
    type: 'simple-enum',
    enum: [
      IDLE_MODULE,
      START_RIDE_MODULE,
      COMPLETED_RIDE_MODULE,
      CANCEL_MODULE,
    ],
  })
  rideStatus: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  rideStartedAt: Date;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  rideCreatedAt: Date;

  @ManyToOne(() => Users, (user) => user.rides)
  @JoinColumn()
  user: Users;

  @ManyToOne(() => Rider, (rider) => rider.rides, { nullable: true })
  @JoinColumn()
  rider: Rider;

  @OneToOne(() => RideMetadata, (rideMetadata) => rideMetadata.rides)
  ridesMetadata: RideMetadata;
}
