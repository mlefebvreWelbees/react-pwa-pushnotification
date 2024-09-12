import { createContext, useContext, useState } from 'react';

// Firebase Cloud Messaging Configuration File.
// Read more at https://firebase.google.com/docs/cloud-messaging/js/client && https://firebase.google.com/docs/cloud-messaging/js/receive

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const requestForToken = () => {
    return getToken(messaging, { vapidKey: `BM6Ur9NdYmVieYh2ERa-M7vsGF61ammZJiPyYNQUDLzpksNDPcCJzii88i2Ad5YlaNnarVT8Jy7F7rzQcqskiuE` })
      .then((currentToken) => {
        if (currentToken) {
          console.log('current token for client: ', currentToken);
          setToken(currentToken);
          if (localStorage.getItem('fcmToken') && currentToken !== localStorage.getItem('fcmToken')) {
            localStorage.setItem('fcmToken', currentToken);
          } else if (!localStorage.getItem('fcmToken')) {
            localStorage.setItem('fcmToken', currentToken);
          }
        } else {
          console.log('No registration token available. Request permission to generate one.');
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
  };

  return (
    <TokenContext.Provider value={{ token, requestForToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => useContext(TokenContext);

const firebaseConfig = {
    apiKey: "AIzaSyBVBMlvqDfgEnY17Sz5UFP4WiGU--btrX0",
    authDomain: "poc-notifs-fca78.firebaseapp.com",
    projectId: "poc-notifs-fca78",
    storageBucket: "poc-notifs-fca78.appspot.com",
    messagingSenderId: "160796377488",
    appId: "1:160796377488:web:5e35c0e51c357d3a1a7315"
  };

initializeApp(firebaseConfig);

const messaging = getMessaging();

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });


