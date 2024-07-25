import { createBrowserRouter } from "react-router-dom";
import { BaseLayout } from "@/components/BaseLayout";
import {
  SprintDetail,
  SprintImport,
  SprintList,
  sprintMenu,
  SprintSummaryGraph,
} from "@/pages/sprint";
import {
  PreparationMain,
  preparationMenu,
  PreparationSettings,
} from "@/pages/preparation";
import { TaskList, taskMenus } from "@/pages/task";
import { StoryList, storyMenus } from "@/pages/story";
import { MainLayout } from "@/components/MainLayout";

export const Route = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        path: "sprint",
        element: <MainLayout menus={sprintMenu} />,
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
        element: <MainLayout menus={taskMenus} />,
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
        element: <MainLayout menus={storyMenus} />,
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
        element: <MainLayout menus={preparationMenu} />,
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
