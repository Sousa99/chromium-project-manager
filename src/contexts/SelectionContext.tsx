import * as React from 'react';

interface Selection {
  project_id?: string,
  ticket_id?: string,
}

interface ISelectionContext {
  selection: Selection,
  toggleProject: (code: string) => void,
  toggleTicket: (code: string) => void,
}

export const SelectionContext = React.createContext<ISelectionContext>({
  selection: { project_id: undefined, },
  toggleProject: () => {},
  toggleTicket: () => {},
});

const SelectionContextProvider = ({ children }: { children: React.ReactNode }) => {

  const [selection, setSelection] = React.useState<Selection>({ project_id: undefined, ticket_id: undefined });

  const toggleProject = (project_id: string) => (
    setSelection(prev => {
      if (prev.project_id === project_id) {
        return {
          project_id: undefined,
          ticket_id: undefined,
        }
      }

      return {
        project_id: project_id,
        ticket_id: undefined,
      }
    })
  );

  const toggleTicket = (ticket_id: string) => (
    setSelection(prev => {
      if (prev.ticket_id === ticket_id) {
        return {
          project_id: prev.project_id,
          ticket_id: undefined,
        }
      }

      return {
        project_id: prev.project_id,
        ticket_id: ticket_id,
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