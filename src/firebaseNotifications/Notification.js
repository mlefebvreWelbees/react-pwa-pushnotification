import React, {useState, useEffect} from 'react'
import {useToken, onMessageListener} from './firebase';
import {toast} from 'react-toastify';

const Notification = () => {
    const [notification, setNotification] = useState({title: '', body: ''});
    const {requestForToken} = useToken();
    const notify = () => toast(<ToastDisplay/>);

    function ToastDisplay() {
        return (
            <div>
                <p><b>{notification?.title}</b></p>
                <p>{notification?.body}</p>
            </div>
        );
    };

    useEffect(() => {
        if (notification?.title) {
            notify();
        }
    }, [notification]);

    useEffect(() => {
        requestForToken();

        onMessageListener()
            .then((payload) => {
                setNotification({title: payload?.notification?.title, body: payload?.notification?.body});
            })
            .catch((err) => console.log('failed: ', err));
    }, [requestForToken]);

    return null;
};

export default Notification;
