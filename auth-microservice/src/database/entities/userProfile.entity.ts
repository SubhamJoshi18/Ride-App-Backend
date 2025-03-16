import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
  BaseEntity,
} from 'typeorm';
import { Users } from './user.entity';

@Entity('UserProfiles')
export class UserProfile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
    length: 255,
  })
  username!: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 200,
  })
  bio?: string;

  @Column({
    type: 'varchar',
    default: 'https://example.com/default-avatar.png',
  })
  profilePicture!: string;

  @OneToOne(() => Users, (user) => user.userProfile, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'userId' })
  user!: Users;

  @Column({
    type: 'bool',
    default: true,
  })
  isActive!: boolean;

  @Column({
    type: 'timestamp',
    nullable: false,
  })
  createdAt!: Date;

  @Column({
    type: 'timestamp',
    nullable: false,
  })
  updatedAt!: Date;
}
