import PropTypes from 'prop-types';
import BellIcon from '@heroicons/react/24/solid/BellIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import { Avatar, Badge, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';

export const UserVerificationBox = (props) => {
  const { difference, positive = false, sx, value } = props;

  return (
    <Card sx={{ width: '200px', ...sx }}>
      <CardContent>
        <div style={{ position: 'relative' }}>
          {/* Notification Icon with count */}
          {difference && (
            <Badge
              badgeContent={difference}
              color="primary"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              sx={{
                position: 'absolute',
                top: -8,
                right: -8,
              }}
            >
              <SvgIcon>
                <BellIcon />
              </SvgIcon>
            </Badge>
          )}
          <Stack alignItems="center" direction="column" spacing={3}>
            <Avatar
              sx={{
                backgroundColor: 'green',
                height: 56,
                width: 56,
                marginBottom: 1,
              }}
            >
              <SvgIcon>
                <UserIcon />
              </SvgIcon>
            </Avatar>
            <Typography variant="h6">User Verification</Typography>
          </Stack>
        </div>
      </CardContent>
    </Card>
  );
};

UserVerificationBox.propTypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  sx: PropTypes.object,
  value: PropTypes.string.isRequired,
};
