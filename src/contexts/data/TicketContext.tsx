import React from "react";
import { v4 as uuidv4 } from "uuid";

import { IProjects } from "@models/data/IData";
import { ITicket } from "@models/ticket/ITicket";
import { Filter } from "@contexts/FilterContext";
import { DataContext } from "@contexts/data/DataContext";
import { getProjectIndex, getTicketIndex } from "@helpers/data-utils";

const deepcopy = require("deepcopy");

interface ITicketContext {
  getTicket: (
    project_id: string,
    ticket_id: string,
  ) => Omit<ITicket, "links"> | null;
  addTicket: (
    project_id: string,
    new_ticket_info: Omit<ITicket, "id" | "links">,
  ) => void;
  editTicket: (
    project_id: string,
    prev_ticket_id: string,
    new_ticket_info: Omit<ITicket, "links">,
  ) => void;
  removeTicket: (project_id: string, ticket_id: string) => void;
  getTicketLinks: (
    project_id: string,
    ticket_id: string,
    filter: Filter,
  ) => string[];
}

export const TicketContext = React.createContext<ITicketContext>({
  getTicket: () => null,
  addTicket: () => {},
  editTicket: () => {},
  removeTicket: () => {},
  getTicketLinks: () => [],
});

const TicketContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, setData } = React.useContext(DataContext);

  const getTicket = (project_id: string, ticket_id: string): ITicket => {
    let [project_index] = getProjectIndex(data, project_id);
    let [ticket_index] = getTicketIndex(data, project_index, ticket_id);
    return data[project_index].tickets[ticket_index];
  };

  const addTicket = (
    project_id: string,
    new_ticket_info: Omit<ITicket, "id" | "links">,
  ) => {
    setData((data) => {
      let new_data: IProjects = deepcopy(data);

      let [, project] = getProjectIndex(new_data, project_id);

      let new_ticket: ITicket = { id: uuidv4(), ...new_ticket_info, links: [] };
      project.tickets = [...project.tickets, new_ticket];

      return new_data;
    });
  };

  const editTicket = (
    project_id: string,
    prev_ticket_id: string,
    new_ticket_info: Omit<ITicket, "links">,
  ) => {
    setData((data) => {
      let new_data: IProjects = deepcopy(data);

      let [project_index, project] = getProjectIndex(new_data, project_id);
      let [ticket_index, curr_ticket] = getTicketIndex(
        new_data,
        project_index,
        prev_ticket_id,
      );

      project.tickets = [
        ...project.tickets.slice(0, ticket_index),
        { ...new_ticket_info, links: curr_ticket.links },
        ...project.tickets.slice(ticket_index + 1),
      ];
      new_data = [...new_data];

      return new_data;
    });
  };

  const removeTicket = (project_id: string, ticket_id: string) => {
    setData((data) => {
      let new_data: IProjects = deepcopy(data);

      let [project_index, project] = getProjectIndex(new_data, project_id);
      let [ticket_index] = getTicketIndex(new_data, project_index, ticket_id);

      project.tickets.splice(ticket_index, 1);
      return new_data;
    });
  };

  const getTicketLinks = React.useCallback(
    (project_id: string, ticket_id: string, filter: Filter) => {
      let [project_index] = getProjectIndex(data, project_id);
      let [, ticket] = getTicketIndex(data, project_index, ticket_id);

      return ticket.links.map((link) => link.id);
    },
    [data],
  );

  const TicketContextValue: ITicketContext = {
    getTicket: getTicket,
    addTicket: addTicket,
    editTicket: editTicket,
    removeTicket: removeTicket,
    getTicketLinks: getTicketLinks,
  };

  return (
    <TicketContext.Provider value={TicketContextValue}>
      {children}
    </TicketContext.Provider>
  );
};

export default TicketContextProvider;
