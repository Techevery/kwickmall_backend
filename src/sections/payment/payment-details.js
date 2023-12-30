import React, { useCallback, useState } from 'react';
import {AiOutlineFilePdf} from 'react-icons/ai'
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Modal,
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
import { useRouter } from 'next/router';
import firebase_app from '@/firebase/config';
import { getFirestore, collection, doc, getDocs, getDoc, updateDoc, query, where } from 'firebase/firestore';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #808080',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  textAlign: 'center',

  title: {
    marginBottom: '.5rem', // Add spacing between title and TextField
  },
};


export const PaymentDetails = (props) => {

  const currentDate = new Date();
  console.log(currentDate);
  const timestamp = currentDate.getTime();
  console.log(timestamp)

  const { payment = [], sx } = props;
  const createdAt = format(payment.created_at, 'dd/MM/yyyy');
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
    },
    []
  );

  const db = getFirestore(firebase_app);
const router = useRouter();
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
async function updateWithdrawal(Id, newData, newData2) {
  try {
    // Query the Firestore collection to find the document with the matching 'withdrawal' ID
    const documentRef = doc(db, 'withdrawals', Id);
    const querySnapshot = await getDoc(documentRef);


    if (querySnapshot.exists()) {
      // Use the reference directly to update the document
      await updateDoc(documentRef, {
        status: newData,
        message: newData2,
      });
      console.log('Document updated successfully');
      let title, body;
      if (newData === 'approved') {
        title = 'Payment Approved';
        body = 'Your payment has been approved.';
      } else if (newData === 'rejected') {
        title = 'Payment Rejected';
        body = newData2;
        const documentRef_2 = doc(db, 'ewallet', payment.userID);
        const docshot = await getDoc(documentRef_2)
        console.log(docshot.data())
        const docdata = docshot.data()
        await updateDoc(documentRef_2, {
        
          accountBalance: docdata.accountBalance + payment.amount
        });
  

    // Get the current data from the document
    const docSnapshot = await getDoc(documentRef);
    console.log(docSnapshot.data())
      }

      const notificationData = {
        to: payment.notification_id, // Make sure 'payment' is defined somewhere in your code
        notification: {
          title: title,
          body: body,
        },
      };
      sendNotificationToFCM(notificationData);
      router.push(`/payments`);
    } else {
      console.error('No document found with matching ID:', Id);
    }
  } catch (error) {
    console.error('Error updating document:', error);
  }
}


async function updateTransactionById(documentId) {
  try {
    // Reference the Firestore document by its ID
    const documentRef = doc(db, 'ewallet', documentId);

    // Get the current data from the document
    const docSnapshot = await getDoc(documentRef);
    console.log(docSnapshot.data())

    // Check if the document exists
    if (docSnapshot.exists()) {
      const currentData = docSnapshot.data();

      // Check if 'transactionHistory' field exists and is an array; if not, create an empty array
      const transactionHistoryArray = Array.isArray(currentData.transactionHistory) ? currentData.transactionHistory : [];
      let pay = {
        amount: payment.amount,
        balance: currentData.accountBalance,
        balancebefore: currentData.accountBalance + payment.amount,
        transactionReference: payment.id,
        transactionType: 'debit',
        transactionDate: timestamp,
      };

      // Append the new data (dictionary) to the array
      transactionHistoryArray.push(pay);

      // Update the document with the modified list
      await updateDoc(documentRef, {
        transactionHistory: transactionHistoryArray,
        
      });

      console.log('Document updated successfully');
      updateWithdrawal(payment.id, 'approved', '');

      
    } else {
      console.error(`Document with ID ${documentId} does not exist.`);
    }

  } catch (error) {
    console.error('Error updating document:', error);
  }
}



function ChildModal(props) {
  const { payment = [], sx } = props;
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('')
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen} style={{ backgroundColor: 'black', color: 'white' }}>
        No
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={style}>
          <div style={{marginBottom:'1rem'}}>
          <Typography variant="h6" id="child-modal-title">
            Reason for declining?
          </Typography>
          </div>
          <div className="" style={{marginBottom:'1.5rem'}}>
          <TextField
          className='pt'
            variant="outlined"
            placeholder="Type something..."
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
            fullWidth // Make the input field take the full width
          />
          </div>

          <div className=''>
            <Button style={{backgroundColor:'#FF6600', color:'white'}} onClick={() => updateWithdrawal(payment.id, 'rejected', message)}>Reject</Button>
          </div>
          <div srtyle={{display: 'flex', justifyContent: 'space-between'}}>
          <Button onClick={handleClose}>Back</Button>

          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card className=''>
        
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
             
              <Grid xs={12} md={6}>

  <Typography variant="body1">Ref No: {payment.transaction_reference}</Typography>
</Grid>

<Grid xs={12} md={6}>
  <Typography variant="body1">Transaction status: {payment.status}</Typography>
</Grid>
<Grid xs={12} md={6}>
  <Typography variant="body1">Account: {payment.withdrawalAccount?.accountName}</Typography>
</Grid>
<Grid xs={12} md={6}>
  <Typography variant="body1">Date & Time: {createdAt}</Typography>
</Grid>
<Grid xs={12} md={12}>
<Divider />
</Grid>

              <Grid xs={12} md={6}>

  <Typography variant="body1">Amount: { payment.amount } </Typography>
</Grid>

<Grid xs={12} md={6}>
  <Typography variant="body1">Bank Name: {payment.withdrawalAccount?.bankName}</Typography>
</Grid>
<Grid xs={12} md={6}>
  <Typography variant="body1">Account Number: {payment.withdrawalAccount?.accountNumber}</Typography>
</Grid>
<Grid xs={12} md={6}>
  <Typography variant="body1">Message: {payment.message}</Typography>
</Grid>

<Grid xs={12} md={12}>
<Divider />
</Grid>

            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          {payment.status ==='approved' || payment.status === 'rejected'?<></>:<Button onClick={handleOpen} style={{backgroundColor:'#FF6600', color:'white'}}>
            Approve Payment
          </Button>}
          <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
  <h2 id="parent-modal-title">Do You confirm this payment?</h2>
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <div>
    
      <ChildModal
      payment={payment}
      />
 
    </div>
    <div>
    <Button onClick={() => updateTransactionById(payment.userID)} style={{backgroundColor:'#FF6600', color:'white'}}>
            Yes
          </Button>
    </div>
  </div>
 
</Box>

      </Modal>

         
        </CardActions>
      </Card>
    </form>
  );
};

PaymentDetails.prototype = {
  payment: PropTypes.array,
  sx: PropTypes.object
};
