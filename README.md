# Sea View Skydiving — Greedy Adventures

A full-stack prototype created for the Greedy Adventures assignment. The project presents the Sea View Skydiving experience in a redesigned landing page and includes a chatbot that answers visitor questions using information collected from the official experience page.

The prototype also includes a knowledge page where the content and media available to the chatbot can be reviewed.

## Project Overview

The website focuses on the Sea View Skydiving experience in Pattaya, Thailand. Visitors can explore the experience, compare packages, understand the booking process, and ask questions through the chatbot.

### Main Features

- **Experience landing page:** A redesigned page with an editorial-style layout for the Sea View Skydiving experience.
- **Customer chatbot:** Answers questions about the experience using Google Gemini 2.5 Flash and the project’s prepared website content.
- **Knowledge page:** Displays the content sources and media files made available to the chatbot.
- **Media responses:** The chatbot can provide the brochure PDF and experience video when requested.
- **Conversation context:** Follow-up questions can use the context of the ongoing conversation.
- **Fallback responses:** If the available website content does not answer a question, the chatbot says that the information could not be found instead of guessing.

## Technology Stack

| Area | Technology |
| --- | --- |
| Framework | Next.js |
| Language | TypeScript |
| AI model | Google Gemini 2.5 Flash |
| AI SDK | `@google/generative-ai` |


## Getting Started

### Prerequisites

- Node.js installed
- npm
- A Google Gemini API key

### Installation

1. Clone or download the project.
2. Open the project directory in a terminal.
3. Install the dependencies:

   ```bash
   npm install
   ```

4. Create a `.env.local` file in the project root and add your Gemini API key:

   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

Keep the API key in `.env.local`. Do not expose it in client-side code or commit it to the repository.

## Experience Information

The chatbot's answers are based on content prepared from the official [Sea View Skydiving experience page](https://www.greedyadventures.com/experiences/sea-view-skydiving).

The content used in the prototype covers:

- **Overview:** Tandem skydiving over the Pattaya coast, a stated jump altitude of 13,000 ft, an estimated duration of around three hours, and starting prices.
- **Packages:** ECO, Deluxe, and VIP package information.
- **The plan:** Arrival, briefing, boarding, freefall, and canopy landing.
- **Important details:** Bangkok pickup add-on, age and weight requirements, and weather-related information.
- **Location:** Dropzone Thailand, 95 M.4, Chakphong, Klaeng District, Rayong 21190.

For current prices, eligibility, availability, and other booking details, visitors should confirm the information with Greedy Adventures.

## Chatbot and Media

The chatbot uses the prepared experience content to answer visitor questions. It can also return the relevant media when a visitor asks for it.

| Media | Project location | Purpose |
| --- | --- | --- |
| Brochure | `public/documents/sea-view-skydiving-brochure.pdf` | PDF brochure available from the chat |
| Experience video | `public/hero.mp4` | Video preview of the skydiving experience |

Depending on the request, the chatbot can return a text response, the brochure, the video, or both media items.

## Knowledge Page

Open `/knowledge` in the browser, or use the **Knowledge** link in the website navigation.

The page provides a view of the information and media configured for the chatbot:

- **Content sources:** The website sections and content chunks prepared for retrieval.
- **Media inventory:** The brochure and video files available to the chatbot.
- **Activity inspector:** A way to submit a test question and inspect the source content and media selected for that request.

This page is intended to make it easier to check what information the chatbot can use when responding.

## Testing

The following prompts can be used to check the main chatbot flows.

| Test | Prompt | Expected result |
| --- | --- | --- |
| Package information | “What is included in the package?” | Explains the ECO, Deluxe, and VIP packages using the available source content. |
| Brochure request | “Can you send me a brochure?” | Provides an answer and a link/card for the brochure PDF. |
| Video request | “Can I see a video of the experience?” | Provides an answer and a playable video preview. |
| Multiple media request | “Send me the brochure and a video.” | Provides both the brochure and video. |
| Follow-up question | “What about the weight limit?” | Explains the published weight information, including the stated 100 kg threshold and instructor assessment where applicable. |
| Unsupported question | “Can I jump with my pet dog?” | Explains that this information is not available in the supplied website content. |

## Project Structure

The following paths are relevant to the features described above:

```text
public/
├── documents/
│   └── sea-view-skydiving-brochure.pdf
└── hero.mp4

.env.local
```

The application also contains the Next.js pages, components, API routes, and supporting TypeScript files used for the landing page, chatbot, and knowledge page.



## Development Assistance

AI development tools, including Google Antigravity and Claude, were used as coding assistants during implementation. They helped with parts of the layout and development workflow. The resulting application was reviewed and tested as part of the project.

---

**Official experience page:** [Sea View Skydiving — Greedy Adventures](https://www.greedyadventures.com/experiences/sea-view-skydiving)
