import type { TrialSession, TrialSessionSegment } from "@/content/types";

/**
 * Trial-session plans for art & design — separate per age band. 60 minutes each.
 *
 * Day 0 artwork is a donut for BOTH ages:
 *  - 5–8:  paint your own donut.
 *  - 8–12: paint a donut + your favourite animal who wants to eat it.
 *
 * The trial game differs by age: 5–8 plays Magna Tiles, 8–12 plays Shape
 * Fusion (both keep the brief Magna Tiles arrival warm-up). The closing
 * segment is identical across ages; the intro, setup, game-context, and
 * Artiverse making segment differ. Books and art games also differ at the
 * session-calendar level (5–8: book-3 / match-me · 8–12: book-5 / i-spot).
 */

// ─── Shared segments (identical for both ages) ──────────────────

const WALK_IN_SEGMENT: TrialSessionSegment = {
  name: "When children walk in",
  time: "2 min",
  objective:
    "no sitting down yet. educator points at the magna tiles and sets the tone for the session.",
  setupLine: "grab a handful. as many as you want. go.",
  howToPlay:
    "children grab. educator watches — noticing who dives in, who is cautious, who goes straight for a colour. once everyone has tiles, educator asks: \"what colour did you grab the most of? and why that one?\" fast round — every child answers. educator is genuinely curious, celebrates unexpected reasons, moves straight on.",
};

const MAGNA_TILES_SEGMENT: TrialSessionSegment = {
  name: "Magna Tiles",
  time: "12 min",
  objective:
    "two quick rounds — first a shared prompt, then a free-build world. introduces 2D vs 3D making through play.",
  setupLine: "round 1 — make a fish. flat. on the table. 60 seconds. go.",
  howToPlay:
    "round 1: timer runs. educator walks around watching, does not comment. then: \"hold yours up. look around — are any two exactly the same?\" let children notice this themselves. \"now — can you make your fish stand up? give it depth.\" children experiment. some crack it fast. some watch a neighbour and figure it out. \"flat fish — 2D. standing fish — 3D. today you're going to work in both.\" · round 2: \"now forget the fish. you have 3 minutes. make your own world — real or imaginary. anything.\" educator builds something alongside. after 3 minutes: \"show me one thing in your world that is flat and one thing that has depth. point to them.\" 10 seconds per child. fast and fun.",
  materials: ["Magna Tiles — a big colourful pile at the centre of the table"],
  heroImageUrl: "/trial-guides/magna-tiles.png",
};

const SHAPE_FUSION_SEGMENT: TrialSessionSegment = {
  name: "Shape Fusion",
  time: "15 min",
  objective:
    "guessing + team race with transparent geometric shapes. educator demonstrates once, then children play in two formats.",
  setupLine:
    "new game. different shapes — they don't snap. you arrange them. and the challenge: build something someone else can guess. without making a sound.",
  howToPlay:
    "round 1 — educator goes first. educator picks a shape card (e.g. \"bicycle\") — shows the word to one child beside them only. builds it in silence using transparent pieces while the group watches. group guesses. first correct answer wins that round. \"now you try. one of you is the builder. draw a card — don't show anyone. build it in silence. everyone else guesses within 60 seconds.\" two or three rounds — every child who wants to gets a turn. · round 2 — teams: \"now we race. two teams. one builder per team. same card — i show both builders at the same time. both build simultaneously. first team to guess wins the round.\" two rounds. fast, noisy, competitive. educator keeps energy high.",
  materials: ["Two sets of 60 transparent geometric pieces", "Shape Cards"],
  heroImageUrl: "/games/art/shape-fusion.png",
};

const CLOSE_SEGMENT: TrialSessionSegment = {
  name: "Last 2 minutes — what every session looks like",
  time: "2 min",
  objective:
    "a short close that names the three segments of every regular session so the child leaves knowing what to expect next time.",
  howToPlay:
    "\"every time you come to oh. art — three things happen.\" · \"art gym — you warm up the marks and moves that make everything easier. lines, shapes, how different tools feel.\" · \"artgames — real games, with friends, often in teams. every game builds something real without feeling like work.\" · \"artiverse — your universe of creation. every session you make something and take it home.\" · \"next session — same friends, new materials, new game. see you then.\"",
};

// ─── 5–8 — donut only ───────────────────────────────────────────

export const ART_TRIAL_SESSION_5_8: TrialSession = {
  intro:
    "the trial session is 60 minutes for ages 5–8. a first-time child experiences the full flow — a magna tiles game building flat and in 3D, an artiverse painting of their very own donut that goes home the same day, and a short close naming the segments of every regular session.",
  segments: [
    {
      name: "Before children arrive — setup",
      time: "before",
      objective:
        "magna tiles spread in the centre of the table in a big colourful pile. paints, brushes, and a3 paper visible at the side. a donut reference card and the donut guide face-up where children can see them. the room looks ready for something.",
    },
    WALK_IN_SEGMENT,
    {
      name: "Game context — say this early",
      time: "1 min",
      objective:
        "a short framing the educator reads to the group once they've picked up their tiles — sets expectation for what today's games are and how much choice children have.",
      howToPlay:
        "\"did you know we're going to play art games today? we'll use magna tiles to build shapes — flat on the table and standing up in 3D — and create our own worlds. and then — the best part — we're each going to paint our very own donut, and you take it home today. you choose the colours, the sprinkles, the icing. every game is different — sometimes you build, sometimes you paint, and sometimes you do both!\"",
    },
    MAGNA_TILES_SEGMENT,
    {
      name: "Artiverse",
      time: "25 min",
      objective:
        "the main making segment. children paint their own donut on a3 and take the artwork home the same day.",
      setupLine:
        "this is the part of every oh. art session i look forward to most. it's called artiverse — your universe of creation. every session this is the time where you make something completely yours. and this artwork goes home with you today. not next week. today.",
      howToPlay:
        "a3 paper in front of each child. medium trays ready — children can choose what they want to make their art with: poster paints + brushes · colour pencils · brush pens. educator lays out the options so each child can see and reach them. \"today you pick your medium too — colour pencils, brush pens, or paints. whichever feels right for the donut you're going to make.\" \"today we each make our own donut. just the donut — big, on the page, your colours.\" \"is it chocolate? pink icing? rainbow sprinkles? a bite taken out of it? that's your choice — it's your donut.\" educator steps all the way back. children work. after 15 minutes — two or three children share by holding up their artwork. educator asks each one: \"what kind of donut did you make? why those colours? why that medium? this is going home with you today — where are you going to put it?\" children say: fridge, bedroom wall, give it to someone. educator takes masking tape, folds it into a loop sticky side out, presses it to the back of one piece of artwork, and sticks it briefly to the nearest wall. \"four loops of masking tape on the back — one for each corner — and it goes up on any wall without damaging it. your artwork deserves a wall. that's how you put it up.\" all artwork goes home.",
      materials: [
        "Donut reference card",
        "Choice of mediums — poster paints + brushes · colour pencils · brush pens",
        "A3 paper",
        "Masking tape",
      ],
      heroImageUrl: "/trial-guides/donut-guide.png",
    },
    CLOSE_SEGMENT,
  ],
};

// ─── 8–12 — donut + favourite animal who wants to eat it ────────

export const ART_TRIAL_SESSION_8_12: TrialSession = {
  intro:
    "the trial session is 60 minutes for ages 8–12. a first-time child experiences the full flow — magna tiles warm-up, a shape fusion game, an artiverse painting of a donut and the favourite animal who wants to eat it, taken home the same day, and a short close naming the segments of every regular session.",
  segments: [
    {
      name: "Before children arrive — setup",
      time: "before",
      objective:
        "magna tiles spread in the centre of the table in a big colourful pile for the warm-up. two sets of transparent shape fusion pieces and shape cards ready at the side. paints, brushes, and a3 paper visible. a donut reference card and the donut guide face-up, and animal cue cards face-down in a stack. the room looks ready for something.",
    },
    WALK_IN_SEGMENT,
    {
      name: "Game context — say this early",
      time: "1 min",
      objective:
        "a short framing the educator reads to the group once they've picked up their tiles — sets expectation for what today's games are and how much choice children have.",
      howToPlay:
        "\"did you know we're going to play art games today? we'll warm up with magna tiles, then play the shape fusion game — building something in silence for everyone else to guess. and then — the best part — we each paint a donut, and the favourite animal who wants to eat it, together on the same page. you take it home today. every game is different — sometimes you build, sometimes you paint, and sometimes you do both!\"",
    },
    SHAPE_FUSION_SEGMENT,
    {
      name: "Artiverse",
      time: "25 min",
      objective:
        "the main making segment. children paint a donut and add their favourite animal who wants to eat it — both on a3 — and take the artwork home the same day.",
      setupLine:
        "this is the part of every oh. art session i look forward to most. it's called artiverse — your universe of creation. every session this is the time where you make something completely yours. and this artwork goes home with you today. not next week. today.",
      howToPlay:
        "animal cue cards face-down in a fan. a3 paper in front of each child. medium trays ready — children can choose what they want to make their art with: oil pastels · colour pencils · brush pens · watercolour set + brushes + water pot. educator lays out the options so each child can see and reach them. \"today you pick your medium too — whichever feels right for what you're going to make.\" \"first, paint your donut — big, on the page, your colours. icing, sprinkles, a bite taken out — your choice.\" children make their donut. \"now pick one animal card. don't show anyone yet.\" children pick secretly. \"your job: add the animal who wants to eat your donut. maybe it's sneaking up on it. maybe it's enormous next to a tiny donut. maybe the donut is bigger than the animal. that's your story — same page, donut and animal together.\" educator steps all the way back. children work. after 15 minutes — two or three children share by holding up their artwork. educator asks each one: \"what did you make? why that animal? why that medium? this is going home with you today — where are you going to put it?\" children say: fridge, bedroom wall, give it to someone. educator takes masking tape, folds it into a loop sticky side out, presses it to the back of one piece of artwork, and sticks it briefly to the nearest wall. \"four loops of masking tape on the back — one for each corner — and it goes up on any wall without damaging it. your artwork deserves a wall. that's how you put it up.\" all artwork goes home.",
      materials: [
        "Donut reference card",
        "Animal Cue Cards",
        "Choice of mediums — oil pastels · colour pencils · brush pens · watercolour set + brushes + water pot",
        "A3 paper",
        "Masking tape",
      ],
      heroImageUrl: "/trial-guides/donut-guide.png",
    },
    CLOSE_SEGMENT,
  ],
};
