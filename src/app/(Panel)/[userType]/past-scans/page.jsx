'use client';

import PageContainer from '@/app/components/container/PageContainer';
import PastScanList from '@/app/components/past-scan/PastScanList';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';

export default function PastScans() {
  return (
    <Box mt={3}>
      <PageContainer title="Past Scans" description="This is Past Scans">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <PastScanList />
          </Grid>
        </Grid>
      </PageContainer>
    </Box>
  );
}
