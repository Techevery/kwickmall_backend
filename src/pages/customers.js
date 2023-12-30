import React, { useCallback, useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import { saveAs } from 'file-saver';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography, Unstable_Grid2 as Grid} from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/customer/customers-table';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { UserVerificationBox } from 'src/sections/customer/bottom-nav';
import { BanUserBox } from 'src/sections/customer/bottom-nav-2';
import { PriotizeUserBox } from 'src/sections/customer/bottom-nav-3';
import firebase_app from '@/firebase/config';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { useAuthContext } from "@/context/AuthContext";

const db = getFirestore(firebase_app);

const now = new Date();

const Page = () => {
  const { user } = useAuthContext();
  const [usersData, setUsersData] = useState([])
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState(usersData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log(searchQuery)
  const handleExport = () => {
    // Assuming you want to export 'usersData' to CSV
    const csvContent = generateCSV(usersData);

    // Create a Blob from the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });

    // Trigger download using file-saver library
    saveAs(blob, 'customers.csv');
  };

  useEffect(() => {
    async function fetchUsersData() {
      try {
        const usersCollection = collection(db, 'user');
        const querySnapshot = await getDocs(usersCollection);
    
        const userDataPromises = querySnapshot.docs.map(async (doc) => {
          const user_data = doc.data();
          user_data.id = doc.id;
    
          // Filter users based on the search query
          const searchRegex = new RegExp(searchQuery, 'i');
          if (
            searchRegex.test(user_data.first_name) ||
            searchRegex.test(user_data.last_name) ||
            searchRegex.test(user_data.email)
          ) {
            // Fetch orders for the user based on the shopperID or user field
            const ordersCollection = collection(db, 'orders');
            const ordersQuery = query(
              ordersCollection,
              where('shopperID', '==', user_data.id)
            );
    
            const userOrdersQuery = query(
              ordersCollection,
              where('user', '==', user_data.id)
            );
    
            const [ordersSnapshot, userOrdersSnapshot] = await Promise.all([
              getDocs(ordersQuery),
              getDocs(userOrdersQuery),
            ]);
    
            // Count the number of orders
            const orderCount =
              ordersSnapshot.size + userOrdersSnapshot.size;
    
            // Add the order count to the user data
            return { ...user_data, orderCount };
          }
    
          return null; // Return null for users that don't match the search query
        });
    
        const userDataResults = await Promise.all(userDataPromises);
    
        // Filter out null results (users that didn't match the search query)
        const filteredUserData = userDataResults.filter((result) => result !== null);
    
        setUsersData(filteredUserData);
      } catch (err) {
        console.error('Error fetching user data:', err.message);
        setError(`An error occurred while fetching user data: ${err.message}`);
      } finally {
        // Any cleanup or additional logic can be placed here
      }
    }
    
    fetchUsersData();
  }, [searchQuery]);
  
  const handleSearchChange = (event) => {
    const newSearchQuery = event.target.value;
    console.log('New search query:', newSearchQuery);
    setSearchQuery(newSearchQuery);
  };
  
  
  
  
  console.log(usersData)
 
  const useCustomers = (page, rowsPerPage) => {
    return useMemo(
      () => {
        return applyPagination(usersData, page, rowsPerPage);
      },
      [page, rowsPerPage, usersData]
    );
  };
  
  const useCustomerIds = (customers) => {
    return useMemo(
      () => {
        return customers?.map((customer) => customer.id);
      },
      [customers]
    );
  };

  

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);
  
  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

 
  


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <DashboardLayout>
      <Head>
        <title>
          Users
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h6" color='#958F8F'>
                  User Management Overview
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                    onClick={handleExport}
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              <div>
                
              </div>
            </Stack>
            <CustomersSearch onChange={handleSearchChange}/>
            <CustomersTable
              count={usersData?.length}
              items={customers}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
            />
          </Stack>

          <Grid
          container
          spacing={3}
        >
        
        <Grid
            xs={12}
            sm={6}
            lg={4}
            sx={{ marginTop: '20px' }}
          >
            <a href='/customers/user-verification' style={{ textDecoration: 'none' }}>
            <UserVerificationBox
              difference={12}
              positive
              sx={{ height: '100%' }}
              value="NGN2,000"
            />
            </a>
          </Grid>

          <Grid
            xs={12}
            sm={6}
            lg={4}
            sx={{ marginTop: '20px' }}
          >
           <a href='/customers/ban-user' style={{textDecoration:'none'}}>
           <BanUserBox
              difference={12}
              positive
              sx={{ height: '100%' }}
              value="NGN2,000"
            />
           </a>
          </Grid>

          <Grid
            xs={12}
            sm={6}
            lg={4}
            sx={{ marginTop: '20px' }}
          >
            <a href='' style={{textDecoration:'none'}}>
            <PriotizeUserBox
              difference={12}
              positive
              sx={{ height: '100%' }}
              value="NGN2,000"
            />
            </a>
          </Grid>

        </Grid>
        </Container>
      </Box>
    </DashboardLayout>
  );
};

export default Page;
const generateCSV = (data) => {
  // Assuming usersData is an array of objects
  const header = Object.keys(data[0]).join(',');
  const rows = data.map((user) => Object.values(user).join(','));
  return `${header}\n${rows.join('\n')}`;
};