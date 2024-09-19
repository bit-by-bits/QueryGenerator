import React from "react";
import {
  BarChart,
  XAxis,
  Bar,
  ReferenceLine,
  Label,
  Rectangle
} from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { Patient } from "@/context/FilterContext/FiltersContextProvider";
import { Separator } from "../ui/separator";

interface TopStatesCardProps {
  patients: Patient[];
}

const getSortedStates = (patients: Patient[]) => {
  const stateCounts = patients.reduce(
    (acc, patient) => {
      const state = patient["Patient State"];
      if (state) acc[state] = (acc[state] || 0) + 1;
      return acc;
    },
    {} as { [key: string]: number }
  );

  return Object.entries(stateCounts).sort((a, b) => b[1] - a[1]);
};

const TopStatesCard: React.FC<TopStatesCardProps> = ({ patients }) => {
  const states = getSortedStates(patients);
  const topStates = states
    .slice(0, 6)
    .map(([state, count]) => ({ state, count }));
  const patientsInTopStates = topStates.reduce(
    (sum, { count }) => sum + count,
    0
  );
  const totalPatients = states.reduce((sum, [, count]) => sum + count, 0);
  const avgPatientsPerState = (totalPatients / states.length).toFixed(2);

  return (
    <Card className="lg:max-w-md" x-chunk="charts-01-chunk-0">
      <CardHeader className="space-y-0 pb-2">
        <CardDescription>Top 6 States/UTs</CardDescription>
        <CardTitle className="text-4xl">
          {patientsInTopStates} of {totalPatients}
          <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground ml-1">
            patients live in these states
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer
          config={{
            steps: {
              label: "Steps",
              color: "hsl(var(--chart-1))"
            }
          }}
        >
          <BarChart
            accessibilityLayer
            data={topStates}
            margin={{ left: -4, right: -4 }}
          >
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={value => `State: ${value}`}
                  formatter={value => [`No. of Patients: ${value}`]}
                />
              }
            />
            <Bar
              dataKey="count"
              fill="var(--color-steps)"
              radius={5}
              fillOpacity={0.6}
              activeBar={<Rectangle fillOpacity={0.8} />}
            />
            <XAxis
              dataKey="state"
              tickLine={false}
              axisLine={false}
              tickMargin={4}
            />
            <ReferenceLine
              y={parseFloat(avgPatientsPerState)}
              stroke="hsl(var(--muted-foreground))"
              strokeDasharray="3 3"
              strokeWidth={1}
            >
              <Label
                offset={10}
                position="insideBottomLeft"
                value="Average Per State/UT"
                fill="hsl(var(--foreground))"
              />
              <Label
                position="insideTopLeft"
                value={avgPatientsPerState}
                fill="hsl(var(--foreground))"
                offset={10}
              />
            </ReferenceLine>
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex flex-row border-t p-4">
        <div className="flex w-full items-center gap-2">
          {topStates.slice(0, 3).map((state, index) => (
            <React.Fragment key={index}>
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-xs text-muted-foreground">
                  {state.state}
                </div>
                <div className="flex items-baseline text-2xl font-bold tabular-nums leading-none">
                  {state.count}
                  <span className="text-sm font-normal text-muted-foreground ml-1">
                    Patients
                  </span>
                </div>
              </div>
              {index < 2 && (
                <Separator orientation="vertical" className="mx-2 h-10 w-px" />
              )}
            </React.Fragment>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default TopStatesCard;
