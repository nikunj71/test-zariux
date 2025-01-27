'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled } from '@mui/material/styles';
import { IconRocket } from '@tabler/icons-react';

// third party
import { motion } from 'framer-motion';

const StyledButton = styled(Button)(() => ({
  padding: '13px 48px',
  fontSize: '16px',
}));

const BannerContent = () => {
  const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <Box
      sx={{
        mt: lgDown ? 8 : 0,
      }}
    >
      <motion.div
        initial={{ opacity: 0, translateY: 550 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 30,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            display: 'flex',
            gap: 1,
            mb: 2,
          }}
        >
          <Typography color={'secondary'}>
            <IconRocket size={'21'} />
          </Typography>{' '}
          Kick start your project with
        </Typography>

        <Typography
          variant="h1"
          sx={{
            fontWeight: 900,

            fontSize: {
              md: '54px',
            },

            lineHeight: {
              md: '60px',
            },
          }}
        >
          Your Ultimate{' '}
          <Typography component={'span'} variant="inherit" color={'primary'}>
            Cybersecurity Toolkit
          </Typography>{' '}
        </Typography>
      </motion.div>
      <Box
        sx={{
          pt: 4,
          pb: 3,
        }}
      >
        <motion.div
          initial={{ opacity: 0, translateY: 550 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            stiffness: 150,
            damping: 30,
            delay: 0.2,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 300,
            }}
          >
            Powerful penetration testing and reconnaissance tools, simplified for everyone. From
            beginners to experts.
          </Typography>
        </motion.div>
      </Box>
      <motion.div
        initial={{ opacity: 0, translateY: 550 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 30,
          delay: 0.4,
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{
            mt: 3,
          }}
        >
          <StyledButton variant="contained" color="primary" href="#">
            Start Scanning Now
          </StyledButton>

          <StyledButton variant="outlined" href="#demos">
            Watch Demo
          </StyledButton>
        </Stack>
      </motion.div>
    </Box>
  );
};

export default BannerContent;
