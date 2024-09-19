import { Patient } from "@/context/FilterContext/FiltersContextProvider";
import { TableCell } from "../ui/table";

interface TableCellsProps {
  columns: string[];
  patient: Patient;
}

const TableCells: React.FC<TableCellsProps> = ({ columns, patient }) => {
  const renderCellContent = (column: string) => {
    switch (column) {
      case "Patient ID":
        return patient["Patient ID"];
      case "Patient Name":
        return <span className="font-medium">{patient["Patient Name"]}</span>;
      case "Demographics":
        return (
          <div className="flex flex-col gap-1">
            <span>{`Gender: ${patient["Patient Gender"]}`}</span>
            <span>{`State: ${patient["Patient State"]}`}</span>
          </div>
        );
      case "Test Name":
        return <span className="font-medium">{patient["Test Name"]}</span>;
      case "Details":
        return (
          <div className="flex flex-col gap-1">
            <span>{`Age: ${patient["Patient Age"]} yrs`}</span>
            <span>{`Height: ${patient["Patient Height"]} m`}</span>
            <span>{`Weight: ${patient["Patient Weight"]} kgs`}</span>
          </div>
        );
      case "Date":
        return patient["Test Date"];
      case "TestDetails":
        return (
          <div className="flex flex-col gap-1">
            <span>{`Value: ${patient["Test Value"]} ${patient["Test Unit"]}`}</span>
            <span>{`Severity: ${patient["Severity"]}`}</span>
            <span>{`Diagnosis: ${patient["Diagnosis"]}`}</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {columns.map(column =>
        [
          "Patient ID",
          "Patient Name",
          "Demographics",
          "Test Name",
          "Details",
          "Date",
          "TestDetails"
        ].includes(column) ? (
          <TableCell
            key={column}
            className={
              column === "Patient Name" || column === "Test Name"
                ? "font-medium"
                : ""
            }
          >
            {renderCellContent(column)}
          </TableCell>
        ) : null
      )}
    </>
  );
};

export default TableCells;
