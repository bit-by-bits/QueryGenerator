import { Cog } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { URLs } from "@/routes";

const ModifyFiltersButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(URLs.filters);
  };

  return (
    <Button size="sm" className="gap-1" onClick={handleClick}>
      <Cog className="h-3.5 w-3.5" />
      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
        Modify Filters
      </span>
    </Button>
  );
};

export default ModifyFiltersButton;
