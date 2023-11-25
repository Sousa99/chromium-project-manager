import * as React from 'react';

import "./ProjectExplorer.scss";

import { ProjectItem } from "@organisms/project-item/ProjectItem";
import { DataContext } from '@contexts/DataContext';
import { FilterContext } from '@contexts/FilterContext';
import { ProjectButtonEnum, ProjectButtons } from '@molecules/project-buttons/ProjectButtons';
import { AddProjectDialog } from '@dialogs/add-dialog/AddProjectDialog';
import { NotificationContext } from '@contexts/NotificationContext';
import { IProject } from '@models/project/IProject';
import { ImportDataDialog } from '@dialogs/ImportDataDialog';
import { IData } from '@models/data/IData';

interface IProps {}

export const ProjectExplorer = (props: IProps): JSX.Element => {

  const [ dialogOpen, setDialogOpen ] = React.useState<Exclude<ProjectButtonEnum, ProjectButtonEnum.Download> | null>(null);

  const { getData, downloadData, uploadData, addProject } = React.useContext(DataContext);
  const { filter } = React.useContext(FilterContext);
  const { setNotification } = React.useContext(NotificationContext);

  const projects = getData(filter);

  const onClickProjectButtons = (project_button: ProjectButtonEnum | null) => {
    if (project_button !== ProjectButtonEnum.Download) {
      setDialogOpen(project_button);
      return;
    }

    download_data_action();
  }

  const import_data_action = (new_data_info: IData) => {
    setNotification('success', `Projects data imported successfully!`);
    uploadData(new_data_info);
    setDialogOpen(null);
  }

  const add_project_action = (new_project_info: IProject) => {
    setNotification('success', `Project added successfully!`);
    addProject(new_project_info);
    setDialogOpen(null);
  }

  const download_data_action = () => {
    setNotification('success', `Projects data downloaded successfully!`);
    downloadData();
  }
  
  return (
    <>
      <article className="project-explorer-component">
        { projects.map(project => (
          <ProjectItem
            key={project.code}
            project={project}
          />
        ))}
        <ProjectButtons onClick={onClickProjectButtons}/>
      </article>
      <ImportDataDialog
        open={dialogOpen === ProjectButtonEnum.Import}
        onSave={import_data_action}
        onCancel={() => setDialogOpen(null)}
      />
      <AddProjectDialog
        open={dialogOpen === ProjectButtonEnum.AddProject}
        onSave={add_project_action}
        onCancel={() => setDialogOpen(null)}
      />
    </>
  )  
}