export const officeSoughtOption = [
  { label: "City Council", value: "city_council" },
  { label: "Borough President", value: "borough_president" },
  { label: "Comptroller", value: "comptroller" },
  { label: "Public Advocate", value: "public_advocate" },
  { label: "Mayor", value: "mayor" },
  { label: "Undeclared", value: "undeclared" },
];
export const participantOption = [
  { label: "P-A", value: "p-a" },
  { label: "P-B", value: "p-b" },
  { label: "NP", value: "np" },
  { label: "UN", value: "un" },
];

export const electionCycle = [
  { label: "2023-24", value: "2023-24" },
  { label: "2024-25", value: "2024-25" },
];

export const affiliationOption = [
  { label: "Democratic", value: "Democratic" },
  { label: "Republican", value: "Republican" },
  { label: "Conservative", value: "Conservative" },
  { label: "Liberal", value: "Liberal" },
];
export const years = Array.from({ length: 8 }, (_, index) => {
  const year = 2023 + index;
  return { label: year.toString(), value: year.toString() };
});
