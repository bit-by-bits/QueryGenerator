import {
  Filters,
  Patient
} from "@/context/FilterContext/FiltersContextProvider";

const filterPatients = (patients: Patient[], filters: Filters): Patient[] => {
  const {
    minAge,
    maxAge,
    minWeight,
    maxWeight,
    minHeight,
    maxHeight,
    fromDate,
    toDate,
    testName,
    gender,
    state
  } = filters;
  const from = new Date(fromDate);
  const to = new Date(toDate);

  return patients.filter(patient => {
    const patientAge = patient["Patient Age"];
    const patientWeight = patient["Patient Weight"];
    const patientHeight = patient["Patient Height"];
    const testDate = new Date(patient["Test Date"]);

    const isTestNameMatch =
      !testName || patient["Test Name"].includes(testName);
    const isAgeInRange = minAge <= patientAge && patientAge <= maxAge;
    const isWeightInRange =
      minWeight <= patientWeight && patientWeight <= maxWeight;
    const isHeightInRange =
      minHeight <= patientHeight && patientHeight <= maxHeight;
    const isDateInRange = from <= testDate && testDate <= to;
    const isGenderMatch = !gender || patient["Patient Gender"] === gender;
    const isStateMatch = !state || patient["Patient State"] === state;

    return (
      isTestNameMatch &&
      isAgeInRange &&
      isWeightInRange &&
      isHeightInRange &&
      isDateInRange &&
      isGenderMatch &&
      isStateMatch
    );
  });
};

const filterColumns = (
  appliedFilters: Set<string>,
  filters: Filters
): string[] => {
  const alwaysVisibleColumns = ["Patient ID", "Patient Name", "Test Name"];
  const columnFilters: Record<string, boolean> = {
    Demographics: true,
    Details:
      !!filters.minAge ||
      !!filters.maxAge ||
      !!filters.minWeight ||
      !!filters.maxWeight ||
      !!filters.minHeight ||
      !!filters.maxHeight,
    Date: !!filters.fromDate || !!filters.toDate,
    TestDetails: true
  };

  const finalColumnFilters = Object.keys(columnFilters).reduce(
    (acc, key) => {
      acc[key] = columnFilters[key] && appliedFilters.has(key);
      return acc;
    },
    {} as Record<string, boolean>
  );

  return [
    ...alwaysVisibleColumns,
    ...Object.keys(finalColumnFilters).filter(
      column => finalColumnFilters[column]
    )
  ];
};

export { filterPatients, filterColumns };
