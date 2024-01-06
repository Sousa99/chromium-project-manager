import { v4 as uuidv4 } from 'uuid';

import { IProjects, IProjectsData } from "@models/data/IData";
import { IProject, IProjectData } from "@models/project/IProject";
import { ITicket, ITicketData } from "@models/ticket/ITicket";

export const convertDataToExport = (data: IProjects): IProjectsData => {

  const mapTicket = ({ id, ...ticket }: ITicket): ITicketData => ticket;
  const mapProject = ({id, ...project}: IProject): IProjectData => ({
    ...project,
    tickets: project.tickets.map((ticket) => mapTicket(ticket))
  });

  return data.map(mapProject);
}

export const convertDataToImport = (data: IProjectsData): IProjects => {

  const mapTicket = (ticket: ITicketData): ITicket => ({ ...ticket, id: uuidv4() });
  const mapProject = (project: IProjectData): IProject => ({
    ...project,
    id: uuidv4(),
    tickets: project.tickets.map(mapTicket)
  });

  return data.map(mapProject);
}