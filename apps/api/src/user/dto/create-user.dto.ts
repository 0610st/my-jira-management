import { createZodDto } from 'nestjs-zod';
import { CreateUserInputSchema } from 'common-schema';

export class CreateUserInputDto extends createZodDto(CreateUserInputSchema) {}
