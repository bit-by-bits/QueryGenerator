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

const cardComponents = [
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
    <div className="chart-wrapper mx-auto flex flex-col flex-wrap items-start justify-center gap-6 sm:flex-row">
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
  );
};

export default Illustrations;
