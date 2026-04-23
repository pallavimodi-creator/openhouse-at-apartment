import type { TrialSession } from "@/content/types";

/**
 * Robotics trial-session plans. Different pacing and depth for each age
 * group — 5-8 leans on body-first play and a flexible build, 8-12 leans
 * harder into real-world connection and question-led facilitation.
 *
 * Both are 60 minutes, focused on a single Crane build with a warm-up
 * game, framing, main build, and debrief.
 */

export const ROBOTICS_TRIAL_SESSION_5_8: TrialSession = {
  intro:
    "the trial session is 60 minutes for ages 5–8. body-first warm-up, short framing, and a flexible crane build. the aim is for every child to leave having made their own crane and having felt what robotics sessions are like.",
  segments: [
    {
      name: "Before children arrive — setup",
      time: "before",
      objective:
        "crane model kits ready. tables clear, parts organised. no extra materials needed for the first activity.",
    },
    {
      name: "When children walk in",
      time: "2 min",
      objective:
        "no sitting yet. teacher brings the group into a standing circle to start the warm-up.",
      setupLine: "don't sit. come here. stand in a circle.",
    },
    {
      name: "Warm-up game (no material)",
      time: "15 min",
      objective:
        "engagement through body play — children act out machines with their bodies, then suggest their own, then switch to describing without showing.",
      setupLine:
        "we're going to play a quick game. i say something — you show me how it moves using your body.",
      howToPlay:
        "round 1 — teacher calls: \"crane lifting,\" \"elevator going up,\" \"door opening,\" \"pulley pulling.\" children act each one out. · round 2 — \"now your turn — say something that moves.\" children suggest, group acts. · round 3 — light variation: \"now don't show. just tell me. i'll guess.\" · keep it playful, fast, no over-explanation.",
    },
    {
      name: "Game context — say this early",
      time: "1 min",
      objective:
        "short framing so children know what today is and what they'll leave with.",
      howToPlay:
        "\"did you know we're going to play building games today? we'll try things with our body first, and then build a real crane. you'll use real parts to make something that moves. you can try again if it doesn't work. by the end, you'll have made your own crane.\"",
    },
    {
      name: "Main build — Crane model",
      time: "35 min",
      objective:
        "each child builds their own crane. teacher helps only when needed, does not fix things, does not over-explain. if something doesn't work the child tries again.",
      setupLine: "now we build. today, you're making your own crane.",
      howToPlay:
        "each child builds their own model. teacher helps only when needed, never fixes things, never over-explains. if something doesn't work → child tries again.",
      materials: [
        "Model Manual — L1_Crane.pdf (1 per child)",
        "Personal Crane kit — full component set per child",
        "Child-sized spanner",
      ],
    },
    {
      name: "Last 8–10 min — Simple debrief",
      time: "8–10 min",
      objective:
        "short, flexible debrief. may be shorter if build runs long. 2–3 children share their crane.",
      howToPlay:
        "\"what did you build today?\" · \"show me your crane.\" · \"what was hard?\" · \"did it move or lift something?\" · let 2–3 children share.",
    },
    {
      name: "Last 2 minutes — Close",
      time: "2 min",
      objective:
        "name the three parts of every robotics session so the child leaves knowing what to expect next time.",
      howToPlay:
        "\"every time you come to robotics — three things happen.\" · \"we start with a quick game.\" · \"then you build something real.\" · \"then we talk about what happened.\" · \"next time — new build.\"",
    },
  ],
};

export const ROBOTICS_TRIAL_SESSION_8_12: TrialSession = {
  intro:
    "the trial session is 60 minutes for ages 8–12. more thinking, less acting. the warm-up pushes thinking; the build is independent with question-led facilitation; the debrief connects the model to the real world.",
  segments: [
    {
      name: "Before children arrive — setup",
      time: "before",
      objective:
        "crane kits ready. tables organised. clean, focused build environment.",
    },
    {
      name: "When children walk in",
      time: "2 min",
      objective:
        "no sitting yet. teacher brings the group into a standing circle.",
      setupLine: "come here. stand in a circle.",
    },
    {
      name: "Warm-up game (no material)",
      time: "15 min",
      objective:
        "engagement through thinking — children explain or act machines, name where they've seen them, then identify what is helping.",
      setupLine:
        "i'll say a machine. you tell me how it works — or show it.",
      howToPlay:
        "round 1 — teacher prompts: \"crane,\" \"pulley,\" \"elevator,\" \"well bucket.\" children explain or act. · round 2 — \"where have you seen this in real life?\" short answers. · round 3 — \"what makes it easier — what is helping?\" push thinking slightly.",
    },
    {
      name: "Game context — say this early",
      time: "1 min",
      objective:
        "short framing that sets expectations — the build may not work first time, that's expected, and children figure out what to change.",
      howToPlay:
        "\"today we're going to build a real crane model. you'll use parts to make something that actually works. it may not work the first time — that's expected. you'll figure out what to change and improve it. by the end, you'll understand how cranes work in real life.\"",
    },
    {
      name: "Main build — Crane model",
      time: "30 min",
      objective:
        "each child builds independently. teacher asks questions, does not fix, does not give step-by-step instructions. the facilitation style aligns directly with the programme approach.",
      setupLine: "now we build. each of you will make your own crane.",
      howToPlay:
        "each child builds independently. teacher never fixes, never gives step-by-step instructions. teacher uses prompts only: \"what is not working?\" · \"what will you try?\" · \"which part is causing the issue?\" this aligns directly with the programme's facilitation approach.",
      materials: [
        "Model Manual — L1_Crane.pdf (1 per child)",
        "Personal Crane kit — full component set per child",
        "Child-sized spanner",
      ],
    },
    {
      name: "Last 10 min — Real-life debrief",
      time: "10 min",
      objective:
        "structured debrief connected to the real world. start broad, narrow to the model, then push thinking with a hypothetical.",
      howToPlay:
        "ask: \"where do you see cranes in real life?\" · \"what do they lift?\" · \"why don't people just lift it by hand?\" · then connect to the model: \"which part of your crane is doing the main job?\" · \"what is helping it lift?\" · push thinking: \"if you had to lift something heavier, what would you change?\" · \"what do you think would happen if this part was removed?\" · let children think and respond — don't correct immediately.",
    },
    {
      name: "Last 2 minutes — Close",
      time: "2 min",
      objective:
        "name the three parts of every robotics session so the child leaves knowing what to expect next time.",
      howToPlay:
        "\"every robotics session has three parts.\" · \"we start by thinking about real machines.\" · \"then you build something real.\" · \"then we connect it to real life.\" · \"next time — new model, new challenge.\"",
    },
  ],
};
