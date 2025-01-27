'use client';
import { usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';

import PageContainer from '@/app/components/container/PageContainer';
import TopCards from '@/app/components/dashboard/user/TopCards';
import TopCountry from '@/app/components/dashboard/user/TopCountry';
import ScanResults from '@/app/components/dashboard/user/ScanResults';
import ScanProgress from '@/app/components/dashboard/user/ScanProgress';
import ActiveUsers from '@/app/components/dashboard/admin/ActiveUsers';
import TotalScan from '@/app/components/dashboard/admin/TotalScan';
import FailedScan from '@/app/components/dashboard/admin/FailedScan';
import SystemLoad from '@/app/components/dashboard/admin/SystemLoad';
import RecentActivity from '@/app/components/dashboard/admin/RecentActivity';
import SystemLogs from '@/app/components/dashboard/admin/SystemLogs';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getStats, systemLogsList } from '@/store/systemSlice';

const Dashboard = () => {
  const pathname = usePathname();
  const pathWithoutLastPart = pathname.slice(0, pathname.lastIndexOf('/'));
  const dispatch = useDispatch();
  const { stats, logsList } = useSelector((state) => state?.systemData);

  useEffect(() => {
    dispatch(getStats());
    dispatch(systemLogsList());
  }, [dispatch]);

  return (
    <>
      {pathWithoutLastPart === '/a' ? (
        <PageContainer title="Dashboard" description="this is Dashboard">
          <Box
            sx={{
              mt: 3,
            }}
          >
            <Grid container spacing={3}>
              {/*  */}
              <Grid size={{ xs: 12, md: 3 }}>
                <ActiveUsers stats={stats} />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <TotalScan stats={stats} />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <SystemLoad stats={stats} />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <FailedScan stats={stats} />
              </Grid>

              {/*  */}
              <Grid size={{ xs: 12 }}>
                <RecentActivity logsList={logsList} />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <SystemLogs logsList={logsList} />
              </Grid>
            </Grid>
          </Box>
        </PageContainer>
      ) : (
        <PageContainer title="Dashboard" description="this is Dashboard">
          <Box
            sx={{
              mt: 3,
            }}
          >
            <Grid container spacing={3}>
              {/* Top Cards */}
              {/* <Grid
                size={{
                  xs: 12,
                  lg: 12,
                }}
              >
                <TopCards />
              </Grid> */}

              {/* List */}
              <Grid size={{ xs: 12 }}>
                <ScanResults />
              </Grid>

              {/*  */}
              {/* <Grid size={{ xs: 12, md: 6 }}>
                <TopCountry />
              </Grid> */}
              <Grid size={{ xs: 12, md: 6 }}></Grid>

              {/* Scan Progress */}
              {/* <Grid size={{ xs: 12 }}>
                <ScanProgress />
              </Grid> */}
            </Grid>
          </Box>
        </PageContainer>
      )}
    </>
  );
};

export default Dashboard;
