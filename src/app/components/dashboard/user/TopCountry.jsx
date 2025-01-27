'use client';

import React from 'react';
import { Avatar, Box, Stack, Typography, styled } from '@mui/material';
import DashboardCard from '../../shared/DashboardCard';

const StyledStack = styled(Stack)(({ theme }) => ({
  height: 300,
  maxHeight: 300,
  paddingRight: theme.spacing(2),
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.divider,
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: theme.palette.text.secondary,
  },
}));

const TopCountry = () => {
  const stats = [
    {
      countryName: 'United States',
      percentage: 27.5,
      count: 4.5,
      icon: '/images/flags/us.svg',
    },
    {
      countryName: 'Australia',
      percentage: 11.2,
      count: 2.3,
      icon: '/images/flags/au.svg',
    },
    {
      countryName: 'China',
      percentage: 9.4,
      count: 2.0,
      icon: '/images/flags/cn.svg',
    },
    {
      countryName: 'Germany',
      percentage: 8.0,
      count: 1.7,
      icon: '/images/flags/de.svg',
    },
    {
      countryName: 'Romania',
      percentage: 7.9,
      count: 1.6,
      icon: '/images/flags/ro.svg',
    },
    {
      countryName: 'Japan',
      percentage: 6.1,
      count: 1.2,
      icon: '/images/flags/jp.svg',
    },
    {
      countryName: 'Netherlands',
      percentage: 5.9,
      count: 1.0,
      icon: '/images/flags/nl.svg',
    },
  ];

  return (
    <DashboardCard title="Targets by Country">
      <StyledStack spacing={1}>
        {stats.map((stat, i) => (
          <Stack direction="row" alignItems="center" spacing={2} key={i}>
            <Box sx={{ flexGrow: 1, width: '100%' }}>
              <Stack direction={'row'} alignItems={'center'}>
                <Avatar
                  variant="rounded"
                  sx={{
                    background: 'transparent',
                    width: 40,
                    height: 40,
                  }}
                >
                  <img src={stat.icon} alt={stat.countryName} style={{ width: 24, height: 24 }} />
                </Avatar>
                <Typography variant="h6" sx={{ mb: 0.5 }}>
                  {stat.countryName}
                </Typography>
              </Stack>
            </Box>
            <Stack direction={'row'} alignItems={'center'} sx={{ width: '50%' }}>
              <Typography
                variant="body1"
                fontWeight={'bold'}
                sx={{ color: 'text.secondary', width: '50%' }}
                textAlign={'end'}
              >
                {stat.percentage}%
              </Typography>
              <Typography variant="body2" sx={{ width: '50%' }} textAlign={'end'}>
                {stat.count}M
              </Typography>
            </Stack>
          </Stack>
        ))}
      </StyledStack>
    </DashboardCard>
  );
};

export default TopCountry;
