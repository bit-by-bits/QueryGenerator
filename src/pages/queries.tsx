import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Table, TableBody, TableHeader, TableRow } from "@/components/ui/table";
import patients from "@/data/patients.json";
import FilterButton from "@/components/queries/filter-button";
import ExportButton from "@/components/queries/export-button";
import ModifyFiltersButton from "@/components/queries/modify-filters-button";
import TablePagination from "@/components/queries/table-pagination";
import { useFilters } from "@/context/FilterContext/FiltersContextUser";
import { filterColumns, filterPatients } from "@/components/queries/filters";
import TableHeaders from "@/components/queries/table-headers";
import TableCells from "@/components/queries/table-cells";

export const description =
  "Queries page for the Query Generator app. Displays queried data based on the filters applied.";

const ITEMS_PER_PAGE = 10;

const Queries = () => {
  const { filters } = useFilters();
  const [currentPage, setCurrentPage] = useState(1);
  const [appliedFilters, setAppliedFilters] = useState<Set<string>>(
    new Set(["Demographics", "Details", "Date", "TestDetails"])
  );

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || "";

  const filteredPatients = filterPatients(
    patients.filter(patient =>
      patient["Patient Name"].toLowerCase().includes(searchQuery.toLowerCase())
    ),
    filters
  );

  const filteredColumns = filterColumns(appliedFilters, filters);

  const paginatedPatients = filteredPatients.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="grid flex-1 items-start gap-6">
      <div className="flex items-center">
        <div className="hidden items-center gap-2 md:ml-auto md:flex w-full">
          <h1 className="flex-1 text-xl font-semibold tracking-tight">
            Data Queries
          </h1>
          <div className="flex items-center gap-2">
            <FilterButton onFilterChange={setAppliedFilters} />
            <ExportButton />
            <ModifyFiltersButton />
          </div>
        </div>
      </div>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Query Results</CardTitle>
          <CardDescription>
            Queried data from the database based on the filters applied.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaders columns={filteredColumns} />
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedPatients.map(patient => (
                <TableRow key={patient["Patient ID"]}>
                  <TableCells columns={filteredColumns} patient={patient} />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <TablePagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredPatients.length / ITEMS_PER_PAGE)}
            handlePageChange={handlePageChange}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default Queries;
