import { BsList, BsDatabaseAdd } from "react-icons/bs";
import { IoIosStats } from "react-icons/io";
import { Menu } from "@/components/MainLayout";

export const sprintMenu: Menu[] = [
  {
    text: "リスト",
    link: "/sprint/top",
    icon: <BsList />,
  },
  {
    text: "サマリ",
    link: "/sprint/summary",
    icon: <IoIosStats />,
  },
  {
    text: "取込",
    link: "/sprint/import",
    icon: <BsDatabaseAdd />,
  },
];
