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

export const Navbar: FC = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

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
        {menuItems.map((item) => (
          <NavbarLinkItem key={item.label} {...item} />
        ))}
      </MtNavbar.Section>
    </MtNavbar>
  );
};
