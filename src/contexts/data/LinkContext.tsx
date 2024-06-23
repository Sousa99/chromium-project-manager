import React from "react";
import { v4 as uuidv4 } from "uuid";

import { IProjects } from "@models/data/IData";
import { ITicketLink } from "@models/ticket/ITicketLink";
import { DataContext } from "@contexts/data/DataContext";
import {
  getProjectIndex,
  getTicketIndex,
  getLinkIndex,
} from "@helpers/data-utils";

const deepcopy = require("deepcopy");

interface ILinkContext {
  getLink: (
    project_id: string,
    ticket_id: string,
    link_id: string,
  ) => ITicketLink | null;
  addLink: (
    project_id: string,
    ticket_id: string,
    new_link_info: Omit<ITicketLink, "id">,
  ) => void;
  editLink: (
    project_id: string,
    ticket_id: string,
    prev_link_id: string,
    new_link_info: ITicketLink,
  ) => void;
  removeLink: (project_id: string, ticket_id: string, link_id: string) => void;
}

export const LinkContext = React.createContext<ILinkContext>({
  getLink: () => null,
  addLink: () => {},
  editLink: () => {},
  removeLink: () => {},
});

const LinkContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, setData } = React.useContext(DataContext);

  const getLink = (
    project_id: string,
    ticket_id: string,
    link_id: string,
  ): ITicketLink => {
    let [project_index] = getProjectIndex(data, project_id);
    let [ticket_index] = getTicketIndex(data, project_index, ticket_id);
    let [link_index] = getLinkIndex(data, project_index, ticket_index, link_id);
    return data[project_index].tickets[ticket_index].links[link_index] || null;
  };

  const addLink = (
    project_id: string,
    ticket_id: string,
    new_link_info: Omit<ITicketLink, "id">,
  ) => {
    setData((data) => {
      let new_data: IProjects = deepcopy(data);

      let [project_index] = getProjectIndex(new_data, project_id);
      let [, ticket] = getTicketIndex(new_data, project_index, ticket_id);

      let new_link: ITicketLink = { id: uuidv4(), ...new_link_info };
      ticket.links = [...ticket.links, new_link];

      return new_data;
    });
  };

  const editLink = (
    project_id: string,
    ticket_id: string,
    prev_link_id: string,
    new_link_info: ITicketLink,
  ) => {
    setData((data) => {
      let new_data: IProjects = deepcopy(data);

      let [project_index] = getProjectIndex(new_data, project_id);
      let [ticket_index, ticket] = getTicketIndex(
        new_data,
        project_index,
        ticket_id,
      );
      let [link_index] = getLinkIndex(
        new_data,
        project_index,
        ticket_index,
        prev_link_id,
      );

      ticket.links[link_index] = new_link_info;
      return new_data;
    });
  };

  const removeLink = (
    project_id: string,
    ticket_id: string,
    link_id: string,
  ) => {
    setData((data) => {
      let new_data: IProjects = deepcopy(data);

      let [project_index] = getProjectIndex(new_data, project_id);
      let [ticket_index, ticket] = getTicketIndex(
        new_data,
        project_index,
        ticket_id,
      );
      let [link_index] = getLinkIndex(
        new_data,
        project_index,
        ticket_index,
        link_id,
      );

      ticket.links.splice(link_index, 1);
      return new_data;
    });
  };

  const LinkContextValue: ILinkContext = {
    getLink: getLink,
    addLink: addLink,
    editLink: editLink,
    removeLink: removeLink,
  };

  return (
    <LinkContext.Provider value={LinkContextValue}>
      {children}
    </LinkContext.Provider>
  );
};

export default LinkContextProvider;
