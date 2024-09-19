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

const getMonthlyHealthyResults = (data: Patient[]) => {
  const healthyResults = data.filter(
    patient => !patient.Severity || patient.Severity === "Normal"
  );

  const resultsByMonth = healthyResults.reduce(
    (acc, patient) => {
      const month = new Date(patient["Test Date"]).toLocaleString("default", {
        month: "short"
      });
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    },
    {} as { [key: string]: number }
  );

  return Object.keys(resultsByMonth).map(month => ({
    key: month,
    count: resultsByMonth[month]
  }));
};

const getTestWiseHealthyResults = (data: Patient[]) => {
  const healthyResults = data.filter(
    patient => !patient.Severity || patient.Severity === "Normal"
  );

  const resultsByTest = healthyResults.reduce(
    (acc, patient) => {
      const test = patient["Test Name"];
      acc[test] = (acc[test] || 0) + 1;
      return acc;
    },
    {} as { [key: string]: number }
  );

  return Object.keys(resultsByTest).map(test => ({
    key: test,
    count: resultsByTest[test]
  }));
};

const HealthyResultsCard: React.FC<HealthyResultsCardProps> = ({
  patients,
  type
}) => {
  const data =
    type === "month"
      ? getMonthlyHealthyResults(patients)
      : getTestWiseHealthyResults(patients);

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
            patients: {
              label: "Patients",
              color: "hsl(var(--chart-5))"
            }
          }}
          className="ml-auto w-[64px]"
        >
          <BarChart
            accessibilityLayer
            margin={{
              left: 0,
              right: 0,
              top: 0,
              bottom: 0
            }}
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
