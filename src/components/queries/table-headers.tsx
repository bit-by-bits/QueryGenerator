import { TableHead } from "../ui/table";

interface TableHeadersProps {
  columns: string[];
}

const TableHeaders: React.FC<TableHeadersProps> = ({ columns }) => (
  <>
    {columns.includes("Patient ID") && <TableHead>ID</TableHead>}
    {columns.includes("Patient Name") && <TableHead>Name</TableHead>}
    {columns.includes("Demographics") && <TableHead>Demographics</TableHead>}
    {columns.includes("Test Name") && <TableHead>Test Name</TableHead>}
    {columns.includes("Details") && <TableHead>Details</TableHead>}
    {columns.includes("Date") && <TableHead>Date</TableHead>}
    {columns.includes("TestDetails") && <TableHead>Test Details</TableHead>}
  </>
);

export default TableHeaders;
