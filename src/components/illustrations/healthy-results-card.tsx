import React from "react";
import { BarChart, Bar, XAxis, Rectangle } from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Patient } from "@/context/FilterContext/FiltersContextProvider";

interface HealthyResultsCardProps {
  patients: Patient[];
  type: "month" | "test";
}

interface ResultData {
  key: string;
  count: number;
}

const getHealthyResultsBy = (
  data: Patient[],
  by: "month" | "test"
): ResultData[] => {
  const healthyResults = data.filter(
    patient => !patient.Severity || patient.Severity === "Normal"
  );

  const resultsBy = healthyResults.reduce(
    (acc, patient) => {
      const key =
        by === "month"
          ? new Date(patient["Test Date"]).toLocaleString("default", {
              month: "short"
            })
          : patient["Test Name"];

      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    {} as { [key: string]: number }
  );

  return Object.entries(resultsBy).map(([key, count]) => ({ key, count }));
};

const HealthyResultsCard: React.FC<HealthyResultsCardProps> = ({
  patients,
  type
}) => {
  const data = getHealthyResultsBy(patients, type);

  const totalPatients = data.reduce((sum, d) => sum + d.count, 0);
  const lastCount = data[data.length - 1]?.count || 0;
  const patientLabel = lastCount === 1 ? "patient" : "patients";

  const title =
    type === "month"
      ? "Healthy Results (Monthly)"
      : "Healthy Results (Test-wise)";
  const description =
    type === "month"
      ? `No treatment required for ${totalPatients} patients this year.`
      : `No treatment required for ${totalPatients} patients across all tests.`;

  return (
    <Card className="max-w-xs" x-chunk="charts-01-chunk-6">
      <CardHeader className="p-4 pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-2">
        <div className="flex items-baseline gap-2 text-3xl font-bold tabular-nums leading-none">
          {lastCount}
          <span className="text-sm font-normal text-muted-foreground">
            {type === "month"
              ? `${patientLabel} this month`
              : `${patientLabel} in last test`}
          </span>
        </div>
        <ChartContainer
          config={{
            patients: { label: "Patients", color: "hsl(var(--chart-5))" }
          }}
          className="ml-auto w-[64px]"
        >
          <BarChart
            margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
            data={data}
          >
            <Bar
              dataKey="count"
              fill="var(--color-patients)"
              radius={2}
              fillOpacity={0.2}
              activeIndex={data.length - 1}
              activeBar={<Rectangle fillOpacity={0.8} />}
            />
            <XAxis
              dataKey="key"
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              hide
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default HealthyResultsCard;
