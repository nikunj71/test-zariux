'use client';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import moment from 'moment';
import DashboardCard from '../../shared/DashboardCard';

const LogItem = styled('div')(({ theme }) => ({
  padding: '10px',
  borderRadius: '5px',
  marginBottom: '10px',
  backgroundColor: theme.palette.grey[100],
}));

const ExportButton = styled(Button)({
  marginLeft: 'auto',
  backgroundColor: '#bdbdbd',
  '&:hover': {
    backgroundColor: '#bebebe',
  },
});

const SystemLogs = ({ logsList }) => {
  return (
    <DashboardCard>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h5">System Logs</Typography>
      </Stack>
      {logsList?.logs?.length ? (
        <>
          {logsList?.logs.map((item, index) => (
            <LogItem key={item.id ?? index}>
              <Typography>
                <strong>{item?.value}</strong> —{' '}
                {item?.time && moment(item?.time, 'hh:mm:ss').format('hh:mm A')}
              </Typography>
            </LogItem>
          ))}
        </>
      ) : (
        <></>
      )}
    </DashboardCard>
  );
};

export default SystemLogs;