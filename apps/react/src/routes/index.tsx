import { createBrowserRouter } from "react-router-dom";
import { Root } from "../components/root/Root";
import { Achievement } from "../pages/achievement";
import { Sprint } from "../pages/achievement/sprint/Sprint";
import { Whole } from "../pages/achievement/whole/Whole";

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
            path: "*",
            element: <Whole />,
          },
        ],
      },
    ],
  },
]);
