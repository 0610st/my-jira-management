import { createBrowserRouter } from "react-router-dom";
import { Root } from "../components/root/Root";
import {
  Sprint,
  SprintDetail,
  SprintImport,
  SprintList,
  SprintSummaryGraph,
} from "../pages/sprint";
import {
  Preparation,
  PreparationMain,
  PreparationSettings,
} from "../pages/preparation";
import { Task, TaskList } from "../pages/task";
import { Story, StoryList } from "../pages/story";

export const Route = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "sprint",
        element: <Sprint />,
        children: [
          {
            path: "top",
            element: <SprintList />,
          },
          {
            path: "summaryGraph",
            element: <SprintSummaryGraph />,
          },
          {
            path: "import",
            element: <SprintImport />,
          },
          {
            path: ":id",
            element: <SprintDetail />,
          },
          {
            path: "*",
            element: <SprintList />,
          },
        ],
      },
      {
        path: "task",
        element: <Task />,
        children: [
          {
            path: "top",
            element: <TaskList />,
          },
          {
            path: "*",
            element: <TaskList />,
          },
        ],
      },
      {
        path: "story",
        element: <Story />,
        children: [
          {
            path: "top",
            element: <StoryList />,
          },
          {
            path: "*",
            element: <StoryList />,
          },
        ],
      },
      {
        path: "preparation",
        element: <Preparation />,
        children: [
          {
            path: "settings",
            element: <PreparationSettings />,
          },
          {
            path: "main",
            element: <PreparationMain />,
          },
          {
            path: "*",
            element: <PreparationMain />,
          },
        ],
      },
    ],
  },
]);
