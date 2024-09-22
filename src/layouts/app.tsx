import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Outlet } from "react-router-dom";
import UserDropdown from "@/components/layout/user-dropdown";
import { URLs } from "@/routes";
import NavLink from "@/components/layout/nav-link";
import BriefcaseLogo from "@/components/layout/briefcase-logo";
import SearchBar from "@/components/layout/search-bar";
import ThemeToggleButton from "@/components/settings/theme-toggle-button";
import { useTheme } from "@/context/ThemeContext/ThemeContextUser";

export const description =
  "Main layout for the Query Generator app. Includes navigation and common layout elements.";

const navLinks = [
  { path: URLs.app.filters, label: "Filters" },
  { path: URLs.app.queries, label: "Queries" },
  { path: URLs.app.illustrations, label: "Illustrations" },
  { path: URLs.api.inspect, label: "Inspect" }
];

const AppLayout = () => {
  const { setTheme } = useTheme();

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 max-w-screen items-center gap-4 border-b bg-background px-4 md:px-6 z-10">
        <nav className="hidden md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <BriefcaseLogo />
          {navLinks.map(({ path, label }) => (
            <NavLink key={path} path={path} label={label} />
          ))}
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <BriefcaseLogo />
              {navLinks.map(({ path, label }) => (
                <NavLink key={path} path={path} label={label} />
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <SearchBar
            placeholder="Search patients by name"
            className="sm:w-[300px] md:w-[200px] lg:w-[300px]"
          />
          <UserDropdown />
          <ThemeToggleButton setTheme={setTheme} />
        </div>
      </header>

      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="flex h-full w-full flex-col bg-muted/40">
          <div className="grid flex-1 items-start gap-4 md:gap-8 p-4 md:p-8 bg-background rounded-lg shadow-lg">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
