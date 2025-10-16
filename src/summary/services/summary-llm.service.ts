import { Injectable } from '@nestjs/common';
import { LlmOutputDto } from '../dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class SummaryLlmService {
  async run(
    content: string,
    paramsSnapshot: Prisma.JsonValue,
  ): Promise<LlmOutputDto> {
    await this.sleep(3000);

    const mockResult = {
      content: `[Mock Content] ${content}`,
      tokensUsed: 30,
    };
    return mockResult;
  }

  sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
