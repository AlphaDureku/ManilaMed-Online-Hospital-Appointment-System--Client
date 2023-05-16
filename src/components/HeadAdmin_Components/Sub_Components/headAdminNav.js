import { useState, useEffect } from 'react';
import { useMediaQuery } from "@mantine/hooks";
import { Navbar, Center, Tooltip, UnstyledButton, createStyles, Stack, rem } from '@mantine/core';
import {
  IconHome2,
  IconUser,
  IconSettings,
  IconLogout,
  IconSwitchHorizontal,
} from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  link: {
    width: rem(50),
    height: rem(50),
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.white,
    opacity: 1,

    '&:hover': {
      opacity: 1,
      backgroundColor: "#000"
    },
  },

  active: {
    opacity: 1,
    '&, &:hover': {
      backgroundColor: "#000"
    },
  },
}));

function NavbarLink({ icon: Icon, label, active, onClick }) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton onClick={onClick} className={cx(classes.link, { [classes.active]: active })}>
        <Icon size="1.2rem" stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconHome2, label: 'Home' },
  { icon: IconUser, label: 'Account' },
  { icon: IconSettings, label: 'Settings' },
];

const HeadAdminNavbar = () => {
  const [active, setActive] = useState(2);
  const [navbarHeight, setNavbarHeight] = useState(0);

  const breakPointMobile = useMediaQuery("(min-width: 600px)");


  const handleResize = () => {
    const height = window.innerHeight;
    setNavbarHeight(height);
  };

  useEffect(() => {
    handleResize(); // Set initial navbarHeight
    window.addEventListener('resize', handleResize); // Update navbarHeight on window resize
    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup event listener
    };
  }, []);

  const links = mockdata.map((link, index) => (
    <NavbarLink
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
        base: 80
      }}
      p="md"
      sx={{
        background: 'linear-gradient(360deg, #000000 0%, #FFFFFF 100%)',
      }}
    >
      <Center></Center>
      <Navbar.Section grow mt={100}>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          <NavbarLink icon={IconLogout} label="Logout" />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}

export default HeadAdminNavbar;
