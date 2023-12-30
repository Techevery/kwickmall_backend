import { format, parseISO } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';
import { useRouter } from 'next/router'

const statusMap = {
  ongoing: 'warning',
  completed: 'success',
  refunded: 'error'
};

export const OverviewLatestOrders = (props) => {
  const { orders = [], sx } = props;
  const router = useRouter();



  function redirectToOrderPage(id) {
    
    router.push(`order-management/order/${id}`);
  }

  return (
    <Card sx={sx}>
      <CardHeader title="Latest Orders" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Account Name
                </TableCell>
                <TableCell>
                  Shop
                </TableCell>
                <TableCell sortDirection="desc">
                  Delivery Location
                </TableCell>
                <TableCell>
                  Shopper
                </TableCell>
                <TableCell>
                  Amount
                </TableCell>
                
                <TableCell>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders?.map((order) => {
                
                
                
                
                

                return (
                  <TableRow
                    hover
                    key={order.id}
                    onClick={() => redirectToOrderPage(order.id)}
                  >
                    <TableCell>
                      {order.fullname}
                    </TableCell>
                    <TableCell>
                      {order.orderDetails?.preferedMarket}
                    </TableCell>
                    <TableCell>
                      {order.address.address_detail}
                    </TableCell>
                    <TableCell>
                      {order.bidders.fullname}
                    </TableCell>
                    <TableCell>
                      {order.orderDetails.price}
                    </TableCell>
                    <TableCell>
                      <SeverityPill color={statusMap[order.status]}>
                        {order.orderStatus}
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewLatestOrders.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object
};
