import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSummaryResultInput } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SummaryResultService {
  constructor(private prisma: PrismaService) {}

  async createForUser(userId: string, input: CreateSummaryResultInput) {
    return this.prisma.summaryResult.create({ data: { ...input, userId } });
  }

  async findManyForUser(userId: string) {
    const result = await this.prisma.summaryResult.findMany({
      where: { userId },
    });
    if (!result) throw new NotFoundException('Summary result not found');
    return result;
  }

  async findForUser(userId: string, id: string) {
    const result = await this.prisma.summaryResult.findUnique({
      where: { userId, id },
    });
    if (!result) throw new NotFoundException('Summary result not found');
    return result;
  }

  async findById(id: string) {
    return this.prisma.summaryResult.findUnique({ where: { id } });
  }

  async deleteForUser(userId: string, id: string) {
    const deleted = await this.prisma.summaryResult.delete({
      where: { userId, id },
    });
    if (!deleted) throw new NotFoundException('Summary result not found');
    return deleted;
  }
}
