import * as React from 'react';

import { v4 as uuidv4 } from 'uuid';
import { AlertColor } from "@mui/material/Alert/Alert";

const NOTIFICATION_TIMEOUT_MS = 10500;

interface Notification {
  id: string,
  level: AlertColor,
  message: string,
}

interface INotificationContext {
  notification: Notification | null,
  setNotification: (level: AlertColor, message: string) => void
}

export const NotificationContext = React.createContext<INotificationContext>({
  notification: null,
  setNotification: () => {},
});

const NotificationContextProvider = ({ children }: { children: React.ReactNode }) => {

  const [notification, setNotification] = React.useState<Notification | null>(null);
  const setNotificationCustom = (level: AlertColor, message: string) => {

    const id_notification: string = uuidv4();
    const new_notification: Notification = {
      id: id_notification,
      level: level,
      message: message,
    };

    setNotification(new_notification);
    setTimeout(() => {
      setNotification(notification => {
      if (notification && notification.id === new_notification.id) {
        return null;
      } else {
        return notification;
      }
      });
    }, NOTIFICATION_TIMEOUT_MS)
  };

  const notificationContextValue = {
    notification: notification,
    setNotification: setNotificationCustom,
  };

  return (
    <NotificationContext.Provider value={notificationContextValue}>
      { children }
    </NotificationContext.Provider>
  )
}

export default NotificationContextProvider;