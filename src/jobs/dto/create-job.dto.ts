import { IsString, IsOptional, IsEnum } from 'class-validator';

export class CreateJobDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  requirements: string;

  @IsEnum(['full-time', 'part-time', 'contract', 'internship'])
  type: string;

  @IsString()
  location: string;

  @IsString()
  @IsOptional()
  salary?: string;

  @IsString()
  experience: string;
}