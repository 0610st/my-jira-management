import { initContract } from "@ts-rest/core";
import { taskContract } from "../task/task.contract";
import { environmentContract } from "../environment/environment.contract";
import { storyContract } from "../story/story.contract";
import { sprintContract } from "../sprint/sprint.contract";
import { jiraContract } from "../jira/jira.contract";

const c = initContract();

export const api = c.router({
  environments: environmentContract,
  tasks: taskContract,
  stories: storyContract,
  sprints: sprintContract,
  jira: jiraContract,
});
