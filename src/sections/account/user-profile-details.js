import React, { useCallback, useState } from 'react';
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
import firebase_app from '@/firebase/config';
import { useAuthContext } from '@/context/AuthContext';
import { getFirestore, collection, getDocs, getDoc, doc, query, where, updateDoc, arrayUnion } from 'firebase/firestore';

export const UserProfileDetails = (props) => {
  const { id , sx } = props;
  console.log(id)
  const db = getFirestore(firebase_app);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState()
  const [error, setError] = useState(null);
  const [counter, setCounter] = useState(null);
  const { user_1 } = useAuthContext()

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
  
  

  React.useEffect(() => {
    if (user == null) router.push("/auth/login")
    const fetchUserData = async (userId) => {
      try {
        const userRef = doc(db, 'user', userId);
        const userSnapshot = await getDoc(userRef);
        
        if (userSnapshot.exists()) {
          const userdata = userSnapshot.data();
          setUserData(userdata);
          console.log(userdata);
        } else {
          setError('Order not found');
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching order data');
      } finally {
        setLoading(false);
      }
    
    }
    fetchUserData(id)

    
}, [userData])

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
          src={userData?.image}
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
          {'User Type'} {':'} <span style={{ color: '#FF6600' }}>{userData?.shopper_profile?<>Shopper</>:<>Buyer</>}</span>
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

  <Typography variant="body1">Name: {userData?.first_name} {userData?.last_name}</Typography>
</Grid>

<Grid xs={12} md={6}>
  <Typography variant="body1">Email: {userData?.email}</Typography>
</Grid>
<Grid xs={12} md={6}>
  <Typography variant="body1">Phone Number: {userData?.phoneNumber}</Typography>
</Grid>
<Grid xs={12} md={6}>
  <Typography variant="body1">Address: {userData?.shopper_profile?.address}</Typography>
</Grid>
<Grid xs={12} md={12}>
<Divider />
</Grid>

<Grid xs={12} md={12}>
                <Typography variant='body1' sx={{ color:'#958F8F'}}> Identification

                </Typography>


              </Grid>
              <Grid xs={12} md={6}>

  <Typography variant="body1">Front ID </Typography>
  {userData?.shopper_profile?.frontImage && (
  <a
    href={userData.shopper_profile.frontImage}
    target="_blank"
    rel="noopener noreferrer"
    className='ml-4 mt-3'
  >
    <AiOutlineFilePdf size={40} />
  </a>
)}
</Grid>

<Grid xs={12} md={6}>
  <Typography variant="body1">Back Id</Typography>
  {userData?.shopper_profile?.backImage && (
  <a
    href={userData.shopper_profile.backImage}
    target="_blank"
    rel="noopener noreferrer"
    className='ml-4 mt-3'
  >
    <AiOutlineFilePdf size={40} />
  </a>
)}
</Grid>

<Grid xs={12} md={12}>
<Divider />
</Grid>
<Grid xs={12} md={12}>
                <Typography variant='body1' sx={{ color:'#958F8F'}}> Payment Details

                </Typography>


              </Grid>
              <Grid xs={12} md={4}>

  <Typography variant="body1">Account Name: {userData?.shopper_profile?.accountName}</Typography>
</Grid>

<Grid xs={12} md={4}>
  <Typography variant="body1">Account Number: {userData?.shopper_profile?.accountNumber}</Typography>
</Grid>
<Grid xs={12} md={4}>
  <Typography variant="body1">Bank Name: {''}</Typography>
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
UserProfileDetails.propTypes = {
  id: PropTypes.element,
  sx: PropTypes.object
};