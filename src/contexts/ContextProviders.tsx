import * as React from "react";

import SelectionContextProvider from "./SelectionContext";
import NotificationContextProvider from "./NotificationContext";
import FilterContextProvider from "./FilterContext";
import DataContextProvider from "./data/DataContext";
import ProjectContextProvider from "./data/ProjectContext";
import TicketContextProvider from "./data/TicketContext";
import LinkContextProvider from "./data/LinkContext";

const ContextProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <NotificationContextProvider>
      <DataContextProvider>
        <ProjectContextProvider>
          <TicketContextProvider>
            <LinkContextProvider>
              <FilterContextProvider>
                <SelectionContextProvider>{children}</SelectionContextProvider>
              </FilterContextProvider>
            </LinkContextProvider>
          </TicketContextProvider>
        </ProjectContextProvider>
      </DataContextProvider>
    </NotificationContextProvider>
  );
};

export default ContextProviders;
