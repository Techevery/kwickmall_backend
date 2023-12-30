import { useCallback, useState, useEffect } from 'react';
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
import firebase_app from '@/firebase/config';
import { getFirestore, collection, getDocs, getDoc, doc, query, where, updateDoc, arrayUnion, onSnapshot } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { Scrollbar } from '@/components/scrollbar';



const db = getFirestore(firebase_app);

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
  const [usersData, setUsersData] = useState([])
  useEffect(() => {
    const usersCollection = collection(db, 'user');
    const q = query(usersCollection, where('shopper_profile', '!=', null));
  
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const userData = [];
      querySnapshot.forEach((doc) => {
        userData.push({
          id: doc.id,
          ...doc.data(),
        });
      });
  
      console.log(userData);
      setUsersData(userData);
    });
  
    // The return function will be called when the component unmounts
    return () => unsubscribe();
  }, []); // The dependency array is empty, meaning this effect runs once after the initial render
  

  async function sendNotificationToFCM(data) {
    try {
      const response = await fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + process.env.NEXT_PUBLIC_CLOUD_API_KEY,
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log('FCM notification sent successfully:', responseData);
        return responseData;
      } else {
        console.error('Failed to send FCM notification:', response.status, response.statusText);
        throw new Error(`Failed to send FCM notification: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error sending FCM notification:', error);
      throw error;
    }
  }

  //approve a document
  async function approvedoc(docId, notId, field, not_field, status) {
    try {
      const userRef = doc(db, 'user', docId);
      const userDoc = await getDoc(userRef);
  
      if (userDoc.exists()) {
        // Update the 'approved' key inside the 'shopper_profile' dictionary
         const updateField = {};
      updateField[field] = status;
        
        await updateDoc(userRef, updateField);
        const message = status === true ? 'User document has been approved' : 'User document has been flagged';

        // Display the approval or ban message appropriately using the `toast` function
        toast(message, {
          type: status === true ? 'success' : 'error',
          position: 'top-right',
          autoClose: 5000,
        });

        const notificationData = {
          to: notId,
          notification: {
            title: 'Shopper Verification',
            body: "The " + {not_field} + "uploaded was not approved",
          },
        };
        sendNotificationToFCM(notificationData);
      } else {
        console.error('No document found with matching docId:', docId);
      }
    } catch (error) {
      console.error('Error updating document:', error);
    }
  }
  

  async function approveShopper(docId, notId, status) {
    try {
      const userRef = doc(db, 'user', docId);
      const userDoc = await getDoc(userRef);
  
      if (userDoc.exists()) {
        // Update the 'approved' key inside the 'shopper_profile' dictionary
        await updateDoc(userRef, {
          'shopper_profile.approved': status,
        });
        const message = status === true ? 'User account has been approved' : 'User account has been flagged';

        // Display the approval or ban message appropriately using the `toast` function
        toast(message, {
          type: status === true ? 'success' : 'error',
          position: 'top-right',
          autoClose: 5000,
        });

        const notificationData = {
          to: notId,
          notification: {
            title: 'Shopper Verification',
            body: message,
          },
        };
        sendNotificationToFCM(notificationData);
      } else {
        console.error('No document found with matching docId:', docId);
      }
    } catch (error) {
      console.error('Error updating document:', error);
    }
  }
  const handleSwitchChange = (docId, notId, status) => {
    // Handle switch change here and call approveShopper with docId
    console.log('Switch changed for docId:', docId);
    approveShopper(docId, notId, status);
  };

  const handleApproveChange = (docId, notId, field, not_field, status) => {
    // Handle switch change here and call approveShopper with docId
    console.log('Switch changed for docId:', docId);
    approvedoc(docId, notId, field, not_field, status);
  };

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
           
           </Table>

            </Grid>
            
        </Grid>
      <Card>
        
          <Scrollbar>
          <Box sx={{ minWidth: 800 }}>
          
            
          <div component={Paper}>
                <Table>
          
                <TableHead>
                                <TableRow>
                                  <TableCell>User Account</TableCell>
                                  <TableCell>Email</TableCell>
                                  <TableCell>Id Card</TableCell>
                                  <TableCell>Passport</TableCell>
                                  <TableCell>Address</TableCell>
                                  <TableCell>Verify</TableCell>
                                  
                                </TableRow>
                              </TableHead>
                  
                  <TableBody>
            {usersData.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.first_name}</TableCell>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {user.email}
                    {user.shopper_profile !== null? (
                      <Checkbox checked={true} onChange={() => {}} style={{ color: '#FF6600' }} />
                    ):<Checkbox checked={false} onChange={() => {}} style={{ color: '#FF6600' }} />}
                  </div>
                </TableCell>
          
                <TableCell>
                  <div style={{ display: 'flex', paddingRight:'5rem',flexDirection: 'row', alignItems: 'center', whiteSpace: 'nowrap' }}>
                   
                    {user.shopper_profile.frontImage !== null? (
                      <>
                      <a
                        href={user.shopper_profile.frontImage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className='ml-4 mt-3'
                      >
                        See Upload
                      </a>
                    {user.shopper_profile.front_id_status?(
                      <Checkbox checked={true} onChange={() => handleApproveChange(user.id, user.notificationID, 'shopper_profile.front_id_status', 'front_id', false)} style={{ color: '#FF6600' }} />
                    ):<Checkbox checked={false} onChange={() => handleApproveChange(user.id, user.notificationID, 'shopper_profile.front_id_status', 'front_id', true)} style={{ color: '#FF6600' }} />}
                      </>
                    ):<Checkbox checked={false} onChange={() => {}} style={{ color: '#FF6600' }} />}
                  </div>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', paddingRight:'3rem', flexDirection: 'row', alignItems: 'center', whiteSpace: 'nowrap' }}>
                    {user.uploadStatus}
                    {user.shopper_profile.backImage !== ''? (
                     
                        <>
                        <a
                          href={user.shopper_profile.backImage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className='ml-4 mt-3'
                        >
                          See Upload
                        </a>
                        {user.shopper_profile.back_id_status?(
                      <Checkbox checked={true} onChange={() => handleApproveChange(user.id, user.notificationID, 'shopper_profile.back_id_status', 'back_id', false)} style={{ color: '#FF6600' }} />
                    ):<Checkbox checked={false} onChange={() => handleApproveChange(user.id, user.notificationID, 'shopper_profile.back_id_status', 'back_id', true)} style={{ color: '#FF6600' }} />}
                        </>
                    ):<Checkbox checked={false} onChange={() => {}} style={{ color: '#FF6600' }} />}
                  </div>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', paddingRight:'4rem', flexDirection: 'row', alignItems: 'center', whiteSpace: 'nowrap' }}>
                    
                    {user.shopper_profile.address !== ''? (
                      <>
                      <a
                        href={user.shopper_profile.backImage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className='ml-4 mt-3'
                      >
                        See Upload
                      </a>
                      {user.shopper_profile.address_status?(
                    <Checkbox checked={true} onChange={() => {}} style={{ color: '#FF6600' }} />
                  ):<Checkbox checked={false} onChange={() => {}} style={{ color: '#FF6600' }} />}
                      </>
                    ):<Checkbox checked={false} onChange={() => {}} style={{ color: '#FF6600' }} />}
                  </div>
                </TableCell>
                <TableCell>
                  {user.shopper_profile.approved?(<Switch
                            checked={true} // Change this to the actual approval status
                            onChange={() => handleSwitchChange(user.id, user.notificationID, false)}
                          />):<Switch
                            checked={false} // Change this to the actual approval status
                            onChange={() => handleSwitchChange(user.id, user.notificationID, true)}
                          />}
                
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          
                </Table>
              </div>
          
                    </Box>
          </Scrollbar>
       
        
      </Card>
    </form>
  );
};