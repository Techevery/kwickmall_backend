import { useCallback, useState } from 'react';
import {AiOutlineFilePdf} from 'react-icons/ai'
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

export const OrderList = () => {
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
                <Typography variant='body1' sx={{ color:'#958F8F'}}> Bio-data

                </Typography>


              </Grid>
              <Grid xs={12} md={6}>

  <Typography variant="body1">Name: {'Ali Ademola'}</Typography>
</Grid>

<Grid xs={12} md={6}>
  <Typography variant="body1">Email: {'test@gmail.com'}</Typography>
</Grid>
<Grid xs={12} md={6}>
  <Typography variant="body1">Phone Number: {'+234 80 773 6353'}</Typography>
</Grid>
<Grid xs={12} md={6}>
  <Typography variant="body1">Address: {'Lagos, plaza, ajah'}</Typography>
</Grid>
<Grid xs={12} md={12}>
<Divider />
</Grid>

<Grid xs={12} md={12}>
                <Typography variant='body1' sx={{ color:'#958F8F'}}> Identification

                </Typography>


              </Grid>
              <Grid xs={12} md={6}>

  <Typography variant="body1">Govt ID: <AiOutlineFilePdf
  className='ml-4 mt-3' size={20}
  /></Typography>
</Grid>

<Grid xs={12} md={6}>
  <Typography variant="body1">Address: {'test@gmail.com'}</Typography>
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
