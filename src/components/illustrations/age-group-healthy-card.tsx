import React from "react";
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Patient } from "@/context/FilterContext/FiltersContextProvider";

interface AgeGroupHealthyCardProps {
  patients: Patient[];
}

const getAgeGroupHealthyData = (data: Patient[]) => {
  const ageGroups = {
    young: { total: 0, healthy: 0 },
    middle: { total: 0, healthy: 0 },
    old: { total: 0, healthy: 0 }
  };

  data.forEach(patient => {
    const age = patient["Patient Age"];
    const isHealthy = !patient.Severity || patient.Severity === "Normal";

    if (age <= 28) {
      ageGroups.young.total += 1;
      if (isHealthy) ageGroups.young.healthy += 1;
    } else if (age <= 55) {
      ageGroups.middle.total += 1;
      if (isHealthy) ageGroups.middle.healthy += 1;
    } else {
      ageGroups.old.total += 1;
      if (isHealthy) ageGroups.old.healthy += 1;
    }
  });

  return {
    young: {
      total: ageGroups.young.total,
      healthy: ageGroups.young.healthy,
      value: (ageGroups.young.healthy / ageGroups.young.total) * 100 || 0,
      fill: "var(--color-young)"
    },
    middle: {
      total: ageGroups.middle.total,
      healthy: ageGroups.middle.healthy,
      value: (ageGroups.middle.healthy / ageGroups.middle.total) * 100 || 0,
      fill: "var(--color-middle)"
    },
    old: {
      total: ageGroups.old.total,
      healthy: ageGroups.old.healthy,
      value: (ageGroups.old.healthy / ageGroups.old.total) * 100 || 0,
      fill: "var(--color-old)"
    }
  };
};

const AgeGroupHealthyCard: React.FC<AgeGroupHealthyCardProps> = ({
  patients
}) => {
  const ageGroupData = getAgeGroupHealthyData(patients);

  return (
    <Card className="max-w-xs">
      <CardHeader className="p-4">
        <CardTitle>Health by Age Group</CardTitle>
        <CardDescription>
          Comparing the health of patients across different age groups.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-4 p-4">
        <div className="grid items-center gap-2">
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-sm text-muted-foreground">Young</div>
            <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
              {ageGroupData.young.healthy}/{ageGroupData.young.total}
              <span className="text-sm font-normal text-muted-foreground">
                healthy
              </span>
            </div>
          </div>
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-sm text-muted-foreground">Middle</div>
            <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
              {ageGroupData.middle.healthy}/{ageGroupData.middle.total}
              <span className="text-sm font-normal text-muted-foreground">
                healthy
              </span>
            </div>
          </div>
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-sm text-muted-foreground">Old</div>
            <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
              {ageGroupData.old.healthy}/{ageGroupData.old.total}
              <span className="text-sm font-normal text-muted-foreground">
                healthy
              </span>
            </div>
          </div>
        </div>
        <ChartContainer
          config={{
            young: {
              label: "Young",
              color: "hsl(var(--chart-1))"
            },
            middle: {
              label: "Middle",
              color: "hsl(var(--chart-2))"
            },
            old: {
              label: "Old",
              color: "hsl(var(--chart-3))"
            }
          }}
          className="mx-auto aspect-square w-full max-w-[80%]"
        >
          <RadialBarChart
            margin={{ left: -10, right: -10, top: -10, bottom: -10 }}
            data={[
              {
                activity: "young",
                value: ageGroupData.young.value,
                fill: ageGroupData.young.fill
              },
              {
                activity: "middle",
                value: ageGroupData.middle.value,
                fill: ageGroupData.middle.fill
              },
              {
                activity: "old",
                value: ageGroupData.old.value,
                fill: ageGroupData.old.fill
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
  );
};

export default AgeGroupHealthyCard;
