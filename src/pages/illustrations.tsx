import patients from "@/data/patients.json";
import TopStatesCard from "@/components/illustrations/top-states-card";
import TopTestsCard from "@/components/illustrations/top-tests-card";
import MonthlyTestsCard from "@/components/illustrations/monthly-tests-card";
import GenderDistributionCard from "@/components/illustrations/gender-distribution-card";
import HealthyResultsCard from "@/components/illustrations/healthy-results-card";
import AgeGroupHealthyCard from "@/components/illustrations/age-group-healthy-card";
import TestWisePatientsCard from "@/components/illustrations/text-wise-patients-card";

export const description =
  "Illustrations page for the Query Generator app. Displays a collection of charts related to patient data.";

const cardComponents: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: React.FC<any>;
  key: string;
  props?: Record<string, unknown>;
}[] = [
  { Component: TopStatesCard, key: "top-states" },
  { Component: TopTestsCard, key: "top-tests" },
  { Component: TestWisePatientsCard, key: "test-wise" },
  { Component: GenderDistributionCard, key: "gender-distribution" },
  {
    Component: HealthyResultsCard,
    key: "healthy-results-test",
    props: { type: "test" }
  },
  {
    Component: HealthyResultsCard,
    key: "healthy-results-month",
    props: { type: "month" }
  },
  { Component: AgeGroupHealthyCard, key: "age-group-healthy" },
  { Component: MonthlyTestsCard, key: "monthly-tests" }
];

const Illustrations = () => {
  return (
    <div className="grid flex-1 items-start gap-6">
      <div className="flex items-center">
        <div className="hidden items-center gap-2 md:ml-auto md:flex w-full">
          <h1 className="flex-1 text-xl font-semibold tracking-tight">
            Illustration Charts
          </h1>
          <div className="flex items-center gap-2"></div>
        </div>
      </div>
      <div className="chart-wrapper flex flex-col flex-wrap items-start justify-center gap-6 sm:flex-row">
        <div className="grid w-full gap-6 sm:grid-cols-2 lg:max-w-[22rem] lg:grid-cols-1 xl:max-w-[25rem]">
          {cardComponents.slice(0, 2).map(({ Component, key, props }) => (
            <Component key={key} patients={patients} {...props} />
          ))}
        </div>
        <div className="grid w-full flex-1 gap-6 lg:max-w-[20rem]">
          {cardComponents.slice(2, 5).map(({ Component, key, props }) => (
            <Component key={key} patients={patients} {...props} />
          ))}
        </div>
        <div className="grid w-full flex-1 gap-6">
          {cardComponents.slice(5).map(({ Component, key, props }) => (
            <Component key={key} patients={patients} {...props} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Illustrations;
