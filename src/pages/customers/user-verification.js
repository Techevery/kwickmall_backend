import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AccountProfile } from 'src/sections/account/account-profile';
import { UserProfileDetails } from 'src/sections/account/user-verification';
import ChevronRight from '@heroicons/react/24/solid/ChevronRightIcon';
import { OverviewLatestOrders } from 'src/sections/overview/overview-ratings';
import MyTable, {Mytable} from 'src/sections/overview/overview-security'
import { UserVerificationBox } from 'src/sections/customer/bottom-nav';
import { PriotizeUserBox } from 'src/sections/customer/bottom-nav-3';
import { BanUserBox } from 'src/sections/customer/bottom-nav-2';
import {Link} from 'next/link';
import Breadcrumbs from '@mui/material/Breadcrumbs';





const Page = () => {
  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/customers" 
    style={{ color:'black' }}
    >
      User Management
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/customers"
      
      style={{ color:'black' }}
    >
      User
    </Link>,
    <Typography key="3" color="text.primary">
      
    </Typography>,
  ];
  
  return(
    <DashboardLayout>
    <Head>
      <title>
        User Management
      </title>
    </Head>
    <div
      component=""
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">

      <Stack spacing={3} className=''>
      
      
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
                <UserProfileDetails />
              </Grid>

              <Grid
                xs={6}
                md={4}
                lg={4}
                
              >
               
                
               
    
        <Box sx={{ display: 'flex', justifyContent: 'left'}}>
      <UserVerificationBox sx={{backgroundColor: '#E9E9E9B0'}} />
    </Box>
              </Grid>
              <Grid
                xs={6}
                md={4}
                lg={4}
              >
               <Typography
          component="a"
          href="/customers/ban-user"
          variant="body1"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            cursor: 'pointer',
            textDecoration: 'none',
          }}
          
        >
          <BanUserBox />
        </Typography>
              </Grid>
              <Grid
                xs={6}
                md={4}
                lg={4}
              >
                <Typography
          component="a"
          href="#"
          variant="body1"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            cursor: 'pointer',
            textDecoration: 'none',
          }}
          
        >
          <PriotizeUserBox />
        </Typography>

              </Grid>


              
            </Grid>
          </div>
        </Stack>
      </Container>
    </div>
  </DashboardLayout>
  )  
  


};



export default Page;