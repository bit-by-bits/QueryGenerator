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

interface MonthlyTestsCardProps {
  patients: Patient[];
}

const getMonthlyTestData = (data: Patient[]) => {
  const monthlyCounts = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(0, i).toLocaleString("default", { month: "short" }),
    tests: 0
  }));

  data.forEach(patient => {
    const testDate = new Date(patient["Test Date"]);
    const month = testDate.getMonth();
    monthlyCounts[month].tests += 1;
  });

  return monthlyCounts;
};

const MonthlyTestsCard: React.FC<MonthlyTestsCardProps> = ({ patients }) => {
  const monthlyData = getMonthlyTestData(patients);
  const monthWithHighestTests = monthlyData.reduce(
    (acc, data) => (data.tests > acc.tests ? data : acc),
    { month: "", tests: 0 }
  ).month;

  return (
    <Card className="max-w-xs" x-chunk="charts-01-chunk-7">
      <CardHeader className="space-y-0 pb-0">
        <CardDescription>
          Tests Done{" "}
          <span className="font-semibold text-foreground">Monthly</span>
        </CardDescription>
        <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
          Highest
          <span className="text-sm font-normal tracking-normal text-muted-foreground">
            tests in {monthWithHighestTests}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer
          config={{
            tests: {
              label: "Tests",
              color: "hsl(var(--chart-2))"
            }
          }}
        >
          <AreaChart
            data={monthlyData}
            margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
          >
            <XAxis dataKey="month" hide />
            <YAxis domain={["dataMin - 5", "dataMax + 5"]} hide />
            <defs>
              <linearGradient id="fillTests" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-tests)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-tests)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="tests"
              type="natural"
              fill="url(#fillTests)"
              fillOpacity={0.4}
              stroke="var(--color-tests)"
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={value => `Month: ${value}`}
                  formatter={value => [`Tests: ${value}`]}
                />
              }
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default MonthlyTestsCard;
