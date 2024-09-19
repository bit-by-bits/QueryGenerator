import React from "react";
import { BarChart, XAxis, YAxis, Bar, LabelList } from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Patient } from "@/context/FilterContext/FiltersContextProvider";

interface GenderDistributionCardProps {
  patients: Patient[];
}

interface GenderCounts {
  [key: string]: { total: number; healthy: number };
}

const getGenderDistribution = (
  patients: Patient[]
): Array<{
  gender: string;
  total: number;
  healthy: number;
  percentageHealthy: number;
}> => {
  const genderCounts: GenderCounts = patients.reduce((acc, patient) => {
    const gender = patient["Patient Gender"];
    const isHealthy = patient.Severity === "Normal" || !patient.Severity;

    if (!acc[gender]) {
      acc[gender] = { total: 0, healthy: 0 };
    }

    acc[gender].total += 1;
    if (isHealthy) acc[gender].healthy += 1;

    return acc;
  }, {} as GenderCounts);

  return Object.entries(genderCounts).map(([gender, { total, healthy }]) => ({
    gender,
    total,
    healthy,
    percentageHealthy: total ? (healthy / total) * 100 : 0
  }));
};

const GenderDistributionCard: React.FC<GenderDistributionCardProps> = ({
  patients
}) => {
  const genderData = getGenderDistribution(patients);
  const genderWithHighestCount = genderData.reduce(
    (max, data) => (data.total > max.total ? data : max),
    genderData[0]
  ).gender;

  return (
    <Card className="max-w-xs">
      <CardHeader>
        <CardTitle>Gender Distribution</CardTitle>
        <CardDescription>
          {genderWithHighestCount} patients are the most common
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {genderData.map(({ gender, percentageHealthy, healthy, total }) => {
          const color = `hsl(var(--chart-${gender === "Male" ? 1 : gender === "Female" ? 2 : 3}))`;

          return (
            <div key={gender} className="grid auto-rows-min gap-2">
              <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                {`${percentageHealthy.toFixed(1)}%`}
                <span className="text-sm font-normal text-muted-foreground">
                  {` ${gender.toLowerCase()}s are healthy`}
                </span>
              </div>
              <ChartContainer
                config={{ [gender.toLowerCase()]: { label: gender, color } }}
                className="aspect-auto h-[32px] w-full"
              >
                <BarChart
                  layout="vertical"
                  margin={{ left: 0, top: 0, right: 0, bottom: 0 }}
                  data={[{ gender, percentageHealthy, healthy }]}
                >
                  <Bar
                    dataKey="percentageHealthy"
                    fill={color}
                    radius={4}
                    barSize={32}
                  >
                    <LabelList
                      position="insideLeft"
                      dataKey="healthy"
                      offset={8}
                      fontSize={12}
                      fill="white"
                      formatter={(value: number) =>
                        `${value} out of ${total} patients`
                      }
                    />
                  </Bar>
                  <YAxis dataKey="gender" type="category" tickCount={1} hide />
                  <XAxis dataKey="percentageHealthy" type="number" hide />
                </BarChart>
              </ChartContainer>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default GenderDistributionCard;
