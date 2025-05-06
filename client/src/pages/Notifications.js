import React, { useEffect, useState } from 'react';
import { getNotifications } from '../api/notifications';

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getNotifications().then(data => setNotifications(data));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Notifications</h1>
      <ul>
        {notifications.map(note => (
          <li key={note._id}>{note.message}</li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;
