import { Controller } from '@nestjs/common';
import { SprintsService } from './sprints.service';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { api } from 'contracts';

@Controller()
export class SprintsController {
  constructor(private readonly sprintsService: SprintsService) {}

  @TsRestHandler(api.sprints.getSprints)
  async getSprints() {
    return tsRestHandler(api.sprints.getSprints, async () => {
      const sprints = await this.sprintsService.getSprints();
      return { status: 200, body: sprints };
    });
  }

  @TsRestHandler(api.sprints.createSprintWithIssuesFromJira)
  async createSprintWithIssuesFromJira() {
    return tsRestHandler(
      api.sprints.createSprintWithIssuesFromJira,
      async ({ body }) => {
        await this.sprintsService.createSprintWithIssuesFromJira(body);
        return { status: 201, body: null };
      },
    );
  }

  @TsRestHandler(api.sprints.getSprintSummary)
  async getSprintSummary() {
    return tsRestHandler(api.sprints.getSprintSummary, async ({ params }) => {
      const sprintSummary = await this.sprintsService.getSprintSummary(
        params.id,
      );
      return { status: 200, body: sprintSummary };
    });
  }
}
