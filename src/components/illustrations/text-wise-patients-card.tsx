import React from "react";
import { AreaChart, XAxis, YAxis, Area } from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { Patient } from "@/context/FilterContext/FiltersContextProvider";

interface TestWisePatientsCardProps {
  patients: Patient[];
}

interface TestWiseData {
  test: string;
  patients: number;
}

const getTestWisePatientData = (data: Patient[]): TestWiseData[] => {
  const testCounts = data.reduce(
    (acc, patient) => {
      const testName = patient["Test Name"];
      acc[testName] = (acc[testName] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return Object.entries(testCounts).map(([test, count]) => ({
    test,
    patients: count
  }));
};

const TestWisePatientsCard: React.FC<TestWisePatientsCardProps> = ({
  patients
}) => {
  const testWiseData = getTestWisePatientData(patients);

  const testWithHighestPatients = testWiseData.reduce((max, data) =>
    data.patients > max.patients ? data : max
  ).test;

  return (
    <Card className="max-w-xs" x-chunk="charts-01-chunk-8">
      <CardHeader className="space-y-0 pb-0">
        <CardDescription>
          Patients per{" "}
          <span className="font-semibold text-foreground">Test</span>
        </CardDescription>
        <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums flex-wrap">
          {testWithHighestPatients.split(" ").slice(0, -1).join(" ")}
          <span className="text-sm font-normal tracking-normal text-muted-foreground">
            Test has the highest patients
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer
          config={{
            patients: {
              label: "Patients",
              color: "hsl(var(--chart-2))"
            }
          }}
        >
          <AreaChart
            data={testWiseData}
            margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="fillTests" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-patients)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-patients)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <XAxis dataKey="test" hide />
            <YAxis domain={["dataMin - 5", "dataMax + 5"]} hide />
            <Area
              dataKey="patients"
              type="natural"
              fill="url(#fillTests)"
              fillOpacity={0.4}
              stroke="var(--color-patients)"
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={value => `Test: ${value}`}
                  formatter={value => [`Patients: ${value}`]}
                />
              }
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default TestWisePatientsCard;
