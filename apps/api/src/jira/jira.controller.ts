import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { GetJiraSprintsDto } from './dto/get-sprints.dto';
import { JiraSearchDto } from './dto/jira-search.dto';
import { JiraService } from './jira.service';

@Controller('jira')
export class JiraController {
  constructor(private readonly jiraService: JiraService) {}

  @Get('sprints')
  getSprints(@Query() dto: GetJiraSprintsDto) {
    return this.jiraService.getJiraSprints(dto);
  }

  @Post('tasks')
  getTasks(@Body() dto: JiraSearchDto) {
    return this.jiraService.getJiraTasks(dto);
  }

  @Post('epics')
  getEpics(@Body() dto: JiraSearchDto) {
    return this.jiraService.getJiraEpics(dto);
  }
}
