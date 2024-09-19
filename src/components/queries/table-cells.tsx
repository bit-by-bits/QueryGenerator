import { Patient } from "@/context/FilterContext/FiltersContextProvider";
import { TableCell } from "../ui/table";

interface TableCellsProps {
  columns: string[];
  patient: Patient;
}

const TableCells: React.FC<TableCellsProps> = ({ columns, patient }) => (
  <>
    {columns.includes("Patient ID") && (
      <TableCell>{patient["Patient ID"]}</TableCell>
    )}
    {columns.includes("Patient Name") && (
      <TableCell className="font-medium">{patient["Patient Name"]}</TableCell>
    )}
    {columns.includes("Demographics") && (
      <TableCell className="flex flex-col gap-1">
        <span>{`Gender: ${patient["Patient Gender"]}`}</span>
        <span>{`State: ${patient["Patient State"]}`}</span>
      </TableCell>
    )}
    {columns.includes("Test Name") && (
      <TableCell className="font-medium">{patient["Test Name"]}</TableCell>
    )}
    {columns.includes("Details") && (
      <TableCell className="flex flex-col gap-1">
        <span>{`Age: ${patient["Patient Age"]} yrs`}</span>
        <span>{`Height: ${patient["Patient Height"]} m`}</span>
        <span>{`Weight: ${patient["Patient Weight"]} kgs`}</span>
      </TableCell>
    )}
    {columns.includes("Date") && <TableCell>{patient["Test Date"]}</TableCell>}
    {columns.includes("TestDetails") && (
      <TableCell className="flex flex-col gap-1">
        <span>{`Value: ${patient["Test Value"]} ${patient["Test Unit"]}`}</span>
        <span>{`Severity: ${patient["Severity"]}`}</span>
        <span>{`Diagnosis: ${patient["Diagnosis"]}`}</span>
      </TableCell>
    )}
  </>
);

export default TableCells;
