import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AccountProfile } from 'src/sections/account/account-profile';
import { UserProfileDetails } from 'src/sections/account/user-ratings';
import ChevronRight from '@heroicons/react/24/solid/ChevronRightIcon';
import { OverviewLatestOrders } from 'src/sections/overview/overview-user-latest-orders';

const Page = () => (
  <>
    <Head>
      <title>
        User Account
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
        <Stack spacing={3}>
          <div>
            <Typography variant="h6" color='#958F8F'>
              User Management User <span>Ali Ademola</span>
            </Typography>
          </div>
          <div>
            <Grid
              container
              spacing={3}
            >
              <Grid item xs={4} md={4} lg={4}>
         <a href='/customers/user' style={{textDecoration:'none'}}>
         <Box
            textAlign="center"
            py={2}
          >
            Basic
          </Box>
         </a>
        </Grid>
        <Grid item xs={4} md={4} lg={4}>
         <a href=''>
         <Box
            textAlign="center"
            py={2}
            borderBottom="2px solid #FF6600"
            position="relative"
          >
            Ratings & Activities
            <Box
              position="absolute"
              left={0}
              right={0}
              bottom={-2}
              height={4}
              backgroundColor="#FF6600"
            />
          </Box>
         </a>
        </Grid>
        <Grid item xs={4} md={4} lg={4}>
         <a href='/customers/user/security' style={{textDecoration:'none'}}>
         <Box
            textAlign="center"
            py={2}
          >
            Security & Settings
          </Box>
         </a>
        </Grid>
              
             
              <Grid
                xs={12}
                md={12}
                lg={12}
              >
                <UserProfileDetails />
              </Grid>

              <Grid
              xs={12}
              md={12}
              lg={12}
              >
              
              </Grid>

              
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;