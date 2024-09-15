import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TableCell, TableRow } from "@/components/ui/table";

interface MinMaxInputProps {
  label: string;
  idPrefix: string;
  minDefault: string;
  maxDefault: string;
}

function MinMaxInput({
  label,
  idPrefix,
  minDefault,
  maxDefault,
}: MinMaxInputProps) {
  return (
    <TableRow>
      <TableCell className="font-semibold">{label}</TableCell>
      <TableCell>
        <Label htmlFor={`min-${idPrefix}`} className="sr-only">
          Minimum {label}
        </Label>
        <Input id={`min-${idPrefix}`} type="number" defaultValue={minDefault} />
      </TableCell>
      <TableCell>
        <Label htmlFor={`max-${idPrefix}`} className="sr-only">
          Maximum {label}
        </Label>
        <Input id={`max-${idPrefix}`} type="number" defaultValue={maxDefault} />
      </TableCell>
    </TableRow>
  );
}

export default MinMaxInput;
