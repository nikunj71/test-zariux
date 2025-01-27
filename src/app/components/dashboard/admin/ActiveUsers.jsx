'use client';
import { Avatar, CardContent, Grid2 as Grid, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { IconArrowDownRight, IconUsersGroup } from '@tabler/icons-react';
import BlankCard from '../../shared/BlankCard';

const ActiveUsers = ({ stats }) => {
  return (
    <BlankCard>
      <CardContent sx={{ p: '30px' }}>
        <Stack direction={'row'} justifyContent={'space-between'} alignContent={'center'}>
          <Typography variant="h5">Active Users</Typography>
          <IconUsersGroup />
        </Stack>

        <Grid container spacing={3}>
          <Grid size={5}>
            <Typography
              variant="h4"
              mt={3}
              sx={{
                fontWeight: 600,
              }}
            >
              {stats?.users}
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              sx={{
                mt: 1,
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ bgcolor: 'error.light', width: 20, height: 20 }}>
                <IconArrowDownRight width={16} color="#FA896B" />
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

export default ActiveUsers;
