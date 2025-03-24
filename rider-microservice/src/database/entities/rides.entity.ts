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
    enum: [START_RIDE_MODULE, COMPLETED_RIDE_MODULE, CANCEL_MODULE],
    default: IDLE_MODULE,
  })
  rideStatus: string;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  rideStartedAt: Date;

  @ManyToOne(() => Users, (user) => user.rides)
  @JoinColumn()
  user: Users;

  @ManyToOne(() => Rider, (rider) => rider.rides)
  @JoinColumn()
  rider: Rider;

  @OneToOne(() => RideMetadata,(rideMetadata) => rideMetadata.rides)
  ridesMetadata : RideMetadata
}
