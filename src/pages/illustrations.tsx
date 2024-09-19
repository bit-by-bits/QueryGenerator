import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";
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
import AgeGroupHealthyCard from "@/components/illustrations/age-group-healthy-card";

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
        <GenderDistributionCard patients={patients} />
        <HealthyResultsCard patients={patients} type="test" />
      </div>
      <div className="grid w-full flex-1 gap-6">
        <AgeGroupHealthyCard patients={patients} />
        <HealthyResultsCard patients={patients} type="month" />
        <MonthlyTestsCard patients={patients} />
      </div>
    </div>
  );
}

export default Illustrations;
