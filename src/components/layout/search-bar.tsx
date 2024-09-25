import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { URLs } from "@/routes";

interface SearchBarProps {
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchBy, setSearchBy] = useState<"name" | "id">("name");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== URLs.app.queries) {
      setSearchTerm("");
    }
  }, [location]);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();

    if (searchTerm.trim()) {
      const searchQuery = `${searchBy}=${encodeURIComponent(searchTerm)}`;
      navigate(`${URLs.app.queries}?${searchQuery}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />

        <Input
          type="search"
          placeholder={`Search patients by ${searchBy}`}
          className={`pl-10 pr-10 ${className}`}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-1.5 top-1.5 h-6 w-6 p-0"
              aria-label="Toggle search by name or ID"
            >
              {searchBy === "name" ? "N" : "ID"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSearchBy("name")}>
              Name
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSearchBy("id")}>
              ID No.
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </form>
  );
};

export default SearchBar;
