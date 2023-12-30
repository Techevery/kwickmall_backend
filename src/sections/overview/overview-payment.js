import PropTypes from 'prop-types';
import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import { TbCurrencyNaira } from 'react-icons/tb'

export const OverviewPayment = (props) => {
  const { difference, positive = false, sx, value } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              variant="overline"
            >
              Total Revenue
            </Typography>
            <Typography variant="h6" style={{color:'#958F8F'}}>
              {value}
            </Typography>
          </Stack>
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              variant="overline"
            >
              Virtual cash
            </Typography>
            <Typography variant="h6" style={{color:'#958F8F'}}>
              {value}
            </Typography>
          </Stack>
        </Stack>
        {difference && (
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
            sx={{ mt: 2 }}
          >
            
            <Typography
              color="text.secondary"
              variant="caption"
            >
              
            </Typography>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

OverviewPayment.prototypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  sx: PropTypes.object,
  value: PropTypes.string.isRequired
};
