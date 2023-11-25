import * as React from 'react';

import AdjustIcon from '@mui/icons-material/Adjust';

import { ActionButton } from "./ActionButton";

export interface IProps {
  item_key: string,
  onEdit: () => void
}

export const EditButton = (props: IProps) =>  {
  const {
    item_key,
    onEdit
  } = props;
  
  return (
    <ActionButton
      tooltip={`Edit ${item_key}`}
      icon={<AdjustIcon/>}
      color='warning'
      onClick={onEdit}
    />
  )
}