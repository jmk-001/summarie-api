import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DocumentService } from './document.service';
import { Document } from './models/document.model';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { CreateDocumentInput } from './dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guard/gql-auth.guard';

@Resolver()
@UseGuards(GqlAuthGuard)
export class DocumentResolver {
  constructor(private documentService: DocumentService) {}

  @Mutation(() => Document)
  async createDocument(
    @CurrentUser() user: { id: string },
    @Args('data') data: CreateDocumentInput,
  ) {
    return this.documentService.createDocument(user.id, data);
  }

  @Query(() => Document, { name: 'document' })
  async getDocuments(@CurrentUser() user: { id: string }) {
    return this.documentService.getDocuments(user.id);
  }

  @Query(() => Document, { name: 'document', nullable: true })
  async getDocumentById(
    @CurrentUser() user: { id: string },
    @Args('id') id: string,
  ) {
    return this.documentService.getDocumentById(user.id, id);
  }

  @Mutation(() => ID, { name: 'deleteDocument' })
  async deleteDocumentById(
    @CurrentUser() user: { id: string },
    @Args('id', { type: () => ID }) id: string,
  ): Promise<string> {
    return await this.documentService.deleteDocumentById(user.id, id);
  }
}
