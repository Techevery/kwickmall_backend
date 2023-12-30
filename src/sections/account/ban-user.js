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
        <Grid
        container
        spacing={3}
        >
            <Grid xs={12} md={12}>
           <Table>
           <TableHead>
                      <TableRow>
                        <TableCell>Account</TableCell>
                        <TableCell>Non-remittal</TableCell>
                        <TableCell>Price gouging</TableCell>
                        <TableCell>False-hood</TableCell>
                        <TableCell>Badbuy</TableCell>
                        <TableCell>Strikes</TableCell>
                        <TableCell>Ban</TableCell>
                        
                      </TableRow>
                    </TableHead>
           </Table>

            </Grid>
            
        </Grid>
      <Card>
        
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
            
             




<Grid xs={12} md={12}>
<div component={Paper}>
      <Table>
        
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>
                <div style={{ display: 'flex', alignItems: 'center' }}>
               
                <Checkbox checked={true} onChange={() => {}} style={{ color: '#FF6600' }}/>
                </div>
            </TableCell>

            <TableCell>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', whiteSpace: 'nowrap' }}>
                <Checkbox checked={true} onChange={() => {}} style={{ color: '#FF6600' }}/>
                </div>
            </TableCell>
            <TableCell>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', whiteSpace: 'nowrap' }}>
                <Checkbox checked={true} onChange={() => {}} style={{ color: '#FF6600' }}/>
                </div>
            </TableCell>
            <TableCell>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', whiteSpace: 'nowrap' }}>
                <Checkbox checked={true} onChange={() => {}} style={{ color: '#FF6600' }}/>
                </div>
            </TableCell>
            <TableCell>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', whiteSpace: 'nowrap' }}>
                <Checkbox checked={true} onChange={() => {}} style={{ color: '#FF6600' }}/>
                </div>
            </TableCell>
            <TableCell>
              <Switch checked={false} onChange={() => {}} />
            </TableCell>
            
          </TableRow>

          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>
                <div style={{ display: 'flex', alignItems: 'center' }}>
               
                <Checkbox checked={true} onChange={() => {}} style={{ color: '#FF6600' }}/>
                </div>
            </TableCell>

            <TableCell>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', whiteSpace: 'nowrap' }}>
                <Checkbox checked={false} onChange={() => {}} style={{ color: '' }}/>
                </div>
            </TableCell>
            <TableCell>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', whiteSpace: 'nowrap' }}>
                <Checkbox checked={false} onChange={() => {}} style={{ color: '' }}/>
                </div>
            </TableCell>
            <TableCell>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', whiteSpace: 'nowrap' }}>
                <Checkbox checked={false} onChange={() => {}} style={{ color: '' }}/>
                </div>
            </TableCell>
            <TableCell>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', whiteSpace: 'nowrap' }}>
                <Checkbox checked={false} onChange={() => {}} style={{ color: '' }}/>
                </div>
            </TableCell>
            <TableCell>
              <Switch checked={false} onChange={() => {}} />
            </TableCell>
            
          </TableRow>
         
          



          

          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>
                <div style={{ display: 'flex', alignItems: 'center' }}>
               
                <Checkbox checked={true} onChange={() => {}} style={{ color: '#FF6600' }}/>
                </div>
            </TableCell>

            <TableCell>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', whiteSpace: 'nowrap' }}>
                <Checkbox checked={false} onChange={() => {}} style={{ color: '' }}/>
                </div>
            </TableCell>
            <TableCell>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', whiteSpace: 'nowrap' }}>
                <Checkbox checked={false} onChange={() => {}} style={{ color: '' }}/>
                </div>
            </TableCell>
            <TableCell>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', whiteSpace: 'nowrap' }}>
                <Checkbox checked={false} onChange={() => {}} style={{ color: '' }}/>
                </div>
            </TableCell>
            <TableCell>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', whiteSpace: 'nowrap' }}>
                <Checkbox checked={false} onChange={() => {}} style={{ color: '' }}/>
                </div>
            </TableCell>
            <TableCell>
              <Switch checked={false} onChange={() => {}} />
            </TableCell>
            
          </TableRow>

          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>
                <div style={{ display: 'flex', alignItems: 'center', width:'100px' }}>
               
                <Checkbox checked={true} onChange={() => {}} style={{ color: '#FF6600' }}/>
                </div>
            </TableCell>

            <TableCell>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', whiteSpace: 'nowrap', width:'100px' }}>
                <Checkbox checked={false} onChange={() => {}} style={{ color: '' }}/>
                </div>
            </TableCell>
            <TableCell>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', whiteSpace: 'nowrap', width:'100px' }}>
                <Checkbox checked={false} onChange={() => {}} style={{ color: '' }}/>
                </div>
            </TableCell>
            <TableCell>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', whiteSpace: 'nowrap', width:'100px' }}>
                <Checkbox checked={false} onChange={() => {}} style={{ color: '' }}/>
                </div>
            </TableCell>
            <TableCell>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', whiteSpace: 'nowrap' }}>
                <Checkbox checked={false} onChange={() => {}} style={{ color: '' }}/>
                </div>
            </TableCell>
            <TableCell>
              <Switch checked={false} onChange={() => {}} />
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