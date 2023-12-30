import React, { useState, useEffect } from 'react';
import {
    onAuthStateChanged,
    getAuth,
} from 'firebase/auth';
import firebase_app from '../firebase/config';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const auth = getAuth(firebase_app);
const db = getFirestore(firebase_app);

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState(null);
    const [usersData, setUsersData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                try {
                    const usersCollection = collection(db, 'user');
                    const querySnapshot = await getDocs(usersCollection);
                    const userData = [];
                    querySnapshot.forEach((doc) => {
                        userData.push(doc);
                    });
                    setUsers(userData);
                } catch (err) {
                    setError('An error occurred while fetching user data');
                }
            } else {
                setUser(null);
            }

            async function fetchUsersData() {
                try {
                  const usersCollection = collection(db, 'user');
                  const querySnapshot = await getDocs(usersCollection);
                  const userData = [];
                  querySnapshot.forEach((doc) => {
                    const user_data = doc.data();
                    user_data.id = doc.id; // Add the document ID to the order data
                    userData.push(user_data);
                  });

                  
                  setUsersData(userData);
                } catch (err) {
                  setError('An error occurred while fetching user data');
                } 
              }
              fetchUsersData();
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);
        
    return (
        <AuthContext.Provider value={{ user, users, usersData }}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
