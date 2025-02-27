import { IsString, IsOptional, IsEnum } from 'class-validator';

export class UpdateEmployerProfileDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  company?: string;

  @IsString()
  @IsOptional()
  industry?: string;

  @IsEnum(['1-10', '11-50', '51-200', '201-500', '501+'])
  @IsOptional()
  companySize?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  website?: string;
}