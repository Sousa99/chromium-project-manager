import * as React from 'react';

import SelectionContextProvider from './SelectionContext';
import NotificationContextProvider from './NotificationContext';
import FilterContextProvider from './FilterContext';
import DataContextProvider from './DataContext';

const ContextProviders = ({ children }: { children: React.ReactNode }) => {

  return (
    <NotificationContextProvider>
      <DataContextProvider>
        <FilterContextProvider>
          <SelectionContextProvider>
            { children }
          </SelectionContextProvider>
        </FilterContextProvider>
      </DataContextProvider>
    </NotificationContextProvider>
  )
}

export default ContextProviders;