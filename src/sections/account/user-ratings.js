import { useCallback, useState } from 'react';
import {AiOutlineFilePdf} from 'react-icons/ai'
import { OverviewLatestOrders } from '../overview/overview-user-latest-orders';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
  Typography
} from '@mui/material';

const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  },
  {
    value: 'los-angeles',
    label: 'Los Angeles'
  }
];

export const UserProfileDetails = () => {
  const [values, setValues] = useState({
    firstName: 'Anika',
    lastName: 'Visser',
    email: 'demo@devias.io',
    phone: '',
    state: 'los-angeles',
    country: 'USA'
  });
  
  const user = {
    avatar: '/assets/avatars/avatar-anika-visser.png',
    city: 'Los Angeles',
    country: 'USA',
    jobTitle: 'Senior Developer',
    name: 'Anika Visser',
    timezone: 'GTM-7'
  };
  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
    },
    []
  );

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={6}
                md={6}
              >
                <Avatar
          src={user.avatar}
          sx={{
            height: 80,
            mb: 2,
            width: 80
          }}
        />
              </Grid>
              <Grid
                xs={6}
                md={6}
              >
                <Typography
                 sx={{ textAlign: 'right', color: 'black' }}
          color="text.secondary"
          variant="body1"
        >
          {'User Type'} {':'} <span style={{ color: '#FF6600' }}>Shopper</span>
        </Typography>
        <Typography
                sx={{ textAlign: 'right', color: '#958F8F', fontStyle: 'italic'}}
          color="text.secondary"
          variant="body2"
        >
          {'Joined April 2023'}
        </Typography>

              </Grid>
              <Grid xs={12} md={12}>
                <Typography variant='body1' sx={{ color:'#958F8F'}}> Security and settings

                </Typography>


              </Grid>
              <Grid xs={12} md={4}>

  <Typography variant="body1">Name: {'Ali Ademola'}</Typography>
</Grid>

<Grid xs={12} md={4}>
  <Typography variant="body1">Email: {'test@gmail.com'}</Typography>
</Grid>
<Grid xs={12} md={4}>
  <Typography variant="body1">Average Rating: {'4'}</Typography>
</Grid>
<Grid xs={12} md={4}>
  <Typography variant="body1">Number of deliveries: {'5'}</Typography>
</Grid>
<Grid xs={12} md={4}>
  <Typography variant="body1">Dispute tally: {'5'}</Typography>
</Grid>






<Grid xs={12} md={12}>
<Divider />
</Grid>

              <Grid xs={12} md={12}>
                <Typography variant='body1' sx={{ color:'#958F8F'}}> Shopping history

                </Typography>


              </Grid>

<Grid xs={12} md={12}>
<OverviewLatestOrders
              orders={[
                {
                  id: 'f69f88012978187a6c12897f',
                  ref: 'DEV1049',
                  amount: 5000,
                  account_name:'Mary Ayomide',
                  shop:'Terra Mall',
                  delivery_location:'Next vila, Ajah, lagos',
                  shopper:'Praise',
                  customer: {
                    name: 'Ekaterina Tankova'
                  },
                  shopper:'Tolu',
                  

                  createdAt: 1555016400000,
                  status: 'ongoing'
                },
                {
                  id: '9eaa1c7dd4433f413c308ce2',
                  ref: 'DEV1048',
                  account_name:'Mary Ayomide',
                  shop:'Terra Mall',
                  delivery_location:'Next vila, Ajah, lagos', 
                  amount: 5000,
                  shopper:'Favour',
                  customer: {
                    name: 'Cao Yu'
                  },
                  createdAt: 1555016400000,
                  status: 'completed'
                },
                {
                  id: '01a5230c811bd04996ce7c13',
                  ref: 'DEV1047',
                  account_name:'Mary Ayomide',
                  shop:'Terra Mall',
                  delivery_location:'Next vila, Ajah, lagos',
                  amount: 10.99,
                  shopper:'Emmy',
                  customer: {
                    name: 'Alexa Richardson'
                  },
                  createdAt: 1554930000000,
                  status: 'pending'
                },
                {
                  id: '1f4e1bd0a87cea23cdb83d18',
                  ref: 'DEV1046',
                  amount: 960000,
                  account_name:'Mary Ayomide',
                  shop:'Terra Mall',
                  delivery_location:'Next vila, Ajah, lagos',
                  shopper:'Ali',
                  customer: {
                    name: 'Anje Keizer'
                  },
                  createdAt: 1554757200000,
                  status: 'ongoing'
                },
                {
                  id: '9f974f239d29ede969367103',
                  ref: 'DEV1045',
                  amount: 350,
                  account_name:'Mary Ayomide',
                  shop:'Terra Mall',
                  delivery_location:'Next vila, Ajah, lagos',
                  customer: {
                    name: 'Clarke Gillebert'
                  },
                  createdAt: 1554670800000,
                  status: 'completed',
                  shopper:'Tobi'
                },
                {
                  id: 'ffc83c1560ec2f66a1c05596',
                  ref: 'DEV1044',
                  amount: 1600,
                  account_name:'Mary Ayomide',
                  shop:'Terra Mall',
                  delivery_location:'Next vila, Ajah, lagos',
                  customer: {
                    name: 'Adam Denisov'
                  },
                  createdAt: 1554670800000,
                  status: 'completed',
                  shopper:'Tolu'
                }
              ]}
              sx={{ height: '100%', marginTop:'0rem' }}
            />


              </Grid>
              <Grid xs={12} md={2}>

  <Typography variant="body1">Verification:</Typography>
</Grid>

<Grid xs={12} md={4}>
  <Typography variant="body1">Address Doc: {'test@gmail.com'}</Typography>
</Grid>
<Grid xs={12} md={2}>
  <Typography variant="body1">Govt Id card: {'4'}</Typography>
</Grid>
<Grid xs={12} md={2}>
  <Typography variant="body1">Phone Number: {'20'}</Typography>
</Grid>
<Grid xs={12} md={2}>
  <Typography variant="body1">Check: {'20'}</Typography>
</Grid>


<Grid
            xs={12}
            md={12}
            lg={12}
          >
            
          </Grid>



            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          
        </CardActions>
      </Card>
    </form>
  );
};
