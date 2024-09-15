import { BriefcaseMedical, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { UserDropdown } from "@/components/home/user-dropdown";
import { URLs } from "@/routes";

export const description =
  "Main layout for the Query Generator app. Includes navigation and common layout elements.";

const AppLayout = () => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 max-w-screen items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            to={URLs.home}
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <BriefcaseMedical className="h-6 w-6" />
            <span className="sr-only">Query Generator</span>
          </Link>
          <Link
            to={URLs.home}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>
          <Link
            to={URLs.inspect}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Inspect
          </Link>
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
              <Link
                to={URLs.home}
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <BriefcaseMedical className="h-6 w-6" />
                <span className="sr-only">Query Generator</span>
              </Link>
              <Link
                to={URLs.home}
                className="text-muted-foreground hover:text-foreground"
              >
                Home
              </Link>
              <Link
                to={URLs.inspect}
                className="text-muted-foreground hover:text-foreground"
              >
                Inspect
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for queries"
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
          <UserDropdown />
        </div>
      </header>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
