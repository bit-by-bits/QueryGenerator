import { Cog, File, ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import patients from "@/data/patients.json";

export const description =
  "An products dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. It displays a list of products in a table with actions.";

function Queries() {
  return (
    <div className="grid flex-1 items-start gap-4 md:gap-8">
      <div className="flex items-center">
        <div className="hidden items-center gap-2 md:ml-auto md:flex w-full">
          <h1 className="flex-1 text-xl font-semibold tracking-tight">
            Data Queries
          </h1>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Active
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export Data
              </span>
            </Button>
            <Button size="sm" className="gap-1">
              <Cog className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Modify Filters
              </span>
            </Button>
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
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Test</TableHead>
                <TableHead>Demographics</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient["Patient ID"]}>
                  <TableCell>{patient["Patient ID"]}</TableCell>
                  <TableCell className="font-medium">
                    {patient["Patient Name"]}
                  </TableCell>
                  <TableCell className="flex flex-col gap-1">
                    <span>{`Age: ${patient["Patient Age"]}`}</span>
                    <span>{`Height: ${patient["Patient Height"]}`}</span>
                    <span>{`Weight: ${patient["Patient Weight"]}`}</span>
                  </TableCell>
                  <TableCell className="font-medium">
                    {patient["Test Name"]}
                  </TableCell>
                  <TableCell className="flex flex-col gap-1">
                    <span>{`Gender: ${patient["Patient Gender"]}`}</span>
                    <span>{`State: ${patient["Patient State"]}`}</span>
                  </TableCell>
                  <TableCell>{patient["Test Date"]}</TableCell>
                  <TableCell className="flex flex-col gap-1">
                    <span>
                      {`Value: ${patient["Test Value"]} ${patient["Test Unit"]}`}
                    </span>
                    <span>{`Severity: ${patient["Severity"]}`}</span>
                    <span>{`Diagnosis: ${patient["Diagnosis"]}`}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>32</strong> products
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Queries;
