'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Image from 'next/image';

const StyledButton = styled(Button)(({ theme }) => ({
  padding: '13px 34px',
  fontSize: '16px',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.primary.main,
  fontWeight: 600,
}));

const StyledButton2 = styled(Button)(({ theme }) => ({
  padding: '13px 34px',
  fontSize: '16px',
  borderColor: theme.palette.background.paper,
  color: theme.palette.background.paper,
  fontWeight: 600,
  '&:hover': {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.main,
  },
}));

const C2a2 = () => {
  return (
    <Box>
      <Box
        sx={{
          bgcolor: 'primary.main',
          pt: '60px',
          pb: '30px',
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={3}
            sx={{
              justifyContent: 'space-between',
            }}
          >
            <Grid
              size={{
                xs: 12,
                sm: 12,
                lg: 5,
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  color: 'background.paper',
                  fontWeight: 700,
                  mt: 4,
                }}
              >
                Build your app with our highly customizable NextJs based Dashboard
              </Typography>

              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={3}
                sx={{
                  mt: 3,
                }}
              >
                <StyledButton variant="contained" color="inherit" href="/auth/u/login">
                  Login
                </StyledButton>
                <StyledButton2 variant="outlined" color="inherit" href="/auth/auth1/register">
                  Register
                </StyledButton2>
              </Stack>
            </Grid>
            <Grid
              size={{
                xs: 12,
                lg: 5,
              }}
            >
              <Box
                sx={{
                  textAlign: {
                    xs: 'center',
                    lg: 'right',
                  },
                }}
              >
                <Image
                  src="/images/landingpage/background/c2a.png"
                  alt="img"
                  width="330"
                  height={330}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default C2a2;
