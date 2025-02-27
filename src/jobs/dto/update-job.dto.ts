import { PartialType } from '@nestjs/swagger';
import { CreateJobDto } from './create-job.dto';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateJobDto extends PartialType(CreateJobDto) {
  @IsEnum(['active', 'closed'])
  @IsOptional()
  status?: 'active' | 'closed';
}