'use client';
import PageContainer from '@/app/components/container/PageContainer';
import { Box, CardContent, Divider, Grid2 as Grid, Tab, Tabs } from '@mui/material';
import * as React from 'react';

// components
import AccountTab from '@/app/components/account-setting/AccountTab';
import APISettings from '@/app/components/account-setting/APISettings';
import NotificationTab from '@/app/components/account-setting/NotificationTab';
import BlankCard from '@/app/components/shared/BlankCard';
import { IconBell, IconLock, IconUserCircle } from '@tabler/icons-react';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const AccountSetting = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box mt={3}>
      <PageContainer title="Account Setting" description="this is Account Setting">
        <Grid container spacing={3}>
          <Grid size={12}>
            <BlankCard>
              <Box sx={{ maxWidth: { xs: 320, sm: 480 } }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  scrollButtons="auto"
                  aria-label="basic tabs example"
                >
                  <Tab
                    iconPosition="start"
                    icon={<IconUserCircle size="22" />}
                    label="Account"
                    {...a11yProps(0)}
                  />

                  <Tab
                    iconPosition="start"
                    icon={<IconBell size="22" />}
                    label="Notifications"
                    {...a11yProps(1)}
                  />
                  {/* <Tab
                    iconPosition="start"
                    icon={<IconArticle size="22" />}
                    label="Bills"
                    {...a11yProps(2)}
                  /> */}
                  <Tab
                    iconPosition="start"
                    icon={<IconLock size="22" />}
                    label="API Settings"
                    {...a11yProps(2)}
                  />
                </Tabs>
              </Box>
              <Divider />
              <CardContent>
                <TabPanel value={value} index={0}>
                  <AccountTab />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <NotificationTab />
                </TabPanel>
                {/* <TabPanel value={value} index={2}>
                  <BillsTab />
                </TabPanel> */}
                <TabPanel value={value} index={2}>
                  <APISettings />
                </TabPanel>
              </CardContent>
            </BlankCard>
          </Grid>
        </Grid>
      </PageContainer>
    </Box>
  );
};

export default AccountSetting;
