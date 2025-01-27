'use client';

import React from 'react';
import { LinearProgress, Typography, Box, Stack } from '@mui/material';
import { styled } from '@mui/system';
import DashboardCard from '../../shared/DashboardCard';

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  '& .MuiLinearProgress-bar': {
    borderRadius: 5,
    backgroundColor: theme.palette.primary.main,
  },
}));

const ScanProgress = () => {
  const progress = 50;

  return (
    <DashboardCard title="NMap Port Scan" subtitle={'Target: 192.168.1.1'}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Typography variant="body2" color="textSecondary">
          Scan in progress
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Estimated time remaining: 2 min
        </Typography>
      </Stack>
      <Box sx={{ width: '100%', my: 2 }}>
        <StyledLinearProgress variant="determinate" value={progress} />
      </Box>
    </DashboardCard>
  );
};

export default ScanProgress;
