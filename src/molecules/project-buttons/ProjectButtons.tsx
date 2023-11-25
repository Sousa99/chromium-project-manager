import * as React from 'react';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import UploadIcon from '@mui/icons-material/Upload';
import DownloadIcon from '@mui/icons-material/Download';

import "./ProjectButtons.scss";

import { LineItemIconButton } from "@atoms/line-item-icon-button/LineItemIconButton";

export enum ProjectButtonEnum {
  Import,
  AddProject,
  Download
}

interface IProps {
  onClick: (action: ProjectButtonEnum) => void,
}

export const ProjectButtons = (props: IProps) => {
  const { onClick } = props;

  return (
    <div className='project-actions'>
      <LineItemIconButton
        tooltip='Import Projects Data'
        icon=<UploadIcon/>
        color="lowKey"
        button_function={() => onClick(ProjectButtonEnum.Import)}
      />
      <LineItemIconButton
        tooltip='Add Project'
        icon=<AddCircleIcon/>
        color="lowKey"
        button_function={() => onClick(ProjectButtonEnum.AddProject)}
      />
      <LineItemIconButton
        tooltip='Download Projects Data'
        icon=<DownloadIcon/>
        color="lowKey"
        button_function={() => onClick(ProjectButtonEnum.Download)}
      />
    </div>
  )
}