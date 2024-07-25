import { Tabs } from "@mantine/core";
import { FC, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export interface Menu {
  text: string;
  link: string;
  icon?: ReactNode;
}

export interface MenuTabsProps {
  menus: Menu[];
}

export const MenuTabs: FC<MenuTabsProps> = ({ menus }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const tabValue = location.pathname;

  return (
    <Tabs
      value={tabValue}
      onTabChange={(value) => (value ? navigate(value) : null)}
      maw={600}
    >
      <Tabs.List>
        {menus.map((menu) => (
          <Tabs.Tab key={menu.text} value={menu.link} icon={menu.icon}>
            {menu.text}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
  );
};
