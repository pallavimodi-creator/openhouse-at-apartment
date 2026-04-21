import type { Session } from "../types";

// The 50 sessions of Art & Design Level 1, verbatim from the source doc.
// Each session has 5 segments: Art Gym · ArtGames · Artistotle · Artiverse · Art Care.
// Art Care appears identically in every session (10 min, art-care resource).

const PROG = "art-design-l1";

type SessionDef = {
  name: string;
  artGym: string; // resourceId
  artGame: string; // resourceId
  artistotleBook: string; // resourceId
  artistotleMode: string; // display text for the day
  artiverse: string; // resourceId
  artiverseMode: string;
};

const raw: SessionDef[] = [
  // Term 1
  { name: "First Marks", artGym: "art-gym-book-1", artGame: "stitch-me", artistotleBook: "press-here", artistotleMode: "Day 1 · Introduce", artiverse: "artiverse-painting", artiverseMode: "Day 1" },
  { name: "Press and Paint", artGym: "art-gym-book-1", artGame: "match-me", artistotleBook: "press-here", artistotleMode: "Day 2 · Read and Draw Together", artiverse: "artiverse-painting", artiverseMode: "Day 2" },
  { name: "Dot Explore", artGym: "scribble-book", artGame: "i-spot-texture", artistotleBook: "press-here", artistotleMode: "Day 3 · pressing and touching", artiverse: "artiverse-dot-dab", artiverseMode: "Day 1" },
  { name: "Dot Complete", artGym: "art-gym-book-1", artGame: "stitch-me", artistotleBook: "press-here", artistotleMode: "Day 4 · marks that appear by surprise", artiverse: "artiverse-dot-dab", artiverseMode: "Day 2" },
  { name: "Stamp Day", artGym: "art-gym-book-1", artGame: "shape-stitch", artistotleBook: "press-here", artistotleMode: "Day 5 · Final Artwork: body prints", artiverse: "artiverse-stamping", artiverseMode: "Day 1" },
  { name: "Stamp Complete", artGym: "scribble-book", artGame: "mix-it-up", artistotleBook: "mix-it-up-book", artistotleMode: "Day 1 · Introduce", artiverse: "artiverse-stamping", artiverseMode: "Day 2" },
  { name: "Line Day", artGym: "art-gym-book-1", artGame: "game-of-red-yellow-blue", artistotleBook: "mix-it-up-book", artistotleMode: "Day 2 · Read and Draw Together", artiverse: "artiverse-drawing", artiverseMode: "Day 1" },
  { name: "Drawing Complete", artGym: "art-gym-book-1", artGame: "magna-tiles", artistotleBook: "mix-it-up-book", artistotleMode: "Day 3 · what happens when two colours meet", artiverse: "artiverse-drawing", artiverseMode: "Day 2" },
  { name: "Colour and Layer", artGym: "scribble-book", artGame: "miniartventure", artistotleBook: "mix-it-up-book", artistotleMode: "Day 4 · a colour you make, not from the pot", artiverse: "artiverse-mixed-media", artiverseMode: "Day 1" },
  { name: "Mixed Complete", artGym: "art-gym-book-1", artGame: "stitch-me", artistotleBook: "mix-it-up-book", artistotleMode: "Day 5 · Final Artwork: paint with only mixed colours", artiverse: "artiverse-mixed-media", artiverseMode: "Day 2" },
  { name: "Collage Day", artGym: "art-gym-book-1", artGame: "match-me", artistotleBook: "very-hungry-caterpillar", artistotleMode: "Day 1 · Introduce", artiverse: "artiverse-collage", artiverseMode: "Day 1" },
  { name: "Collage Complete", artGym: "scribble-book", artGame: "shape-stitch", artistotleBook: "very-hungry-caterpillar", artistotleMode: "Day 2 · Read and Draw Together", artiverse: "artiverse-collage", artiverseMode: "Day 2" },
  { name: "Brush Day", artGym: "art-gym-book-1", artGame: "i-spot-texture", artistotleBook: "very-hungry-caterpillar", artistotleMode: "Day 3 · layers of colour and texture", artiverse: "artiverse-texture-brush", artiverseMode: "Day 1" },
  { name: "Brush Complete", artGym: "art-gym-book-1", artGame: "mix-it-up", artistotleBook: "very-hungry-caterpillar", artistotleMode: "Day 4 · a shape moving through a world", artiverse: "artiverse-texture-brush", artiverseMode: "Day 2" },
  { name: "Caterpillar Painting", artGym: "scribble-book", artGame: "game-of-red-yellow-blue", artistotleBook: "very-hungry-caterpillar", artistotleMode: "Day 5 · Final Artwork: Carle collage caterpillar", artiverse: "artiverse-painting", artiverseMode: "Day 1" },
  { name: "Caterpillar Complete", artGym: "art-gym-book-1", artGame: "stitch-me", artistotleBook: "colour-monster", artistotleMode: "Day 1 · Introduce", artiverse: "artiverse-painting", artiverseMode: "Day 2" },
  { name: "Feeling Dot", artGym: "art-gym-book-1", artGame: "match-me", artistotleBook: "colour-monster", artistotleMode: "Day 2 · Read and Draw Together", artiverse: "artiverse-dot-dab", artiverseMode: "Day 1" },
  { name: "Dot Complete", artGym: "scribble-book", artGame: "i-spy-i-make", artistotleBook: "colour-monster", artistotleMode: "Day 3 · a colour that matches a feeling", artiverse: "artiverse-dot-dab", artiverseMode: "Day 2" },
  { name: "Feeling Stamp", artGym: "art-gym-book-1", artGame: "miniartventure", artistotleBook: "colour-monster", artistotleMode: "Day 4 · what colour would today feel like?", artiverse: "artiverse-stamping", artiverseMode: "Day 1" },
  { name: "Stamp Complete", artGym: "art-gym-book-1", artGame: "shape-stitch", artistotleBook: "colour-monster", artistotleMode: "Day 5 · Final Artwork: feeling zones on A3", artiverse: "artiverse-stamping", artiverseMode: "Day 2" },
  { name: "Drawing Myself", artGym: "scribble-book", artGame: "stitch-me", artistotleBook: "lets-play", artistotleMode: "Day 1 · Introduce", artiverse: "artiverse-drawing", artiverseMode: "Day 1" },
  { name: "Drawing Complete", artGym: "art-gym-book-1", artGame: "match-me", artistotleBook: "lets-play", artistotleMode: "Day 2 · Read and Draw Together", artiverse: "artiverse-drawing", artiverseMode: "Day 2" },
  { name: "My Feelings", artGym: "art-gym-book-1", artGame: "mix-it-up", artistotleBook: "lets-play", artistotleMode: "Day 3 · a dot going on adventures", artiverse: "artiverse-mixed-media", artiverseMode: "Day 1" },
  { name: "Mixed Complete", artGym: "scribble-book", artGame: "game-of-red-yellow-blue", artistotleBook: "lets-play", artistotleMode: "Day 4 · what adventure would I send a dot on?", artiverse: "artiverse-mixed-media", artiverseMode: "Day 2" },
  { name: "Stamp Garden", artGym: "art-gym-book-1", artGame: "magna-tiles", artistotleBook: "lets-play", artistotleMode: "Day 5 · Final Artwork: adventure map for a dot", artiverse: "artiverse-stamping", artiverseMode: "Day 1" },

  // Term 2
  { name: "Stamp Complete", artGym: "art-gym-book-2", artGame: "i-spy-i-make", artistotleBook: "mr-sea-horse", artistotleMode: "Day 1 · Introduce", artiverse: "artiverse-stamping", artiverseMode: "Day 2" },
  { name: "Collage Fish", artGym: "scribble-book", artGame: "miniartventure", artistotleBook: "mr-sea-horse", artistotleMode: "Day 2 · Read and Draw Together", artiverse: "artiverse-collage", artiverseMode: "Day 1" },
  { name: "Collage Complete", artGym: "art-gym-book-2", artGame: "stitch-me", artistotleBook: "mr-sea-horse", artistotleMode: "Day 3 · a creature hidden in plain sight", artiverse: "artiverse-collage", artiverseMode: "Day 2" },
  { name: "Ocean Brush", artGym: "art-gym-book-2", artGame: "match-me", artistotleBook: "mr-sea-horse", artistotleMode: "Day 4 · an ocean world made of layered shapes", artiverse: "artiverse-texture-brush", artiverseMode: "Day 1" },
  { name: "Ocean Complete", artGym: "scribble-book", artGame: "shape-stitch", artistotleBook: "mr-sea-horse", artistotleMode: "Day 5 · Final Artwork: underwater Carle collage", artiverse: "artiverse-texture-brush", artiverseMode: "Day 2" },
  { name: "Drawing an Animal", artGym: "art-gym-book-2", artGame: "i-spot-texture", artistotleBook: "say-zoop", artistotleMode: "Day 1 · Introduce", artiverse: "artiverse-drawing", artiverseMode: "Day 1" },
  { name: "Drawing Complete", artGym: "art-gym-book-2", artGame: "mix-it-up", artistotleBook: "say-zoop", artistotleMode: "Day 2 · Read and Draw Together", artiverse: "artiverse-drawing", artiverseMode: "Day 2" },
  { name: "Sound Painting", artGym: "scribble-book", artGame: "game-of-red-yellow-blue", artistotleBook: "say-zoop", artistotleMode: "Day 3 · what does a big sound look like as a mark?", artiverse: "artiverse-painting", artiverseMode: "Day 1" },
  { name: "Painting Complete", artGym: "art-gym-book-2", artGame: "magna-tiles", artistotleBook: "say-zoop", artistotleMode: "Day 4 · a tiny sound vs a huge sound", artiverse: "artiverse-painting", artiverseMode: "Day 2" },
  { name: "Sound Fireworks", artGym: "art-gym-book-2", artGame: "i-spy-i-make", artistotleBook: "say-zoop", artistotleMode: "Day 5 · Final Artwork: five sounds, five zones", artiverse: "artiverse-dot-dab", artiverseMode: "Day 1" },
  { name: "Dot Complete", artGym: "scribble-book", artGame: "miniartventure", artistotleBook: "the-dot", artistotleMode: "Day 1 · Introduce", artiverse: "artiverse-dot-dab", artiverseMode: "Day 2" },
  { name: "My Monster", artGym: "art-gym-book-2", artGame: "stitch-me", artistotleBook: "the-dot", artistotleMode: "Day 2 · Read and Draw Together", artiverse: "artiverse-collage", artiverseMode: "Day 1" },
  { name: "Monster Complete", artGym: "art-gym-book-2", artGame: "match-me", artistotleBook: "the-dot", artistotleMode: "Day 3 · one mark made with confidence", artiverse: "artiverse-collage", artiverseMode: "Day 2" },
  { name: "My World", artGym: "scribble-book", artGame: "shape-stitch", artistotleBook: "the-dot", artistotleMode: "Day 4 · what would you make if you knew it was good enough?", artiverse: "artiverse-mixed-media", artiverseMode: "Day 1" },
  { name: "Mixed Complete", artGym: "art-gym-book-2", artGame: "i-spot-texture", artistotleBook: "the-dot", artistotleMode: "Day 5 · Final Artwork: continue from an educator's dot", artiverse: "artiverse-mixed-media", artiverseMode: "Day 2" },
  { name: "Stamp Landscape", artGym: "art-gym-book-2", artGame: "mix-it-up", artistotleBook: "bear-hunt", artistotleMode: "Day 1 · Introduce", artiverse: "artiverse-stamping", artiverseMode: "Day 1" },
  { name: "Stamp Complete", artGym: "scribble-book", artGame: "game-of-red-yellow-blue", artistotleBook: "bear-hunt", artistotleMode: "Day 2 · Read and Draw Together", artiverse: "artiverse-stamping", artiverseMode: "Day 2" },
  { name: "Texture Painting", artGym: "art-gym-book-2", artGame: "magna-tiles", artistotleBook: "bear-hunt", artistotleMode: "Day 3 · thick oozy mud — what marks does it make?", artiverse: "artiverse-painting", artiverseMode: "Day 1" },
  { name: "Painting Complete", artGym: "art-gym-book-2", artGame: "i-spy-i-make", artistotleBook: "bear-hunt", artistotleMode: "Day 4 · swirling snowstorm — what marks?", artiverse: "artiverse-painting", artiverseMode: "Day 2" },
  { name: "Terrain Brush", artGym: "scribble-book", artGame: "miniartventure", artistotleBook: "bear-hunt", artistotleMode: "Day 5 · Final Artwork: terrain collage", artiverse: "artiverse-texture-brush", artiverseMode: "Day 1" },
  { name: "Brush Complete", artGym: "art-gym-book-2", artGame: "stitch-me", artistotleBook: "the-gruffalo", artistotleMode: "Day 1 · Introduce", artiverse: "artiverse-texture-brush", artiverseMode: "Day 2" },
  { name: "Paper Animal", artGym: "art-gym-book-2", artGame: "match-me", artistotleBook: "the-gruffalo", artistotleMode: "Day 2 · Read and Draw Together", artiverse: "artiverse-collage", artiverseMode: "Day 1" },
  { name: "Collage Complete", artGym: "scribble-book", artGame: "shape-stitch", artistotleBook: "the-gruffalo", artistotleMode: "Day 3 · a feature that is truly extraordinary", artiverse: "artiverse-collage", artiverseMode: "Day 2" },
  { name: "Flex 1", artGym: "art-gym-book-1", artGame: "stitch-me", artistotleBook: "the-gruffalo", artistotleMode: "Day 4 · draw the Gruffalo from memory", artiverse: "artiverse-painting", artiverseMode: "Educator's choice" },
  { name: "Flex 2", artGym: "art-gym-book-2", artGame: "stitch-me", artistotleBook: "the-gruffalo", artistotleMode: "Day 5 · Final Artwork: draw your own Gruffalo", artiverse: "artiverse-mixed-media", artiverseMode: "Child's free choice" },
];

export const artDesignL1Sessions: Session[] = raw.map((r, i) => {
  const index = i + 1;
  const id = `s${String(index).padStart(2, "0")}`;
  return {
    id,
    programmeId: PROG,
    index,
    name: r.name.toLowerCase(),
    term: index <= 25 ? 1 : 2,
    durationMinutes: 90,
    segments: [
      { order: 1, name: "Art Gym", durationMinutes: 10, resourceId: r.artGym },
      { order: 2, name: "ArtGames", durationMinutes: 20, resourceId: r.artGame },
      {
        order: 3,
        name: "Artistotle",
        durationMinutes: 15,
        resourceId: r.artistotleBook,
        mode: r.artistotleMode,
      },
      {
        order: 4,
        name: "Artiverse",
        durationMinutes: 35,
        resourceId: r.artiverse,
        mode: r.artiverseMode,
      },
      { order: 5, name: "Art Care", durationMinutes: 10, resourceId: "art-care" },
    ],
  };
});
