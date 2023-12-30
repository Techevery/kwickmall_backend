import Head from 'next/head';
import Link from 'next/link';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AccountProfile } from 'src/sections/account/account-profile';
import { UserProfileDetails } from 'src/sections/account/user-profile-details';
import ChevronRight from '@heroicons/react/24/solid/ChevronRightIcon';
import { useRouter } from 'next/router';


function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}


const breadcrumbs = [
  <Link underline="hover" key="1" color="inherit" href="/customers" onClick={handleClick}
  style={{ color:'black' }}
  >
    User Management
  </Link>,
  <Link
    underline="hover"
    key="2"
    color="inherit"
    href="/customers"
    onClick={handleClick}
    style={{ color:'black' }}
  >
    User
  </Link>,
  <Typography key="3" color="text.primary">
    
  </Typography>,
];
const Page = () => {
  const router = useRouter()
  const id = router.query.uid;

  return(
    <DashboardLayout>
    <Head>
      <title>
        User Account
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

      <Stack spacing={3} className=''>
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
            
             
             <Grid item xs={4} md={4} lg={4}>
         <a href='/customers/user' style={{textDecoration:'none',  color:'black' }}>

          <Box
            textAlign="center"
            py={2}
            borderBottom="2px solid #FF6600"
            position="relative"

          >
            Basic
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
         <a href='/customers/user/ratings' style={{textDecoration:'none',  color:'black' }}>
         <Box
            textAlign="center"
            py={2}
           
            position="relative"
          >
            Ratings & Activities
            
          </Box>
         </a>
        </Grid>
        <Grid item xs={4} md={4} lg={4}>
         <a href='' style={{ textDecoration:'none',  color:'black' }}>
         
         <Box
            textAlign="center"
            py={2}
           
            position="relative"
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
                <UserProfileDetails 
                id={id}
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