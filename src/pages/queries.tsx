import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import patients from "@/data/patients.json";
import FilterButton from "@/components/queries/filter-button";
import ExportButton from "@/components/queries/export-button";
import ModifyFiltersButton from "@/components/queries/modify-filters-button";
import TablePagination from "@/components/queries/table-pagination";

// Pagination constants
const ITEMS_PER_PAGE = 10;

function Queries() {
  const [appliedFilters, setAppliedFilters] = useState<Set<string>>(
    new Set(["Demographics", "Details", "Date", "TestDetails"]),
  );
  const [currentPage, setCurrentPage] = useState(1);

  const alwaysVisibleColumns = ["Patient ID", "Patient Name", "Test Name"];
  const columnFilters = {
    Demographics: appliedFilters.has("Demographics"),
    Details: appliedFilters.has("Details"),
    Date: appliedFilters.has("Date"),
    TestDetails: appliedFilters.has("TestDetails"),
  };

  const columnsToDisplay = [
    ...alwaysVisibleColumns,
    ...Object.keys(columnFilters).filter(
      (column) => columnFilters[column as keyof typeof columnFilters],
    ),
  ];

  const totalPages = Math.ceil(patients.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPatients = patients.slice(startIdx, startIdx + ITEMS_PER_PAGE);

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
                {columnsToDisplay.includes("Patient ID") && (
                  <TableHead>ID</TableHead>
                )}
                {columnsToDisplay.includes("Patient Name") && (
                  <TableHead>Name</TableHead>
                )}
                {columnsToDisplay.includes("Demographics") && (
                  <TableHead>Demographics</TableHead>
                )}
                {columnsToDisplay.includes("Test Name") && (
                  <TableHead>Test Name</TableHead>
                )}
                {columnsToDisplay.includes("Details") && (
                  <TableHead>Details</TableHead>
                )}
                {columnsToDisplay.includes("Date") && (
                  <TableHead>Date</TableHead>
                )}
                {columnsToDisplay.includes("TestDetails") && (
                  <TableHead>Test Details</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedPatients.map((patient) => (
                <TableRow key={patient["Patient ID"]}>
                  {columnsToDisplay.includes("Patient ID") && (
                    <TableCell>{patient["Patient ID"]}</TableCell>
                  )}
                  {columnsToDisplay.includes("Patient Name") && (
                    <TableCell className="font-medium">
                      {patient["Patient Name"]}
                    </TableCell>
                  )}
                  {columnsToDisplay.includes("Demographics") && (
                    <TableCell className="flex flex-col gap-1">
                      <span>{`Gender: ${patient["Patient Gender"]}`}</span>
                      <span>{`State: ${patient["Patient State"]}`}</span>
                    </TableCell>
                  )}
                  {columnsToDisplay.includes("Test Name") && (
                    <TableCell className="font-medium">
                      {patient["Test Name"]}
                    </TableCell>
                  )}
                  {columnsToDisplay.includes("Details") && (
                    <TableCell className="flex flex-col gap-1">
                      <span>{`Age: ${patient["Patient Age"]} yrs`}</span>
                      <span>{`Height: ${patient["Patient Height"]} m`}</span>
                      <span>{`Weight: ${patient["Patient Weight"]} kgs`}</span>
                    </TableCell>
                  )}
                  {columnsToDisplay.includes("Date") && (
                    <TableCell>{patient["Test Date"]}</TableCell>
                  )}
                  {columnsToDisplay.includes("TestDetails") && (
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
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </CardFooter>
      </Card>
    </div>
  );
}

export default Queries;
