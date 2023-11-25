import * as React from 'react';

import { mock_info } from '@resources/mock-info';
import { Filter } from './FilterContext';
import { IData } from '@models/data/IData';
import { IProject } from '@models/project/IProject';
import { ITicketLink } from '@models/ticket/ITicketLink';
import { ITicket } from '@models/ticket/ITicket';
import { DataChecker } from '@models/checker';

const deepcopy = require('deepcopy');

const DATA_STORAGE_KEY: string = 'projectTicketManagerData';

interface IDataContext {
  getData: (filter: Filter) => IData,
  downloadData: () => void,
  uploadData: (new_data_info: IData) => void,
  // Change Projects Info
  removeProject: (project_code: string) => void,
  editProject: (prev_project_code: string, new_project_info: IProject) => void,
  addProject: (new_project_info: IProject) => void,
  removeTicket: (project_code: string, ticket_code: string) => void,
  editTicket: (project_code: string, prev_ticket_code: string, new_ticket_info: ITicket) => void,
  addTicket: (project_code: string, new_ticket_info: ITicket) => void,
  removeLink: (project_code: string, ticket_code: string, link_url: string) => void,
  editLink: (project_code: string, ticket_code: string, prev_link_url: string, new_link_info: ITicketLink) => void,
  addLink: (project_code: string, ticket_code: string, new_link_info: ITicketLink) => void,
}

export const DataContext = React.createContext<IDataContext>({
  getData: () => [],
  downloadData: () => {},
  uploadData: () => {},
  // Change Projects Info
  removeProject: () => {},
  editProject: () => {},
  addProject: () => {},
  removeTicket: () => {},
  editTicket: () => {},
  addTicket: () => {},
  removeLink: () => {},
  editLink: () => {},
  addLink: () => {},
});

const DataContextProvider = ({ children }: { children: React.ReactNode }) => {

  const [data, setData] = React.useState<IData>([]);
  const [loadedFromStorage, setLoadedFromStorage] = React.useState<boolean>(false);

  const filter_hidden = (filter: Filter, hidden_attr: boolean) => filter.show_hidden || !hidden_attr;
  const filter_search = (filter: Filter, search_attr: string[]) => {
    return search_attr.some((value) => {
      return value.toLowerCase().includes(filter.search_string.toLowerCase());
    });
  };

  // Load Data from Storage
  React.useEffect(() => {
    if (!chrome || !chrome.storage) {
      setLoadedFromStorage(true);
      return;
    }
    
    chrome.storage.local.get(DATA_STORAGE_KEY).then((loadedData) => {
      if (!loadedData[DATA_STORAGE_KEY]) {
        setLoadedFromStorage(true);
        return;
      }
      
      const projectLoadedData = loadedData[DATA_STORAGE_KEY];
      if (DataChecker.strictTest(projectLoadedData)) {
        setData(projectLoadedData);
        setLoadedFromStorage(true);
      }

      setLoadedFromStorage(true);
    });
  }, []);

  React.useEffect(() => {
    if (chrome && chrome.storage && loadedFromStorage) {
      chrome.storage.local.set({[DATA_STORAGE_KEY]: data});
    }
  }, [loadedFromStorage, data]);

  const getDataFiltered = React.useCallback((filter: Filter) => {
    // Respect Hidden
    let filtered_data: IData = deepcopy(data);
    filtered_data = filtered_data.filter((project) => filter_hidden(filter, project.hidden));
    filtered_data.forEach((project) => {
      project.tickets = project.tickets.filter((ticket) => filter_hidden(filter, ticket.hidden));
    });

    // Respect Search
    filtered_data.forEach((project) => {
      project.tickets = project.tickets.filter((ticket) => filter_search(filter, [ticket.code, ticket.name]));
    });

    return filtered_data;
  }, [data]);

  const downloadData = () => {
    const json = JSON.stringify(data, null, 2);
    const timestamp = new Date().toISOString();
    const filename = `projects-data - ${timestamp}.json`;

    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
  }

  const uploadData = (new_data_info: IData) => {
    setData(new_data_info);
  }

  const getProjectIndex = (data: IData, project_code: string): [number, IProject] => {
    let project_index = data.findIndex((project) => project.code === project_code);
    return [ project_index, data[project_index] ];
  }

  const getTicketIndex = (data: IData, project_index: number, ticket_code: string): [number, ITicket] => {
    let project_tickets = data[project_index].tickets;

    let ticket_index = project_tickets.findIndex((ticket) => ticket.code === ticket_code);
    return [ ticket_index, project_tickets[ticket_index] ];
  }

  const getLinkIndex = (data: IData, project_index: number, ticket_index: number, link_url: string): [number, ITicketLink] => {
    let project_tickets = data[project_index].tickets;
    let ticket_links = project_tickets[ticket_index].links;

    let link_index = ticket_links.findIndex((link) => link.url === link_url);
    return [ link_index, ticket_links[link_index] ];
  }

  const removeProject = (project_code: string) => {
    setData(data => {
      let new_data: IData = deepcopy(data);
      
      let [project_index] = getProjectIndex(new_data, project_code);

      new_data.splice(project_index, 1);
      return new_data;
    })
  }

  const editProject = (prev_project_code: string, new_project_info: IProject) => {
    setData(data => {
      let new_data: IData = deepcopy(data);
      
      let [project_index] = getProjectIndex(new_data, prev_project_code);

      new_data[project_index] = new_project_info;
      return new_data;
    })
  }

  const addProject = (new_project_info: IProject) => {
    setData(data => {
      let new_data: IData = deepcopy(data);

      new_data.push(new_project_info);
      return new_data;
    })
  }

  const removeTicket = (project_code: string, ticket_code: string) => {
    setData(data => {
      let new_data: IData = deepcopy(data);
      
      let [project_index, project] = getProjectIndex(new_data, project_code);
      let [ticket_index] = getTicketIndex(new_data, project_index, ticket_code);

      project.tickets.splice(ticket_index, 1);
      return new_data;
    })
  }

  const editTicket = (project_code: string, prev_ticket_code: string, new_ticket_info: ITicket) => {
    setData(data => {
      let new_data: IData = deepcopy(data);
      
      let [project_index, project] = getProjectIndex(new_data, project_code);
      let [ticket_index] = getTicketIndex(new_data, project_index, prev_ticket_code);

      project.tickets[ticket_index] = new_ticket_info;
      return new_data;
    })
  }

  const addTicket = (project_code: string, new_ticket_info: ITicket) => {
    setData(data => {
      let new_data: IData = deepcopy(data);
      
      let [, project] = getProjectIndex(new_data, project_code);

      project.tickets.push(new_ticket_info);
      return new_data;
    })
  }

  const removeLink = (project_code: string, ticket_code: string, link_url: string) => {
    setData(data => {
      let new_data: IData = deepcopy(data);
      
      let [project_index] = getProjectIndex(new_data, project_code);
      let [ticket_index, ticket] = getTicketIndex(new_data, project_index, ticket_code);
      let [link_index] = getLinkIndex(new_data, project_index, ticket_index, link_url);

      ticket.links.splice(link_index, 1);
      return new_data;
    })
  }

  const editLink = (project_code: string, ticket_code: string, prev_link_url: string, new_link_info: ITicketLink) => {
    setData(data => {
      let new_data: IData = deepcopy(data);
      
      let [project_index] = getProjectIndex(new_data, project_code);
      let [ticket_index, ticket] = getTicketIndex(new_data, project_index, ticket_code);
      let [link_index] = getLinkIndex(new_data, project_index, ticket_index, prev_link_url);

      ticket.links[link_index] = new_link_info;
      return new_data;
    })
  }

  const addLink = (project_code: string, ticket_code: string, new_link_info: ITicketLink) => {
    setData(data => {
      let new_data: IData = deepcopy(data);
      
      let [project_index] = getProjectIndex(new_data, project_code);
      let [, ticket] = getTicketIndex(new_data, project_index, ticket_code);

      ticket.links.push(new_link_info);
      return new_data;
    })
  }

  const dataContextValue = {
    getData: getDataFiltered,
    downloadData: downloadData,
    uploadData: uploadData,
    // Change Projects Info
    removeProject: removeProject,
    editProject: editProject,
    addProject: addProject,
    removeTicket: removeTicket,
    editTicket: editTicket,
    addTicket: addTicket,
    removeLink: removeLink,
    editLink: editLink,
    addLink: addLink
  }

  return (
    <DataContext.Provider value={dataContextValue}>
      { children }
    </DataContext.Provider>
  )
}

export default DataContextProvider;