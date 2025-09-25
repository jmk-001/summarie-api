import { Resolver } from '@nestjs/graphql';
import { DocumentService } from './document.service';

@Resolver()
export class DocumentResolver {
  constructor(private documentService: DocumentService) {}
}
