import { FC } from "react";
import {
  ActionIcon,
  Box,
  Group,
  Navbar as MtNavbar,
  rem,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { BsSun, BsMoon } from "react-icons/bs";
import { menuItems, secondMenuItems } from "./menu";
import { NavbarLinkItem } from "./NavbarLinkItem";
import { useAppEnvs } from "@/api/hooks";

export const Navbar: FC = () => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
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
      <MtNavbar.Section grow>
        <Box
          sx={{
            paddingTop: theme.spacing.sm,
            borderTop: `${rem(1)} solid ${
              theme.colorScheme === "dark"
                ? theme.colors.dark[4]
                : theme.colors.gray[2]
            }`,
          }}
        >
          {secondMenuItems.map(({ label, path, link, Icon }) => (
            <NavbarLinkItem
              key={label}
              label={label}
              link={link}
              path={path}
              Icon={Icon}
            />
          ))}
        </Box>
      </MtNavbar.Section>
    </MtNavbar>
  );
};
