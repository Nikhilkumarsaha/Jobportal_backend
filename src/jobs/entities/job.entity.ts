import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../auth/users/entities/user.entity';
import { Application } from '../../applications/entities/application.entity';

@Entity()
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  company: string;

  @Column()
  location: string;

  @Column()
  type: string;

  @Column({ nullable: true })
  salary: string;

  @Column('text')
  description: string;

  @Column('text')
  requirements: string;

  @Column({ nullable: true })
  experience: string;

  @Column({
    type: 'enum',
    enum: ['active', 'closed'],
    default: 'active'
  })
  status: 'active' | 'closed';

  @ManyToOne(() => User, (user) => user.jobs)
  employer: User;

  @OneToMany(() => Application, (application) => application.job)
  applications: Application[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}