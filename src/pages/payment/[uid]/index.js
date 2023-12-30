import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AccountProfile } from 'src/sections/account/account-profile';
import { PaymentDetails } from '@/sections/payment/payment-details';
import ChevronRight from '@heroicons/react/24/solid/ChevronRightIcon';
import { useRouter } from 'next/router';
import { useAuthContext } from '@/context/AuthContext';
import firebase_app from '@/firebase/config';
import { getFirestore, collection, doc, getDocs, getDoc, updateDoc, query, where } from 'firebase/firestore';

const Page = () => {
    const router = useRouter()
    const id = router.query.uid;
    const db = getFirestore(firebase_app);
    const [payment, SetPayment] = useState(['']);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuthContext();
    React.useEffect(() => {
        if (user == null) router.push("/auth/login")
        async function getDocumentByFieldId(Id ) {
            try {
              const q = doc(db, 'withdrawals', Id);
              const querySnapshot = await getDoc(q);
              
              if (querySnapshot.exists()) {
                // Assuming there's only one matching document (or you want to retrieve the first one)
                const documentData = querySnapshot.data();
                console.log('yes'); // Log something when a document is found
                console.log(documentData);
                const documentWithId = { ...documentData, id: querySnapshot.id }; // Include the document ID in the data
                console.log('Document found:', documentWithId);
                SetPayment(documentWithId);
                return documentData;
              } else {
                // No matching document found
                return null;
              }
            } catch (error) {
              // Handle errors here
              console.error('Error fetching document:', error);
              throw error;
            } finally {
              setLoading(false); // Set loading state to false when done
            }
          }
          
          
          // Usage: Fetch a document by 'transaction_reference'
          getDocumentByFieldId(id);

    }, [])

    function handleClick(event) {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
      }
    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/payments" onClick={handleClick}
        style={{ color:'black' }}
        >
          Payment & Billings
        </Link>,
        <Typography key="3" color="text.primary">
          {payment.id}
        </Typography>,
      ];

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
        Payments
      </title>
    </Head>
    

    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 5
      }}
    >
      <Container maxWidth="lg">

      <Stack spacing={3} className='' style={{marginBottom:'1.5rem'}}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
      
    </Stack>
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
                <PaymentDetails
                payment = {payment}

                 />
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </DashboardLayout>
  )
};



export default Page;