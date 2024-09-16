import { Cog } from "lucide-react";
import { Button } from "../ui/button";

const ModifyFiltersButton: React.FC = () => (
  <Button size="sm" className="gap-1">
    <Cog className="h-3.5 w-3.5" />
    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
      Modify Filters
    </span>
  </Button>
);

export default ModifyFiltersButton;
