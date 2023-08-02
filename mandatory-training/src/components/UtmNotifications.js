import '../stylesheets/UtmNotifications.css'
import { useEffect, useState } from "react";
import { fetchURL } from '../App'
import UtmNotificationSend from './UtmNotificationSend';
import { Route, Routes, Link} from 'react-router-dom';



export default function UtmNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch(`${fetchURL}/notifications`)
    .then(res => res.json())
    .then((data) => setNotifications(data))
    .catch((error) => console.error('Error fetching notifications:', error));
  }, [])
    console.log(notifications)

  const handleDeleteNotification = (id) => {
    fetch(`${fetchURL}/notifications/${id}`, {
       method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        setNotifications((prevNotifications) =>
          prevNotifications.filter((notification) => notification.id !== id)
        );
      })
      .catch((error) => console.error('Error deleting notification:', error));
    };

  const handleMarkAsRead = (id) => {
    fetch(`${fetchURL}/notifications/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ read_status: true }),
      headers: {
        'Content-Type': 'application/json',
       },
     })
      .then((res) => res.json())
      .then((data) => {
        setNotifications((prevNotifications) =>
          prevNotifications.map((notification) =>
            notification.id === id ? { ...notification, read_status: true } : notification
           )
        );
       })
      .catch((error) => console.error('Error marking notification as read:', error));
  };

  const handleSendNotification = () => {
    return <UtmNotificationSend />;
  };

    return (
      <>
        {/* <button onClick={() => handleSendNotification('sendNotification')}>Notifications</button> */}
      <div className = "notification-container">
      <div className='subheading'>
         <h1>Notifications</h1>
       </div>
        {notifications.map((notification) => (
          <div key ={notification.id} className="notification-item">
           <p className="notification-comment">{notification.comment}</p>
          <p className="notification-training">{notification.training_name}</p>
          <p className="notification-date">Submission Date: {notification.submission_date}</p>
          <p className="notification-read">Read: {notification.read_status.toString()}</p>
          <button className="delete-button" onClick={() => handleDeleteNotification(notification.id)}>Delete</button>
          <button className="mark-as-read-button" onClick={() => handleMarkAsRead(notification.id)}>Mark as Read</button>
          </div>
        ))}
      </div>
      </>
    );
  }

// const handleNotification = async () => {
  //   try {
  //     const response = await fetch(`${fetchURL}/notifications`);
  //     const data = await response.json();
  //     if (response.ok) {
  //       data.notifications.forEach((notification) => {
  //         toast.success(notification.comment, {
  //           data: {
  //             title: 'Training Completed',
  //             text: `Submission Date: ${notification.submission_date}`
  //           }
  //         });
  //       });
  //     } else {
  //       console.error('Error fetching notifications:', data.error);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching notifications:', error);
  //   }
  // };
//   const showToast = () => {
//     toast('Hello World', {
//         data: {
//             title: 'Hello World Again',
//             text: 'We are here again with another article'
//         }
//     });
// };