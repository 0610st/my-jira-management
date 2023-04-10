import { Body, Controller, Get, Post } from '@nestjs/common';
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
}
