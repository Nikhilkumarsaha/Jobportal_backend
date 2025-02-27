import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/users/entities/user.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getProfile(userId: string) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      select: [
        'id',
        'name',
        'email',
        'title',
        'bio',
        'location',
        'resume',
        'skills',
        'profileImage',
      ],
    });

    if (!user) {
      throw new NotFoundException('Profile not found');
    }

    return user;
  }

  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Profile not found');
    }

    Object.assign(user, updateProfileDto);
    return await this.usersRepository.save(user);
  }

  async updateProfileImage(userId: string, file: Express.Multer.File) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Profile not found');
    }
    const imageUrl = `https://storage.example.com/${file.originalname}`;
    
    user.profileImage = imageUrl;
    await this.usersRepository.save(user);

    return { imageUrl };
  }
}