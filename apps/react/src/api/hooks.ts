import { GetJiraSprints } from "../types/sprint";
import { client } from "../client/client";

export const useSprints = () =>
  client.sprints.getSprints.useQuery(["sprints"], {}, { staleTime: Infinity });

export const useSprintSummary = (sprintId: number, enabled: boolean) =>
  client.sprints.getSprintSummary.useQuery(
    [`sprints/${sprintId}/summary`],
    { params: { id: sprintId.toString() } },
    { staleTime: Infinity, enabled },
  );

export const useTasks = (sprintId: number | undefined, enabled: boolean) =>
  client.tasks.getTasks.useQuery(
    ["tasks", sprintId],
    {
      query: { sprintId: sprintId?.toString() },
    },
    { staleTime: Infinity, enabled },
  );

export const useTaskSummaries = (sprintId?: number) =>
  client.tasks.getTaskSummaries.useQuery(["tasks/summaries", sprintId], {
    query: { sprintId: sprintId?.toString() },
  });

export const useStorySummaries = (sprintId?: number) =>
  client.stories.getStorySummaries.useQuery(
    ["stories/summaries", sprintId],
    {
      query: { sprintId: sprintId?.toString() },
    },
    { staleTime: Infinity },
  );

export const useJiraSprints = (params: GetJiraSprints, enabled: boolean) =>
  client.jira.getSprints.useQuery(
    ["jira/sprints", params.startAt],
    {
      query: params,
    },
    {
      staleTime: Infinity,
      enabled,
    },
  );

export const useJiraFutureSprints = (enabled: boolean) =>
  client.jira.getSprints.useQuery(
    ["jira/sprints", "future"],
    {
      query: {
        state: "future",
      },
    },
    {
      cacheTime: 0,
      enabled,
    },
  );

export const useCreateSprintWithIssuesFromJira =
  client.sprints.createSprintWithIssuesFromJira.useMutation;

export const useJiraSprintEpics = (
  sprintId: number,
  open?: boolean,
  options?: Record<string, unknown>,
) => {
  const conditions = open
    ? [
        { key: "sprint", value: `${sprintId}` },
        {
          key: "status",
          value: "Done",
          operator: "not in",
        },
      ]
    : [{ key: "sprint", value: `${sprintId}` }];
  return client.jira.getEpics.useQuery(
    ["jira/epics", sprintId, open],
    { query: { conditions } },
    options,
  );
};

export const useJiraEpicTasks = (
  epicKey: string,
  open?: boolean,
  options?: Record<string, unknown>,
) => {
  const conditions = open
    ? [
        { key: "parent", value: epicKey },
        {
          key: "status",
          value: "Done",
          operator: "not in",
        },
      ]
    : [{ key: "parent", value: epicKey }];
  return client.jira.getTasks.useQuery(
    ["jira/tasks/search", epicKey, open],
    { query: { conditions } },
    options,
  );
};

export const useUpdateJiraTask = client.jira.updateTask.useMutation;

export const useCreateJiraTask = client.jira.createTask.useMutation;

export const useUpdateJiraEpic = client.jira.updateEpic.useMutation;

export const useAppEnvs = () =>
  client.environments.getEnvironment.useQuery(
    ["environments"],
    {},
    {
      staleTime: Infinity,
    },
  );

export const useStories = (sprintId?: number, enabled?: boolean) =>
  client.stories.getStories.useQuery(
    ["stories", sprintId],
    { query: { sprintId: sprintId?.toString() } },
    { staleTime: Infinity, enabled },
  );
