import * as React from "react";

import { Alert, Stack } from "@mui/material";

import "./NotificationBlock.scss";

import { NotificationContext } from "@contexts/NotificationContext";

export const NotificationBlock = () => {
  const { notification } = React.useContext(NotificationContext);

  if (!notification) {
    return null;
  }
  return (
    <Stack className="notification-block-component">
      <Alert severity={notification.level}>{notification.message}</Alert>
    </Stack>
  );
};
