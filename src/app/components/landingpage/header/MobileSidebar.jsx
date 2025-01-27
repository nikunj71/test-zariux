'use client';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import { IconChevronDown } from '@tabler/icons-react';
import Logo from '@/app/(Panel)/layout/shared/logo/Logo';
import DemosDD from './DemosDD';
import AppLinks from '@/app/(Panel)/layout/vertical/header/AppLinks';
import QuickLinks from '@/app/(Panel)/layout/vertical/header/QuickLinks';

const MobileSidebar = () => {
  const [toggle, setToggle] = useState(false);
  const [toggle2, setToggle2] = useState(false);

  return (
    <>
      <Box
        sx={{
          px: 3,
        }}
      >
        <Logo />
      </Box>
      <Box
        sx={{
          p: 3,
        }}
      >
        <Stack direction="column" spacing={2}>
          <Button
            color="inherit"
            onClick={() => setToggle(!toggle)}
            endIcon={<IconChevronDown width={20} />}
            sx={{
              justifyContent: 'space-between',
            }}
          >
            Demos
          </Button>
          {toggle && (
            <Collapse in={toggle}>
              <Box
                sx={{
                  m: '-21px',
                }}
              >
                <Box
                  sx={{
                    ml: 1,
                  }}
                >
                  <DemosDD />
                </Box>
              </Box>
            </Collapse>
          )}

          <Button
            color="inherit"
            onClick={() => setToggle2(!toggle2)}
            endIcon={<IconChevronDown width={20} />}
            sx={{
              justifyContent: 'space-between',
            }}
          >
            Pages
          </Button>
          {toggle2 && (
            <Collapse in={toggle2}>
              <Box
                sx={{
                  overflow: 'hidden',
                  ml: 1,
                }}
              >
                <AppLinks />
                <QuickLinks />
              </Box>
            </Collapse>
          )}
          <Button
            color="inherit"
            href="#"
            sx={{
              justifyContent: 'start',
            }}
          >
            Documentation
          </Button>
          <Button
            color="inherit"
            href="https://adminmart.com/support"
            sx={{
              justifyContent: 'start',
            }}
          >
            Support
          </Button>
          <Button color="primary" variant="contained" href="/auth/u/login">
            Login
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default MobileSidebar;
