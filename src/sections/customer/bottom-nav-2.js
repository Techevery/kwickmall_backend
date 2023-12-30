import PropTypes from 'prop-types';
import BellIcon from '@heroicons/react/24/solid/BellIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import UserMinusIcon from '@heroicons/react/24/solid/UserMinusIcon';
import { Avatar, Badge, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';

export const BanUserBox = (props) => {
  const { difference, positive = false, sx, value } = props;

  return (
    <Card sx={{ width: '200px', ...sx }} >
      <CardContent>
        <div style={{ position: 'relative' }}>
          {/* Notification Icon with count */}
          
          <Stack alignItems="center" direction="column" spacing={3}>
            <Avatar
              sx={{
                backgroundColor: 'purple',
                height: 56,
                width: 56,
                marginBottom: 1,
              }}
            >
              <SvgIcon>
                <UserMinusIcon />
              </SvgIcon>
            </Avatar>
            <Typography variant="h6">Ban User</Typography>
          </Stack>
        </div>
      </CardContent>
    </Card>
  );
};

