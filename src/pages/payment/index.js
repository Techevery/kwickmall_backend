import React, { useState, useEffect } from 'react';
import firebase_app from '@/firebase/config';
import { getFirestore, collection, doc, getDocs } from 'firebase/firestore';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewBudget } from 'src/sections/overview/overview-budget';
import { OverviewLatestOrders } from 'src/sections/overview/overview-latest-orders';
import { OverviewLatestProducts } from 'src/sections/overview/overview-latest-products';
import { OverviewSales } from 'src/sections/overview/overview-sales';
import { OverviewTasksProgress } from 'src/sections/overview/overview-tasks-progress';
import { OverviewTotalCustomers } from 'src/sections/overview/overview-total-customers';
import { OverviewTotalProfit } from 'src/sections/overview/overview-total-profit';
import { OverviewTraffic } from 'src/sections/overview/overview-traffic';
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";



const now = new Date();
    
const Page = () => {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
          orderData.push(doc.data());
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
    fetchOrderData();
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
        Kwickmall
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
        <Grid
          container
          spacing={3}
        >
          <Grid
            xs={12}
            sm={6}
            lg={4}
          >
            <OverviewBudget
              difference={12}
              positive
              sx={{ height: '100%' }}
              value="NGN2,000"
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={4}
          >
            <OverviewTotalCustomers
              difference={16}
              positive={false}
              sx={{ height: '100%' }}
              value="1.6k"
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={4}
          >
            <OverviewTasksProgress
              sx={{ height: '100%' }}
              value={100}
            />
          </Grid>

          <Grid
            xs={12}
            lg={8}
          >
            <OverviewSales
              chartSeries={[
                {
                  name: 'This year',
                  data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20]
                },
                {
                  name: 'Last year',
                  data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13]
                }
              ]}
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={4}
          >
            <OverviewTraffic
              chartSeries={[63, 15, 22]}
              labels={['Desktop', 'Tablet', 'Phone']}
              sx={{ height: '100%' }}
            />
          </Grid>
          
          <Grid
            xs={12}
            md={12}
            lg={12}
          >
            `<OverviewLatestOrders
              orders={orders}
              sx={{ height: '100%' }}
            />`
          </Grid>
          <Grid>
          <div>
    <h1>User List</h1>
    <ul>
      {orders.map((order, index) => (
        <li key={index}>
          {order.address.address_detail} {order.orderStatus}
         
        </li>
      ))}
    </ul>
  </div>

          </Grid>
        </Grid>
      </Container>
    </Box>
  </DashboardLayout>)
            }



  
  
 


export default Page;
