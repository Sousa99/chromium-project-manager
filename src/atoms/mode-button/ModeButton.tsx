import * as React from 'react';

import { IconButton, Tooltip } from "@mui/material"
import LightbulbCircleIcon from '@mui/icons-material/LightbulbCircle';

import './ModeButton.scss';
import { NotificationContext } from "@contexts/NotificationContext";
import { TicketInfo, generateModeCode } from '@helpers/project-modes-helper';

interface IProps {
  ticket_info: TicketInfo,
  mode_name: string,
  mode_format: string,
}

export const ModeButton = (props: IProps) => {
  const {
    ticket_info,
    mode_name,
    mode_format
  } = props;

  const { setNotification } = React.useContext(NotificationContext);
  const copyValue = generateModeCode(mode_format, ticket_info);

  const _button_click = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigator.clipboard.writeText(copyValue);
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