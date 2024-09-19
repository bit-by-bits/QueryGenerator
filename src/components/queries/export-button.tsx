import { useMemo } from "react";
import { File } from "lucide-react";
import { Button } from "../ui/button";
import { useFilters } from "@/context/FilterContext/FiltersContextUser";
import * as XLSX from "xlsx";
import { filterPatients } from "./filters";
import patients from "@/data/patients.json";

const ExportButton: React.FC = () => {
  const { filters } = useFilters();

  const filteredPatients = useMemo(
    () => filterPatients(patients, filters),
    [filters]
  );

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredPatients);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Filtered Data");

    XLSX.writeFile(workbook, "filtered_data.xlsx");
  };

  return (
    <Button
      size="sm"
      variant="outline"
      className="flex items-center gap-1"
      onClick={handleExport}
    >
      <File className="h-3.5 w-3.5" />
      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
        Export Data
      </span>
    </Button>
  );
};

export default ExportButton;
