import { createBrowserRouter } from "react-router-dom";
import { Root } from "../components/root/Root";
import { Achievement } from "../pages/achievement";
import { Import } from "../pages/achievement/import/Import";
import { Sprint } from "../pages/achievement/sprint/Sprint";
import { Whole } from "../pages/achievement/whole/Whole";
import { Preparation } from "../pages/preparation";
import { Main } from "../pages/preparation/main/Main";
import { Settings } from "../pages/preparation/settings/Settings";

export const Route = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "achievement",
        element: <Achievement />,
        children: [
          {
            path: "sprint",
            element: <Sprint />,
          },
          {
            path: "whole",
            element: <Whole />,
          },
          {
            path: "import",
            element: <Import />,
          },
          {
            path: "*",
            element: <Sprint />,
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
