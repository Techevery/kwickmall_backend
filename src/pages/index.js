import React, { useState, useEffect } from 'react';
import firebase_app from '@/firebase/config';
import { getFirestore, collection, doc, getDocs, where } from 'firebase/firestore';
import { getMessaging, getToken } from 'firebase/messaging';
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
  const [numOrders, setNumOrders] = useState(null)
  const [payments, setPayments] = useState(null);
  const [revenue, setRevenue] = useState(null);
  const [paid, setPaid] = useState(null);
  const [pending, setPending] = useState(null);
  const [income, setIncome] = useState(revenue-paid);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, users } = useAuthContext()
  const [chartSeries, setChartSeries] = useState([]);

  const userNo = users?.length.toString();
    const router = useRouter()
    const db = getFirestore(firebase_app);
  React.useEffect(() => {
    if (user == null) router.push("/auth/login")
    async function fetchOrderData() {
      try {
        const ordersCollection = collection(db, 'orders');
        const querySnapshot = await getDocs(ordersCollection);
        const orderData = [];
        const completedOrder = [];
        let totalAmount = 0; // Initialize total amount to zero
    
        querySnapshot.forEach((doc) => {
          const order = doc.data();
          if (order.orderStatus && order.orderStatus === 'completed') {
            orderData.push(order);
            totalAmount += order.orderDetails.price; // Add the price of each completed order to the total
          }
          order.id = doc.id; // Add the document ID to the order data
          orderData.push(order)
        });
    
        setOrders(orderData.slice(0,5));
        setNumOrders(orderData);
        const num = orderData;
        console.log(num);
        console.log('Total Amount:', totalAmount);
        setRevenue(totalAmount);
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching order data');
      } finally {
      }
    }

    async function fetchPaymentData() {
      try {
        const paymentsCollection = collection(db, 'withdrawals');
        const querySnapshot = await getDocs(paymentsCollection);
        const paymentData = [];
        let total_paid = 0;
        let pending_pay = 0;
        querySnapshot.forEach((doc) => {
          paymentData.push(doc.data());
          const payment = doc.data();
          if (payment.status && payment.status === 'pending') {
            pending_pay += payment.amount; 
          }
          if (payment.status && payment.status === 'approved') {
            total_paid += payment.amount; 
          }
          
        });
        setPayments(paymentData.slice(0, 5)); 
        console.log(paymentData);
        setPaid(total_paid);
        setPending(pending_pay)
        console.log('paid: ', total_paid)
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching payment data');
      } finally {
        
      }
    }
    const fetchData = async () => {
      try {
        const currentYear = new Date().getFullYear();
        const lastYear = currentYear - 1;
    
        const getOrdersByMonth = async (year) => {
          const ordersCollection = collection(db, 'orders');
          const querySnapshot = await getDocs(ordersCollection);
          const totalOrdersInMonth = Array.from({ length: 12 }, () => 0);
    
          querySnapshot.forEach((doc) => {
            const order = doc.data();
            if (order.timeStamp) {
              const timestamp = order.timeStamp.toDate ? order.timeStamp.toDate() : new Date(order.timeStamp);
              if (timestamp.getFullYear() === year) {
                const month = timestamp.getMonth();
                totalOrdersInMonth[month] += 1;
              }
            }
          });
    
          return { name: year.toString(), data: totalOrdersInMonth };
        };
    
        const [thisYearData, lastYearData] = await Promise.all([
          getOrdersByMonth(currentYear),
          getOrdersByMonth(lastYear),
        ]);
    
        setChartSeries([thisYearData, lastYearData]);
      } catch (error) {
        console.error('Error fetching data from Firebase:', error);
      }
    };
    
    fetchData();
    
    fetchPaymentData();
    
    
    fetchOrderData();
    setIncome(revenue-paid)
    setLoading(false);
   
}, [user, paid, revenue, income])

if (loading) {
  return <div>Loading...</div>;
}

if (error) {
  return <div>Error: {error}</div>;
}
console.log(chartSeries)
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
              value={"NGN " +income}
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
              value={userNo}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={4}
          >
            <OverviewTasksProgress
              sx={{ height: '100%' }}
              value={numOrders?.length}
            />
          </Grid>

          <Grid
            xs={12}
            lg={8}
          >
            <OverviewSales
              chartSeries={chartSeries}
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

          </Grid>
        </Grid>
      </Container>
    </Box>
  </DashboardLayout>)
            }



  
  
 


export default Page;
