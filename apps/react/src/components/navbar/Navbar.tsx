import { FC } from "react";
import {
  ActionIcon,
  Box,
  Group,
  Navbar as MtNavbar,
  useMantineColorScheme,
} from "@mantine/core";
import { BsSun, BsMoon } from "react-icons/bs";
import menuItems from "./menuItems";
import { NavbarLinkItem } from "./NavbarLinkItem";
import { useAppEnvs } from "../../../api/hooks";

export const Navbar: FC = () => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  // prefetch envs
  useAppEnvs();

  return (
    <MtNavbar width={{ base: 300 }} p="xs">
      <MtNavbar.Section>
        <Box>
          <Group position="apart">
            <ActionIcon variant="default" onClick={() => toggleColorScheme()}>
              {colorScheme === "dark" ? (
                <BsSun size="1rem" />
              ) : (
                <BsMoon size="1rem" />
              )}
            </ActionIcon>
          </Group>
        </Box>
      </MtNavbar.Section>
      <MtNavbar.Section grow mt="md">
        {menuItems.map(({ label, path, link, Icon }) => (
          <NavbarLinkItem
            key={label}
            label={label}
            link={link}
            path={path}
            Icon={Icon}
          />
        ))}
      </MtNavbar.Section>
    </MtNavbar>
  );
};
