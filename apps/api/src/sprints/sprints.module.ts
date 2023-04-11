import { Module } from '@nestjs/common';
import { SprintsService } from './sprints.service';
import { SprintsController } from './sprints.controller';
import { JiraModule } from 'src/jira/jira.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TasksModule } from 'src/tasks/tasks.module';
import { StoriesModule } from 'src/stories/stories.module';

@Module({
  providers: [SprintsService],
  controllers: [SprintsController],
  imports: [JiraModule, PrismaModule, TasksModule, StoriesModule],
})
export class SprintsModule {}
