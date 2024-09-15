import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DateInputFieldProps {
  id: string;
  label: string;
  defaultValue?: string;
}

function DateInput({ id, label, defaultValue }: DateInputFieldProps) {
  return (
    <div className="grid gap-3">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type="date" defaultValue={defaultValue} />
    </div>
  );
}

export default DateInput;
