import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './entities/job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobsRepository: Repository<Job>,
  ) {}

  async create(createJobDto: CreateJobDto, employerId: string) {
    const job = this.jobsRepository.create({
      ...createJobDto,
      employer: { id: employerId },
    });
    return await this.jobsRepository.save(job);
  }

  async findAll(query: any) {
    const queryBuilder = this.jobsRepository
      .createQueryBuilder('job')
      .leftJoinAndSelect('job.employer', 'employer')
      .where('job.status = :status', { status: 'active' });

    if (query.search) {
      queryBuilder.andWhere(
        '(job.title ILIKE :search OR job.company ILIKE :search OR job.location ILIKE :search)',
        { search: `%${query.search}%` },
      );
    }

    if (query.location) {
      queryBuilder.andWhere('job.location = :location', {
        location: query.location,
      });
    }

    if (query.type) {
      queryBuilder.andWhere('job.type = :type', { type: query.type });
    }

    return await queryBuilder.getMany();
  }

  async findOne(id: string) {
    const job = await this.jobsRepository.findOne({
      where: { id },
      relations: ['employer'],
    });
    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
    return job;
  }

  async update(id: string, updateJobDto: UpdateJobDto, employerId: string) {
    const job = await this.jobsRepository.findOne({
      where: { id, employer: { id: employerId } },
    });
    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
    Object.assign(job, updateJobDto);
    return await this.jobsRepository.save(job);
  }

  async remove(id: string, employerId: string) {
    const job = await this.jobsRepository.findOne({
      where: { id, employer: { id: employerId } },
    });
    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
    await this.jobsRepository.remove(job);
  }
}