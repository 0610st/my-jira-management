import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentsService {
  jiraBaseUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.jiraBaseUrl = configService.get<string>(
      'JIRA_URL',
    ) as unknown as string;
  }

  getEnvs() {
    return {
      jiraUrlPrefix: `${this.jiraBaseUrl}/browse`,
    };
  }
}
