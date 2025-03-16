import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  BaseEntity,
} from 'typeorm';
import { RIDER_ROLE, USER_ROLE } from '../../constants/roles.constant';
import { UserProfile } from './userProfile.entity';

@Entity({
  name: 'Users',
})
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id!: number;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
  })
  username!: string;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
  })
  phoneNumber!: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  password!: string;

  @Column({
    type: 'simple-enum',
    enum: [USER_ROLE, RIDER_ROLE],
    default: USER_ROLE,
  })
  role!: string;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt!: Date;

  @OneToOne(() => UserProfile, (userProfile) => userProfile.user)
  userProfile!: UserProfile;
}
