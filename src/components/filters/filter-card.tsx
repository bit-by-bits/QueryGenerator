import { ReactNode, FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

interface FilterCardProps {
  title: string;
  description: string;
  children: ReactNode;
}

const FilterCard: FC<FilterCardProps> = ({ title, description, children }) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

export default FilterCard;
