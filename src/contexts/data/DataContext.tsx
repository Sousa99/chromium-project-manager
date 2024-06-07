import * as React from "react";

import { Filter } from "../FilterContext";
import { IProjects, IProjectsData } from "@models/data/IData";
import { DataChecker } from "@models/checker";
import {
  convertDataToExport,
  convertDataToImport,
} from "@mappers/ExporterImporter";

const DATA_STORAGE_KEY: string = "projectTicketManagerData";

interface IDataContext {
  data: IProjects;
  setData: React.Dispatch<React.SetStateAction<IProjects>>;
  downloadData: () => void;
  uploadData: (new_data_info: IProjectsData) => void;
  // Public access point for project data
  getProjects: (filter: Filter) => string[];
}

export const DataContext = React.createContext<IDataContext>({
  data: [],
  setData: () => {},
  downloadData: () => {},
  uploadData: () => {},
  // Public access point for project data
  getProjects: () => [],
});

const DataContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = React.useState<IProjects>([]);
  const [loadedFromStorage, setLoadedFromStorage] =
    React.useState<boolean>(false);

  const filter_hidden = (filter: Filter, hidden_attr: boolean) =>
    filter.show_hidden || !hidden_attr;

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
        const dataParsed = convertDataToImport(projectLoadedData);
        setData(dataParsed);
        setLoadedFromStorage(true);
      }

      setLoadedFromStorage(true);
    });
  }, []);

  React.useEffect(() => {
    if (chrome && chrome.storage && loadedFromStorage) {
      const dataToExport: IProjectsData = convertDataToExport(data);
      chrome.storage.local.set({ [DATA_STORAGE_KEY]: dataToExport });
    }
  }, [loadedFromStorage, data]);

  const downloadData = () => {
    const dataToExport: IProjectsData = convertDataToExport(data);

    const json = JSON.stringify(dataToExport, null, 2);
    const timestamp = new Date().toISOString();
    const filename = `projects-data - ${timestamp}.json`;

    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
  };

  const uploadData = (new_data_info: IProjectsData) => {
    const new_data = convertDataToImport(new_data_info);
    setData(new_data);
  };

  const getProjects = React.useCallback(
    (filter: Filter) =>
      data
        .filter((project) => filter_hidden(filter, project.hidden))
        .map((project) => project.id),
    [data],
  );

  const dataContextValue: IDataContext = {
    data: data,
    setData: setData,
    downloadData: downloadData,
    uploadData: uploadData,
    // Public access point for project data
    getProjects: getProjects,
  };

  return (
    <DataContext.Provider value={dataContextValue}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
