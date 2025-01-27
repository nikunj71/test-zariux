'use client';
import { Avatar, CardContent, Grid2 as Grid, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { IconArrowUpLeft, IconScan } from '@tabler/icons-react';
import BlankCard from '../../shared/BlankCard';

const TotalScan = ({ stats }) => {
  return (
    <BlankCard>
      <CardContent sx={{ p: '30px' }}>
        <Stack direction={'row'} justifyContent={'space-between'} alignContent={'center'}>
          <Typography variant="h5">Total Scan</Typography>
          <IconScan />
        </Stack>

        <Grid container spacing={3}>
          <Grid size={5}>
            <Typography
              variant="h4"
              sx={{
                mt: 3,
                fontWeight: 600,
              }}
            >
              {stats?.scans}
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              sx={{
                mt: 1,
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ bgcolor: 'success.light', width: 20, height: 20 }}>
                <IconArrowUpLeft width={18} color="#39B69A" />
              </Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                +0%
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </BlankCard>
  );
};

export default TotalScan;
