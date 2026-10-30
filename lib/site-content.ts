// Copy shared by the home and about pages.

export const screenColors = {
  copper: "#c4773c",
  sage: "#8f998b",
  rose: "#c49890",
  dusk: "#7f85b6",
  white: "#ffffff",
} as const;

export const services = [
  { half: "Culture", title: "Brand and marketing", detail: "Identity, campaigns, social" },
  { half: "Culture", title: "Film, music and events", detail: "Launch films, sound, stage" },
  { half: "Systems", title: "Websites and apps", detail: "Web and mobile, built to grow" },
  { half: "Systems", title: "Hardware and robotics", detail: "Electronics, CAD, fabrication" },
];

export const audiences = [
  { name: "Startups", color: screenColors.sage, text: "A brand, a site and a launch film that make a new company look established." },
  { name: "Creators", color: screenColors.copper, text: "Channel identity, thumbnails, intros and merch for YouTube and beyond." },
  { name: "Clubs", color: screenColors.rose, text: "Event branding, posters and sign-up pages for college clubs and societies." },
  { name: "Small business", color: screenColors.dusk, text: "A refresh that lets a local business compete with bigger names." },
];

export const steps = [
  ["1. Talk", "Tell us what you are launching, who it is for and your budget."],
  ["2. Plan", "You get a clear scope and a fixed price before anything starts."],
  ["3. Make", "We share real work every week, so there are no surprises."],
  ["4. Launch", "We ship it and hand you every file, account and line of code."],
] as const;
