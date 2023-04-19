import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { GetJiraSprintsDto } from './dto/get-sprints.dto';
import { JiraEpicUpdateDto } from './dto/jira-epic-update.dto';
import { JiraSearchDto } from './dto/jira-search.dto';
import { JiraTaskCreateDto } from './dto/jira-task-create.dto';
import { JiraTaskUpdateDto } from './dto/jira-task-update.dto';
import { JiraService } from './jira.service';

@Controller('jira')
export class JiraController {
  constructor(private readonly jiraService: JiraService) {}

  @Get('sprints')
  getSprints(@Query() dto: GetJiraSprintsDto) {
    return this.jiraService.getJiraSprints(dto);
  }

  @Post('tasks/search')
  getTasks(@Body() dto: JiraSearchDto) {
    return this.jiraService.getJiraTasks(dto);
  }

  @Put('tasks/:key')
  updateTask(@Param('key') key: string, @Body() dto: JiraTaskUpdateDto) {
    return this.jiraService.updateTask(key, dto);
  }

  @Post('tasks')
  createTask(@Body() dto: JiraTaskCreateDto) {
    return this.jiraService.createTask(dto);
  }

  @Post('epics')
  getEpics(@Body() dto: JiraSearchDto) {
    return this.jiraService.getJiraEpics(dto);
  }

  @Put('epics/:key')
  updateEpic(@Param('key') key: string, @Body() dto: JiraEpicUpdateDto) {
    return this.jiraService.updateEpic(key, dto);
  }
}
