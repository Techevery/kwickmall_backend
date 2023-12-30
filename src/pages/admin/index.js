import React, { useState, useEffect } from 'react';
import firebase_app from '@/firebase/config';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';

const db = getFirestore(firebase_app);

export default function Page() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userDoc = await getDoc(doc(db, 'user', 'DaqeAeH9QTVka77hitJ0VBQfhd92'));
        if (userDoc.exists()) {
          setUser(userDoc.data());
        } else {
          setError('User not found');
        }
      } catch (err) {
        setError('An error occurred while fetching user data');
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <div>Hello, {user.email}!</div>;
}
