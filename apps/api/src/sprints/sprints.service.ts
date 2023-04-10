import { Injectable } from '@nestjs/common';
import { JiraService } from 'src/jira/jira.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { CreataSprintsFromJiraDto } from './dto/create-sprints-from-jira.dto';

@Injectable()
export class SprintsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jiraService: JiraService,
  ) {}

  getSprints() {
    return this.prismaService.sprint.findMany();
  }

  async createSprintsFromJira(dto: CreataSprintsFromJiraDto) {
    const response = await this.jiraService.getSprints(dto);

    const createDtos = CreateSprintDto.fromResponseDto(response);

    return this.prismaService.sprint.createMany({
      data: createDtos.map((dto) => ({
        id: dto.id,
        name: dto.name,
        startDate: dto.startDate,
        endDate: dto.endDate,
      })),
    });
  }
}
