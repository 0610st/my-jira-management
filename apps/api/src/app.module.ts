import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ZodValidationPipe } from 'nestjs-zod';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { JiraModule } from './jira/jira.module';
import { EpicsModule } from './epics/epics.module';
import { TasksModule } from './tasks/tasks.module';
import { HttpModule } from '@nestjs/axios';
import { SprintsModule } from './sprints/sprints.module';
import { StoriesModule } from './stories/stories.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JiraModule,
    EpicsModule,
    TasksModule,
    HttpModule,
    SprintsModule,
    StoriesModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
