'use client';

import { Avatar, Box, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import CustomButton from '../../forms/theme-elements/CustomButton';
import DashboardCard from '../../shared/DashboardCard';
import ScanToolConfigForm from './ScanToolConfigForm';

const ScanToolCard = ({ tool }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <DashboardCard>
      <Stack direction="row" spacing={1} mb={1} justifyContent="space-between">
        <Stack direction="row" spacing={1}>
          <Box
            component="img"
            src={tool?.tool_icon}
            alt={tool?.tool_name}
            sx={{
              bgcolor: 'grey.100',
              color: 'grey.500',
              width: 36,
              height: 36,
              borderRadius: '4px',
            }}
          />
          <Typography variant="h4" fontWeight="700">
            {tool?.tool_name}
          </Typography>
        </Stack>
        <Typography>{tool.tool_type}</Typography>
      </Stack>

      <Typography variant="subtitle2" color="textSecondary">
        {tool?.attributes?.description}
      </Typography>

      <Box my={2}>
        <CustomButton fullWidth onClick={handleClickOpen}>
          Configure Scan
        </CustomButton>
      </Box>

      {/* Dialog Component */}
      <ScanToolConfigForm open={open} setOpen={setOpen} tool={tool} />
    </DashboardCard>
  );
};

export default ScanToolCard;