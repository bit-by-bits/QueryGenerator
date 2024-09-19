import React from "react";
import { LineChart, XAxis, YAxis, Line, CartesianGrid } from "recharts";
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

interface TopTestsCardProps {
  patients: Patient[];
}

const getTopTests = (data: Patient[]) => {
  const testCounts = data.reduce(
    (acc, patient) => {
      const test = patient["Test Name"];
      if (test) acc[test] = (acc[test] || 0) + 1;
      return acc;
    },
    {} as { [key: string]: number }
  );

  return Object.entries(testCounts).sort((a, b) => b[1] - a[1]);
};

const TopTestsCard: React.FC<TopTestsCardProps> = ({ patients }) => {
  const tests = getTopTests(patients);
  const topTests = tests.slice(0, 7).map(([test, count]) => ({ test, count }));
  const totalTestCount = tests.reduce((sum, [, count]) => sum + count, 0);

  return (
    <Card className="lg:max-w-md" x-chunk="charts-01-chunk-1">
      <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2 [&>div]:flex-1">
        <div>
          <CardDescription>Tests Done</CardDescription>
          <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
            {totalTestCount}
            <span className="text-sm font-normal tracking-normal text-muted-foreground">
              total
            </span>
          </CardTitle>
        </div>
        <div>
          <CardDescription>Test Types</CardDescription>
          <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
            {tests.length}
            <span className="text-sm font-normal tracking-normal text-muted-foreground">
              options
            </span>
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 items-center">
        <ChartContainer
          config={{
            testCount: {
              label: "Test Count",
              color: "hsl(var(--chart-3))"
            }
          }}
          className="w-full"
        >
          <LineChart
            accessibilityLayer
            margin={{ left: 14, right: 14, top: 10 }}
            data={topTests}
          >
            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="hsl(var(--muted-foreground))"
              strokeOpacity={0.5}
            />
            <YAxis hide domain={["dataMin - 2", "dataMax + 2"]} />
            <XAxis
              dataKey="test"
              axisLine={false}
              tickMargin={8}
              tickFormatter={value => `${value.slice(0, 2)}...`}
            />
            <Line
              dataKey="count"
              type="natural"
              stroke="var(--color-testCount)"
              strokeWidth={2}
              dot={false}
              activeDot={{
                fill: "var(--color-testCount)",
                stroke: "var(--color-testCount)",
                r: 4
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  indicator="line"
                  labelFormatter={value => `Test: ${value}`}
                />
              }
              cursor={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default TopTestsCard;
