import { createContext, useState, ReactNode } from "react";

export interface Patient {
  "Patient ID": number;
  "Patient Name": string;
  "Patient Age": number;
  "Patient Gender": string;
  "Patient Height": number;
  "Patient Weight": number;
  "Patient State": string;
  "Test Name": string;
  "Test Value": number | string;
  "Test Unit": string;
  "Test Date": string;
  "Test Time": string;
  Severity: string;
  Diagnosis: string;
  Treatment: string;
}

export interface Filters {
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
  undefined
);

export const FiltersProvider = ({ children }: { children: ReactNode }) => {
  const defaultFilters: Filters = {
    testName: "",
    minAge: 18,
    maxAge: 65,
    minWeight: 50,
    maxWeight: 120,
    minHeight: 150,
    maxHeight: 200,
    fromDate: "2020-01-01",
    toDate: "2024-12-31",
    gender: "",
    state: ""
  };

  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const setFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [key]: value
    }));
  };

  const resetFilters = () => setFilters(defaultFilters);

  return (
    <FiltersContext.Provider value={{ filters, setFilter, resetFilters }}>
      {children}
    </FiltersContext.Provider>
  );
};
