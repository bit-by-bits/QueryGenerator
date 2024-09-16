import { File } from "lucide-react";
import { Button } from "../ui/button";

const ExportButton: React.FC = () => (
  <Button size="sm" variant="outline" className="gap-1">
    <File className="h-3.5 w-3.5" />
    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
      Export Data
    </span>
  </Button>
);

export default ExportButton;
