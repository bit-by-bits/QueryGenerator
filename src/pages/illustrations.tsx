import {
  Bar,
  BarChart,
  LabelList,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  XAxis,
  YAxis
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import patients from "@/data/patients.json";
import TopStatesCard from "@/components/illustrations/top-states-card";
import TopTestsCard from "@/components/illustrations/top-tests-card";
import MonthlyTestsCard from "@/components/illustrations/monthly-tests-card";
import GenderDistributionCard from "@/components/illustrations/gender-distribution-card";
import HealthyResultsCard from "@/components/illustrations/healthy-results-card";
import TestWisePatientsCard from "@/components/illustrations/text-wise-patients-card";

export const description = "A collection of health charts.";

function Illustrations() {
  return (
    <div className="chart-wrapper mx-auto flex flex-col flex-wrap items-start justify-center gap-6 sm:flex-row">
      <div className="grid w-full gap-6 sm:grid-cols-2 lg:max-w-[22rem] lg:grid-cols-1 xl:max-w-[25rem]">
        <TopStatesCard patients={patients} />
        <TopTestsCard patients={patients} />
      </div>
      <div className="grid w-full flex-1 gap-6 lg:max-w-[20rem]">
        <TestWisePatientsCard patients={patients} />
        <Card className="max-w-xs" x-chunk="charts-01-chunk-2">
          <CardHeader>
            <CardTitle>Progress</CardTitle>
            <CardDescription>
              You're average more steps a day this year than last year.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid auto-rows-min gap-2">
              <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                12,453
                <span className="text-sm font-normal text-muted-foreground">
                  steps/day
                </span>
              </div>
              <ChartContainer
                config={{
                  steps: {
                    label: "Steps",
                    color: "hsl(var(--chart-1))"
                  }
                }}
                className="aspect-auto h-[32px] w-full"
              >
                <BarChart
                  accessibilityLayer
                  layout="vertical"
                  margin={{
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0
                  }}
                  data={[
                    {
                      date: "2024",
                      steps: 12435
                    }
                  ]}
                >
                  <Bar
                    dataKey="steps"
                    fill="var(--color-steps)"
                    radius={4}
                    barSize={32}
                  >
                    <LabelList
                      position="insideLeft"
                      dataKey="date"
                      offset={8}
                      fontSize={12}
                      fill="white"
                    />
                  </Bar>
                  <YAxis dataKey="date" type="category" tickCount={1} hide />
                  <XAxis dataKey="steps" type="number" hide />
                </BarChart>
              </ChartContainer>
            </div>
            <div className="grid auto-rows-min gap-2">
              <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                10,103
                <span className="text-sm font-normal text-muted-foreground">
                  steps/day
                </span>
              </div>
              <ChartContainer
                config={{
                  steps: {
                    label: "Steps",
                    color: "hsl(var(--muted))"
                  }
                }}
                className="aspect-auto h-[32px] w-full"
              >
                <BarChart
                  accessibilityLayer
                  layout="vertical"
                  margin={{
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0
                  }}
                  data={[
                    {
                      date: "2023",
                      steps: 10103
                    }
                  ]}
                >
                  <Bar
                    dataKey="steps"
                    fill="var(--color-steps)"
                    radius={4}
                    barSize={32}
                  >
                    <LabelList
                      position="insideLeft"
                      dataKey="date"
                      offset={8}
                      fontSize={12}
                      fill="hsl(var(--muted-foreground))"
                    />
                  </Bar>
                  <YAxis dataKey="date" type="category" tickCount={1} hide />
                  <XAxis dataKey="steps" type="number" hide />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        <HealthyResultsCard patients={patients} type="test" />
        <GenderDistributionCard patients={patients} />
      </div>
      <div className="grid w-full flex-1 gap-6">
        <Card className="max-w-xs" x-chunk="charts-01-chunk-5">
          <CardContent className="flex gap-4 p-4">
            <div className="grid items-center gap-2">
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-sm text-muted-foreground">Move</div>
                <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                  562/600
                  <span className="text-sm font-normal text-muted-foreground">
                    kcal
                  </span>
                </div>
              </div>
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-sm text-muted-foreground">Exercise</div>
                <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                  73/120
                  <span className="text-sm font-normal text-muted-foreground">
                    min
                  </span>
                </div>
              </div>
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-sm text-muted-foreground">Stand</div>
                <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                  8/12
                  <span className="text-sm font-normal text-muted-foreground">
                    hr
                  </span>
                </div>
              </div>
            </div>
            <ChartContainer
              config={{
                move: {
                  label: "Move",
                  color: "hsl(var(--chart-1))"
                },
                exercise: {
                  label: "Exercise",
                  color: "hsl(var(--chart-2))"
                },
                stand: {
                  label: "Stand",
                  color: "hsl(var(--chart-3))"
                }
              }}
              className="mx-auto aspect-square w-full max-w-[80%]"
            >
              <RadialBarChart
                margin={{
                  left: -10,
                  right: -10,
                  top: -10,
                  bottom: -10
                }}
                data={[
                  {
                    activity: "stand",
                    value: (8 / 12) * 100,
                    fill: "var(--color-stand)"
                  },
                  {
                    activity: "exercise",
                    value: (46 / 60) * 100,
                    fill: "var(--color-exercise)"
                  },
                  {
                    activity: "move",
                    value: (245 / 360) * 100,
                    fill: "var(--color-move)"
                  }
                ]}
                innerRadius="20%"
                barSize={24}
                startAngle={90}
                endAngle={450}
              >
                <PolarAngleAxis
                  type="number"
                  domain={[0, 100]}
                  dataKey="value"
                  tick={false}
                />
                <RadialBar dataKey="value" background cornerRadius={5} />
              </RadialBarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <HealthyResultsCard patients={patients} type="month" />
        <MonthlyTestsCard patients={patients} />
      </div>
    </div>
  );
}

export default Illustrations;
