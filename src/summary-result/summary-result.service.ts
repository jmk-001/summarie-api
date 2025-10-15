import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSummaryResultInput } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SummaryResultService {
  constructor(private prisma: PrismaService) {}

  async createSummaryResult(userId: string, input: CreateSummaryResultInput) {
    return this.prisma.summaryResult.create({ data: { ...input, userId } });
  }

  async getSummaryResults(userId: string) {
    const result = await this.prisma.summaryResult.findMany({
      where: { userId },
    });
    if (!result) throw new NotFoundException('Summary result not found');
    return result;
  }

  async getSummaryResultById(userId: string, id: string) {
    const result = await this.prisma.summaryResult.findUnique({
      where: { userId, id },
    });
    if (!result) throw new NotFoundException('Summary result not found');
    return result;
  }

  async findByJobId(id: string) {
    return this.prisma.summaryResult.findUnique({ where: { jobId: id } });
  }

  async deleteSummaryResult(userId: string, id: string) {
    const deleted = await this.prisma.summaryResult.delete({
      where: { userId, id },
    });
    if (!deleted) throw new NotFoundException('Summary result not found');
    return deleted;
  }
}
