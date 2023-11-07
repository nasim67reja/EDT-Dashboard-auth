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

export const usaMajorDistricts = [
  { label: "New York", value: "New York" },
  { label: "Los Angeles", value: "Los Angeles" },
  { label: "Chicago", value: "Chicago" },
  { label: "Houston", value: "Houston" },
  { label: "Phoenix", value: "Phoenix" },
  { label: "Philadelphia", value: "Philadelphia" },
  { label: "San Antonio", value: "San Antonio" },
  { label: "San Diego", value: "San Diego" },
  { label: "Dallas", value: "Dallas" },
  { label: "San Francisco", value: "San Francisco" },
  // Add more districts as needed
];

export const demoData = {
  campaign_name: "test test test",
  office_sought: "Assistant",
  participant: "P-B",
  start_date: "2023-10-29",
  end_date: "2023-11-6",
  campaign_status: "upcoming",
  candidacy_year: "2024",
  constituency: "New york",
  affiliation: "Conservative",
  candidate_name: "Mr Candidate",
  phone: "1293142198413",
  email: "email@gmail.com",
  voter_id: "323r2545354",
  address: "aeffe",
  district: "New york",
  owner_id: "11cfffacfea43fbd9591c2af64cb8a00116133c9",
  is_owner: false,
  occupation: "Lawyer",
  campaign_image: "",
};
