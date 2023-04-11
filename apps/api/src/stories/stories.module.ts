import { Module } from '@nestjs/common';
import { StoriesService } from './stories.service';
import { StoriesController } from './stories.controller';
import { JiraModule } from 'src/jira/jira.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [StoriesService],
  controllers: [StoriesController],
  imports: [JiraModule, PrismaModule],
  exports: [StoriesService],
})
export class StoriesModule {}
