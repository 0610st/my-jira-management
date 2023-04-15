import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateSprintWithIssuesFromJiraDto } from './dto/create-sprint-with-issues-from-jira.dto';
import { CreataSprintsFromJiraDto } from './dto/create-sprints-from-jira.dto';
import { SprintsService } from './sprints.service';

@Controller('sprints')
export class SprintsController {
  constructor(private readonly sprintsService: SprintsService) {}

  @Get()
  getSprints() {
    return this.sprintsService.getSprints();
  }

  @Post()
  createSprintsFromJira(@Body() dto: CreataSprintsFromJiraDto) {
    return this.sprintsService.createSprintsFromJira(dto);
  }

  @Post('import')
  createSprintWithIssuesFromJira(
    @Body() dto: CreateSprintWithIssuesFromJiraDto,
  ) {
    return this.sprintsService.createSprintWithIssuesFromJira(dto);
  }

  @Get(':id/summary')
  getSprintSummary(@Param('id', ParseIntPipe) id: number) {
    return this.sprintsService.getSprintSummary(id);
  }
}
