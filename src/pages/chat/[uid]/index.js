'use client'
import React, { useEffect, useState } from 'react';
import { ref, uploadBytes, getDownloadURL, getStorage, child } from 'firebase/storage';
import Message from '../message';
import Head from 'next/head';
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Grid,
  Paper,
  IconButton
} from '@mui/material';

import { FaRegPaperPlane as SendIcon } from 'react-icons/fa';
import { MdAddAPhoto } from 'react-icons/md';
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from 'next/router';
import firebase_app from '@/firebase/config';

import { getFirestore, collection, doc, getDocs, getDoc, addDoc, orderBy, query, onSnapshot } from 'firebase/firestore';




const ChatUI = () => {
  
  const db = getFirestore(firebase_app);
  const storage = getStorage(firebase_app);

  const [messages, setMessages] = useState([]);
  const [buyerId, setBuyerID] = useState(null);
  const [buyerToken, setBuyerToken] = useState(null);
  const [sellerId, setSellerID] = useState(null);
  const [sellerToken, setSellerToken] = useState(null);
  const [input, setInput] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [counter, setCounter] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuthContext()
  const router = useRouter()
  const id = router.query.uid;
  const currentDate = new Date();
  console.log(currentDate);
  const timestamp = currentDate.getTime();
  console.log(timestamp)

  console.log(id)
  React.useEffect(() => {
    if (user == null) router.push("/auth/login")
    async function fetchChatData(chatId) {
      try {
        const chatRef = doc(db, 'chat', chatId);
        const chatSnapshot = await getDoc(chatRef);
        
        if (chatSnapshot.exists()) {
          const chatData = chatSnapshot.data();

         
          console.log(chatData);
          setBuyerID(chatData.customer_info)
          setSellerID(chatData.shopper_info)
          setBuyerToken(chatData.customer_info.notification_id)
          setSellerToken(chatData.shopper_info.notification_id)
          const messagesCollectionRef = collection(chatRef, 'messages');
          const messagesQuerySnapshot = await getDocs(query(messagesCollectionRef, orderBy('created_at', 'asc')));
          
          const messagesData = [];

      // Loop through the messages and append their data to the array
      messagesQuerySnapshot.forEach((messageDoc) => {
        const messageData = messageDoc.data();
        messagesData.push(messageData);

      });

      // Now messagesData contains an array of all the message data
      console.log(messagesData);
      setMessages(messagesData)
          
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
    
    
    fetchChatData(id);
    
}, [user])

  

  

async function addMessage(chatId, messageData) {
  try {
    // Reference to the "chat" document using the orderId
    const chatRef = doc(db, 'chat', chatId);

    // Reference to the "messages" collection inside the document
    const messagesCollectionRef = collection(chatRef, 'messages');

    // Create a new message document with the messageText
    const newMessageDocRef = await addDoc(messagesCollectionRef, {
      admin:true,
      content: messageData.message,
      created_at: messageData.timestamp,
      sender_id:null,
      attachment:messageData.attachment,
      order_id:null,
      order_message:null,
      system_message:false,
    });

    console.log('Message added with ID: ', newMessageDocRef.id);
  } catch (err) {
    console.error('Error adding message: ', err);
  }
}

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
console.log(buyerToken, sellerToken)



 useEffect(() => {
    const chatRef = doc(db, 'chat', id); // Replace with the actual chat ID

    // Reference to the "messages" collection inside the chat document
    const messagesCollectionRef = collection(chatRef, 'messages');

    // Create a query for ordering messages by 'created_at' in ascending order
    const messagesQuery = query(messagesCollectionRef, orderBy('created_at', 'asc'));

    // Set up a snapshot listener to listen for real-time changes to the messages collection
    const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
      const messagesData = [];

      // Loop through the messages and append their data to the array
      querySnapshot.forEach((messageDoc) => {
        const messageData = messageDoc.data();
        messagesData.push(messageData);
      });

      // Now messagesData contains an array of all the message data
      setMessages(messagesData);
    });

    return () => {
      // Unsubscribe from the snapshot listener when the component unmounts
      unsubscribe();
    };
  }, []);

  const handleSend = () => {
    if (input.trim() !== '') {
      // Send message through API

      // ...

      if (selectedImage) {
        uploadImage(); // Call the uploadImage function here
      } else{
      addMessage(id,{'message':input, "admin":true, timestamp:timestamp, attachment:[]} )
      
      
      }
      const sellerAlert = {
        to: sellerToken,
        notification: {
          title: 'Message from Admin',
          body: input + "",
        },
      };
      const buyerAlert = {
        to: buyerToken,
        notification: {
          title: 'Message from Admin',
          body: input + "",
        },
      };
      sendNotificationToFCM(sellerAlert);
      sendNotificationToFCM(buyerAlert);

      setInput('');

      
    }
  };

  const uploadImage = async () => {
    if (selectedImage) {
      try {
        // Create a reference to the image file within your desired storage path
        const fileRef = ref(storage, `post/${timestamp}-${selectedImage.name}`);
  
        // Upload the selected image to Firebase Storage
        await uploadBytes(fileRef, selectedImage);
  
        // Get the download URL of the uploaded image
        const downloadURL = await getDownloadURL(fileRef);
        console.log(downloadURL)  
        // Send the image URL as a message
        addMessage(id, {
          message: input,
          admin: true,
          timestamp: timestamp,
          attachment: [downloadURL], // Store the image URL in the 'attachment' field
          order_id: null,
          order_message: null,
          system_message: false,
        });
  
        // Clear the selected image after upload
        setSelectedImage(null);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };
  
  

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleGalleryUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const imageFile = e.target.files[0];
      setSelectedImage(imageFile);
      console.log("Selected image:", imageFile); // Add this line to check if the function is triggered and the image is selected
    }
  };
  
  
  

  // Function to handle image upload (you can customize this part)
 


  React.useEffect(() => {
    if (user == null) router.push("/")
}, [user])




  return (
    <>
    <Head>
      <title>
        Dispute Resolution
      </title>
    </Head>
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'whitesmoke',
      }}
    >
      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
        {messages.map((message) => (
          <Message key={message.id} message={message} seller={sellerId} buyer={buyerId} />
        ))}
      </Box>
      <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
        <Grid container spacing={2}>
        <Grid item xs={10}>
    <TextField
      size="small"
      fullWidth
      placeholder="Type a message"
      variant="outlined"
      value={input}
      onChange={handleInputChange}
    />
  </Grid>
          <Grid item xs={1}>
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handleGalleryUpload}
              id="image-upload-input"
            />
            <label htmlFor="image-upload-input">
              <IconButton color="primary" aria-label="upload picture" component="span">
                <MdAddAPhoto />
              </IconButton>
            </label>
          </Grid>
         

          <Grid item xs={1}>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              endIcon={<SendIcon />}
              onClick={handleSend}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
    </>
  );
};

export default ChatUI;


