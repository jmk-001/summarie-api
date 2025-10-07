import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSummaryJobInput } from './dto';
import { SummaryQueueService } from '../summary/summary-queue.service';
import { UpdateSummaryJobInput } from './dto/update-summary-job.input';

@Injectable()
export class SummaryJobService {
  constructor(
    private prisma: PrismaService,
    private summaryQueueService: SummaryQueueService,
  ) {}

  async createForUser(userId: string, dto: CreateSummaryJobInput) {
    const job = await this.prisma.summaryJob.create({
      data: { ...dto, userId },
    });
    await this.summaryQueueService.enqueue(job.id);
    return job;
  }

  async findManyForUser(userId: string) {
    return this.prisma.summaryJob.findMany({ where: { userId } });
  }

  async findForUser(userId: string, id: string) {
    const job = await this.prisma.summaryJob.findUnique({
      where: { userId, id },
    });
    if (!job) throw new NotFoundException('Summary job not found');
    return job;
  }

  async findById(id: string) {
    return this.prisma.summaryJob.findUnique({ where: { id } });
  }

  async updateForUser(userId: string, id: string, dto: UpdateSummaryJobInput) {
    return this.prisma.summaryJob.update({
      where: { userId, id },
      data: { ...dto },
    });
  }

  async updateById(id: string, dto: UpdateSummaryJobInput) {
    return this.prisma.summaryJob.update({
      where: { id },
      data: { ...dto },
    });
  }

  async deleteForUser(userId: string, id: string) {
    const deleted = await this.prisma.summaryJob.delete({
      where: { userId, id },
    });
    if (!deleted) throw new NotFoundException('Summary job not found');
    return id;
  }
}
