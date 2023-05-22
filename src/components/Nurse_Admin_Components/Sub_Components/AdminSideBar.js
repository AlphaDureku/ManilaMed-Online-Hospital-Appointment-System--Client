import {
  Center,
  Navbar,
  Stack,
  Tooltip,
  UnstyledButton,
  createStyles,
  rem,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconHome2,
  IconLogout,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

const useStyles = createStyles((theme) => ({
  link: {
    width: rem(50),
    height: rem(50),
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.white,
    opacity: 1,

    "&:hover": {
      opacity: 1,
      backgroundColor: "#61ddff",
    },
  },

  active: {
    opacity: 1,
    "&, &:hover": {
      backgroundColor: "#9ae7fc",
    },
  },
}));

function AdminSideBar({ icon: Icon, label, active, onClick }) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon size="1.8rem" stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconHome2, label: "Home" },
  { icon: IconUser, label: "Account" },
  { icon: IconSettings, label: "Settings" },
];

const AdminSide = () => {
  const [active, setActive] = useState(2);
  const [navbarHeight, setNavbarHeight] = useState(0);

  const handleResize = () => {
    const height = window.innerHeight;
    setNavbarHeight(height);
  };

  useEffect(() => {
    handleResize(); // Set initial navbarHeight
    window.addEventListener("resize", handleResize); // Update navbarHeight on window resize
    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup event listener
    };
  }, []);

  const links = mockdata.map((link, index) => (
    <AdminSideBar
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  return (
    <Navbar
      height={`calc(${navbarHeight}px - 64px)`}
      width={{
        base: 80,
      }}
      style={{ border: "1px solid red" }}
      p="md"
      sx={{
        background: "#00C2FF",
      }}
    >
      <Navbar.Section grow mt={100}>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          <AdminSideBar icon={IconLogout} label="Logout" />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
};

export default AdminSide;
