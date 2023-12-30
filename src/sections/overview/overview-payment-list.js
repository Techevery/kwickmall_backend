import { useContext } from 'react';
import { format } from 'date-fns';
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
  TableRow,
  TablePagination
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';
import { useRouter } from 'next/router';
import { AuthContext } from '@/context/AuthContext';
import { useAuthContext } from '@/context/AuthContext';

const statusMap = {
  ongoing: 'warning',
  completed: 'success',
  refunded: 'error'
};

export const OverviewLatestPayments = (props) => {
  const { payments = [], sx } = props;
  const { users } = useAuthContext()
  const router = useRouter();
  const url_path = "/payment/"
  console.log(payments)

  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);



  function viewPayment(id) {
    
    router.push(`payment/${id}`);
  }


  return (
    <div sx={{ color:'#958F8F', marginTop:'0rem'}}>
        <CardHeader title="" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Ref No
                </TableCell>
                <TableCell>
                 Account
                </TableCell>
                <TableCell sortDirection="desc">
                  Amount
                </TableCell>
                <TableCell>
                  Date
                </TableCell>
                
                <TableCell>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{backgroundColor:'white'}}>
              {items.map((payment) => {
                
                
                const createdAt = format(payment.created_at, 'dd/MM/yyyy');
                console.log(payment)
                return (
                  <TableRow
                    hover
                    key={payment.id}
                  >
                    
                    <TableCell onClick={() => viewPayment(payment.id)}>
                      {payment.id}
                    </TableCell>
                    <TableCell>
                    {payment.user_info?.first_name} {payment.user_info?.last_name}  
                    </TableCell>
                    <TableCell>
                      {payment.amount}
                
                      
                    </TableCell>
                    <TableCell>
                      {createdAt}
                    </TableCell>
                    <TableCell>
                      <SeverityPill color={statusMap[payment.status]}>
                        {payment.status}
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
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
    </div>
    
  );
};

OverviewLatestPayments.prototype = {
  payments: PropTypes.array,
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
  sx: PropTypes.object
};
