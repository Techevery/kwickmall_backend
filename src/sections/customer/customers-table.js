import PropTypes from 'prop-types';
import { format } from 'date-fns';
import Switch from '@mui/material/Switch';
import Link from 'next/link';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import { useRouter } from 'next/router';
import firebase_app from '@/firebase/config';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useAuthContext } from "@/context/AuthContext";

export const CustomersTable = (props) => {
  const router = useRouter();
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
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
  console.log(items)

  function redirectToUserPage(id) {
    
    router.push(`customers/user/${id}`);
  }
  

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Photo
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Account Type
                </TableCell>
                <TableCell>
                  No of order
                </TableCell>
                <TableCell>
                  Overdraft
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer) => {
                const isSelected = selected.includes(customer.id);
                

                return (
                 
                   <TableRow
                    hover
                    key={customer.id}
                    selected={isSelected}
                    onClick={() => redirectToUserPage(customer.id)}style={{textDecoration:'none'}}
                  >
                    
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <div onClick={() => redirectToUserPage(customer.id)}style={{textDecoration:'none'}}>
                          {customer.image ?<Avatar src={customer.image}>

                          {getInitials(customer.name)}
                          </Avatar> :<><Avatar src="/assets/avatars/default-user.png">

                          {getInitials(customer.name)}
                          </Avatar></>}
                        
                        
                        </div>
                      </Stack>
                    </TableCell>
                    <TableCell>
                    <Typography variant="subtitle2">
                          {customer.first_name} {customer.last_name}
                        </Typography>
                    </TableCell>
                    <TableCell>
                      {customer.email}
                    </TableCell>
                    <TableCell>
                      <Typography>
                      {customer.shopper_profile ? 'Shopper' : 'Customer'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {customer.orderCount}
                    </TableCell>
                    <TableCell>
                    <Switch {...label} />
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
    </Card>
  );
};

CustomersTable.propTypes = {
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
  selected: PropTypes.array
};
