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
import FilterCard from "@/components/home/filter-card";
import SelectField from "@/components/home/select-field";
import MinMaxInput from "@/components/home/min-max-input";
import DateInput from "@/components/home/date-input";

export const description = "Home page for the Query Generator app.";

function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <main className="grid flex-1 items-start gap-4 md:gap-8">
        <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <div className="flex items-center gap-4">
            <h1 className="flex-1 text-xl font-semibold tracking-tight">
              Query Filters
            </h1>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button variant="outline" size="sm">
                Reset Filters
              </Button>
              <Button size="sm">Generate Query</Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max gap-4 lg:col-span-2 lg:gap-8">
              <FilterCard
                title="Test Name"
                description="Select the test for which you want to generate the query."
              >
                <SelectField
                  id="test-name"
                  label="Test Name"
                  placeholder="Select test name"
                  options={tests}
                />
              </FilterCard>

              <FilterCard
                title="Min-Max Parameters"
                description="Set the minimum and maximum values for the following parameters."
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
                      minDefault="18"
                      maxDefault="65"
                    />
                    <MinMaxInput
                      label="Weight"
                      idPrefix="weight"
                      minDefault="50"
                      maxDefault="120"
                    />
                    <MinMaxInput
                      label="Height"
                      idPrefix="height"
                      minDefault="150"
                      maxDefault="200"
                    />
                  </TableBody>
                </Table>
              </FilterCard>

              <FilterCard title="Test Date" description="Set the test date.">
                <div className="grid gap-6 sm:grid-cols-2">
                  <DateInput
                    id="from"
                    label="From Date"
                    defaultValue="2022-01-01"
                  />
                  <DateInput
                    id="to"
                    label="To Date"
                    defaultValue="2022-12-31"
                  />
                </div>
              </FilterCard>
            </div>

            <div className="grid auto-rows-max gap-4 lg:gap-8">
              <FilterCard
                title="Patient Details"
                description="Enter the details of the patient who underwent the test."
              >
                <SelectField
                  id="gender"
                  label="Gender"
                  placeholder="Select gender"
                  options={genders}
                />
                <SelectField
                  id="state"
                  label="State/UT"
                  placeholder="Select state"
                  options={states}
                />
              </FilterCard>

              <FilterCard
                title="Generate API URL"
                description="Click to copy the API URL to the clipboard."
              >
                <Button size="sm">Copy API URL</Button>
              </FilterCard>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 md:hidden">
            <Button variant="outline" size="sm">
              Discard
            </Button>
            <Button size="sm">Save Product</Button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
