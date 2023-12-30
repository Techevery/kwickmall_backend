import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid, Card } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AccountProfile } from 'src/sections/account/account-profile';
import { OrderDetails } from 'src/sections/order-management/order-details';
import ChevronRight from '@heroicons/react/24/solid/ChevronRightIcon';
import { OverviewLatestOrders } from 'src/sections/overview/overview-user-latest-orders';
import firebase_app from '@/firebase/config';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useAuthContext } from '@/context/AuthContext';


const Page = () => {
  const router = useRouter()
  const id = router.query.uid;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, users } = useAuthContext()
    const db = getFirestore(firebase_app);

  React.useEffect(() => {
    if (user == null) router.push("/auth/login")
    async function fetchOrderData(orderId) {
      try {
        const orderRef = doc(db, 'orders', orderId);
        const orderSnapshot = await getDoc(orderRef);
        
        if (orderSnapshot.exists()) {
          const orderData = orderSnapshot.data();
          const buyerId = orderData.user;
          const shopperId = orderData.shopperID;
          const foundBuyer = users.find(user => user.id === buyerId);
          const foundSeller = users.find(user => user.id === shopperId);
          orderData.buyer = foundBuyer.data();
          orderData.seller = foundSeller.data();
          setOrder(orderData);
          console.log(orderData);
        } else {
          setError('Order not found');
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching order data');
      } finally {
        setLoading(false);
      }
    
    }
    fetchOrderData(id);

    
}, [id])

if (loading) {
  return <div>Loading...</div>;
}

if (error) {
  return <div>Error: {error}</div>;
}

      return(
        <DashboardLayout>
        <Head>
          <title>
            Order Management
          </title>
        </Head>
        
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8
          }}
        >
          <Container maxWidth="lg">
          <Card >
            <Stack spacing={3}>
              
              <div>
                <Grid
                  container
                  spacing={3}
                >
                  
                  
                 
                  
    
                  <Grid
                  xs={12}
                  md={12}
                  lg={12}
                  >
                    <OrderDetails
                    order={order}
                    users={users}
                    />
                  
                  </Grid>
    
                  
                </Grid>
              </div>
            </Stack>
            </Card>
          </Container>
        
        </Box>
        
      </DashboardLayout>
      )
};



export default Page;