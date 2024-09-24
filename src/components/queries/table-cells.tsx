import { Patient } from "@/context/FilterContext/FiltersContextProvider";
import { TableCell } from "../ui/table";

interface TableCellsProps {
  columns: string[];
  patient: Patient;
}

const TableCells: React.FC<TableCellsProps> = ({ columns, patient }) => {
  const renderCellContent = (column: string) => {
    const cellContentMap: {
      [key: string]: number | JSX.Element | string | null;
    } = {
      "Patient ID": patient["Patient ID"],
      "Patient Name": (
        <span className="font-medium">{patient["Patient Name"]}</span>
      ),
      Demographics: (
        <div className="flex flex-col gap-1">
          <span>{`Gender: ${patient["Patient Gender"]}`}</span>
          <span>{`State: ${patient["Patient State"]}`}</span>
        </div>
      ),
      "Test Name": <span>{patient["Test Name"]}</span>,
      Details: (
        <div className="flex flex-col gap-1">
          <span>{`Age: ${patient["Patient Age"]} yrs`}</span>
          <span>{`Height: ${patient["Patient Height"]} m`}</span>
          <span>{`Weight: ${patient["Patient Weight"]} kgs`}</span>
        </div>
      ),
      Date: patient["Test Date"],
      TestDetails: (
        <div className="flex flex-col gap-1">
          <span>{`Value: ${patient["Test Value"]} ${patient["Test Unit"]}`}</span>
          <span>{`Severity: ${patient["Severity"]}`}</span>
          <span>{`Diagnosis: ${patient["Diagnosis"]}`}</span>
        </div>
      )
    };

    return cellContentMap[column] || null;
  };

  return (
    <>
      {columns.map(
        column =>
          [
            "Patient ID",
            "Patient Name",
            "Demographics",
            "Test Name",
            "Details",
            "Date",
            "TestDetails"
          ].includes(column) && (
            <TableCell
              key={column}
              className={column === "Patient Name" ? "font-medium" : ""}
            >
              {renderCellContent(column)}
            </TableCell>
          )
      )}
    </>
  );
};

export default TableCells;
