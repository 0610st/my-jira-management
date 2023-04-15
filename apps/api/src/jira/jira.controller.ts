import { Controller, Get, Query } from '@nestjs/common';
import { GetJiraSprintsDto } from './dto/get-sprints.dto';
import { JiraService } from './jira.service';

@Controller('jira')
export class JiraController {
  constructor(private readonly jiraService: JiraService) {}

  @Get('sprints')
  getSprints(@Query() dto: GetJiraSprintsDto) {
    return this.jiraService.getJiraSprints(dto);
  }
}
