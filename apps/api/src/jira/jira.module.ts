import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JiraService } from './jira.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const email = configService.get('JIRA_EMAIL');
        const token = configService.get('JIRA_API_TOKEN');
        const encoded = Buffer.from(`${email}:${token}`).toString('base64');
        return {
          baseURL: configService.get('JIRA_URL'),
          headers: {
            Authorization: `Basic ${encoded}`,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [JiraService],
  exports: [JiraService],
})
export class JiraModule {}
