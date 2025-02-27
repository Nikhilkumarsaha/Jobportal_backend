import { Controller, Get, Post, Put, Body, Param, UseGuards, Request, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { EmployerService } from './employer.service';
import { UpdateEmployerProfileDto } from './dto/update-employer-profile.dto';
import { CreateJobDto } from '../jobs/dto/create-job.dto';

@Controller('employer')
@UseGuards(JwtAuthGuard)
export class EmployerController {
  constructor(private readonly employerService: EmployerService) {}

  @Get('profile')
  async getProfile(@Request() req) {
    return this.employerService.getProfile(req.user.userId);
  }

  @Put('profile')
  async updateProfile(
    @Request() req,
    @Body() updateProfileDto: UpdateEmployerProfileDto,
  ) {
    return this.employerService.updateProfile(req.user.userId, updateProfileDto);
  }

  @Post('profile/logo')
  @UseInterceptors(FileInterceptor('logo'))
  async uploadLogo(@Request() req, @UploadedFile() file: Express.Multer.File) {
    return this.employerService.updateLogo(req.user.userId, file);
  }

  @Post('jobs')
  async createJob(@Request() req, @Body() createJobDto: CreateJobDto) {
    return this.employerService.createJob(req.user.userId, createJobDto);
  }

  @Get('jobs')
  async getEmployerJobs(@Request() req) {
    return this.employerService.getEmployerJobs(req.user.userId);
  }

  @Get('jobs/:jobId/applications')
  async getJobApplications(@Request() req, @Param('jobId') jobId: string) {
    return this.employerService.getJobApplications(req.user.userId, jobId);
  }
}