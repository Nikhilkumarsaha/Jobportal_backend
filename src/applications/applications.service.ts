import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from './entities/application.entity';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private applicationsRepository: Repository<Application>,
  ) {}

  async create(createApplicationDto: CreateApplicationDto, userId: string) {
    console.log('Creating application with data:', createApplicationDto);
    
    if (!createApplicationDto.resumeUrl) {
      throw new BadRequestException('Resume URL is required');
    }

    try {
      const application = this.applicationsRepository.create({
        coverLetter: createApplicationDto.coverLetter,
        resume: createApplicationDto.resumeUrl,
        applicant: { id: userId },
        job: { id: createApplicationDto.jobId },
        status: 'pending'
      });

      console.log('Saving application:', application);
      return await this.applicationsRepository.save(application);
    } catch (error) {
      console.error('Error creating application:', error);
      throw new BadRequestException('Failed to create application: ' + error.message);
    }
  }

  async findAll(userId: string, userType: string) {
    try {
      const queryBuilder = this.applicationsRepository
        .createQueryBuilder('application')
        .leftJoinAndSelect('application.job', 'job')
        .leftJoinAndSelect('application.applicant', 'applicant')
        .leftJoinAndSelect('job.employer', 'employer')
        .orderBy('application.createdAt', 'DESC');

      if (userType === 'jobseeker') {
        queryBuilder.where('applicant.id = :userId', { userId });
      } else {
        queryBuilder.where('employer.id = :userId', { userId });
      }

      const applications = await queryBuilder.getMany();
      
      return applications.map(app => ({
        id: app.id,
        job: {
          id: app.job.id,
          title: app.job.title,
          company: app.job.company
        },
        status: app.status,
        appliedDate: app.createdAt,
        coverLetter: app.coverLetter,
        resume: app.resume
      }));
    } catch (error) {
      console.error('Error fetching applications:', error);
      throw new Error('Failed to fetch applications');
    }
  }

  async findOne(id: string, userId: string) {
    const application = await this.applicationsRepository.findOne({
      where: { id },
      relations: ['job', 'applicant', 'job.employer'],
    });

    if (!application) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }

    if (
      application.applicant.id !== userId &&
      application.job.employer.id !== userId
    ) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }

    return application;
  }

  async update(id: string, updateApplicationDto: UpdateApplicationDto, userId: string) {
    const application = await this.findOne(id, userId);
    Object.assign(application, updateApplicationDto);
    return await this.applicationsRepository.save(application);
  }
}