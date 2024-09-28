import AdvancedSettings from "@/components/settings/advanced-settings";
import GeneralSettings from "@/components/settings/general-settings";
import SecuritySettings from "@/components/settings/security-settings";
import { capitalizeWord } from "@/lib/utils";
import { useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";

export const description =
  "Settings page for the Query Generator app. Allows users to configure settings for the app.";

const sections = {
  GENERAL: "general",
  SECURITY: "security",
  ADVANCED: "advanced"
};

const Settings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sectionParam = searchParams.get("section");
  const navigate = useNavigate();

  useEffect(() => {
    if (!sectionParam) {
      navigate("");
    }
  }, [sectionParam, navigate]);

  const renderCards = () => {
    switch (sectionParam || sections.GENERAL) {
      case sections.GENERAL:
        return <GeneralSettings />;
      case sections.SECURITY:
        return <SecuritySettings />;
      case sections.ADVANCED:
        return <AdvancedSettings />;
      default:
        return null;
    }
  };

  const handleSectionChange = (section: string) => {
    setSearchParams(section === sections.GENERAL ? {} : { section });
  };

  const isActive = (section: string) =>
    sectionParam === section || (!sectionParam && section === sections.GENERAL);

  return (
    <div className="grid flex-1 auto-rows-max gap-6">
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">Settings</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav className="grid gap-4 text-sm text-muted-foreground">
          {Object.values(sections).map(section => (
            <Link
              key={section}
              to={`?section=${section}`}
              className={isActive(section) ? "text-primary font-semibold" : ""}
              onClick={() => handleSectionChange(section)}
            >
              {capitalizeWord(section)}
            </Link>
          ))}
        </nav>

        <div className="grid gap-6">{renderCards()}</div>
      </div>
    </div>
  );
};

export default Settings;
