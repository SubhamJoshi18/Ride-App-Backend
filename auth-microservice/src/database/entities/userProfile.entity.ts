import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Users } from './user.entity';

@Entity('UserProfiles')
export class UserProfile {
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

  @Column({
    type: 'json',
    nullable: true,
    default: () => "'{}'",
  })
  location:
    | {
        country: string;
        city: string;
        postalCode: number;
      }
    | undefined;

  @OneToOne(() => Users, (user) => user.userProfile, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'userId' })
  user!: Users;

  @Column({
    type: 'boolean',
    default: true,
  })
  isActive!: boolean;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  createdAt!: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  updatedAt!: Date;
}
