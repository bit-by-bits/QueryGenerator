import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DateInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const DateInput: React.FC<DateInputProps> = ({
  id,
  label,
  value,
  onChange,
}) => {
  return (
    <div className="grid gap-3">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default DateInput;
