import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import tests from "@/data/tests.json";
import genders from "@/data/genders.json";
import states from "@/data/states.json";
import FilterCard from "@/components/filters/filter-card";
import SelectField from "@/components/filters/select-field";
import MinMaxInput from "@/components/filters/min-max-input";
import DateInput from "@/components/filters/date-input";
import { useFilters } from "@/context/FilterContext/FiltersContextUser";
import { useNavigate } from "react-router-dom";
import { URLs } from "@/routes";

export const description =
  "Filters page for the Query Generator app. Allows users to set filters for generating queries.";

function Filters() {
  const navigate = useNavigate();
  const { filters, setFilter, resetFilters } = useFilters();

  const handleGenerateQuery = () => {
    console.log("Generating query with filters:", filters);
    navigate(URLs.queries);
  };

  const handleCopyApiUrl = () => {
    console.log("Copying API URL to clipboard");
  };

  return (
    <div className="mx-auto grid flex-1 auto-rows-max gap-4">
      <div className="flex items-center gap-4">
        <h1 className="flex-1 text-xl font-semibold tracking-tight">
          Query Filters
        </h1>
        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <Button variant="outline" size="sm" onClick={resetFilters}>
            Reset Filters
          </Button>
          <Button size="sm" onClick={handleGenerateQuery}>
            Generate Query
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
        <div className="grid auto-rows-max gap-4 lg:col-span-2 lg:gap-8">
          <FilterCard
            title="Test Name"
            description="Select the name of the test to filter the results."
          >
            <SelectField
              id="test-name"
              label="Test Name"
              placeholder="Select test name"
              options={tests}
              value={filters.testName}
              onChange={(value) => setFilter("testName", value)}
            />
          </FilterCard>

          <FilterCard
            title="Min-Max Parameters"
            description="Set the minimum and maximum values for the parameters."
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Param</TableHead>
                  <TableHead>Minimum</TableHead>
                  <TableHead>Maximum</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <MinMaxInput
                  label="Age"
                  idPrefix="age"
                  minValue={filters.minAge}
                  maxValue={filters.maxAge}
                  onMinChange={(value) => setFilter("minAge", value)}
                  onMaxChange={(value) => setFilter("maxAge", value)}
                />
                <MinMaxInput
                  label="Weight"
                  idPrefix="weight"
                  minValue={filters.minWeight}
                  maxValue={filters.maxWeight}
                  onMinChange={(value) => setFilter("minWeight", value)}
                  onMaxChange={(value) => setFilter("maxWeight", value)}
                />
                <MinMaxInput
                  label="Height"
                  idPrefix="height"
                  minValue={filters.minHeight}
                  maxValue={filters.maxHeight}
                  onMinChange={(value) => setFilter("minHeight", value)}
                  onMaxChange={(value) => setFilter("maxHeight", value)}
                />
              </TableBody>
            </Table>
          </FilterCard>

          <FilterCard
            title="Test Date"
            description="Select the date range when the test was conducted."
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <DateInput
                id="from"
                label="From Date"
                value={filters.fromDate}
                onChange={(value) => setFilter("fromDate", value)}
              />
              <DateInput
                id="to"
                label="To Date"
                value={filters.toDate}
                onChange={(value) => setFilter("toDate", value)}
              />
            </div>
          </FilterCard>
        </div>

        <div className="grid auto-rows-max gap-4 lg:gap-8">
          <FilterCard
            title="Patient Details"
            description="Enter the details of the patient who underwent the test."
          >
            <div className="flex flex-col gap-4">
              <SelectField
                id="gender"
                label="Gender"
                placeholder="Select gender"
                options={genders}
                value={filters.gender}
                onChange={(value) => setFilter("gender", value)}
              />
              <SelectField
                id="state"
                label="State/UT"
                placeholder="Select state"
                options={states}
                value={filters.state}
                onChange={(value) => setFilter("state", value)}
              />
            </div>
          </FilterCard>

          <FilterCard
            title="Generate API URL"
            description="Click the button below to generate the API URL for the selected filters."
          >
            <Button size="sm" onClick={handleCopyApiUrl}>
              Copy API URL
            </Button>
          </FilterCard>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 md:hidden">
        <Button variant="outline" size="sm" onClick={resetFilters}>
          Discard
        </Button>
        <Button size="sm" onClick={handleGenerateQuery}>
          Save Product
        </Button>
      </div>
    </div>
  );
}

export default Filters;
