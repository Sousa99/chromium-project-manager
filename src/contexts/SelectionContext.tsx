import * as React from 'react';

interface Selection {
  project_code?: string,
  ticket_code?: string,
}

interface ISelectionContext {
  selection: Selection,
  toggleProject: (code: string) => void,
  toggleTicket: (code: string) => void,
}

export const SelectionContext = React.createContext<ISelectionContext>({
  selection: { project_code: undefined, },
  toggleProject: () => {},
  toggleTicket: () => {},
});

const SelectionContextProvider = ({ children }: { children: React.ReactNode }) => {

  const [selection, setSelection] = React.useState<Selection>({ project_code: undefined, ticket_code: undefined });

  const toggleProject = (project_code: string) => (
    setSelection(prev => {
      if (prev.project_code === project_code) {
        return {
          project_code: undefined,
          ticket_code: undefined,
        }
      }

      return {
        project_code: project_code,
        ticket_code: undefined,
      }
    })
  );

  const toggleTicket = (ticket_code: string) => (
    setSelection(prev => {
      if (prev.ticket_code === ticket_code) {
        return {
          project_code: prev.project_code,
          ticket_code: undefined,
        }
      }

      return {
        project_code: prev.project_code,
        ticket_code: ticket_code,
      }
    })
  );

  const selectionContextValue = {
    selection: selection,
    toggleProject: toggleProject,
    toggleTicket: toggleTicket,
  };

  return (
    <SelectionContext.Provider value={selectionContextValue}>
      { children }
    </SelectionContext.Provider>
  )
}

export default SelectionContextProvider;