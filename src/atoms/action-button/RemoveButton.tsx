import * as React from 'react';

import CancelIcon from '@mui/icons-material/Cancel';

import { ActionButton } from "./ActionButton";

export interface IProps {
  item_key: string,
  onRemove: () => void
}

export const RemoveButton = (props: IProps) =>  {
  const {
    item_key,
    onRemove
  } = props;
  
  return (
    <ActionButton
      tooltip={`Remove ${item_key}`}
      icon={<CancelIcon/>}
      color='error'
      onClick={onRemove}
    />
  )
}