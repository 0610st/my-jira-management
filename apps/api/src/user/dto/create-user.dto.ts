import { createZodDto } from 'nestjs-zod';
import { CreateUserInputSchema } from 'contracts';

export class CreateUserInputDto extends createZodDto(CreateUserInputSchema) {}
