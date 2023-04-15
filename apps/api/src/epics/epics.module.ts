import { Module } from '@nestjs/common';
import { EpicsService } from './epics.service';
import { EpicsController } from './epics.controller';
import { JiraModule } from 'src/jira/jira.module';

@Module({
  providers: [EpicsService],
  controllers: [EpicsController],
  imports: [JiraModule],
})
export class EpicsModule {}
