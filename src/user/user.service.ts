import { Injectable } from '@nestjs/common';
import { UpdateUserInput } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        createdAt: true,
        email: true,
      },
    });
    return user;
  }

  async updateUser(userId: string, dto: UpdateUserInput) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { ...dto },
      select: {
        id: true,
        createdAt: true,
        email: true,
      },
    });
    return user;
  }
}
