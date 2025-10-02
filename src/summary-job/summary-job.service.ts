import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSummaryJobInput } from './dto';

@Injectable()
export class SummaryJobService {
  constructor(private prisma: PrismaService) {}

  async createSummaryJob(userId: string, dto: CreateSummaryJobInput) {
    return this.prisma.summaryJob.create({ data: { ...dto, userId } });
  }

  async getSummaryJobs(userId: string) {
    return this.prisma.summaryJob.findMany({ where: { userId } });
  }

  async getSummaryJobById(userId: string, id: string) {
    const job = await this.prisma.summaryJob.findUnique({
      where: { userId, id },
    });
    if (!job) throw new NotFoundException('Summary job not found');
    return job;
  }

  async deleteSummaryJobById(userId: string, id: string) {
    const deleted = await this.prisma.summaryJob.delete({
      where: { userId, id },
    });
    if (!deleted) throw new NotFoundException('Summary job not found');
    return id;
  }
}
