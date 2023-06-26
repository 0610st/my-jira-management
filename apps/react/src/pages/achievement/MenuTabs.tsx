import { Tabs } from "@mantine/core";
import { BsGraphUp, BsList } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";

export const MenuTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tabValue = location.pathname.split("/")[2];

  return (
    <Tabs
      value={tabValue}
      onTabChange={(value) =>
        navigate(`/achievement/${value === null ? "top" : value}`)
      }
      maw={600}
    >
      <Tabs.List>
        <Tabs.Tab value="top" icon={<BsList />}>
          リスト
        </Tabs.Tab>
        <Tabs.Tab value="summaryGraph" icon={<BsGraphUp />}>
          グラフ
        </Tabs.Tab>
        <Tabs.Tab value="import">取込</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
};
