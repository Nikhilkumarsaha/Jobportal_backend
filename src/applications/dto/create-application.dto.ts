import { IsString, IsUUID, IsUrl, IsOptional } from 'class-validator';

export class CreateApplicationDto {
  @IsUUID()
  jobId: string;

  @IsString()
  fullName: string;

  @IsString()
  email: string;

  @IsString()
  coverLetter: string;

  @IsString() 
  @IsOptional()
  resumeUrl?: string;
}