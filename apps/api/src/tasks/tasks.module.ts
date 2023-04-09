import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { JiraModule } from 'src/jira/jira.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [TasksService],
  controllers: [TasksController],
  imports: [JiraModule, PrismaModule],
})
export class TasksModule {}
