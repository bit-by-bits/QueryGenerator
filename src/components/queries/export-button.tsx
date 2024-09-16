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
    const ws = XLSX.utils.json_to_sheet(filteredPatients);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Filtered Data");

    XLSX.writeFile(wb, "filtered_data.xlsx");
  };

  return (
    <Button
      size="sm"
      variant="outline"
      className="gap-1"
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
