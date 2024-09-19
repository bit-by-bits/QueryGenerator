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

const getGenderDistribution = (patients: Patient[]) => {
  const genderCounts = patients.reduce(
    (acc, patient) => {
      const gender = patient["Patient Gender"];
      acc[gender] = (acc[gender] || 0) + 1;
      return acc;
    },
    { Male: 0, Female: 0, Other: 0 } as { [key: string]: number }
  );

  return Object.entries(genderCounts).map(([gender, count]) => ({
    gender,
    count
  }));
};

const GenderDistributionCard: React.FC<GenderDistributionCardProps> = ({
  patients
}) => {
  const genderData = getGenderDistribution(patients);
  const genderWithHighestCount = genderData.reduce((acc, data) =>
    data.count > acc.count ? data : acc
  ).gender;

  return (
    <Card className="lg:max-w-md" x-chunk="charts-01-chunk-4">
      <CardHeader className="space-y-0 pb-2">
        <CardDescription>Gender Distribution</CardDescription>
        <CardTitle className="text-4xl">
          {genderWithHighestCount}
          <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground ml-1">
            patients are more
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex gap-4 p-4 pb-2">
        <ChartContainer
          config={{
            male: {
              label: "Male",
              color: "hsl(var(--chart-1))"
            },
            female: {
              label: "Female",
              color: "hsl(var(--chart-2))"
            },
            other: {
              label: "Other",
              color: "hsl(var(--chart-3))"
            }
          }}
          className="h-[140px] w-full"
        >
          <BarChart
            margin={{
              left: 0,
              right: 0,
              top: 0,
              bottom: 10
            }}
            data={genderData.map(item => ({
              ...item,
              fill:
                item.gender === "Male"
                  ? "var(--color-male)"
                  : item.gender === "Female"
                    ? "var(--color-female)"
                    : "var(--color-other)"
            }))}
            layout="vertical"
            barSize={32}
            barGap={2}
          >
            <XAxis type="number" dataKey="count" hide />
            <YAxis
              dataKey="gender"
              type="category"
              tickLine={false}
              tickMargin={4}
              axisLine={false}
              className="capitalize"
            />
            <Bar dataKey="count" radius={5}>
              <LabelList
                position="insideLeft"
                dataKey="count"
                fill="white"
                offset={8}
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default GenderDistributionCard;
