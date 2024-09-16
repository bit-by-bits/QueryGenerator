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

const MinMaxInput: React.FC<MinMaxInputProps> = ({
  label,
  idPrefix,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange
}) => {
  return (
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
          onChange={e => onMinChange(parseFloat(e.target.value))}
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
          onChange={e => onMaxChange(parseFloat(e.target.value))}
        />
      </TableCell>
    </TableRow>
  );
};

export default MinMaxInput;
