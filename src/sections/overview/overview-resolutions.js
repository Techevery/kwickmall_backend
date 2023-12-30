import React, { useState } from 'react'
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import Link from 'next/link';
import firebase_app from '@/firebase/config';
import { getFirestore, collection, doc, getDoc, updateDoc, addDoc, query, where, documentId } from 'firebase/firestore';
import {
  Box,
  Button,
  Card,
  Modal,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';
import { useRouter } from 'next/router';

const statusMap = {
  ongoing: 'warning',
  completed: 'success',
  refunded: 'error'
};

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


export const OverviewResolutions = (props) => {
  const { rejections = [], users = [], sx } = props;
  const [showOpenedRejections, setShowOpenedRejections] = useState(true);
  const [temp_id, setTemp_id] = useState(null);
  const currentDate = new Date();
  const db = getFirestore(firebase_app);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
 

  const url_path = "/chat/"
  const filteredList = users.filter(item => item.id === 'DaqeAeH9QTVka77hitJ0VBQfhd92')

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
  async function addMessage(chatId) {
    try {
      // Reference to the "chat" document using the orderId
      const chatRef = doc(db, 'chat', chatId);
  
      // Reference to the "messages" collection inside the document
      const messagesCollectionRef = collection(chatRef, 'messages');
  
      // Create a new message document with the messageText
      const newMessageDocRef = await addDoc(messagesCollectionRef, {
        admin:false,
        content: 'Order has been resolved',
        created_at: currentDate,
        sender_id:null,
        attachment:[],
        order_id:null,
        order_message:null,
        system_message:true,
      });
  
      console.log('Message added with ID: ', newMessageDocRef.id);
    } catch (err) {
      console.error('Error adding message: ', err);
    }
  }

  async function closeResolution(docId) {
    try {
      console.log(docId)
      const rejectionRef = doc(db, 'rejections', docId);
      const chatQuery = doc(db, 'chat', docId);
      const qSnapshot = await getDoc(rejectionRef);
      const querySnapshot = await getDoc(chatQuery);
  
      if (qSnapshot && querySnapshot) {
        const chatData = querySnapshot.data();
        console.log(chatData);
  
        const buyerToken = chatData.customer_info.notification_id;
        const sellerToken = chatData.shopper_info.notification_id;
  
        await updateDoc(rejectionRef, {
          resolved: true,
        });
   
        //const chatRef = querySnapshot.docs.ref;
        await updateDoc(chatQuery, {
          dispute_flag: false,
          is_open: false,
        });
  
        console.log('Document updated successfully');
  
        // Assuming addMessage takes docId as an argument and exists.
        addMessage(docId);
  
        const buyerAlert = {
          to: buyerToken,
          notification: {
            title: 'Order Resolution',
            body: 'Order has been resolved in dispute',
          },
        };
  
        const sellerAlert = {
          to: sellerToken,
          notification: {
            title: 'Order Resolution', // Replace with the actual title
            body: 'Order has been resolved in dispute',
          },
        };
  
        sendNotificationToFCM(buyerAlert);
        sendNotificationToFCM(sellerAlert);
      } else {
        console.error('No document found with matching docId:', docId);
      }
    } catch (error) {
      console.error('Error updating document:', error);
    }
  }
  
  const handleOpenDispute = async (seller_id, buyer_id, reject_id) => {
    setTemp_id(reject_id);
    console.log(reject_id);
    try {
      const apiUrl = 'https://kwickmall.onrender.com/chats/'; // Replace with your API endpoint
  
      const requestBody = {
        seller_id: seller_id,
        buyer_id: buyer_id,
      };
  
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Adjust the content type if needed
        },
        body: JSON.stringify(requestBody),
      });
  
      if (response.status === 201) { // Change the condition to 201
        let data = await response.json();
        console.log(data.id);
  
        // Call the updateDocumentWithNewField function here
        updateDocumentWithNewField(reject_id, data.id);
        console.log('Request succeeded with status 201.');
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle errors as needed
    }
  };
  
  
  
  
  
 
  

console.log(filteredList[0]);

  return (
    <div sx={{ color:'#958F8F', marginTop:'0rem'}}>
        <CardHeader title="" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
        <Button
        variant={showOpenedRejections ? 'contained' : 'outlined'}
        onClick={() => setShowOpenedRejections(true)}
      >
        Show All
      </Button>
      <Button
        variant={!showOpenedRejections ? 'contained' : 'outlined'}
        onClick={() => setShowOpenedRejections(false)}
      >
        Show Opened
      </Button>
          <Table>
            <TableHead>
              <TableRow>
          
                <TableCell>
                 Order Id
                </TableCell>
                
                <TableCell>
                  Customer
                </TableCell>
                <TableCell>
                  Shopper
                </TableCell>
                
                <TableCell>
                  Dialog
                </TableCell>
                <TableCell>
                  Close
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
  {rejections
    .filter((rejection) => showOpenedRejections ? rejection.resolved === false | true : rejection.resolved === false)       
    .map((rejection) => (
      
      <TableRow hover key={rejection.id}>
        <TableCell>{rejection.orderID}</TableCell>
        <TableCell>
          {users.filter((item) => item.id === rejection.customerID)[0].data().first_name}
          {users.find(user => user.id === rejection.customerID)}
        </TableCell>
        <TableCell>
          {users.filter((item) => item.id === rejection.shopperID)[0].data().first_name}
        </TableCell>
        <TableCell>
          {rejection.resolved === '' ? (
            <Link href={url_path + rejection.orderID}>Chat</Link>
          ) : (
            // Render something else when openedID is null
            <Button
  
>
  open dispute
</Button>

            
          )}
        </TableCell>
        <TableCell>
          <Button onClick={() => { handleOpen(); setTemp_id(rejection.orderID); }}  style={{backgroundColor:'#FF6600', color:'white'}}>Close</Button>
          
        </TableCell>
        <TableCell>
          <SeverityPill color={statusMap['ongoing']}>
            {rejection.resolved?
            <>Resolved</>:
            <>UnResolved</>
          }
          </SeverityPill>
        </TableCell>
       
      </TableRow>
      
    ))}
</TableBody>
</Table>

        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
         
         <Modal
       open={open}
       onClose={handleClose}
       aria-labelledby="parent-modal-title"
       aria-describedby="parent-modal-description"
     >
       <Box sx={{ ...style, width: 400 }}>
 <h2 id="parent-modal-title">Are you sure you want to close dispute?</h2>
 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
   <div>
   
     <Button>
       No
     </Button>

   </div>
   <div>
   <Button onClick={() => closeResolution(temp_id)} style={{backgroundColor:'#FF6600', color:'white'}}>
           Yes
         </Button>
   </div>
 </div>

</Box>

     </Modal>

        
       </CardActions>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>


    </div>
    
  );
};

OverviewResolutions.prototype = {
  rejections: PropTypes.array,
  sx: PropTypes.object
};
