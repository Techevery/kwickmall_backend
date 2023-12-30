import React, { useState, useContext, useEffect, useMemo, useCallback } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import firebase_app from '@/firebase/config';
import { getFirestore, collection, doc, getDocs } from 'firebase/firestore';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewPayment } from '@/sections/overview/overview-payment';
import { OverviewPending } from '@/sections/overview/overview-pending'; 
import { OverviewLatestProducts } from 'src/sections/overview/overview-latest-products';
import { OverviewSales } from 'src/sections/overview/overview-sales';
import { OverviewOutstanding } from '@/sections/overview/overview-outstanding'; 
import { OverviewTotalProfit } from 'src/sections/overview/overview-total-profit';
import { OverviewTraffic } from 'src/sections/overview/overview-traffic';
import { OverviewLatestOrders } from '@/sections/overview/overview-latest-orders';
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { OverviewLatestPayments } from '@/sections/overview/overview-payment-list';
import { PaymentBottomNav } from '@/sections/payment/bottom-nav';
import { setIn } from 'formik';
import { applyPagination } from 'src/utils/apply-pagination';



const now = new Date();

const Page = () => {

  const [orders, setOrders] = useState(null);
  const [payments, setPayments] = useState(null);
  const [revenue, setRevenue] = useState(null);
  const [paid, setPaid] = useState(null);
  const [pending, setPending] = useState(null);
  const [income, setIncome] = useState(revenue-paid);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, users } = useAuthContext()
    const router = useRouter()
    const db = getFirestore(firebase_app);
  React.useEffect(() => {
    if (user == null) router.push("/auth/login")
    async function fetchOrderData() {
      try {
        const ordersCollection = collection(db, 'orders');
        const querySnapshot = await getDocs(ordersCollection);
        const orderData = [];
        let totalAmount = 0; // Initialize total amount to zero
    
        querySnapshot.forEach((doc) => {
          const order = doc.data();
          if (order.orderStatus && order.orderStatus === 'completed') {
            orderData.push(order);
            totalAmount += order.orderDetails.price; // Add the price of each completed order to the total
          }
        });
    
        setOrders(orderData);
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
          const payment = doc.data();
          payment.id = doc.id; // Add the document ID to the order data
          paymentData.push(payment);
      
        console.log(payment.id)
        

    
          if (payment.status && payment.status === 'pending') {
            pending_pay += payment.amount; 
          }
          if (payment.status && payment.status === 'approved') {
            total_paid += payment.amount; 
          }
          const user_id = payment.userID;
          const user_data = users.find(user => user.id === user_id);
          if (user_data?.data()) {
            // If user_data exists, set payment.user_info to user_data
            payment.user_info = user_data.data();
            console.log(user_data.data())
          } else {
            // If user_data does not exist, set payment.user_info to a blank list (or any default value you want)
            payment.user_info = [];
            console.log(user_data)
          }
  
          
          
          
          
          
          
          
         
          
          
        });
        setPayments(paymentData); 
        console.log(paymentData);
        setPaid(total_paid);
        setPending(pending_pay)
        console.log('paid: ', total_paid)
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching payment data');
      } finally {
        setLoading(false);
      }
    }
    
    fetchPaymentData();
    
    
    fetchOrderData();
    setIncome(revenue-paid)
    console.log(income)
}, [user, paid, revenue, income])

const useCustomers = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(payments, page, rowsPerPage);
    },
    [page, rowsPerPage, payments]
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
            <OverviewPayment
              difference={12}
              positive
              sx={{ height: '100%' }}
              value= {"NGN "+ revenue}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={4}
          >
            <OverviewPending
              difference={16}
              positive={false}
              sx={{ height: '100%' }}
              value={"NGN " + pending}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={4}
          >
            <OverviewOutstanding
              sx={{ height: '100%' }}
              value={"NGN " + income}
            />
          </Grid>

          

         
         
          
          <Grid
            xs={12}
            md={12}
            lg={12}
          >
            <OverviewLatestPayments
            count={payments?.length}
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
            payments = {payments}
            users = {users}
            sx={{ height: '100%' }}

            />
          </Grid>

          <Grid
            xs={12}
            sm={12}
            lg={12}
          >
            <PaymentBottomNav/>
            
          </Grid>
          
        </Grid>
      </Container>
    </Box>
  </DashboardLayout>
)
};


export default Page;