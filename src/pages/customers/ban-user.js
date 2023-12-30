import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AccountProfile } from 'src/sections/account/account-profile';
import { UserProfileDetails } from 'src/sections/account/ban-user';
import ChevronRight from '@heroicons/react/24/solid/ChevronRightIcon';
import { OverviewLatestOrders } from 'src/sections/overview/overview-ratings';
import MyTable, {Mytable} from 'src/sections/overview/overview-security'
import { UserVerificationBox } from 'src/sections/customer/bottom-nav';
import { PriotizeUserBox } from 'src/sections/customer/bottom-nav-3';
import { BanUserBox } from 'src/sections/customer/bottom-nav-2';
import {Link} from 'next/link';

const Page = () => (
  <>
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
        <Stack spacing={3}>
          <div>
            <Typography variant="h6" color='#958F8F'>
              User Management <span> {"> "} Ban User</span>
            </Typography>
          </div>
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
               
                
               
    
        
    <Typography
          component="a"
          href="/customers/user-verification"
          variant="body1"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            cursor: 'pointer',
            textDecoration: 'none',
          }}
          
        >
          <UserVerificationBox />
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
          <BanUserBox sx={{backgroundColor: '#E9E9E9B0'}} />
        </Typography>
              </Grid>
              <Grid
                xs={6}
                md={4}
                lg={4}
              >
                <Typography
          component="a"
          href="/customers/priotize-user"
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
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;