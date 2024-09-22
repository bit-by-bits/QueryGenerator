import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext/AuthContextUser";
import { URLs } from "@/routes";
import { Link, useNavigate } from "react-router-dom";

const UserDropdown: React.FC = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate(URLs.auth.login);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full p-0">
          {user?.picture ? (
            <img
              src={user.picture}
              alt="User Avatar"
              className="h-full w-full rounded-full"
            />
          ) : (
            <span className="h-5 w-5 rounded-full bg-gray-200"></span>
          )}
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          Hello <strong>{user?.name}</strong>!
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to={`${URLs.app.settings}?section=general`}>Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to={`${URLs.app.settings}?section=security`}>Security</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-red-500">
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
