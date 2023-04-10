import { Tabs } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";

export const MenuTabs = () => {
  const navigate = useNavigate();
  const { tabValue } = useParams();

  return (
    <Tabs
      value={tabValue}
      onTabChange={(value) => navigate(`/achievement/${value}`)}
    >
      <Tabs.List>
        <Tabs.Tab value="whole">全期間</Tabs.Tab>
        <Tabs.Tab value="sprint">スプリント別</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
};
