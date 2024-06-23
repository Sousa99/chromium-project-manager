import { v4 as uuidv4 } from "uuid";

import { IProjects, IProjectsData } from "@models/data/IData";
import { IProject, IProjectData } from "@models/project/IProject";
import { ITicket, ITicketData } from "@models/ticket/ITicket";
import { ITicketLink, ITicketLinkData } from "@models/ticket/ITicketLink";
import {
  DEFAULT_FEATURE_BRANCH_MODE,
  DEFAULT_PULL_REQUEST_MODE,
  DEFAULT_REPORT_MODE,
} from "@helpers/project-modes-helper";

export const convertDataToExport = (data: IProjects): IProjectsData => {
  const mapLink = ({ id, ...link }: ITicketLink): ITicketLinkData => link;

  const mapTicket = ({ id, ...ticket }: ITicket): ITicketData => ({
    ...ticket,
    links: ticket.links.map((link) => mapLink(link)),
  });

  const mapProject = ({ id, ...project }: IProject): IProjectData => ({
    ...project,
    tickets: project.tickets.map((ticket) => mapTicket(ticket)),
  });

  return data.map(mapProject);
};

export const convertDataToImport = (data: IProjectsData): IProjects => {
  const mapLink = (link: ITicketLinkData): ITicketLink => ({
    ...link,
    id: uuidv4(),
  });

  const mapTicket = (ticket: ITicketData): ITicket => ({
    ...ticket,
    id: uuidv4(),
    links: ticket.links.map(mapLink),
  });

  const mapProject = (project: IProjectData): IProject => ({
    ...project,
    id: uuidv4(),
    tickets: project.tickets.map(mapTicket),
    modes: project.modes || {
      feature_branch: DEFAULT_FEATURE_BRANCH_MODE,
      pull_request: DEFAULT_PULL_REQUEST_MODE,
      report: DEFAULT_REPORT_MODE,
    },
  });

  return data.map(mapProject);
};
