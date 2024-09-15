import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import tests from "@/data/tests.json";
import genders from "@/data/genders.json";
import states from "@/data/states.json";

export const description =
  "Home page for the Query Generator app. Includes a welcome message and other content.";

function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <main className="grid flex-1 items-start gap-4 md:gap-8">
        <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <div className="flex items-center gap-4">
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
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
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card x-chunk="dashboard-07-chunk-0">
                <CardHeader>
                  <CardTitle>Test Name</CardTitle>
                  <CardDescription>
                    Select the test for which you want to generate the query.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Select>
                        <SelectTrigger
                          id="test-name"
                          aria-label="Select test name"
                        >
                          <SelectValue placeholder="Select test name" />
                        </SelectTrigger>
                        <SelectContent>
                          {tests.map((test) => (
                            <SelectItem key={test} value={test}>
                              {test}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-07-chunk-1">
                <CardHeader>
                  <CardTitle>Min-Max Parameters</CardTitle>
                  <CardDescription>
                    Set the minimum and maximum values for the following
                    parameters.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Param</TableHead>
                        <TableHead>Minimum</TableHead>
                        <TableHead>Maximum</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-semibold">Age</TableCell>
                        <TableCell>
                          <Label htmlFor="min-age" className="sr-only">
                            Minimum Age
                          </Label>
                          <Input id="min-age" type="number" defaultValue="18" />
                        </TableCell>
                        <TableCell>
                          <Label htmlFor="max-age" className="sr-only">
                            {" "}
                            Maximum Age
                          </Label>
                          <Input id="max-age" type="number" defaultValue="65" />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-semibold">Weight</TableCell>
                        <TableCell>
                          <Label htmlFor="min-weight" className="sr-only">
                            Minimum Weight
                          </Label>
                          <Input
                            id="min-weight"
                            type="number"
                            defaultValue="50"
                          />
                        </TableCell>
                        <TableCell>
                          <Label htmlFor="max-weight" className="sr-only">
                            Maximum Weight
                          </Label>
                          <Input
                            id="max-weight"
                            type="number"
                            defaultValue="120"
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-semibold">Height</TableCell>
                        <TableCell>
                          <Label htmlFor="min-height" className="sr-only">
                            Minimum Height
                          </Label>
                          <Input
                            id="min-height"
                            type="number"
                            defaultValue="150"
                          />
                        </TableCell>
                        <TableCell>
                          <Label htmlFor="max-height" className="sr-only">
                            Maximum Height
                          </Label>
                          <Input
                            id="max-height"
                            type="number"
                            defaultValue="200"
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-07-chunk-2">
                <CardHeader>
                  <CardTitle>Test Date</CardTitle>
                  <CardDescription>
                    Set the date when this test was conducted.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="grid gap-3">
                      <Label htmlFor="from">From Date</Label>
                      <Input id="from" type="date" defaultValue="2022-01-01" />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="to">To Date</Label>
                      <Input id="to" type="date" defaultValue="2022-12-31" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              <Card x-chunk="dashboard-07-chunk-3">
                <CardHeader>
                  <CardTitle>Patient Details</CardTitle>
                  <CardDescription>
                    Enter the details of the patient who underwent the test.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="gender">Gender</Label>
                      <Select>
                        <SelectTrigger id="gender" aria-label="Select gender">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          {genders.map((gender) => (
                            <SelectItem key={gender} value={gender}>
                              {gender}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="state">State/UT</Label>
                      <Select>
                        <SelectTrigger id="state" aria-label="Select state">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-07-chunk-4">
                <CardHeader>
                  <CardTitle>
                    Generate API URL
                  </CardTitle>
                  <CardDescription>
                    Click the button below to copy the API URL to the clipboard.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button size="sm">
                    Copy API URL
                  </Button>
                </CardContent>
              </Card>
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
