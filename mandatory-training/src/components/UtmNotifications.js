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

    const sortedNotifications = [...notifications].sort((a, b) =>
    new Date(b.submission_date) - new Date(a.submission_date)
  );

  const handleMarkAsRead = (id) => {
    const currentDate = new Date().toISOString(); // Get current date in ISO format
  
    fetch(`${fetchURL}/notifications/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        read_status: true,
        completion_date: currentDate,
        approval_date: currentDate, // Add approval_date
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(() => {
        setNotifications((prevNotifications) =>
          prevNotifications.map((notification) =>
            notification.id === id
              ? {
                  ...notification,
                  read_status: true,
                  completion_date: currentDate,
                  approval_date: currentDate, // Update approval_date
                }
              : notification
          )
        );
        console.log('Notification marked as read, completion date updated, and approval date updated');
      })
      .catch((error) => console.error('Error marking notification as read:', error));
  };

  

  const handleMarkAllAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      read_status: true,
    }));

    updateNotificationStatus(updatedNotifications);
  };

  const handleMarkAllAsUnread = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      read_status: false,
    }));

    updateNotificationStatus(updatedNotifications);
  };

  const handleMarkAsUnread = (id) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id ? { ...notification, read_status: false } : notification
    );

    updateNotificationStatus(updatedNotifications);
  };

  const updateNotificationStatus = (updatedNotifications) => {
    // Send update requests for each notification
    const updateRequests = updatedNotifications.map((notification) =>
      fetch(`${fetchURL}/notifications/${notification.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ read_status: notification.read_status }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    );

    // Wait for all update requests to complete
    Promise.all(updateRequests)
      .then(() => {
        setNotifications(updatedNotifications);
      })
      .catch((error) => console.error('Error updating notification status:', error));
  };


  const handleSendNotification = () => {
    return <UtmNotificationSend />;
  };

  return (
    <>
      {/* <button onClick={() => handleSendNotification('sendNotification')}>Notifications</button> */}
      <div className="notification-container">
        <div className="subheading">
          <h1>Notifications</h1>
        </div>
        <div className="notification-buttons">
          <button className="mark-all-read-button" onClick={handleMarkAllAsRead}>
            Mark All as Read
          </button>
          <button className="mark-all-unread-button" onClick={handleMarkAllAsUnread}>
            Mark All as Unread
          </button>
        </div>
        {sortedNotifications.map((notification) => (
          <div key={notification.id} className="notification-item">
            <p className="notification-comment">{notification.comment}</p>
            <p className="notification-training">{notification.training_name}</p>
            <p className="notification-date">Submission Date: {notification.submission_date}</p>
            <p className="notification-read">Read: {notification.read_status.toString()}</p>
            <button className="delete-button" onClick={() => handleDeleteNotification(notification.id)}>
              Delete
            </button>
            <button className="mark-as-read-button" onClick={() => handleMarkAsRead(notification.id)}>
              Mark as Read/Complete
            </button>
            <button className="mark-as-unread-button" onClick={() => handleMarkAsUnread(notification.id)}>
              Mark as Unread
            </button>
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