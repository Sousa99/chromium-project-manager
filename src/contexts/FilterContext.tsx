import * as React from "react";

export interface Filter {
  search_string: string;
  show_hidden: boolean;
}

interface IFilterContext {
  filter: Filter;
  setSearch: (value: string) => void;
  setVisibility: (value: boolean) => void;
}

export const FilterContext = React.createContext<IFilterContext>({
  filter: {
    search_string: "",
    show_hidden: false,
  },
  setSearch: () => {},
  setVisibility: () => {},
});

const FilterContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchString, setSearchString] = React.useState<string>("");
  const [showHidden, setShowHidden] = React.useState<boolean>(false);

  const filterContextValue = {
    filter: {
      search_string: searchString,
      show_hidden: showHidden,
    },
    setSearch: setSearchString,
    setVisibility: setShowHidden,
  };

  return (
    <FilterContext.Provider value={filterContextValue}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterContextProvider;
