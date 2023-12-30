import React, { useState, useEffect } from 'react';
import firebase_app from '@/firebase/config';
import { getFirestore, collection, doc, getDocs } from 'firebase/firestore';
import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid, Badge, Avatar, Card, CardContent, SvgIcon} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AccountProfile } from 'src/sections/account/account-profile';
import { UserProfileDetails } from 'src/sections/account/user-ratings';
import ChevronRight from '@heroicons/react/24/solid/ChevronRightIcon';
import { OverviewLatestOrders } from 'src/sections/overview/overview-user-latest-orders';
import BellIcon from '@heroicons/react/24/solid/BellIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';
import Link from 'next/link';


const Page = () => {


  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [counter, setCounter] = useState(null);
  const { user } = useAuthContext()
    const router = useRouter()
    const db = getFirestore(firebase_app);
  React.useEffect(() => {
    if (user == null) router.push("/auth/login")
    async function fetchOrderData() {
      try {
        const usersCollection = collection(db, 'orders');
        const querySnapshot = await getDocs(usersCollection);
        const orderData = [];
        querySnapshot.forEach((doc) => {
          const order = doc.data();
          order.id = doc.id; // Add the document ID to the order data
          orderData.push(order);
        });
        setOrders(orderData.slice(0,5));
        console.log(orderData)
      } catch (err) {
        console.log(err)
        setError('An error occurred while fetching user data');
      } finally {
        setLoading(false);
      }
    }
    const getNotification = async () => {
      try {
        const response = await fetch('https://kwickmall.onrender.com/api/open-chat/', {
          method: 'GET',
        });
    
        if (response.ok) {
          const data = await response.json();
          setCounter(data.count); 
        } else {
          console.error(`Error: ${response.status} - ${response.statusText}`);
        }
      } catch (error) {
        console.error('An unexpected error occurred:', error);
      }
    };
    
    fetchOrderData();
    getNotification();
}, [user])

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
              <OverviewLatestOrders
              orders={orders}
              sx={{ height: '100%', marginTop:'0rem' }}
              />
              </Grid>

              
            </Grid>
          </div>
        </Stack>
        </Card>

        <Grid
        container
        spacing={3}
        mt={3}
        >

          <Grid xs={12} md={6} >
          <div justifyContent="center" alignItems="center">
          <Card sx={{ width: '350px'}}>
      <CardContent>
        <div style={{ position: 'relative' }}>
        
          
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
                
              </SvgIcon>
            </Avatar>
            <Typography variant="h6">Order History</Typography>
          </Stack>
        </div>
      </CardContent>
    </Card>
          </div>

          </Grid>

          <Grid xs={12} md={6}>
          <Card sx={{ width: '350px'}}>
      <CardContent>
        <Link href="/order-management/resolutions" style={{textDecoration:'none', color:'black'}}>
        <div style={{ position: 'relative' }}>
        <div container>
  <NotificationBadge count={counter} effect={Effect.SCALE}/>
</div>
          {/* Notification Icon with count */}
        
            <Badge
             
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
                
              </SvgIcon>
            </Badge>
          
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
              
              </SvgIcon>
            </Avatar>
            <Typography variant="h6">Dispute Resolution</Typography>
          </Stack>
        </div>
        </Link>
      </CardContent>
    </Card>

          </Grid>


        </Grid>
      </Container>
    
    </Box>

    </DashboardLayout>
    
  )
};


export default Page;