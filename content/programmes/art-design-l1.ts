import type { Programme } from "../types";

export const artDesignL1: Programme = {
  id: "art-design-l1",
  title: "art & design",
  subtitle: "level 1 · ages 3–5",
  category: "art",
  ageGroup: "3-5",
  sessionCount: 50,
  classSize: "6–10",
  durationMinutes: 90,
  objective:
    "Help children develop creativity and imagination, and become better at art techniques.",
  skillIds: [
    "lines-texture",
    "shape-form",
    "colour-paint",
    "imagination-expression",
  ],
  segments: [
    {
      name: "Art Gym",
      durationMinutes: 10,
      builds: "L&T · I&E",
      howItRuns:
        "Children exercise their hands and imagination before the main session begins. Three resources rotate: Book 1, Book 2, and the Scribble Book. For every resource, children choose which material to use — erasable markers, Play-Doh, thread, sequins, or sand.",
    },
    {
      name: "ArtGames",
      durationMinutes: 20,
      builds: "rotating across all four skills",
      howItRuns:
        "A game that builds one art skill through play. Nine games rotate across the programme. Rules are explained once at the start. The educator sets up, steps back, and observes.",
    },
    {
      name: "Artistotle",
      durationMinutes: 15,
      builds: "I&E always · L&T · S&F · C&P depending on book",
      howItRuns:
        "The educator reads from one of 10 art books. The same book runs for 5 sessions — one format per session: Introduce · Read and Draw Together · Draw from Imagination · Practise · Final Artwork.",
    },
    {
      name: "Artiverse",
      durationMinutes: 35,
      builds: "rotating across all four skills",
      howItRuns:
        "Children create using one material combination. Every artwork runs across 2 sessions: Day 1 starts and explores, Day 2 continues and completes. The educator offers 2–3 suggested artworks — children decide what they make.",
    },
    {
      name: "Art Care",
      durationMinutes: 10,
      builds: "Responsibility",
      howItRuns:
        "Children sort all materials back to the correct shelf sections and prepare the space for the next session. The standard is care, not speed.",
    },
  ],
};
