import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useNotificationCenter } from 'react-toastify/addons/use-notification-center';

export default function UtmNotifications() {
  const [notification, setNotification] = useState([]);
  const { notifications, clear, markAllAsRead, markAsRead  } = useNotificationCenter();

  const showToast = () => {
    toast('Hello World', {
        data: {
            title: 'Hello World Again',
            text: 'We are here again with another article'
        }
    });
};

  return (
    <div>
            <p>{notifications.length}</p>
            <button onClick={showToast}>Click me</button>
            <ToastContainer />
    </div>
  )
}