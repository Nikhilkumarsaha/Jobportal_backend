import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/users/entities/user.entity';
import { Job } from '../jobs/entities/job.entity';
import { Application } from '../applications/entities/application.entity';
import { UpdateEmployerProfileDto } from './dto/update-employer-profile.dto';
import { CreateJobDto } from '../jobs/dto/create-job.dto';

@Injectable()
export class EmployerService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Job)
    private jobsRepository: Repository<Job>,
  ) {}

  async getProfile(userId: string) {
    const employer = await this.usersRepository.findOne({
      where: { id: userId, userType: 'employer' },
      select: [
        'id',
        'name',
        'email',
        'company',
        'industry',
        'companySize',
        'location',
        'description',
        'website',
        'profileImage',
      ],
    });

    if (!employer) {
      throw new NotFoundException('Employer profile not found');
    }

    return employer;
  }

  async updateProfile(userId: string, updateProfileDto: UpdateEmployerProfileDto) {
    const employer = await this.usersRepository.findOne({
      where: { id: userId, userType: 'employer' },
    });

    if (!employer) {
      throw new NotFoundException('Employer profile not found');
    }

    Object.assign(employer, updateProfileDto);
    return await this.usersRepository.save(employer);
  }

  async updateLogo(userId: string, file: Express.Multer.File) {
    const employer = await this.usersRepository.findOne({
      where: { id: userId, userType: 'employer' },
    });

    if (!employer) {
      throw new NotFoundException('Employer profile not found');
    }
    const logoUrl = `https://storage.example.com/${file.originalname}`;
    
    employer.profileImage = logoUrl;
    await this.usersRepository.save(employer);

    return { logoUrl };
  }

  async createJob(userId: string, createJobDto: CreateJobDto) {
    const employer = await this.usersRepository.findOne({
      where: { id: userId, userType: 'employer' },
    });

    if (!employer) {
      throw new ForbiddenException('Only employers can create jobs');
    }

    const job = this.jobsRepository.create({
      ...createJobDto,
      company: employer.company, 
      employer,
      status: 'active', 
    });

    return await this.jobsRepository.save(job);
  }

  async getEmployerJobs(userId: string) {
    const jobs = await this.jobsRepository.find({
      where: { employer: { id: userId } },
      relations: ['applications'],
      order: { createdAt: 'DESC' },
    });

    const activeJobsCount = jobs.filter(job => job.status === 'active').length;

    return jobs.map(job => ({
      id: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      type: job.type,
      status: job.status,
      applicantsCount: job.applications?.length || 0,
      createdAt: job.createdAt,
    }));
  }

  async getJobApplications(userId: string, jobId: string) {
    const job = await this.jobsRepository.findOne({
      where: { id: jobId, employer: { id: userId } },
      relations: ['applications', 'applications.applicant'],
    });

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    return job.applications.map(app => ({
      id: app.id,
      applicant: {
        id: app.applicant.id,
        name: app.applicant.name,
        email: app.applicant.email,
        title: app.applicant.title || 'Job Seeker'
      },
      status: app.status,
      coverLetter: app.coverLetter,
      resume: app.resume,
      appliedDate: app.createdAt.toISOString() 
    }));
  }
}