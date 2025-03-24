import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Rides } from './rides.entity';

@Entity({
  name: 'Rides-MetaData',
})
export class RideMetadata extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 200,
    default: '',
  })
  feedBack: string;

  @Column({
    type: 'simple-enum',
    enum: [0, 1, 2, 3, 4, 5],
    default: 0,
  })
  rating: number;

  @Column({
    type: 'boolean',
    default: false,
  })
  isFavorRider: boolean;

  @OneToOne(() => Rides, (rides) => rides.ridesMetadata)
  @JoinColumn()
  rides: Rides;
}
