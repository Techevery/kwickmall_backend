import React, { useState, useEffect } from 'react';
import firebase_app from '@/firebase/config';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const db = getFirestore(firebase_app);

export default function Page() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsersData() {
      try {
        const usersCollection = collection(db, 'user');
        const querySnapshot = await getDocs(usersCollection);
        const userData = [];
        querySnapshot.forEach((doc) => {
          userData.push(doc.data());
        });
        setUsers(userData);
      } catch (err) {
        setError('An error occurred while fetching user data');
      } finally {
        setLoading(false);
      }
    }

    fetchUsersData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>User List</h1>
      <ul>
      {users.map((user, index) => (
        <li key={index}>
          {user.email} {user.first_name} {user.shopper_profile ? 'Shopper' : 'Customer'}
          {user.shopper_profile && user.shopper_profile.accountNumber && ` (${user.shopper_profile.accountNumber})`}
        </li>
      ))}
    </ul>
    </div>
  );
}
