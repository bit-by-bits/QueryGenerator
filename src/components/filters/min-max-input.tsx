import { FC } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TableCell, TableRow } from "@/components/ui/table";

interface MinMaxInputProps {
  label: string;
  idPrefix: string;
  minValue: number;
  maxValue: number;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
}

const MinMaxInput: FC<MinMaxInputProps> = ({
  label,
  idPrefix,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange
}) => (
  <TableRow>
    <TableCell className="font-semibold">{label}</TableCell>
    <TableCell>
      <Label htmlFor={`min-${idPrefix}`} className="sr-only">
        Minimum {label}
      </Label>
      <Input
        id={`min-${idPrefix}`}
        type="number"
        value={minValue}
        min={0}
        max={200}
        onChange={e => {
          const value = parseFloat(e.target.value);
          if (value >= 0 && value <= 200) {
            onMinChange(value);
          }
        }}
      />
    </TableCell>
    <TableCell>
      <Label htmlFor={`max-${idPrefix}`} className="sr-only">
        Maximum {label}
      </Label>
      <Input
        id={`max-${idPrefix}`}
        type="number"
        value={maxValue}
        min={0}
        max={200}
        onChange={e => {
          const value = parseFloat(e.target.value);
          if (value >= 0 && value <= 200) {
            onMaxChange(value);
          }
        }}
      />
    </TableCell>
  </TableRow>
);

export default MinMaxInput;
