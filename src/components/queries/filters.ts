import {
  Filters,
  Patient
} from "@/context/FilterContext/FiltersContextProvider";

const filterPatients = (patients: Patient[], filters: Filters) => {
  return patients.filter(patient => {
    const patientAge = patient["Patient Age"];
    const patientWeight = patient["Patient Weight"];
    const patientHeight = patient["Patient Height"];
    const testDate = new Date(patient["Test Date"]);

    const from = new Date(filters.fromDate);
    const to = new Date(filters.toDate);

    return (
      (!filters.testName || patient["Test Name"].includes(filters.testName)) &&
      filters.minAge <= patientAge &&
      patientAge <= filters.maxAge &&
      filters.minWeight <= patientWeight &&
      patientWeight <= filters.maxWeight &&
      filters.minHeight <= patientHeight &&
      patientHeight <= filters.maxHeight &&
      from <= testDate &&
      testDate <= to &&
      (!filters.gender || patient["Patient Gender"] === filters.gender) &&
      (!filters.state || patient["Patient State"] === filters.state)
    );
  });
};

const filterColumns = (appliedFilters: Set<string>, filters: Filters) => {
  const alwaysVisibleColumns = ["Patient ID", "Patient Name", "Test Name"];
  const columnFilters = {
    Demographics: true,
    Details:
      filters.minAge ||
      filters.maxAge ||
      filters.minWeight ||
      filters.maxWeight ||
      filters.minHeight ||
      filters.maxHeight,
    Date: filters.fromDate || filters.toDate,
    TestDetails: true
  };

  const finalColumnFilters = {
    Demographics:
      columnFilters.Demographics && appliedFilters.has("Demographics"),
    Details: columnFilters.Details && appliedFilters.has("Details"),
    Date: columnFilters.Date && appliedFilters.has("Date"),
    TestDetails: columnFilters.TestDetails && appliedFilters.has("TestDetails")
  };

  return [
    ...alwaysVisibleColumns,
    ...Object.keys(finalColumnFilters).filter(
      column => finalColumnFilters[column as keyof typeof finalColumnFilters]
    )
  ];
};

export { filterPatients, filterColumns };
