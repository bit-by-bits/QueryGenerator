import { createContext, useState, ReactNode } from "react";

interface Filters {
  testName: string;
  minAge: number;
  maxAge: number;
  minWeight: number;
  maxWeight: number;
  minHeight: number;
  maxHeight: number;
  fromDate: string;
  toDate: string;
  gender: string;
  state: string;
}

interface FiltersContextType {
  filters: Filters;
  setFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  resetFilters: () => void;
}

export const FiltersContext = createContext<FiltersContextType | undefined>(
  undefined,
);

export const FiltersProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<Filters>({
    testName: "",
    minAge: 18,
    maxAge: 65,
    minWeight: 50,
    maxWeight: 120,
    minHeight: 150,
    maxHeight: 200,
    fromDate: "2022-01-01",
    toDate: "2022-12-31",
    gender: "",
    state: "",
  });

  const setFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      testName: "",
      minAge: 18,
      maxAge: 65,
      minWeight: 50,
      maxWeight: 120,
      minHeight: 150,
      maxHeight: 200,
      fromDate: "2022-01-01",
      toDate: "2022-12-31",
      gender: "",
      state: "",
    });
  };

  return (
    <FiltersContext.Provider value={{ filters, setFilter, resetFilters }}>
      {children}
    </FiltersContext.Provider>
  );
};
