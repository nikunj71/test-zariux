'use client';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import DashboardCard from '../../shared/DashboardCard';
import moment from 'moment';

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
}));

const ActivityItem = ({ value, time }) => {
  debugger;
  return (
    <StyledCard>
      <Box display="flex" alignItems="center">
        <Box>
          <Typography variant="body2" color="text.secondary">
            {value}
          </Typography>
        </Box>
        <Box marginLeft="auto">
          <Typography variant="caption" color="text.secondary">
            {moment(time, 'hh:mm:ss').fromNow()}
          </Typography>
        </Box>
      </Box>
    </StyledCard>
  );
};

const RecentActivity = ({ logsList }) => {
  return (
    <DashboardCard title="Recent Activity">
      {logsList?.logs?.length ? (
        <>
          {logsList?.logs?.map((activity, index) => (
            <ActivityItem value={activity?.value} time={activity.time} key={index} />
          ))}
        </>
      ) : (
        <></>
      )}
    </DashboardCard>
  );
};

export default RecentActivity;
