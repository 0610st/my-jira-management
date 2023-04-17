import { Tabs } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";

export const MenuTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tabValue = location.pathname.split("/")[2];

  return (
    <Tabs
      value={tabValue}
      onTabChange={(value) => navigate(`/preparation/${value}`)}
      maw={600}
    >
      <Tabs.List>
        <Tabs.Tab value="main">実行</Tabs.Tab>
        <Tabs.Tab value="settings">設定</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
};
