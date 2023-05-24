import { createStyles, getStylesRef } from "@mantine/core";
import { memo, useMemo } from "react";
import { IconType } from "react-icons";
import { Link, useLocation } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,

      [`& .${getStylesRef("icon")}`]: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef("icon"),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
      [`& .${getStylesRef("icon")}`]: {
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
      },
    },
  },
}));

interface Props {
  Icon: IconType;
  label: string;
  path?: string;
  link?: string;
}

const NavbarLinkItemMain: React.FC<Props> = ({ Icon, label, path, link }) => {
  const { classes, cx } = useStyles();
  const location = useLocation();

  const active = useMemo(() => {
    if (!path) return false;
    return location.pathname.indexOf(path) >= 0;
  }, [location.pathname, path]);

  return (
    <Link
      className={cx(classes.link, {
        [classes.linkActive]: active,
      })}
      to={link || path || ""}
      key={label}
    >
      <Icon className={classes.linkIcon} />
      <span>{label}</span>
    </Link>
  );
};

export const NavbarLinkItem = memo(NavbarLinkItemMain);
