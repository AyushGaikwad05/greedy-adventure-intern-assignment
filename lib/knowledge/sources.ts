export interface KnowledgeSource {
  id: string;
  title: string;
  url: string;
  captureDate: string;
  category: "overview" | "packages" | "plan" | "details" | "faq" | "dropzone";
  summary: string;
  text: string;
}

export const BASE_WEBSITE_URL = "https://www.greedyadventures.com/experiences/sea-view-skydiving";

export const KNOWLEDGE_SOURCES: KnowledgeSource[] = [
  {
    id: "src-overview",
    title: "Sea View Skydiving — Tandem Jump over Pattaya",
    url: "https://www.greedyadventures.com/experiences/sea-view-skydiving",
    captureDate: "2026-11-03",
    category: "overview",
    summary:
      "Tandem skydiving experience over Pattaya with ocean views across the Gulf of Thailand.",
    text: `Website Source: https://www.greedyadventures.com/experiences/sea-view-skydiving
Title: Sea View Skydiving — Tandem Jump over Pattaya | Greedy Adventures
Location: Pattaya Dropzone, Thailand
Pricing: From ฿9,500 per person

Overview:
Climb above the coast, then freefall with the Gulf of Thailand beneath you with a certified USPA tandem instructor at your back.
Key Highlights:
• Exit at 13,000 ft with the Gulf of Thailand on the horizon.
• Around sixty seconds (60s) of freefall at 200 km/h, then five to seven (5–7) minutes under canopy along the coast.
• No prior experience needed: your USPA-certified instructor flies the jump.
• Same aircraft, altitude (13,000 ft) and instructors in every package.
• Time at the dropzone: ~3 hours total.`,
  },
  {
    id: "src-packages",
    title: "Choose Your Package — ECO, Deluxe, and VIP Options",
    url: "https://www.greedyadventures.com/experiences/sea-view-skydiving#packages",
    captureDate: "2026-11-03",
    category: "packages",
    summary:
      "Pricing and inclusions for the three packages: ECO (฿9,500), Deluxe (฿12,500), and VIP (฿14,000).",
    text: `Website Source: https://www.greedyadventures.com/experiences/sea-view-skydiving#packages
Every package is the same 13,000 ft jump. Pick how much media you take home:

1. ECO Package (฿9,500 per person):
• Tagline: "The jump, nothing else"
• Inclusions:
  + Tandem skydive experience in Pattaya, Thailand from 13,000 ft
  + Safety briefing and tandem instructor support
  + Aircraft ascent and ocean-view jump experience
  + Certificate of completion
• Media: Media not included (Just the Jump).

2. DELUXE Package (฿12,500 per person):
• Tagline: "Video and photos included" (Most Popular)
• Inclusions:
  + Tandem skydive experience in Pattaya, Thailand from 13,000 ft
  + Safety briefing and tandem instructor support
  + Aircraft ascent and ocean-view jump experience
  + Certificate of completion
  + Video of your jump (handy cam video recorded by your instructor)
  + Photos of your jump

3. VIP Package (฿14,000 per person):
• Tagline: "Personal cameraman and edited film"
• Inclusions:
  + Tandem skydive experience in Pattaya, Thailand from 13,000 ft
  + Safety briefing and tandem instructor support
  + Aircraft ascent and ocean-view jump experience
  + Certificate of completion
  + Dedicated personal cameraman flying alongside you
  + Professionally edited film and photo package`,
  },
  {
    id: "src-plan",
    title: "The Plan — Your Day, Step by Step",
    url: "https://www.greedyadventures.com/experiences/sea-view-skydiving#the-plan",
    captureDate: "2026-11-03",
    category: "plan",
    summary:
      "Full itinerary: Step 1 Arrival & Check-in, Step 2 Safety Briefing, Step 3 Boarding, Step 4 Exit & Freefall, Step 5 Canopy Flight & Landing.",
    text: `Website Source: https://www.greedyadventures.com/experiences/sea-view-skydiving#the-plan
Itinerary & Step-by-Step Experience (Total time at dropzone: ~3 hours):

• Step 1: Arrival and check-in
  Sign in at the dropzone and bring your valid photo ID.
• Step 2: Safety briefing and gear fitting
  Meet your instructor for the safety briefing and harness fitting.
• Step 3: Boarding and the climb
  Board the aircraft and climb to jump altitude (13,000 ft) with scenic views.
• Step 4: Exit and freefall
  Exit with your instructor for around sixty seconds of freefall over the Gulf of Thailand.
• Step 5: Canopy flight and landing
  Fly under the parachute with your instructor for five to seven minutes and land back at the dropzone, then receive your certificate of completion.`,
  },
  {
    id: "src-details",
    title: "The Details — Experience Highlights & Included Services",
    url: "https://www.greedyadventures.com/experiences/sea-view-skydiving#details",
    captureDate: "2026-11-03",
    category: "details",
    summary:
      "Dropzone altitude, freefall duration, canopy glide, and package standards.",
    text: `Website Source: https://www.greedyadventures.com/experiences/sea-view-skydiving#details
Everything that comes with this experience, and what to plan for yourself:

Highlights:
• Exit altitude: 13,000 ft with the Gulf of Thailand on the horizon.
• Freefall: Around sixty (60) seconds of freefall.
• Canopy flight: Five to seven (5–7) minutes under canopy along the coast.
• Time at dropzone: 3 hours.
• Certification: USPA-certified tandem masters; no prior skydiving experience required.
• Consistency: Same aircraft, altitude and instructors in every package.

What's Included:
+ Tandem skydive experience in Pattaya, Thailand
+ Safety briefing and tandem instructor support
+ Aircraft ascent and ocean-view jump experience
+ Certificate of completion`,
  },
  {
    id: "src-dropzone",
    title: "Where You Jump & Operator Information",
    url: "https://www.greedyadventures.com/experiences/sea-view-skydiving#location",
    captureDate: "2026-11-03",
    category: "dropzone",
    summary:
      "Dropzone address in Rayong/Pattaya and USPA operator Dropzone Thailand.",
    text: `Website Source: https://www.greedyadventures.com/experiences/sea-view-skydiving#location
Location & Operator:
• Experience Location: Pattaya Sea View, Pattaya, Thailand.
• Physical Dropzone Address: 95 M.4, Chakphong, Klaeng District, Rayong 21190, Thailand.
• Operated by: Dropzone Thailand.
• Atmosphere: Coastal dropzone with runway, packing bays, spectator area, and direct flight path over the Gulf of Thailand.`,
  },
  {
    id: "src-faq",
    title: "Good to Know & Frequently Asked Questions",
    url: "https://www.greedyadventures.com/experiences/sea-view-skydiving#good-to-know",
    captureDate: "2026-11-03",
    category: "faq",
    summary:
      "Activity location, package recommendation, Bangkok pickup add-on, age, and weight policies.",
    text: `Website Source: https://www.greedyadventures.com/experiences/sea-view-skydiving#good-to-know
Frequently Asked Questions:

Q: Where does the activity take place?
A: The tandem skydive is listed for Pattaya, Thailand (Pattaya Sea View, 95 M.4, Chakphong, Klaeng District, Rayong 21190).

Q: Which package should I choose?
A: Choose ECO for the standard jump (฿9,500), Deluxe if you want handy cam video and photos (฿12,500), and VIP if you want full media coverage with a personal cameraman (฿14,000).

Q: Is Bangkok pickup available?
A: Yes. Bangkok pickup is available as a fixed-price add-on.

Prerequisites & Policies:
• Age Limit: Minimum 14 years old (jumpers under 18 require signed parental/guardian consent).
• Weight Limit: Maximum weight limit is 100 kg. (Jumpers between 90 kg and 100 kg require dropzone master evaluation).
• Weather Policy: Skydiving is strictly weather-permitting. If winds, rain, or low clouds prevent jumping, jumps are rescheduled at no additional charge.
• Medical: Normal physical fitness. No scuba diving within 24 hours prior to the jump.`,
  },
];
