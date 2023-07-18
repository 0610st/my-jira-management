import { Controller } from '@nestjs/common';
import { EnvironmentsService } from './environments.service';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { api } from 'contracts';

@Controller()
export class EnvironmentsController {
  constructor(private readonly environmentsService: EnvironmentsService) {}

  @TsRestHandler(api.environments.getEnvironment)
  async getEnvs() {
    return tsRestHandler(api.environments.getEnvironment, async () => {
      const env = this.environmentsService.getEnvs();
      return { status: 200, body: env };
    });
  }
}
