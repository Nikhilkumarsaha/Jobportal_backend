import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Job } from '../../../jobs/entities/job.entity';
import { Application } from '../../../applications/entities/application.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: ['jobseeker', 'employer'],
    default: 'jobseeker',
  })
  userType: string;

  @Column({ nullable: true })
  company: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  resume: string;

  @Column({ nullable: true })
  profileImage: string;

  @Column({ nullable: true })
  industry: string;

  @Column({ nullable: true })
  companySize: string;

  @Column({ nullable: true })
  website: string;

  @Column('text', { array: true, nullable: true })
  skills: string[];

  @OneToMany(() => Job, (job) => job.employer)
  jobs: Job[];

  @OneToMany(() => Application, (application) => application.applicant)
  applications: Application[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  
  @Column({ nullable: true })
description: string;

}