import { BsGraphUp, BsList } from "react-icons/bs";
import { Menu } from "@/components/MainLayout";

export const sprintMenu: Menu[] = [
  {
    text: "リスト",
    link: "/sprint/top",
    icon: <BsList />,
  },
  {
    text: "グラフ",
    link: "/sprint/summaryGraph",
    icon: <BsGraphUp />,
  },
  {
    text: "取込",
    link: "/sprint/import",
  },
];
