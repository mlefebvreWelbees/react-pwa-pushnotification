import logo from './logo.svg';
import './App.css';
import { ToastContainer, Zoom } from "react-toastify";
import Notification from "./firebaseNotifications/Notification";
import { TokenProvider, useToken } from "./firebaseNotifications/firebase";
import { useEffect, useState } from 'react';

function App() {
  const { token } = useToken();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!('Notification' in window)) {
      setError('This browser does not support desktop notification');
    } else if (!('PushManager' in window)) {
      setError('This browser does not support push notifications');
    } else if (Notification.permission === 'denied') {
      setError('Notifications have been denied by the user');
    }
  }, []);

  const requestNotificationPermission = () => {
    window.Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      } else {
        console.log('Notification permission denied.');
      }
    }).catch(error => {
      console.error('Error requesting notification permission:', error);
    });
  };

  return (
    <div className="App">
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Zoom}
        closeButton={false}
      />
      <Notification />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {error ? <p>{error}</p> : token && <p>Current Token: {token}</p>}
        <button onClick={requestNotificationPermission}>Enable Notifications</button>
      </header>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <TokenProvider>
      <App />
    </TokenProvider>
  );
}
