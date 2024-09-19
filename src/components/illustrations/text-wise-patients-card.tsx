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

const getTestWisePatientData = (data: Patient[]) => {
  const testCounts = data.reduce(
    (acc, patient) => {
      const testName = patient["Test Name"];
      acc[testName] = (acc[testName] || 0) + 1;
      return acc;
    },
    {} as { [key: string]: number }
  );

  return Object.keys(testCounts).map(test => ({
    test,
    patients: testCounts[test]
  }));
};

const TestWisePatientsCard: React.FC<TestWisePatientsCardProps> = ({
  patients
}) => {
  const testWiseData = getTestWisePatientData(patients);
  const testWithHighestPatients = testWiseData.reduce(
    (acc, data) => (data.patients > acc.patients ? data : acc),
    {
      test: "",
      patients: 0
    }
  ).test;

  return (
    <Card className="max-w-xs" x-chunk="charts-01-chunk-8">
      <CardHeader className="space-y-0 pb-0">
        <CardDescription>
          Patients per{" "}
          <span className="font-semibold text-foreground">Test</span>
        </CardDescription>
        <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums flex-wrap">
          {testWithHighestPatients.split(" ").pop() === "Test"
            ? testWithHighestPatients.split(" ").slice(0, -1).join(" ")
            : testWithHighestPatients}
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
            <XAxis dataKey="test" hide />
            <YAxis domain={["dataMin - 5", "dataMax + 5"]} hide />
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
