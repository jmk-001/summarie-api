import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDocumentInput } from './dto';

@Injectable()
export class DocumentService {
  constructor(private prisma: PrismaService) {}

  async createDocument(currentUserId: string, dto: CreateDocumentInput) {
    return this.prisma.document.create({
      data: { ...dto, userId: currentUserId },
    });
  }

  async getDocuments(currentUserId: string) {
    return this.prisma.document.findMany({
      where: { userId: currentUserId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getDocumentById(currentUserId: string, documentId: string) {
    const document = await this.prisma.document.findUnique({
      where: { id: documentId, userId: currentUserId },
    });
    if (!document) throw new NotFoundException('Document not found');
    return document;
  }

  async deleteDocumentById(currentUserId: string, documentId: string) {
    const deleted = await this.prisma.document.deleteMany({
      where: { id: documentId, userId: currentUserId },
    });
    if (deleted.count == 0) throw new NotFoundException('Document not found');
    return { id: documentId, ok: true };
  }
}
