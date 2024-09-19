import { Link, useLocation } from "react-router-dom";

interface NavLinkProps {
  path: string;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ path, label }) => {
  const { pathname } = useLocation();
  const isActive = pathname === path;
  const linkClass = `transition-colors ${
    isActive
      ? "text-foreground font-semibold"
      : "text-muted-foreground hover:text-foreground"
  }`;

  return (
    <Link to={path} className={linkClass}>
      {label}
    </Link>
  );
};

export default NavLink;
