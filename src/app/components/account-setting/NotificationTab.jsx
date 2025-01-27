import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';

import { Stack } from '@mui/system';
import { IconMail, IconTruckDelivery } from '@tabler/icons-react';
import CustomFormLabel from '../forms/theme-elements/CustomFormLabel';
import CustomSwitch from '../forms/theme-elements/CustomSwitch';
import CustomTextField from '../forms/theme-elements/CustomTextField';
import BlankCard from '../shared/BlankCard';

const NotificationTab = () => {
  return (
    <>
      <Grid
        container
        spacing={3}
        sx={{
          justifyContent: 'center',
        }}
      >
        <Grid
          size={{
            xs: 12,
            lg: 9,
          }}
        >
          <BlankCard>
            <CardContent>
              <Typography
                variant="h4"
                sx={{
                  mb: 2,
                }}
              >
                Notification Preferences
              </Typography>
              <Typography color="textSecondary">
                Select the notificaitons ou would like to receive via email. Please note that you
                cannot opt out of receving service messages, such as payment, security or legal
                notifications.
              </Typography>

              <CustomFormLabel htmlFor="text-email">Email Address*</CustomFormLabel>
              <CustomTextField id="text-email" variant="outlined" fullWidth />
              <Typography color="textSecondary">Required for notificaitons.</Typography>

              {/* list */}
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  mt: 3,
                }}
              >
                <Avatar
                  variant="rounded"
                  sx={{ bgcolor: 'grey.100', color: 'grey.500', width: 48, height: 48 }}
                >
                  <IconMail size="22" />
                </Avatar>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 1,
                    }}
                  >
                    Email Notification
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Turn on email notification to get scan results through email
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto !important' }}>
                  <CustomSwitch checked />
                </Box>
              </Stack>

              {/* list */}
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  mt: 3,
                }}
              >
                <Avatar
                  variant="rounded"
                  sx={{ bgcolor: 'grey.100', color: 'grey.500', width: 48, height: 48 }}
                >
                  <IconTruckDelivery size="22" />
                </Avatar>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 1,
                    }}
                  >
                    Browser Notification
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    You will be get real-time alerts in browser
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto !important' }}>
                  <CustomSwitch />
                </Box>
              </Stack>
            </CardContent>
          </BlankCard>
        </Grid>
      </Grid>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          mt: 3,
          justifyContent: 'end',
        }}
      >
        <Button size="large" variant="contained" color="primary">
          Save
        </Button>
        <Button size="large" variant="text" color="error">
          Cancel
        </Button>
      </Stack>
    </>
  );
};

export default NotificationTab;
