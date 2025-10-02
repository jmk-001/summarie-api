import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePromptPresetInput, UpdatePromptPresetInput } from './dto';

@Injectable()
export class PromptPresetService {
  constructor(private prisma: PrismaService) {}

  async createPromptPreset(
    currentUserId: string,
    dto: CreatePromptPresetInput,
  ) {
    return this.prisma.promptPreset.create({
      data: { ...dto, ownerId: currentUserId },
    });
  }

  async getPromptPresets(currentUserId: string) {
    return this.prisma.promptPreset.findMany({
      where: { ownerId: currentUserId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getPromptPresetById(userId: string, id: string) {
    const promptPreset = await this.prisma.promptPreset.findUnique({
      where: { ownerId: userId, id: id },
    });
    if (!promptPreset) throw new NotFoundException('Prompt preset not found');
    return promptPreset;
  }

  async updatePromptPreset(
    currentUserId: string,
    dto: UpdatePromptPresetInput,
  ) {
    return this.prisma.promptPreset.update({
      where: {
        id: dto.id,
        ownerId: currentUserId,
      },
      data: {
        name: dto.name,
        description: dto.description,
        schemaVersion: dto.schemaVersion,
        params: dto.params,
        visibility: dto.visibility,
      },
    });
  }

  async deletePromptPresetById(currentUserId: string, id: string) {
    const deleted = await this.prisma.promptPreset.delete({
      where: { ownerId: currentUserId, id: id },
    });
    if (!deleted) throw new NotFoundException('Prompt preset not found');
    return deleted.id;
  }
}
