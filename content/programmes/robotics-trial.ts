import type { TrialSession } from "@/content/types";

/**
 * Shared trial-session plan for robotics (both 5-8 and 8-12).
 * 60 minutes total. Same plan for both age groups.
 *
 * The trial is kit-orientation + a head-start on the Crane build. No experiment
 * segment in the trial — the full experiment + build + experience-book loop
 * kicks in from session 1 onward.
 */
export const ROBOTICS_TRIAL_SESSION: TrialSession = {
  intro:
    "the trial session is 60 minutes. same plan for both age groups. a first-time child meets every component in the kit, starts their own crane build, and leaves knowing exactly where they'll pick up next session.",
  segments: [
    {
      name: "Before children arrive — setup",
      time: "before",
      objective:
        "crane kit components spread out on the table — not in the tray, not organised. just laid out in a big spread so children see them the moment they walk in. model manual face-down beside each spot.",
    },
    {
      name: "When children walk in",
      time: "1 min",
      objective:
        "teacher says nothing. points at the components on the table.",
      setupLine: "pick up one thing. any one thing. just one.",
      howToPlay:
        "each child picks up one component. some will pick the pulley. some will pick a beam. some will pick a screw. \"what do you think it does?\" fast round — every child holds up their piece and says one guess. teacher does not confirm or correct anything — just listens. \"by the end of today you are going to know exactly what every single one of these does. and you are going to have started building a crane with them.\"",
    },
    {
      name: "Game context — say this early",
      time: "1 min",
      objective:
        "a short framing the teacher reads to the group once they've picked up a part — sets expectation for what today's build is and how much choice children have.",
      howToPlay:
        "\"did you know we're going to play lots of different building games today? we'll use parts and connectors to build things that move, roll, and spin. we'll try different challenges and see what works and what doesn't. you can build on your own or work with others to create something bigger. every game is different — sometimes you build, sometimes you test, and sometimes you improve!\"",
    },
    {
      name: "Kit orientation",
      time: "10 min",
      objective:
        "teacher picks up each component one at a time, holds it up, names it, shows one specific thing about it. every child tries the action on their own piece before the group moves to the next component.",
      howToPlay:
        "M beam — \"this is your main building block. every structure you build starts here.\" teacher connects two M beams using an I clamp, disconnects them, passes to the nearest child. child connects and disconnects once. passes on. around the table fast. · I clamp — \"this is what holds beams together. one clamp — two beams locked.\" teacher demonstrates clamping at a right angle, shows the wobble when loose and the hold when firm. every child tries: clamp two beams, check no wobble, unclamp. · Screw, nut & spanner — \"these three work together. the bolt goes through the hole. the nut catches it from the other side. the spanner turns it firm — but not too tight or the thread strips.\" teacher threads a bolt through an M beam, fits the nut snug with fingers, tightens with the spanner to firm, then keeps going to show stripping — \"that's too tight. you feel the resistance change. stop before that.\" every child threads one bolt, fits a nut, tightens to firm, stops. · Long axle — \"the rotating part. wheels and pulleys go on this.\" teacher slides an axle through two parallel beams, spins it to show it rotates freely. \"if it doesn't spin freely, something is misaligned — that is the first thing to check.\" · Pulley — \"this is the part that makes a crane a crane.\" teacher slides the pulley onto the axle, loops rope over the groove, pulls one end — the other end moves. \"the rope sits in the groove — not on top, in the groove. on top it slips and you lose control.\" shows both. every child places the pulley on the axle and checks the rope sits in the groove. · Spanner — \"two sizes. smaller end for small nuts. bigger end for larger ones.\" every child tries both ends on the nut they tightened.",
      materials: [
        "M beams, I clamps, screws + nuts, long axle, pulley, rope, spanner — one set per child",
        "Kit components spread loose on the table — not in trays",
      ],
    },
    {
      name: "Build — Crane",
      time: "42 min",
      objective:
        "each child starts their own crane build from their personal kit and the Model Manual. the teacher circulates with only four questions — never fixes, never tells. the build ends wherever the child is at the 38-minute mark; that becomes their day 1.",
      setupLine:
        "now you know your parts. now you build.",
      howToPlay:
        "each child gets their model manual. \"three minutes — read the manual. find the finished crane page. know what you're building toward before you pick up a single piece.\" children read. teacher reads alongside. after 3 minutes: \"build. one step at a time — read the step, do the step, check it, move to the next. if something isn't working, the answer is in the manual. that is what it is there for.\" children build. teacher circulates with only four questions — one per child per pass: \"what is not working? what will you try?\" · \"what did you change? what happened?\" · \"which change made the bigger difference?\" · \"point to the part that did the most important job.\" teacher never fixes. never tells. · during the build, teacher drops one connection at a time, naturally: \"every construction crane you've ever seen on a building site — same arm, same axle, same pulley. just bigger.\" · \"elevators work on the same system. a rope, a pulley, a counterweight. when you go up, the counterweight goes down. the whole building is full of what you are assembling right now.\" · \"when NASA landed the Curiosity rover on Mars, they built a hovering rocket with a pulley and cable system that lowered it slowly onto the surface. they called it the Sky Crane. same idea as your crane.\" · at the 38-minute mark: \"whatever stage you're at — that's your day 1. next session you continue from exactly here.\"",
      materials: [
        "Model Manual — L1_Crane.pdf (1 per child)",
        "Personal Crane kit — full component set per child",
        "Child-sized spanner",
      ],
    },
    {
      name: "Closing — What would you lift?",
      time: "7 min",
      objective:
        "teacher sits with the group and hears one vivid wish per child, then connects one of them to something real.",
      setupLine:
        "your crane is going to lift things next session. real things. so i want to know — if your crane could be any size, as tall and as strong as you wanted, what is the one most interesting thing in the world you would use it to lift? and where would you move it to?",
      howToPlay:
        "fast round. every child answers. one sentence each. teacher celebrates the most vivid and specific ones. then picks one answer and connects it to something real. · examples: \"a whale\" → \"marine biologists actually use crane systems to move stranded whales back into the ocean. same pulley principle.\" · \"a house\" → \"house moving companies lift entire buildings off their foundations and move them down the road. the whole house. moving.\" · \"a rocket\" → \"every rocket you've ever seen launch — a crane on the launch tower positioned it vertically on the pad. a crane put it there.\" · \"a mountain\" → \"that one we haven't done yet. you might be the one to figure it out.\"",
    },
    {
      name: "Last 1 minute",
      time: "1 min",
      objective:
        "short close that names the three segments of every regular robotics session so the child leaves knowing what to expect next time.",
      howToPlay:
        "\"every oh. robotics session — experiment, build, experience book. your crane is waiting exactly where you left it next session.\" · \"see you then.\"",
    },
  ],
};
