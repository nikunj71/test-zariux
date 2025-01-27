'use client';
import PageContainer from '@/app/components/container/PageContainer';
import ScanToolList from '@/app/components/scan/admin/ScanToolList';
import ScanToolCard from '@/app/components/scan/user/ScanToolCard';
import { toolsList } from '@/store/toolsSlice';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function ScanTools() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const pathWithoutLastPart = pathname.slice(0, pathname.lastIndexOf('/'));
  const userType = pathname.split('/')[1];
  const { allTools } = useSelector((state) => state?.toolsData);
  useEffect(() => {
    dispatch(toolsList(userType));
  }, [dispatch]);
  return (
    <Box mt={3}>
      {pathWithoutLastPart === '/a' ? (
        <PageContainer title="Scan Tools" description="Configure and run your security scans">
          <Box>
            <Grid container spacing={2}>
              <ScanToolList />
            </Grid>
          </Box>
        </PageContainer>
      ) : (
        <PageContainer title="Scan Tools" description="Configure and run your security scans">
          <Box>
            <Grid container spacing={2}>
              {Array.isArray(allTools) && allTools.length > 0 ? (
                allTools.map((item, index) => (
                  <Grid key={item.id ?? index} size={{ xs: 12, sm: 6, md: 4 }}>
                    <ScanToolCard tool={item} />
                  </Grid>
                ))
              ) : (
                <></>
              )}
            </Grid>
          </Box>
        </PageContainer>
      )}
    </Box>
  );
}
