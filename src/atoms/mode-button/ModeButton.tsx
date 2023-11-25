import * as React from 'react';

import { IconButton, Tooltip } from "@mui/material"
import LightbulbCircleIcon from '@mui/icons-material/LightbulbCircle';

import './ModeButton.scss';
import { NotificationContext } from "@contexts/NotificationContext";

interface IProps {
  mode_name: string,
  copy_code: string,
}

export const ModeButton = (props: IProps) => {
  const {
    mode_name,
    copy_code
  } = props;

  const { setNotification } = React.useContext(NotificationContext);

  const _button_click = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigator.clipboard.writeText(copy_code);
    setNotification('info', 'Code copied to clipboard!')
  }

  return (
    <Tooltip title={mode_name}>
      <IconButton
        className="mode-button"
        color='primary'
        onClick={_button_click}
      >
        <LightbulbCircleIcon/>
      </IconButton>
    </Tooltip>
  )
}