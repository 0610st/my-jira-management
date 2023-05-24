import { Tabs } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";

export const MenuTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tabValue = location.pathname.split("/")[2];

  return (
    <Tabs
      value={tabValue}
      onTabChange={(value) =>
        navigate(`/achievement/${value === null ? "sprint" : value}`)
      }
      maw={600}
    >
      <Tabs.List>
        <Tabs.Tab value="sprint">スプリント別</Tabs.Tab>
        <Tabs.Tab value="whole">全期間</Tabs.Tab>
        <Tabs.Tab value="import">取り込み</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
};
