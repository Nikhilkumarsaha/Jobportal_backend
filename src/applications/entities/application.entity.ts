import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../auth/users/entities/user.entity';
import { Job } from '../../jobs/entities/job.entity';

@Entity()
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.applications)
  applicant: User;

  @ManyToOne(() => Job, (job) => job.applications)
  job: Job;

  @Column()
  coverLetter: string;

  @Column()
  resume: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'shortlisted', 'rejected'],
    default: 'pending',
  })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}