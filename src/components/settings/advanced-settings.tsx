import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { useTheme } from "@/context/ThemeContext/ThemeContextUser";
import ThemeToggleButton from "./theme-toggle-button";

const AdvancedSettings: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Advanced Settings</CardTitle>
        <CardDescription>Update your app preferences here.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-start">
            <span>Current Theme: {theme}</span>
            <ThemeToggleButton setTheme={setTheme} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedSettings;
