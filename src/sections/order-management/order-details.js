import { useCallback, useState } from 'react';
import {AiOutlineFilePdf} from 'react-icons/ai'
import PropTypes from 'prop-types';
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

export const OrderDetails = (props) => {
  const { order = [], sx } = props;
  console.log(order.orderStatus)
  console.log(order)
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
                <Typography fontWeight={500}>
                    List name: <span style={{fontWeight:'300', size:'1rem'}}>{order.orderDetails.name}</span>
                </Typography>

              </Grid>

              <Grid
                xs={6}
                md={6}
              >
                
                <Typography fontWeight={500} sx={{ textAlign: 'right' }}>
                    Order status: <span style={{fontWeight:'300', size:'1rem'}}>{order.orderStatus}</span>
                </Typography>

                
              </Grid>

              <Grid
                xs={6}
                md={4}
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
                md={4}
              >
                <Typography
                 sx={{ textAlign: 'right', color: 'black' }}
          color="text.secondary"
          variant="body1"
        >
          {'Customer'} {':'} <span style={{ color: '#FF6600' }}>{order.buyer.first_name}</span>
        </Typography>
  

              </Grid>


              <Grid
                xs={6}
                md={4}
              >
                <Typography
                 sx={{ textAlign: 'right', color: 'black' }}
          color="text.secondary"
          variant="body1"
        >
          {'Shopper'} {':'} <span style={{ color: '#FF6600' }}>{order.seller.first_name}</span>
        </Typography>
  

              </Grid>
              
              <Grid xs={12} md={12}>
              <div className='text-center'>
                
  <Typography variant="body1">Prefered Market: {order.orderDetails.preferedMarket}</Typography>

              </div>
</Grid>

<Grid xs={12} md={12}>
<div className='text-center'>
                
                <Typography variant="body1">Delivery Location: {order.address.address_details}</Typography>
              
                            </div>
</Grid>
<Grid xs={12} md={12}>
<Divider />
</Grid>


              <Grid xs={12} md={6}>

  <Typography variant="body1">List Cost</Typography>
</Grid>

<Grid xs={12} md={6}>
  <Typography variant="body1">Shopper Charge: {'test@gmail.com'}</Typography>
</Grid>

<Grid xs={12} md={6}>

<Typography variant="body1">Total Amount</Typography>
</Grid>

<Grid xs={12} md={6}>
<Typography variant="body1">App fee: {'test@gmail.com'}</Typography>
</Grid>

<Grid xs={12} md={12}>
<Divider />
</Grid>
<Grid xs={12} md={12}>
                <Typography variant='body1' sx={{ color:'#958F8F'}}> Payment Details

                </Typography>


              </Grid>
              <Grid xs={12} md={4}>

  <Typography variant="body1">Account Name: {'Ali Ademola'}</Typography>
</Grid>

<Grid xs={12} md={4}>
  <Typography variant="body1">Account Number: {'22655667383'}</Typography>
</Grid>
<Grid xs={12} md={4}>
  <Typography variant="body1">Bank Name: {'zenith'}</Typography>
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

OrderDetails.prototype = {
  order: PropTypes.array,
  users: PropTypes.array,
  sx: PropTypes.object
};