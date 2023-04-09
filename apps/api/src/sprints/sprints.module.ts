import { Module } from '@nestjs/common';
import { SprintsService } from './sprints.service';
import { SprintsController } from './sprints.controller';
import { JiraModule } from 'src/jira/jira.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [SprintsService],
  controllers: [SprintsController],
  imports: [JiraModule, PrismaModule],
})
export class SprintsModule {}
