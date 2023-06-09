import { createBrowserRouter } from "react-router-dom";
import { Root } from "../components/root/Root";
import { Sprint } from "../pages/sprint";
import { Import } from "../pages/sprint/import/Import";
import { SprintSummaryGraph } from "../pages/sprint/graph/SprintSummaryGraph";
import { Preparation } from "../pages/preparation";
import { Main } from "../pages/preparation/main/Main";
import { Settings } from "../pages/preparation/settings/Settings";
import { SprintList } from "../pages/sprint/list/SprintList";
import { SprintDetail } from "../pages/sprint/detail/SprintDetail";
import { Task } from "../pages/task";
import { TaskList } from "../pages/task/list/TaskList";
import { Story } from "../pages/story";
import { StoryList } from "../pages/story/list/StoryList";

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
            element: <Import />,
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
            element: <Settings />,
          },
          {
            path: "main",
            element: <Main />,
          },
          {
            path: "*",
            element: <Main />,
          },
        ],
      },
    ],
  },
]);
