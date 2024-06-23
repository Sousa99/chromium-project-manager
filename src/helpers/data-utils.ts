import { IProjects } from "@models/data/IData";
import { IProject } from "@models/project/IProject";
import { ITicket } from "@models/ticket/ITicket";
import { ITicketLink } from "@models/ticket/ITicketLink";

export const getProjectIndex = (
  data: IProjects,
  project_id: string,
): [number, IProject] => {
  let project_index = data.findIndex((project) => project.id === project_id);
  return [project_index, data[project_index]];
};

export const getTicketIndex = (
  data: IProjects,
  project_index: number,
  ticket_id: string,
): [number, ITicket] => {
  let project_tickets = data[project_index].tickets;

  let ticket_index = project_tickets.findIndex(
    (ticket) => ticket.id === ticket_id,
  );
  return [ticket_index, project_tickets[ticket_index]];
};

export const getLinkIndex = (
  data: IProjects,
  project_index: number,
  ticket_index: number,
  link_id: string,
): [number, ITicketLink] => {
  let project_tickets = data[project_index].tickets;
  let ticket_links = project_tickets[ticket_index].links;

  let link_index = ticket_links.findIndex((link) => link.id === link_id);
  return [link_index, ticket_links[link_index]];
};
