import { useCallback, useState } from 'react';
import {AiOutlineFilePdf} from 'react-icons/ai'
import { Checkbox, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
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
import {Mytable} from 'src/sections/overview/overview-security'

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
  const useStyles ={
    redCheckbox: {
      color: 'red',
      '&$checked': {
        color: 'red',
      },
    },
    checked: {},
  };

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
                <Typography variant='body1' sx={{ color:'#958F8F'}}> Bio-data

                </Typography>


              </Grid>
              <Grid xs={12} md={4}>

  <Typography variant="body1">Name: {'Ali Ademola'}</Typography>
</Grid>

<Grid xs={12} md={4}>
  <Typography variant="body1">Email: {'test@gmail.com'}</Typography>
</Grid>
<Grid xs={12} md={4}>
  <Typography variant="body1">Previous priotization: {'+234 80 773 6353'}</Typography>
</Grid>
<Grid xs={12} md={4}>
  <Typography variant="body1">Status: <span color='green' style={{color:'#63D775'}}>Verified</span></Typography>
</Grid>
<Grid xs={12} md={4}>
  <Typography variant="body1">Previous Ban Tally: {'0'}</Typography>
</Grid>
<Grid xs={12} md={12}>
<Divider />
</Grid>

<Grid xs={12} md={12}>
                <Typography variant='body1' sx={{ color:'#958F8F'}}> Verification & Permission

                </Typography>


              </Grid>




<Grid xs={12} md={12}>
<div component={Paper}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Verification</TableCell>
            <TableCell>Address Doc</TableCell>
            <TableCell>
              <Checkbox checked={true} onChange={() => {}} style={{ color: '#FF6600' }}/>
            </TableCell>
            <TableCell>Govt Id Card</TableCell>
            <TableCell>
              <Checkbox checked={true} onChange={() => {}} style={{ color: '#FF6600'}}/>
            </TableCell>
            <TableCell>Phone no</TableCell>
            <TableCell>
              <Checkbox checked={false} onChange={() => {}} />
            </TableCell>
            <TableCell>
              <Switch checked={false} onChange={() => {}} />
            </TableCell>
            
          </TableRow>
         
          

          <TableRow>
            <TableCell>priotization</TableCell>
            <TableCell>Address Doc</TableCell>
            <TableCell>
              <Checkbox checked={false} onChange={() => {}} />
            </TableCell>
            <TableCell>Bidding for Order</TableCell>
            <TableCell>
              <Checkbox checked={false} onChange={() => {}} />
            </TableCell>
            <TableCell>Viewing orders</TableCell>
            <TableCell>
              <Checkbox checked={false} onChange={() => {}} />
            </TableCell>
            <TableCell>
              <Switch checked={false} onChange={() => {}} />
            </TableCell>
            
          </TableRow>

          <TableRow>
            <TableCell>Banning</TableCell>
            <TableCell>Non-remittal</TableCell>
            <TableCell>
              <Checkbox checked={false} onChange={() => {}} />
            </TableCell>
            <TableCell>Price gouging</TableCell>
            <TableCell>
              <Checkbox checked={false} onChange={() => {}} />
            </TableCell>
            <TableCell>Falsehood</TableCell>
            <TableCell>
              <Checkbox checked={false} onChange={() => {}} />
            </TableCell>
            <TableCell>
              <Switch checked={false} onChange={() => {}} />
            </TableCell>
            
          </TableRow>

          <TableRow>
            <TableCell>Restriction</TableCell>
            <TableCell>Viewing order</TableCell>
            <TableCell>
              <Checkbox checked={true} onChange={() => {}} style={{ color: '#FF6600' }}/>
            </TableCell>
            <TableCell>Bidding</TableCell>
            <TableCell>
              <Checkbox checked={false} onChange={() => {}} />
            </TableCell>
            <TableCell>login</TableCell>
            <TableCell>
              <Checkbox checked={false} onChange={() => {}} />
            </TableCell>
            <TableCell>
              <Switch checked={true} onChange={() => {}} style={{ color: '#FF6600'}}/>
            </TableCell>
            
          </TableRow>
        </TableBody>
      </Table>
    </div>
</Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        
      </Card>
    </form>
  );
};
