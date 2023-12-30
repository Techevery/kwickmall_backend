import PropTypes from 'prop-types';
import BellIcon from '@heroicons/react/24/solid/BellIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import UserGroupIcon from '@heroicons/react/24/solid/UserGroupIcon';
import { Avatar, Badge, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';

export const PriotizeUserBox = (props) => {
  const { difference, positive = false, sx, value } = props;

  return (
    <Card sx={{ width: '200px', ...sx }} >
      <CardContent>
        <div style={{ position: 'relative' }}>
          {/* Notification Icon with count */}
         
          <Stack alignItems="center" direction="column" spacing={3}>
            <Avatar
              sx={{
                backgroundColor: 'gray',
                height: 56,
                width: 56,
                marginBottom: 1,
              }}
            >
              <SvgIcon>
                <UserGroupIcon />
              </SvgIcon>
            </Avatar>
            <Typography variant="h6">Priotize User</Typography>
          </Stack>
        </div>
      </CardContent>
    </Card>
  );
};

