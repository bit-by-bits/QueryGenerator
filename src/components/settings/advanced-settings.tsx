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
      <CardContent className="flex items-center justify-between">
        <div className="flex-col flex space-y-1 gap-1">
          <span className="text-sm font-medium">Current Theme</span>
          <span className="text-sm font-semibold text-primary">{theme}</span>
        </div>
        <div className="flex justify-center">
          <ThemeToggleButton setTheme={setTheme} />
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedSettings;
