import type { TrialSession } from "@/content/types";

/**
 * Shared trial-session plan for art & design (both 5-8 and 8-12).
 * 60 minutes total. Same plan for both age groups.
 */
export const ART_TRIAL_SESSION: TrialSession = {
  intro:
    "the trial session is 60 minutes. same plan for both age groups. a first-time child experiences the full flow — magna tiles warm-up, a shape fusion game, an artiverse painting that goes home the same day, and a short close naming the segments of every regular session.",
  segments: [
    {
      name: "Before children arrive — setup",
      time: "before",
      objective:
        "magna tiles spread in the centre of the table in a big colourful pile. watercolour sets, brushes, and a3 paper visible at the side. food cue cards and animal cue cards face-down in two stacks. the room looks ready for something.",
    },
    {
      name: "When children walk in",
      time: "2 min",
      objective:
        "no sitting down yet. teacher points at the magna tiles and sets the tone for the session.",
      setupLine:
        "grab a handful. as many as you want. go.",
      howToPlay:
        "children grab. teacher watches — noticing who dives in, who is cautious, who goes straight for a colour. once everyone has tiles, teacher asks: \"what colour did you grab the most of? and why that one?\" fast round — every child answers. teacher is genuinely curious, celebrates unexpected reasons, moves straight on.",
    },
    {
      name: "Game context — say this early",
      time: "1 min",
      objective:
        "a short framing the teacher reads to the group once they've picked up their tiles — sets expectation for what today's games are and how much choice children have.",
      howToPlay:
        "\"did you know we're going to play lots of different art games today? we'll use magna tiles to build shapes, play the shape fusion game, and create our own worlds. we'll also paint using brushes and watercolours to make food and fun creatures. you can choose what you want to build or paint, and sometimes we'll play in teams too. every game is different — sometimes you build, sometimes you paint, and sometimes you do both!\"",
    },
    {
      name: "Magna Tiles",
      time: "12 min",
      objective:
        "two quick rounds — first a shared prompt, then a free-build world. introduces 2D vs 3D making through play.",
      setupLine:
        "round 1 — make a fish. flat. on the table. 60 seconds. go.",
      howToPlay:
        "round 1: timer runs. teacher walks around watching, does not comment. then: \"hold yours up. look around — are any two exactly the same?\" let children notice this themselves. \"now — can you make your fish stand up? give it depth.\" children experiment. some crack it fast. some watch a neighbour and figure it out. \"flat fish — 2D. standing fish — 3D. today you're going to work in both.\" · round 2: \"now forget the fish. you have 3 minutes. make your own world — real or imaginary. anything.\" teacher builds something alongside. after 3 minutes: \"show me one thing in your world that is flat and one thing that has depth. point to them.\" 10 seconds per child. fast and fun.",
      materials: [
        "Magna Tiles — a big colourful pile at the centre of the table",
      ],
      heroImageUrl: "/trial-guides/magna-tiles.png",
    },
    {
      name: "Shape Fusion",
      time: "15 min",
      objective:
        "guessing + team race with transparent geometric shapes. teacher demonstrates once, then children play in two formats.",
      setupLine:
        "new game. different shapes — they don't snap. you arrange them. and the challenge: build something someone else can guess. without making a sound.",
      howToPlay:
        "round 1 — teacher goes first. teacher picks a shape card (e.g. \"bicycle\") — shows the word to one child beside them only. builds it in silence using transparent pieces while the group watches. group guesses. first correct answer wins that round. \"now you try. one of you is the builder. draw a card — don't show anyone. build it in silence. everyone else guesses within 60 seconds.\" two or three rounds — every child who wants to gets a turn. · round 2 — teams: \"now we race. two teams. one builder per team. same card — i show both builders at the same time. both build simultaneously. first team to guess wins the round.\" two rounds. fast, noisy, competitive. teacher keeps energy high.",
      materials: [
        "Two sets of 60 transparent geometric pieces",
        "Shape Cards",
      ],
      heroImageUrl: "/games/art/shape-fusion.png",
    },
    {
      name: "Artiverse",
      time: "25 min",
      objective:
        "the main making segment. children pair a food cue card with an animal cue card, paint the pair on a3 in watercolour, and take the artwork home the same day.",
      setupLine:
        "this is the part of every oh. art session i look forward to most. it's called artiverse — your universe of creation. every session this is the time where you make something completely yours. and this artwork goes home with you today. not next week. today.",
      howToPlay:
        "food cue cards face-down in a fan. animal cue cards face-down in another fan beside them. a3 paper in front of each child. medium trays ready — children can choose what they want to make their art with: watercolour set + brushes + water pot · colour pencils · brush pens. teacher lays out the options so each child can see and reach them. \"today you pick your medium too — colour pencils, brush pens, or watercolour. whichever feels right for what you're going to make.\" \"pick one food card. don't show anyone yet.\" children pick secretly. \"now pick one animal card.\" \"your job: make the food and the creature who would love to eat it. together, on the same page. maybe they're friends. maybe the creature is sneaking up on the food. maybe the food is bigger than the creature. that's your story.\" teacher steps all the way back. children work. after 15 minutes — two or three children share by holding up their artwork. teacher asks each one: \"what did you make? why that food? why that animal? why that medium? this is going home with you today — where are you going to put it?\" children say: fridge, bedroom wall, give it to someone. teacher takes masking tape, folds it into a loop sticky side out, presses it to the back of one piece of artwork, and sticks it briefly to the nearest wall. \"four loops of masking tape on the back — one for each corner — and it goes up on any wall without damaging it. your artwork deserves a wall. that's how you put it up.\" all artwork goes home.",
      materials: [
        "Food Cue Cards",
        "Animal Cue Cards",
        "Choice of mediums — watercolour set + brushes + water pot · colour pencils · brush pens",
        "A3 paper",
        "Masking tape",
      ],
      heroImageUrl: "/trial-guides/donut-guide.png",
    },
    {
      name: "Last 2 minutes — what every session looks like",
      time: "2 min",
      objective:
        "a short close that names the three segments of every regular session so the child leaves knowing what to expect next time.",
      howToPlay:
        "\"every time you come to oh. art — three things happen.\" · \"art gym — you warm up the marks and moves that make everything easier. lines, shapes, how different tools feel.\" · \"artgames — real games, with friends, often in teams. every game builds something real without feeling like work.\" · \"artiverse — your universe of creation. every session you make something and take it home.\" · \"next session — same friends, new materials, new game. see you then.\"",
    },
  ],
};
