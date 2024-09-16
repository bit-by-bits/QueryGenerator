import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import patients from "@/data/patients.json";
import FilterButton from "@/components/queries/filter-button";
import ExportButton from "@/components/queries/export-button";
import ModifyFiltersButton from "@/components/queries/modify-filters-button";
import TablePagination from "@/components/queries/table-pagination";
import { useFilters } from "@/context/FilterContext/FiltersContextUser";
import { filterColumns, filterPatients } from "@/components/queries/filters";

function Queries() {
  const { filters } = useFilters();
  const [currentPage, setCurrentPage] = useState(1);
  const [appliedFilters, setAppliedFilters] = useState<Set<string>>(
    new Set(["Demographics", "Details", "Date", "TestDetails"])
  );

  const filteredPatients = filterPatients(patients, filters);
  const filteredColumns = filterColumns(appliedFilters, filters);

  const paginatedPatients = filteredPatients.slice(
    (currentPage - 1) * 10,
    (currentPage - 1) * 10 + 10
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="grid flex-1 items-start gap-4 md:gap-8">
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
                {filteredColumns.includes("Patient ID") && (
                  <TableHead>ID</TableHead>
                )}
                {filteredColumns.includes("Patient Name") && (
                  <TableHead>Name</TableHead>
                )}
                {filteredColumns.includes("Demographics") && (
                  <TableHead>Demographics</TableHead>
                )}
                {filteredColumns.includes("Test Name") && (
                  <TableHead>Test Name</TableHead>
                )}
                {filteredColumns.includes("Details") && (
                  <TableHead>Details</TableHead>
                )}
                {filteredColumns.includes("Date") && (
                  <TableHead>Date</TableHead>
                )}
                {filteredColumns.includes("TestDetails") && (
                  <TableHead>Test Details</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedPatients.map(patient => (
                <TableRow key={patient["Patient ID"]}>
                  {filteredColumns.includes("Patient ID") && (
                    <TableCell>{patient["Patient ID"]}</TableCell>
                  )}
                  {filteredColumns.includes("Patient Name") && (
                    <TableCell className="font-medium">
                      {patient["Patient Name"]}
                    </TableCell>
                  )}
                  {filteredColumns.includes("Demographics") && (
                    <TableCell className="flex flex-col gap-1">
                      <span>{`Gender: ${patient["Patient Gender"]}`}</span>
                      <span>{`State: ${patient["Patient State"]}`}</span>
                    </TableCell>
                  )}
                  {filteredColumns.includes("Test Name") && (
                    <TableCell className="font-medium">
                      {patient["Test Name"]}
                    </TableCell>
                  )}
                  {filteredColumns.includes("Details") && (
                    <TableCell className="flex flex-col gap-1">
                      <span>{`Age: ${patient["Patient Age"]} yrs`}</span>
                      <span>{`Height: ${patient["Patient Height"]} m`}</span>
                      <span>{`Weight: ${patient["Patient Weight"]} kgs`}</span>
                    </TableCell>
                  )}
                  {filteredColumns.includes("Date") && (
                    <TableCell>{patient["Test Date"]}</TableCell>
                  )}
                  {filteredColumns.includes("TestDetails") && (
                    <TableCell className="flex flex-col gap-1">
                      <span>{`Value: ${patient["Test Value"]} ${patient["Test Unit"]}`}</span>
                      <span>{`Severity: ${patient["Severity"]}`}</span>
                      <span>{`Diagnosis: ${patient["Diagnosis"]}`}</span>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <TablePagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredPatients.length / 10)}
            handlePageChange={handlePageChange}
          />
        </CardFooter>
      </Card>
    </div>
  );
}

export default Queries;
