import React from "react";
import { v4 as uuidv4 } from "uuid";

import { IProjects } from "@models/data/IData";
import { IProject } from "@models/project/IProject";
import { Filter } from "@contexts/FilterContext";
import { DataContext } from "@contexts/data/DataContext";
import { getProjectIndex } from "@helpers/data-utils";

const deepcopy = require("deepcopy");

interface IProjectContext {
  getProject: (project_id: string) => Omit<IProject, "tickets"> | null;
  addProject: (new_project_info: Omit<IProject, "id" | "tickets">) => void;
  editProject: (
    prev_project_id: string,
    new_project_info: Omit<IProject, "tickets">,
  ) => void;
  removeProject: (project_id: string) => void;
  getProjectTickets: (project_id: string, filter: Filter) => string[];
}

export const ProjectContext = React.createContext<IProjectContext>({
  getProject: () => null,
  addProject: () => {},
  editProject: () => {},
  removeProject: () => {},
  getProjectTickets: () => [],
});

const ProjectContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data, setData } = React.useContext(DataContext);

  const getProject = (project_id: string): IProject => {
    let [project_index] = getProjectIndex(data, project_id);
    return data[project_index];
  };

  const addProject = (new_project_info: Omit<IProject, "id" | "tickets">) => {
    setData((data) => {
      let new_data: IProjects = deepcopy(data);

      let new_project: IProject = {
        id: uuidv4(),
        ...new_project_info,
        tickets: [],
      };
      new_data.push(new_project);
      return new_data;
    });
  };

  const editProject = (
    prev_project_id: string,
    new_project_info: Omit<IProject, "tickets">,
  ) => {
    setData((data) => {
      let new_data: IProjects = deepcopy(data);

      let [project_index, curr_project] = getProjectIndex(
        new_data,
        prev_project_id,
      );

      new_data[project_index] = {
        ...new_project_info,
        tickets: curr_project.tickets,
      };
      return new_data;
    });
  };

  const removeProject = (project_id: string) => {
    setData((data) => {
      let new_data: IProjects = deepcopy(data);

      let [project_index] = getProjectIndex(new_data, project_id);

      new_data.splice(project_index, 1);
      return new_data;
    });
  };

  const filter_hidden = (filter: Filter, hidden_attr: boolean) =>
    filter.show_hidden || !hidden_attr;
  const filter_search = (filter: Filter, search_attr: string[]) => {
    return search_attr.some((value) => {
      return value.toLowerCase().includes(filter.search_string.toLowerCase());
    });
  };

  const getProjectTickets = React.useCallback(
    (project_id: string, filter: Filter) => {
      let [, project] = getProjectIndex(data, project_id);

      return project.tickets
        .filter((ticket) => filter_hidden(filter, ticket.hidden))
        .filter((ticket) => filter_search(filter, [ticket.code, ticket.name]))
        .map((ticket) => ticket.id);
    },
    [data],
  );

  const projectContextValue: IProjectContext = {
    getProject: getProject,
    addProject: addProject,
    editProject: editProject,
    removeProject: removeProject,
    getProjectTickets: getProjectTickets,
  };

  return (
    <ProjectContext.Provider value={projectContextValue}>
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContextProvider;
