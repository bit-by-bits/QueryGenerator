import { TableHead } from "../ui/table";

interface TableHeadersProps {
  columns: string[];
}

const columnHeaders: { [key: string]: string } = {
  "Patient ID": "ID",
  "Patient Name": "Name",
  Demographics: "Demographics",
  "Test Name": "Test Name",
  Details: "Details",
  Date: "Date",
  TestDetails: "Test Details"
};

const TableHeaders: React.FC<TableHeadersProps> = ({ columns }) => (
  <>
    {columns
      .filter(column => columnHeaders[column])
      .map(column => (
        <TableHead key={column}>{columnHeaders[column]}</TableHead>
      ))}
  </>
);

export default TableHeaders;
