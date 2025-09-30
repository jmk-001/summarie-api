// current-user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (_data, ctx: ExecutionContext) => {
    const req =
      ctx.getType() === 'http'
        ? ctx.switchToHttp().getRequest()
        : ctx.getArgByIndex(2).req;
    return req.user;
  },
);
