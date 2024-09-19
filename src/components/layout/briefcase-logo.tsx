import { URLs } from "@/routes";
import { BriefcaseMedical } from "lucide-react";
import { Link } from "react-router-dom";

const BriefcaseLogo: React.FC = () => (
  <Link
    to={URLs.app.filters}
    className="flex items-center gap-2 text-foreground font-semibold"
  >
    <BriefcaseMedical className="h-6 w-6" />
    <span className="sr-only">Query Generator</span>
  </Link>
);

export default BriefcaseLogo;
