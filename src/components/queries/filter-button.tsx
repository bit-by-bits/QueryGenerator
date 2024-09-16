import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { ListFilter } from "lucide-react";

interface FilterButtonProps {
  onFilterChange: (filters: Set<string>) => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<Set<string>>(
    new Set(["Demographics", "Details", "Date", "TestDetails"])
  );

  const handleFilterChange = (filter: string, checked: boolean) => {
    setFilters(prevFilters => {
      const newFilters = new Set(prevFilters);
      if (checked) {
        newFilters.add(filter);
      } else {
        newFilters.delete(filter);
      }
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const filterOptions = [
    { label: "Demographics", value: "Demographics" },
    { label: "Details", value: "Details" },
    { label: "Test Date", value: "Date" },
    { label: "Test Details", value: "TestDetails" }
  ];

  return (
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
        <DropdownMenuLabel>Choose columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {filterOptions.map(({ label, value }) => (
          <DropdownMenuCheckboxItem
            key={value}
            checked={filters.has(value)}
            onCheckedChange={checked => handleFilterChange(value, checked)}
          >
            {label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterButton;
