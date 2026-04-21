// ─── Teacher Manual Content ────────────────────────────────
// Full facilitation manuals for art and speaking experience books.

export interface ManualSubsection {
  title: string;
  content: string;
}

export interface ManualSection {
  title: string;
  content: string; // Rendered as paragraphs (split on \n\n)
  subsections?: ManualSubsection[];
}

export interface ManualConfig {
  slug: string;
  title: string;
  subtitle: string;
  intro: string;
  sections: ManualSection[];
}

// ─── Art 5-8 Manual ────────────────────────────────────────

const art58Manual: ManualConfig = {
  slug: "art-5-8",
  title: "teacher manual",
  subtitle: "art & design · ages 5-8 · facilitation guide",
  intro:
    "this manual is your companion for facilitating the art & design experience book for ages 5-8. it explains every section of the book, how to observe children as they work, and how to write meaningful feedback that parents can understand and act on. read it once before your first session, and refer back to specific sections as you need them.",

  sections: [
    // 1. what this book is
    {
      title: "what this book is",
      content:
        "the experience book is a year-long record of one child's growth in art & design. it is not a portfolio of finished work. it is a log of what happened in every session — what they practised, what they made, and what you observed.\n\nyour job as a teacher is to observe, not evaluate. you are not grading the child. you are watching closely and recording what you see — which skills are emerging, which are strengthening, and which need more time. the book turns your observations into a story that parents can follow at home.\n\nevery entry you write should describe something you actually saw the child do. if you did not see it, do not write it.",
      subsections: [],
    },

    // 2. the daily log
    {
      title: "the daily log",
      content:
        "the daily log is the core of the book. you fill it in at the end of every session, together with the child. it takes about three minutes.",
      subsections: [
        {
          title: "art gym",
          content:
            "write what the warm-up exercise was. keep it factual: 'drew shells from observation cards' or 'blind contour of a shoe'. one line is enough.",
        },
        {
          title: "artgames",
          content:
            "write which game was played: 'colour memory', 'texture bingo', 'shape relay'. if the child remembers the name, let them say it.",
        },
        {
          title: "artiverse",
          content:
            "record two things: the medium or tool used (e.g. poster paints, oil pastels) and the technique or theme explored (e.g. colour mixing, warm and cool worlds). these two fields together tell the parent what happened during the main making time.",
        },
        {
          title: "worth remembering",
          content:
            "this is an optional note for anything you want to remember about the session — a moment of focus, something the child said, a breakthrough. it is for you and the parent, not a grade. keep it warm and specific: 'spent five minutes mixing to match the exact green of a leaf' is better than 'worked hard today'.",
        },
      ],
    },

    // 3. the skill tracker
    {
      title: "the skill tracker",
      content:
        "the skill tracker sits at the bottom of the daily log. it records where the child is right now across the five skill areas: line & texture, shape & form, colour & painting, balance & composition, and imagination & collaboration.\n\neach skill has three levels:\n\nstarting out → getting there → going strong\n\nyou mark one level per skill, per session. over time, the dots form a visible pattern that shows growth.",
      subsections: [
        {
          title: "the three steps",
          content:
            "starting out means the child is exploring the skill with support. they may need prompting, reminders, or demonstrations. getting there means they can do it with some independence but not yet consistently. going strong means the skill is reliable — they use it without prompting and can apply it in new contexts.\n\nthe progression looks like this:\n\n· · ·  →  · · ●  →  · ● ●  →  ● ● ●\n\nstarting out is not a problem. it is where every skill begins. getting there is not a failure. it is the middle of the journey. going strong is not the end — it means the child is ready for the next ability within that skill.",
        },
        {
          title: "the one-direction rule",
          content:
            "a skill only moves forward. if you marked 'getting there' last session, you do not move it back to 'starting out' this session even if the child had a harder day. growth is not linear, but the tracker records the highest consistent level you have observed.",
        },
        {
          title: "the no-rush rule",
          content:
            "do not move a skill forward to make the child (or a parent) feel good. only mark 'going strong' when you have seen it reliably, across more than one session. one great moment is not enough — you need to see it again.",
        },
        {
          title: "the never-skip rule",
          content:
            "do not skip from 'starting out' to 'going strong'. every skill must pass through 'getting there'. the middle step exists because real learning has a middle.",
        },
        {
          title: "the mixed-skills rule",
          content:
            "it is completely normal for a child to be 'going strong' in one skill and 'starting out' in another. children are not balanced. the tracker should reflect what you actually see, not what you expect.",
        },
      ],
    },

    // 4. what to observe — skill by skill
    {
      title: "what to observe — skill by skill",
      content:
        "this section tells you exactly what to look for when deciding where a child sits on the tracker. each skill area has four numbered abilities. the tracker level depends on how many abilities the child can demonstrate.",
      subsections: [
        {
          title: "line & texture",
          content:
            "the four abilities are: (1) identifies marks different tools make, (2) makes different line types with intention, (3) combines line types to create texture, (4) draws using observed line and texture.\n\nstarting out: the child is working on ability 1. they are exploring tools and noticing that different tools make different marks, but they need prompting to try new ones.\n\ngetting there: the child can do abilities 2-3. they make different line types on purpose — straight, wavy, zigzag — and are beginning to combine them to create texture. they may not be consistent yet.\n\ngoing strong: the child can do all four abilities. they observe real textures and translate them into drawn marks. they choose line types deliberately to create the effect they want.",
        },
        {
          title: "shape & form",
          content:
            "the four abilities are: (1) traces and draws basic 2D shapes, (2) combines shapes to draw recognisable objects, (3) modifies and combines shapes creatively, (4) identifies and draws simple 3D forms.\n\nstarting out: the child is working on ability 1. they can trace and draw basic shapes (circles, squares, triangles) but may need support to keep them regular.\n\ngetting there: the child can do abilities 2-3. they combine shapes to make recognisable things — a house from a triangle and rectangle, a person from circles and lines — and are starting to modify shapes creatively.\n\ngoing strong: the child can do all four abilities. they notice 3D forms (cylinders, cubes, spheres) in real objects and can begin to draw them. they use shapes as building blocks for more complex drawings.",
        },
        {
          title: "colour & painting",
          content:
            "the four abilities are: (1) paints with control and early mixing, (2) mixes primary to secondary reliably, (3) identifies warm and cool colour families, (4) creates tints and shades.\n\nstarting out: the child is working on ability 1. they can hold a brush and apply paint, and they are beginning to mix colours — but the results are often accidental rather than intentional.\n\ngetting there: the child can do abilities 2-3. they can mix primary colours to get secondaries (red + yellow = orange) reliably, and they are beginning to sort colours into warm and cool families.\n\ngoing strong: the child can do all four abilities. they can create tints by adding white and shades by adding black or a darker colour. they mix with intention and can predict roughly what they will get.",
        },
        {
          title: "balance & composition",
          content:
            "the four abilities are: (1) fills the whole page, (2) understands foreground and background, (3) draws overlapping for depth and uses a horizon line, (4) understands colour and shape placement for balance.\n\nstarting out: the child is working on ability 1. they tend to draw small in one corner. you are helping them use the whole page and think about where things go.\n\ngetting there: the child can do abilities 2-3. they understand that some things are 'in front' and some are 'behind', and they are starting to overlap objects and use a horizon line to show depth.\n\ngoing strong: the child can do all four abilities. they think about where colours and shapes sit on the page to create a sense of balance. they make placement decisions rather than just filling space.",
        },
        {
          title: "imagination & collaboration",
          content:
            "the four abilities are: (1) experiments freely, (2) generates unusual ideas, (3) listens, contributes, and decides together, (4) describes an imagined world with enough detail for others to picture it.\n\nstarting out: the child is working on ability 1. they are willing to try new things and play with materials without worrying about the result. they may need encouragement to take the first step.\n\ngetting there: the child can do abilities 2-3. they come up with ideas that are not the obvious first answer, and they can work with others — listening, contributing, and making decisions as a group.\n\ngoing strong: the child can do all four abilities. they can describe an imagined scene or world in enough detail that you can picture it. their ideas are specific rather than generic, and they build on other people's contributions.",
        },
      ],
    },

    // 5. the two daily note lines
    {
      title: "the two daily note lines",
      content:
        "at the bottom of every daily log are two lines:\n\nalready doing great at: write one specific thing the child did well today. use the skill names and describe what you saw. 'mixed warm colours with control' is better than 'did great with painting'.\n\nlet's focus on next: write one thing to work on next session. frame it as a next step, not a weakness. 'try drawing overlapping shapes for depth' is better than 'composition needs work'.\n\nthese two lines are the most-read part of the daily log. parents look at them first. make them count.",
      subsections: [],
    },

    // 6. the art journey
    {
      title: "the art journey",
      content:
        "the art journey is a one-page summary written after every 8 sessions. it tells the parent how their child is growing as an artist. you should be able to write it in about 10 minutes if you have been filling in daily logs consistently.",
      subsections: [
        {
          title: "this month",
          content:
            "a 1-2 sentence overview of what the class explored during this block: mediums, techniques, themes. this is pre-written in the book for each journey. you do not need to change it unless you deviated significantly from the plan.",
        },
        {
          title: "one piece we loved",
          content:
            "name one specific piece of work the child made that stood out. describe what made it special — the colour choices, the level of detail, the way they solved a problem. be specific enough that the parent can picture it.",
        },
        {
          title: "how they are growing",
          content:
            "this is the most important field. for each of the five skills, write a short phrase describing where the child is. use language like:\n\nline & texture: 'making deliberate line choices' / 'beginning to observe real textures' / 'translating observed texture into drawn marks'\n\nshape & form: 'combining shapes to make recognisable objects' / 'starting to notice proportions' / 'drawing simple 3D forms from observation'\n\ncolour & painting: 'mixing primaries to secondaries reliably' / 'beginning to identify warm and cool' / 'creating tints and shades with control'\n\nbalance & composition: 'filling the whole page' / 'showing foreground and background' / 'overlapping for depth and using a horizon line'\n\nimagination & collaboration: 'experimenting freely with new materials' / 'generating unusual ideas' / 'describing imagined worlds with specific detail'\n\nyou do not need to write all five every time. pick the 2-3 where you have the most to say.",
        },
        {
          title: "next month",
          content:
            "a forward-looking sentence about what the child will work on next. tie it to what you observed: 'next month we will push further into colour mixing — Maya is ready to start exploring tints and shades'. this gives the parent something to anticipate and ask about.",
        },
      ],
    },

    // 7. language rules
    {
      title: "language rules",
      content:
        "every word you write in this book will be read by a parent. these rules make sure your language builds trust and helps the child.",
      subsections: [
        {
          title: "always forward-looking",
          content:
            "never write what a child cannot do. write what they are working towards. 'beginning to combine shapes' is forward-looking. 'cannot draw 3D forms' is not. even when a child is struggling, describe the direction of travel, not the gap.",
        },
        {
          title: "always specific",
          content:
            "avoid general praise. 'great job today' means nothing. 'spent ten minutes mixing to match the exact green of a leaf' means everything. if you cannot be specific, you were not watching closely enough.",
        },
        {
          title: "always about what you saw",
          content:
            "do not write about the child's character, talent, or potential. write about what you observed them do. 'drew overlapping shapes to show depth' is an observation. 'has real talent for composition' is a judgement. observations are useful. judgements are noise.",
        },
        {
          title: "the final test",
          content:
            "before you write anything, ask yourself: would I be happy for the child to read this when they are older? if the answer is yes, write it. if not, rephrase until it is.",
        },
      ],
    },

    // 8. for new teachers
    {
      title: "for new teachers",
      content:
        "if this is your first time facilitating, here is what matters most.",
      subsections: [
        {
          title: "watch before you write",
          content:
            "spend your first two sessions just watching. do not try to fill in every field perfectly. get a feel for each child first. the daily log is forgiving — a blank 'worth remembering' field is better than a forced observation.",
        },
        {
          title: "the tracker is not a test",
          content:
            "parents will see the tracker and may ask why their child is 'starting out' in a skill. explain that starting out is where every skill begins, and that the tracker shows a journey, not a score. most children will be at different levels across different skills — that is normal and expected.",
        },
        {
          title: "keep the daily log short",
          content:
            "the daily log should take three minutes per child. if it is taking longer, you are writing too much. one sentence per field is enough. save your longer observations for the art journey.",
        },
        {
          title: "use the art journey to tell the story",
          content:
            "the art journey is where you connect the dots. the daily log records what happened. the art journey explains what it means. if you have been filling in daily logs consistently, the journey almost writes itself.",
        },
        {
          title: "ask for help",
          content:
            "if you are unsure where a child sits on the tracker, ask another teacher to observe the same child for one session. two sets of eyes are better than one, especially in the first month.",
        },
      ],
    },
  ],
};

// ─── Art 8-12 Manual ───────────────────────────────────────

const art812Manual: ManualConfig = {
  slug: "art-8-12",
  title: "teacher manual",
  subtitle: "art & design · ages 8-12 · facilitation guide",
  intro:
    "this manual is your companion for facilitating the art & design experience book for ages 8-12. children in this age group are more self-aware and more capable of intentional work. the observation standards are higher — you are looking for deliberate choices, not just emerging skills. read this manual once before your first session, and refer back as needed.",

  sections: [
    // 1. what this book is
    {
      title: "what this book is",
      content:
        "the experience book is a year-long record of one child's growth in art & design. it is not a portfolio. it is a log of what happened — what they practised, what they made, and what you observed.\n\nyour job as a teacher is to observe, not evaluate. you are watching for intentional choices: does the child choose a medium because it serves their idea? do they plan before they make? can they explain what they did and why?\n\nat this age, the line between 'getting there' and 'going strong' often depends on whether the child can articulate their choices — not just make them. this is the articulation rule, and it applies especially to imagination & collaboration.\n\nevery entry you write should describe something you actually saw or heard the child do. if you did not see it, do not write it.",
      subsections: [],
    },

    // 2. the daily log
    {
      title: "the daily log",
      content:
        "the daily log is the core of the book. you fill it in at the end of every session, together with the child. it takes about three minutes.",
      subsections: [
        {
          title: "art gym",
          content:
            "write what the warm-up exercise was. at this level, art gym includes extension challenges: 'drew shells from observation — extension: drew the same shell from memory'. record both.",
        },
        {
          title: "artgames",
          content:
            "write which game was played and, briefly, what skill it targeted: 'colour memory — tertiary mixing' or 'texture match — cross-hatching'.",
        },
        {
          title: "artiverse",
          content:
            "record the medium or tool used (e.g. watercolours, acrylics), the technique or theme explored (e.g. wet-on-wet, landscape), and the thumbnail sketch. the thumbnail sketch is a small plan the child draws before working on A3 — record what it showed or what decision it helped them make.",
        },
        {
          title: "one-sentence share",
          content:
            "at the end of artiverse, each child says one sentence about a decision they made. record it verbatim if you can: 'i used cool colours in the background to make the warm foreground come forward'. the one-sentence share is a powerful diagnostic tool — it tells you whether the child is making intentional choices and can articulate them.",
        },
        {
          title: "worth remembering",
          content:
            "an optional note for anything significant: a breakthrough, a struggle overcome, a moment of genuine creative problem-solving. keep it specific and observational.",
        },
      ],
    },

    // 3. the skill tracker
    {
      title: "the skill tracker",
      content:
        "the skill tracker records where the child is across five skill areas: line & texture, shape & form, colour & painting, balance & composition, and imagination & collaboration.\n\neach skill has three levels:\n\nstarting out → getting there → going strong\n\nyou mark one level per skill, per session. over time, the pattern shows growth.",
      subsections: [
        {
          title: "the three steps",
          content:
            "starting out means the child is exploring the skill with support. getting there means they can demonstrate it with some independence but not yet consistently. going strong means the skill is reliable and intentional — they use it without prompting and can apply it in unfamiliar contexts.\n\nthe progression looks like this:\n\n· · ·  →  · · ●  →  · ● ●  →  ● ● ●\n\nfor the 8-12 age group, 'going strong' has a higher bar. it is not enough to use a skill — the child should be able to explain why they used it. this is especially true for imagination & collaboration, where 'going strong' requires the child to articulate the choices they made.",
        },
        {
          title: "the one-direction rule",
          content:
            "a skill only moves forward. if you marked 'getting there' last session, you do not move it back to 'starting out' even on a harder day. the tracker records the highest consistent level you have observed.",
        },
        {
          title: "the no-rush rule",
          content:
            "do not advance a skill to make anyone feel good. only mark 'going strong' when you have seen it reliably across multiple sessions. one great moment is not enough.",
        },
        {
          title: "the never-skip rule",
          content:
            "every skill must pass through 'getting there'. no jumping from 'starting out' to 'going strong'. the middle step exists because real learning has a middle.",
        },
        {
          title: "the mixed-skills rule",
          content:
            "it is completely normal for a child to be 'going strong' in one skill and 'starting out' in another. the tracker should reflect what you actually see, not what you expect.",
        },
        {
          title: "the articulation rule (ages 8-12)",
          content:
            "for imagination & collaboration, 'going strong' requires that the child can articulate the choices they made — not just make them. use the one-sentence share as your diagnostic: if a child consistently explains what they did and why, they are going strong. if they make good choices but cannot yet explain them, they are getting there.",
        },
      ],
    },

    // 4. what to observe — skill by skill
    {
      title: "what to observe — skill by skill",
      content:
        "this section tells you exactly what to look for when deciding where a child sits on the tracker. each skill has four numbered abilities. the tracker level depends on how many the child can demonstrate.\n\nfor the 8-12 age group, you have two extra diagnostic tools: the one-sentence share (what the child says about their work at the end of artiverse) and the thumbnail sketch (the plan they draw before starting on A3). both reveal whether choices are intentional.",
      subsections: [
        {
          title: "line & texture",
          content:
            "the four abilities are: (1) uses different line types with control, (2) observes and draws textures from real objects, (3) uses hatching, cross-hatching, and stippling to build texture, (4) creates multi-layered artworks where texture is a compositional choice.\n\nstarting out: the child is working on ability 1. they can use different line types but may not yet control them precisely or choose them deliberately.\n\ngetting there: the child can do abilities 2-3. they observe real textures and draw them, and they are beginning to use mark-making techniques like hatching and cross-hatching to build surface quality.\n\ngoing strong: the child can do all four abilities. texture is not just present — it is a deliberate compositional choice. they use texture to create emphasis, contrast, or mood.",
        },
        {
          title: "shape & form",
          content:
            "the four abilities are: (1) identifies and draws basic 3D forms, (2) combines shapes with recognisable proportions, (3) observes proportions and adjusts, (4) creates complex compositions with accurate forms.\n\nstarting out: the child is working on ability 1. they can identify and attempt 3D forms (cubes, cylinders, spheres) but may struggle with proportion or perspective.\n\ngetting there: the child can do abilities 2-3. they combine shapes with recognisable proportions and are starting to self-correct — looking at their drawing, comparing it to the subject, and adjusting.\n\ngoing strong: the child can do all four abilities. they create complex compositions where forms are accurate and proportional. they plan their compositions using thumbnail sketches.",
        },
        {
          title: "colour & painting",
          content:
            "the four abilities are: (1) mixes to produce tertiary colours, (2) uses layering for gradients, highlights, and shadows, (3) uses colour to show depth (warm advances, cool recedes), (4) chooses and justifies a palette for a specific mood.\n\nstarting out: the child is working on ability 1. they can mix primary to secondary and are beginning to produce tertiary colours, but may not yet do so reliably.\n\ngetting there: the child can do abilities 2-3. they use layering to build gradients and shadows, and they are beginning to understand atmospheric perspective — warm colours come forward, cool colours recede.\n\ngoing strong: the child can do all four abilities. they choose a palette for a specific mood and can explain why. their colour choices are intentional and consistent across a piece.",
        },
        {
          title: "balance & composition",
          content:
            "the four abilities are: (1) uses size and placement for visual balance, (2) creates foreground, middle ground, and background with intention, (3) uses overlap, spacing, and perspective for depth, (4) uses contrast to draw the eye to a focal point.\n\nstarting out: the child is working on ability 1. they think about where things go on the page but may not yet create a clear sense of balance.\n\ngetting there: the child can do abilities 2-3. they create layered compositions with foreground, middle ground, and background, and they use overlap and spacing to suggest depth.\n\ngoing strong: the child can do all four abilities. they use contrast — in colour, size, or detail — to direct the viewer's eye to a focal point. their compositions are planned, not accidental.",
        },
        {
          title: "imagination & collaboration",
          content:
            "the four abilities are: (1) creates detailed drawings from imagination, (2) combines materials and techniques intentionally, (3) works with others on creative differences, (4) makes intentional choices and articulates why.\n\nstarting out: the child is working on ability 1. they can create from imagination but the results may lack detail or specificity.\n\ngetting there: the child can do abilities 2-3. they combine materials and techniques with purpose, and they can navigate creative disagreements when working in a group.\n\ngoing strong: the child can do all four abilities, including articulation. they make intentional choices and can explain them — in the one-sentence share, in conversation, or when asked. remember the articulation rule: making good choices is 'getting there'; making good choices and explaining them is 'going strong'.",
        },
      ],
    },

    // 5. the two daily note lines
    {
      title: "the two daily note lines",
      content:
        "at the bottom of every daily log are two lines:\n\nalready doing great at: write one specific thing the child did well today. use skill names and describe what you saw. 'used cool receding colours to push the background back' is better than 'good use of colour'.\n\nlet's focus on next: write one forward-looking step. 'try planning the focal point in your thumbnail before starting on A3' is better than 'needs to think about composition more'.\n\nthese two lines are the most-read part of the daily log. parents look at them first.",
      subsections: [],
    },

    // 6. the art journey
    {
      title: "the art journey",
      content:
        "the art journey is a one-page summary written after every 8 sessions. it tells the parent how their child is growing. you should be able to write it in about 10 minutes if your daily logs are consistent.",
      subsections: [
        {
          title: "this month",
          content:
            "a 1-2 sentence overview of what the class explored. this is pre-written in the book. you only need to change it if you deviated significantly from the plan.",
        },
        {
          title: "one piece we loved",
          content:
            "name one specific piece the child made. describe what made it stand out — the technique, the intention, the problem-solving. be specific enough that the parent can picture it.",
        },
        {
          title: "how they are growing",
          content:
            "for each of the five skills, write a short phrase. use language like:\n\nline & texture: 'using hatching to build tonal range' / 'observing and translating real textures' / 'making texture a compositional choice'\n\nshape & form: 'combining shapes with accurate proportions' / 'self-correcting by comparing drawing to subject' / 'creating complex multi-form compositions'\n\ncolour & painting: 'mixing tertiary colours reliably' / 'using warm and cool for depth' / 'choosing and justifying a palette for mood'\n\nbalance & composition: 'creating layered foreground/middle/background' / 'using overlap for depth' / 'using contrast to direct the eye to a focal point'\n\nimagination & collaboration: 'combining materials with intention' / 'navigating creative differences in group work' / 'articulating choices clearly in the one-sentence share'\n\npick the 2-3 skills where you have the most to say.",
        },
        {
          title: "next month",
          content:
            "a forward-looking sentence tied to what you observed: 'next month we will explore atmospheric perspective — Rohan is ready to use colour temperature to create depth in his landscapes'.",
        },
      ],
    },

    // 7. language rules
    {
      title: "language rules",
      content:
        "every word you write in this book will be read by a parent. these rules make sure your language builds trust and helps the child.",
      subsections: [
        {
          title: "always forward-looking",
          content:
            "never write what a child cannot do. write what they are working towards. 'beginning to observe proportions and self-correct' is forward-looking. 'proportions are inaccurate' is not.",
        },
        {
          title: "always specific",
          content:
            "avoid general praise. 'great work today' means nothing. 'used three layers of cross-hatching to build shadow under the jar' means everything. if you cannot be specific, you were not watching closely enough.",
        },
        {
          title: "always about what you saw",
          content:
            "do not write about talent or potential. write about what you observed. 'chose a cool palette and explained it was to create a calm mood' is an observation. 'has a natural eye for colour' is a judgement.",
        },
        {
          title: "the final test",
          content:
            "before you write anything, ask yourself: would I be happy for the child to read this when they are older? if yes, write it. if not, rephrase until it is.",
        },
      ],
    },

    // 8. for new teachers
    {
      title: "for new teachers",
      content:
        "if this is your first time facilitating, here is what matters most.",
      subsections: [
        {
          title: "watch before you write",
          content:
            "spend your first two sessions observing. do not try to fill every field perfectly. get a feel for each child. a blank 'worth remembering' is better than a forced observation.",
        },
        {
          title: "the tracker is not a test",
          content:
            "parents may ask why their child is 'starting out'. explain that starting out is where every skill begins and the tracker shows a journey, not a score. most children will be at different levels across different skills.",
        },
        {
          title: "use the one-sentence share",
          content:
            "the one-sentence share at the end of artiverse is your best diagnostic tool for the 8-12 age group. listen carefully to what children say about their work. it tells you whether choices are intentional or accidental. record it in the daily log whenever you can.",
        },
        {
          title: "use the thumbnail sketch",
          content:
            "the thumbnail sketch is a small plan drawn before starting on A3. it tells you whether the child is planning their composition or jumping straight in. over time, the quality of thumbnails reveals growth in balance & composition and imagination & collaboration.",
        },
        {
          title: "keep the daily log short",
          content:
            "three minutes per child. one sentence per field. save longer observations for the art journey.",
        },
        {
          title: "ask for help",
          content:
            "if you are unsure where a child sits on the tracker, ask another teacher to observe the same child for one session. two sets of eyes are better than one.",
        },
      ],
    },
  ],
};

// ─── Speaking 5-8 Manual ───────────────────────────────────

const speaking58Manual: ManualConfig = {
  slug: "speaking-5-8",
  title: "teacher manual",
  subtitle: "public speaking · ages 5-8 · facilitation guide",
  intro:
    "this manual is your companion for facilitating the speaking experience book for ages 5-8. it explains the lanyard system, how to observe children during games and performances, and how to write feedback that parents can understand. read it once before your first session, and refer back as needed.",

  sections: [
    // 1. what this book is
    {
      title: "what this book is",
      content:
        "the experience book is a year-long record of one child's growth in public speaking. it is not a performance log or a report card. it tracks what happened in every session — the games they played, the skills they practised, and what you observed.\n\nyour job is to observe, not evaluate. you are watching for specific speaking behaviours and recording what you see. the book turns your observations into a story that parents can follow.\n\nevery entry should describe something you actually saw or heard the child do.",
      subsections: [],
    },

    // 2. the lanyard system
    {
      title: "the lanyard system",
      content:
        "the lanyard is the child's speaker badge. when they wear it during showtime, it means they are the speaker and the group gives them full attention. the lanyard system is how you track which abilities each child is practising.",
      subsections: [
        {
          title: "how lanyards work",
          content:
            "each lanyard has an ability code printed on it. before showtime, you choose which lanyard each child wears based on what you want to observe. the lanyard tells you (and the child) what to focus on during the performance.\n\nthe child wears one lanyard per session. you rotate through abilities over time so that every child practises every skill.",
        },
        {
          title: "ability codes",
          content:
            "there are 11 abilities tracked by lanyards:\n\nSTR — Storytelling: tells a story with a beginning, middle, and end\nCOM — Comprehension: explains what they heard in their own words\nVOC — Vocabulary and Description: describes a person or thing clearly enough for others to picture it\nINQ — Inquiry: asks and answers who, what, when, and where questions\nINT — Introduction and Closing: begins with a clear opening and ends with a clear closing\nGE — Gesture and Expression: uses hands and face to show feelings while talking\nEC — Eye Contact: looks at the person they are speaking to\nPOS — Posture and Presence: starts speaking in a way that gets attention — stands still, pauses, then begins\nVOL — Volume Control: speaks soft or loud on purpose\nMIM — Mimicry and Sound Effects: uses voice and sound effects to bring ideas to life\nCLR — Clarity: speaks clearly enough for others to follow",
        },
        {
          title: "how to choose lanyards",
          content:
            "in the first few sessions, rotate through all abilities to get a baseline for each child. after that, choose lanyards based on what each child needs to practise. if a child is already going strong in storytelling but still building eye contact, give them the Eye Contact lanyard more often.\n\ndo not give the same lanyard to the same child every session. the goal is breadth first, then targeted practice where needed.",
        },
      ],
    },

    // 3. how to fill the daily log
    {
      title: "how to fill the daily log",
      content:
        "the daily log is filled in at the end of every session, together with the child. it takes about three minutes.",
      subsections: [
        {
          title: "game or format",
          content:
            "write which roll call warm-up was played and which playground game or showtime format was used: 'tale trail', 'whacky news reporter', 'story circle'. one line each.",
        },
        {
          title: "lanyard worn",
          content:
            "record which lanyard the child wore during showtime. this builds a record of which abilities each child has practised over time.",
        },
        {
          title: "doing great at",
          content:
            "write one specific thing the child did well today, tied to a speaking ability. 'told a story with a clear beginning, middle, and end' is better than 'good storytelling'.",
        },
        {
          title: "focus more on",
          content:
            "write one thing to work on next. frame it as a next step: 'try pausing before you start to get everyone's attention' is better than 'needs to work on presence'.",
        },
      ],
    },

    // 4. doing great vs focus more
    {
      title: "doing great vs focus more",
      content:
        "'doing great at' and 'focus more on' are the two most important lines in the daily log. they work together.\n\n'doing great at' names a strength the child showed today. it should be specific and observable: something you actually saw them do, tied to one of the 11 abilities.\n\n'focus more on' names the next step. it is not a weakness — it is a direction. it should feel like an invitation, not a correction. 'try looking at different people in the audience, not just your friend' is an invitation. 'does not make eye contact' is a judgement.\n\nover time, these two lines create a pattern. when a 'focus more on' from session 3 becomes a 'doing great at' in session 7, that is growth you can point to.",
      subsections: [],
    },

    // 5. reading the pattern after 8 sessions
    {
      title: "reading the pattern after 8 sessions",
      content:
        "after 8 sessions, look at the lanyards each child has worn and the daily notes you have written. the pattern tells you which abilities are going strong and which are still building.\n\nbelow is a reference table showing each ability, how often it typically appears in 8 sessions, and the thresholds for going strong versus actively building.",
      subsections: [
        {
          title: "ability count table",
          content:
            "Code — Ability — Typical appearances in 8 sessions — Going Strong threshold — Actively Building threshold\n\nSTR — Storytelling — 2-3 times — Appears 2+ times in 'doing great' — Appears 2+ times in 'focus more'\nCOM — Comprehension — 1-2 times — Appears 1+ times in 'doing great' — Appears 1+ times in 'focus more'\nVOC — Vocabulary and Description — 2-3 times — Appears 2+ times in 'doing great' — Appears 2+ times in 'focus more'\nINQ — Inquiry — 1-2 times — Appears 1+ times in 'doing great' — Appears 1+ times in 'focus more'\nINT — Introduction and Closing — 1-2 times — Appears 1+ times in 'doing great' — Appears 1+ times in 'focus more'\nGE — Gesture and Expression — 2-3 times — Appears 2+ times in 'doing great' — Appears 2+ times in 'focus more'\nEC — Eye Contact — 2-3 times — Appears 2+ times in 'doing great' — Appears 2+ times in 'focus more'\nPOS — Posture and Presence — 1-2 times — Appears 1+ times in 'doing great' — Appears 1+ times in 'focus more'\nVOL — Volume Control — 2-3 times — Appears 2+ times in 'doing great' — Appears 2+ times in 'focus more'\nMIM — Mimicry and Sound Effects — 1-2 times — Appears 1+ times in 'doing great' — Appears 1+ times in 'focus more'\nCLR — Clarity — 2-3 times — Appears 2+ times in 'doing great' — Appears 2+ times in 'focus more'\n\nif an ability appears mostly in 'doing great', the child is going strong. if it appears mostly in 'focus more', they are actively building. if it has not appeared in either column, you have not observed it enough yet — assign that lanyard in the next block.",
        },
      ],
    },

    // 6. the speaking journey
    {
      title: "the speaking journey",
      content:
        "the speaking journey is a one-page summary written after every 8 sessions. it tells the parent how their child is growing as a speaker. you should be able to write it in about 10 minutes.",
      subsections: [
        {
          title: "this month",
          content:
            "a 1-2 sentence overview of what the class practised. this is pre-written in the book. you only need to change it if you deviated significantly from the plan.",
        },
        {
          title: "one moment we loved",
          content:
            "describe one specific moment from the past 8 sessions that showed growth or courage. be specific: 'stood up for the first time in session 5 and told a complete story about a lost dog — beginning, middle, and end — without stopping' is better than 'performed well'.",
        },
        {
          title: "how they are growing",
          content:
            "summarise growth across the three skill domains using the daily notes as your source. use language like:\n\ncontent & structure: 'telling stories with clear beginnings and endings' / 'starting to explain ideas in their own words' / 'asking follow-up questions during discussions'\n\nbody language: 'using gestures to show feelings while talking' / 'making eye contact with the audience' / 'pausing before starting to get attention'\n\nvocal skills: 'adjusting volume on purpose' / 'using sound effects to bring stories to life' / 'speaking clearly enough for the group to follow'\n\npick the 2-3 areas where you have the most to say.",
        },
        {
          title: "next month",
          content:
            "a forward-looking sentence: 'next month we will focus more on vocal variety — Aanya is ready to start using different voices for different characters'.",
        },
      ],
    },

    // 7. observable descriptions per ability
    {
      title: "observable descriptions per ability",
      content:
        "use these descriptions when writing daily notes or journey summaries. each ability has two versions: what 'going strong' looks like and what 'actively building' looks like.",
      subsections: [
        {
          title: "Storytelling",
          content:
            "going strong: tells a story with a clear beginning, middle, and end. the story has a recognisable structure and the listener can follow it without help.\n\nactively building: tells a story but may jump around, lose the thread, or end abruptly. the pieces are there but the structure needs support.",
        },
        {
          title: "Comprehension",
          content:
            "going strong: listens to a story or explanation and retells it accurately in their own words. captures the main idea and key details.\n\nactively building: retells parts of what they heard but may miss the main point or mix up the order. needs prompting to recall details.",
        },
        {
          title: "Vocabulary and Description",
          content:
            "going strong: describes a person, place, or thing with enough detail that the listener can picture it. uses specific words, not just 'big' or 'nice'.\n\nactively building: attempts to describe but relies on general words. may point or gesture instead of using language to paint the picture.",
        },
        {
          title: "Inquiry",
          content:
            "going strong: asks and answers who, what, when, and where questions confidently. questions show genuine curiosity and attention to what was said.\n\nactively building: asks questions but they may be off-topic or repetitive. answering questions may require prompting or rephrasing.",
        },
        {
          title: "Introduction and Closing",
          content:
            "going strong: begins with a clear opening that tells the audience what is coming, and ends with a clear closing that signals they are finished.\n\nactively building: may start speaking without an introduction or trail off without a clear ending. the content is there but the framing needs work.",
        },
        {
          title: "Gesture and Expression",
          content:
            "going strong: uses hands and face naturally to show feelings while talking. gestures match the content and add to the performance.\n\nactively building: body is mostly still while speaking, or gestures do not match what they are saying. beginning to experiment with expression.",
        },
        {
          title: "Eye Contact",
          content:
            "going strong: looks at the people they are speaking to. shifts gaze across the group, not just one person.\n\nactively building: looks down, at the ceiling, or only at the teacher. beginning to glance at the audience but not yet holding eye contact.",
        },
        {
          title: "Posture and Presence",
          content:
            "going strong: starts speaking in a way that gets attention — stands still, pauses, then begins. body communicates readiness and confidence.\n\nactively building: fidgets, starts before they are ready, or speaks while still walking to the front. the content may be strong but the physical presence needs development.",
        },
        {
          title: "Volume Control",
          content:
            "going strong: speaks soft or loud on purpose. adjusts volume to match the moment — quiet for suspense, loud for excitement.\n\nactively building: volume is either too quiet for the group to hear or the same throughout. beginning to notice that volume is a tool.",
        },
        {
          title: "Mimicry and Sound Effects",
          content:
            "going strong: uses voice and sound effects to bring ideas to life. makes different voices for characters, adds sound effects to stories.\n\nactively building: speaks in one voice throughout. may add sound effects when prompted but does not yet do so naturally.",
        },
        {
          title: "Clarity",
          content:
            "going strong: speaks clearly enough for everyone in the group to follow. words are distinct, pace is steady, and the meaning comes through.\n\nactively building: some words are hard to catch. may speak too fast, mumble, or trail off at the end of sentences.",
        },
      ],
    },

    // 8. language rules
    {
      title: "language rules",
      content:
        "every word you write will be read by a parent. these rules make sure your language builds trust.",
      subsections: [
        {
          title: "always forward-looking",
          content:
            "never write what a child cannot do. write what they are working towards. 'beginning to pause before starting' is forward-looking. 'does not stand still' is not.",
        },
        {
          title: "always specific",
          content:
            "avoid general praise. 'spoke well today' means nothing. 'told a complete story about a lost dog with a beginning, middle, and end' means everything.",
        },
        {
          title: "always about what you saw",
          content:
            "do not write about the child's personality or potential. write about what you observed. 'looked at three different people while telling the story' is an observation. 'is a natural performer' is a judgement.",
        },
        {
          title: "the final test",
          content:
            "before you write anything, ask yourself: would I be happy for the child to read this when they are older? if yes, write it. if not, rephrase until it is.",
        },
      ],
    },

    // 9. for new teachers
    {
      title: "for new teachers",
      content:
        "if this is your first time facilitating, here is what matters most.",
      subsections: [
        {
          title: "rotate lanyards first",
          content:
            "in the first 8 sessions, rotate through as many abilities as possible for each child. you need a baseline before you can target practice. do not focus on one ability too early.",
        },
        {
          title: "watch before you write",
          content:
            "spend your first two sessions observing. do not force notes. get a feel for each child's natural speaking style first. the daily log is forgiving — a blank field is better than a forced observation.",
        },
        {
          title: "the lanyard is not a test",
          content:
            "children should feel that the lanyard is a badge, not an exam. it means 'today we are paying attention to this'. if a child is anxious about wearing one, let them watch someone else wear it first.",
        },
        {
          title: "keep notes short",
          content:
            "the daily log should take three minutes per child. one sentence per field. save longer observations for the speaking journey.",
        },
        {
          title: "ask for help",
          content:
            "if you are unsure about an ability, ask another teacher to watch the same child for one session. two sets of eyes are always better.",
        },
      ],
    },
  ],
};

// ─── Speaking 8-12 Manual ──────────────────────────────────

const speaking812Manual: ManualConfig = {
  slug: "speaking-8-12",
  title: "teacher manual",
  subtitle: "public speaking · ages 8-12 · facilitation guide",
  intro:
    "this manual is your companion for facilitating the speaking experience book for ages 8-12. children in this age group are building argument, persuasion, and vocal control. the observation standards are higher — you are looking for deliberate rhetorical choices, not just willingness to speak. read this manual once before your first session.",

  sections: [
    // 1. what this book is
    {
      title: "what this book is",
      content:
        "the experience book is a year-long record of one child's growth in public speaking. it tracks what happened in every session — the games and formats they practised, the abilities they demonstrated, and what you observed.\n\nyour job is to observe, not evaluate. you are watching for intentional speaking choices: does the child structure an argument deliberately? do they adjust their voice for effect? can they handle challenge questions?\n\nevery entry should describe something you actually saw or heard.",
      subsections: [],
    },

    // 2. the lanyard system
    {
      title: "the lanyard system",
      content:
        "the lanyard is the child's speaker badge. wearing it during showtime means they are the speaker and the group gives full attention. the lanyard system tracks which abilities each child is practising.",
      subsections: [
        {
          title: "how lanyards work",
          content:
            "each lanyard has an ability code. before showtime, you choose which lanyard each child wears based on what you want to observe. the child wears one lanyard per session. you rotate over time so every child practises every ability.",
        },
        {
          title: "ability codes",
          content:
            "there are 12 abilities tracked by lanyards:\n\nORG — Organisation: arranges ideas in clear logical order\nMNP — Main Point: identifies and delivers the main point\nDTL — Detail and Examples: adds specific details and examples to support ideas\nDPQ — Deeper Questions: asks and answers deeper, more probing questions\nOPC — Opening and Closing: begins with a clear opening and ends with a clear closing\nGE — Gesture and Expression: uses hands and face to highlight important ideas\nECG — Eye Contact across Group: makes eye contact across the whole group, not just one person\nOPN — Opening Presence: starts with stillness, pause, and a deliberate opening\nVBR — Vocal Variety and Bring to Life: uses voice and sound to bring ideas to life\nVOL — Volume Control: adjusts volume deliberately for effect\nWST — Word Stress: stresses specific words to change or emphasise meaning\nTON — Tone: uses vocal tone to express different feelings and moods",
        },
        {
          title: "how to choose lanyards",
          content:
            "in the first 8 sessions, rotate through all abilities to build a baseline. after that, target lanyards based on what each child needs. if a child is going strong in organisation but still building vocal variety, assign the Vocal Variety and Bring to Life lanyard more often.\n\ndo not give the same lanyard every session. breadth first, then targeted practice.",
        },
      ],
    },

    // 3. how to fill the daily log
    {
      title: "how to fill the daily log",
      content:
        "the daily log is filled in at the end of every session, together with the child. it takes about three minutes.",
      subsections: [
        {
          title: "game or format",
          content:
            "write which roll call warm-up, playground game, and showtime format were used: 'debate duel', 'experience share circle', 'persuasion pitch'. one line each.",
        },
        {
          title: "lanyard worn",
          content:
            "record which lanyard the child wore during showtime. this builds a record over time.",
        },
        {
          title: "doing great at",
          content:
            "write one specific thing the child did well, tied to an ability: 'stressed the word \"never\" three times to build emphasis during the debate' is better than 'good vocal skills'.",
        },
        {
          title: "focus more on",
          content:
            "write one forward-looking step: 'try scanning the whole audience instead of just the front row' is better than 'needs to improve eye contact'.",
        },
      ],
    },

    // 4. doing great vs focus more
    {
      title: "doing great vs focus more",
      content:
        "'doing great at' and 'focus more on' work as a pair.\n\n'doing great at' names a strength shown today — specific, observable, tied to an ability.\n\n'focus more on' names the next step — not a weakness, but a direction. it should feel like an invitation: 'try using a longer pause before your closing line to let the argument land' is an invitation. 'pausing needs work' is a label.\n\nover time, these two lines create a pattern. when a 'focus more on' from session 4 becomes a 'doing great at' by session 10, that is growth.",
      subsections: [],
    },

    // 5. reading the pattern after 8 sessions
    {
      title: "reading the pattern after 8 sessions",
      content:
        "after 8 sessions, review the lanyards worn and the daily notes. the pattern shows which abilities are strong and which are still building.",
      subsections: [
        {
          title: "ability count table",
          content:
            "Code — Ability — Typical appearances in 8 sessions — Going Strong threshold — Actively Building threshold\n\nORG — Organisation — 2-3 times — Appears 2+ times in 'doing great' — Appears 2+ times in 'focus more'\nMNP — Main Point — 1-2 times — Appears 1+ times in 'doing great' — Appears 1+ times in 'focus more'\nDTL — Detail and Examples — 2-3 times — Appears 2+ times in 'doing great' — Appears 2+ times in 'focus more'\nDPQ — Deeper Questions — 1-2 times — Appears 1+ times in 'doing great' — Appears 1+ times in 'focus more'\nOPC — Opening and Closing — 1-2 times — Appears 1+ times in 'doing great' — Appears 1+ times in 'focus more'\nGE — Gesture and Expression — 2-3 times — Appears 2+ times in 'doing great' — Appears 2+ times in 'focus more'\nECG — Eye Contact across Group — 2-3 times — Appears 2+ times in 'doing great' — Appears 2+ times in 'focus more'\nOPN — Opening Presence — 1-2 times — Appears 1+ times in 'doing great' — Appears 1+ times in 'focus more'\nVBR — Vocal Variety and Bring to Life — 1-2 times — Appears 1+ times in 'doing great' — Appears 1+ times in 'focus more'\nVOL — Volume Control — 2-3 times — Appears 2+ times in 'doing great' — Appears 2+ times in 'focus more'\nWST — Word Stress — 1-2 times — Appears 1+ times in 'doing great' — Appears 1+ times in 'focus more'\nTON — Tone — 1-2 times — Appears 1+ times in 'doing great' — Appears 1+ times in 'focus more'\n\nif an ability appears mostly in 'doing great', the child is going strong. if it appears mostly in 'focus more', they are actively building. if it has not appeared in either column, assign that lanyard in the next block.",
        },
      ],
    },

    // 6. the speaking journey
    {
      title: "the speaking journey",
      content:
        "the speaking journey is a one-page summary written after every 8 sessions. you should be able to write it in about 10 minutes.",
      subsections: [
        {
          title: "this month",
          content:
            "a 1-2 sentence overview of what the class practised. pre-written in the book — only change if you deviated significantly.",
        },
        {
          title: "one moment we loved",
          content:
            "describe one specific moment from the past 8 sessions. be vivid: 'during the debate on school uniforms, paused for three full seconds before delivering the closing argument — the room went silent' is better than 'performed confidently in debates'.",
        },
        {
          title: "how they are growing",
          content:
            "summarise growth across the three skill domains:\n\ncontent & structure: 'arranging arguments in logical order' / 'delivering main points with supporting examples' / 'asking probing follow-up questions during discussions'\n\nbody language: 'using deliberate gestures to highlight key ideas' / 'scanning the whole group during presentations' / 'opening with stillness and a deliberate pause'\n\nvocal skills: 'using vocal variety to bring arguments to life' / 'adjusting volume for effect' / 'stressing key words to change meaning' / 'using tone to express conviction'\n\npick the 2-3 areas where you have the most to say.",
        },
        {
          title: "next month",
          content:
            "a forward-looking sentence: 'next month we will work on handling challenge questions — Arjun is ready to think on his feet during open debate'.",
        },
      ],
    },

    // 7. observable descriptions per ability
    {
      title: "observable descriptions per ability",
      content:
        "use these when writing daily notes or journey summaries. each ability has two versions: what 'going strong' looks like and what 'actively building' looks like.",
      subsections: [
        {
          title: "Organisation",
          content:
            "going strong: arranges ideas in a clear logical order. the audience can follow the argument from start to finish without getting lost.\n\nactively building: has ideas but they come out in a jumbled order. may circle back or repeat. the pieces are there but the sequence needs work.",
        },
        {
          title: "Main Point",
          content:
            "going strong: identifies and delivers the main point clearly. the audience knows what the speaker is arguing for within the first few sentences.\n\nactively building: talks around the topic but the main point is buried or unclear. may need prompting to state their position directly.",
        },
        {
          title: "Detail and Examples",
          content:
            "going strong: supports ideas with specific details and examples. 'for example, last year our school raised 500 pounds by...' rather than 'we did lots of fundraising'.\n\nactively building: makes claims without supporting them. ideas are stated but not developed. 'it would be good because it just would.'",
        },
        {
          title: "Deeper Questions",
          content:
            "going strong: asks and answers questions that go beyond surface level. follows up on answers, challenges assumptions, and digs deeper.\n\nactively building: asks basic questions or gives short answers. may avoid challenge questions or repeat what they have already said.",
        },
        {
          title: "Opening and Closing",
          content:
            "going strong: begins with a clear opening that frames the talk and ends with a clear closing that lands the argument. the audience knows when it starts and when it is done.\n\nactively building: may start without an introduction or trail off at the end. the content is there but the framing needs work.",
        },
        {
          title: "Gesture and Expression",
          content:
            "going strong: uses hands and face to highlight important ideas. gestures are deliberate and match the content — a raised hand for emphasis, a pointed finger for specificity.\n\nactively building: body is mostly still or gestures are random. beginning to experiment but movement does not yet connect to meaning.",
        },
        {
          title: "Eye Contact across Group",
          content:
            "going strong: makes eye contact across the whole group. scans the room, connects with different people, and does not fixate on one spot.\n\nactively building: looks at one person (often the teacher) or looks down. beginning to lift eyes but not yet scanning the group.",
        },
        {
          title: "Opening Presence",
          content:
            "going strong: starts with stillness, a pause, and a deliberate opening. the audience feels the shift from casual to performance. commands the room before speaking.\n\nactively building: starts speaking before they are ready, fidgets, or rushes into the opening. the content may be strong but the launch needs work.",
        },
        {
          title: "Vocal Variety and Bring to Life",
          content:
            "going strong: uses voice and sound to bring ideas to life. varies pace, pitch, and energy to match the content. the performance has dynamics.\n\nactively building: speaks in a flat, even tone throughout. may have good content but the delivery does not yet vary.",
        },
        {
          title: "Volume Control",
          content:
            "going strong: adjusts volume deliberately. speaks quietly for emphasis, loudly for energy. the changes are intentional, not accidental.\n\nactively building: volume is either too quiet or stays the same throughout. beginning to notice that volume is a tool but not yet using it on purpose.",
        },
        {
          title: "Word Stress",
          content:
            "going strong: stresses specific words to change or emphasise meaning. 'we should NEVER allow this' vs 'we should never ALLOW this' — knows the difference and uses it.\n\nactively building: speaks with even emphasis throughout. all words get the same weight. beginning to notice that stress changes meaning when prompted.",
        },
        {
          title: "Tone",
          content:
            "going strong: uses vocal tone to express different feelings — conviction, concern, excitement, seriousness. the voice matches the message.\n\nactively building: tone is mostly neutral. may not yet connect how they feel about a topic to how their voice sounds when they talk about it.",
        },
      ],
    },

    // 8. language rules
    {
      title: "language rules",
      content:
        "every word you write will be read by a parent. these rules apply.",
      subsections: [
        {
          title: "always forward-looking",
          content:
            "never write what a child cannot do. write what they are working towards. 'beginning to scan the audience' is forward-looking. 'does not make eye contact' is not.",
        },
        {
          title: "always specific",
          content:
            "'spoke confidently' means nothing. 'opened the debate by stating the main argument in one sentence, then supported it with two examples' means everything.",
        },
        {
          title: "always about what you saw",
          content:
            "do not write about personality or talent. 'stressed the word \"unfair\" three times during the closing argument' is an observation. 'is a natural debater' is a judgement.",
        },
        {
          title: "the final test",
          content:
            "before you write anything: would I be happy for the child to read this when they are older? if yes, write it. if not, rephrase.",
        },
      ],
    },

    // 9. for new teachers
    {
      title: "for new teachers",
      content:
        "if this is your first time facilitating, here is what matters most.",
      subsections: [
        {
          title: "rotate lanyards first",
          content:
            "in the first 8 sessions, rotate through as many abilities as possible. you need a baseline before you can target. do not focus on one ability too early.",
        },
        {
          title: "watch before you write",
          content:
            "spend your first two sessions observing. do not force notes. get a feel for each child's natural speaking style. a blank field is better than a forced observation.",
        },
        {
          title: "the lanyard is not a test",
          content:
            "children should feel that the lanyard is a badge of focus, not an exam. it means 'today we are paying attention to this'. if a child is anxious, let them watch first.",
        },
        {
          title: "listen to the debates",
          content:
            "at this age, the richest diagnostic information comes from debates and discussions. listen for how children structure arguments, respond to challenges, and use evidence. these moments reveal more than any single performance.",
        },
        {
          title: "keep notes short",
          content:
            "three minutes per child. one sentence per field. save longer observations for the speaking journey.",
        },
        {
          title: "ask for help",
          content:
            "if you are unsure about an ability, ask another teacher to observe. two sets of eyes are always better.",
        },
      ],
    },
  ],
};

// ─── Robotics 5-8 Manual ───────────────────────────────────

const robotics58Manual: ManualConfig = {
  slug: "robotics-5-8",
  title: "teacher manual",
  subtitle: "robotics · ages 5-8 · facilitation guide",
  intro:
    "this book tracks two things in parallel every session: what the child is discovering in the experiment and what they are building. the five daily marks take under two minutes. without them the robotics journey letter is generic — with them it writes itself. read this manual once before your first session.",
  sections: [
    {
      title: "what this book is for",
      content:
        "the robotics experience book is a year-long record of one child's growth in mechanical thinking. it is not a portfolio of finished models — it is a log of what they ran, what they built, and what you observed about how they thought through it.\n\nyour job is to observe, not evaluate. you are watching for four specific skills — building & making, problem solving, observing & understanding, and logical thinking — and marking each one as present or not-yet in each session. the marks compile into a monthly robotics journey letter that goes home after every eighth session.",
    },
    {
      title: "the five daily marks",
      content:
        "five ticks or dashes per child per session. under two minutes.",
      subsections: [
        {
          title: "O&U (experiment)",
          content:
            "did the child watch closely, measure accurately, think before testing, or explain why? mark ✓ if you saw any of these clearly and unprompted. mark — if none were visible.",
        },
        {
          title: "LT (experiment)",
          content:
            "did the child connect a result to its cause, or bring prior knowledge to a new situation? ✓ if visible. — if not.",
        },
        {
          title: "B&M (build)",
          content:
            "did the child put things together correctly, follow the step card, fix what was broken, or make a deliberate improvement? ✓ if visible. — if not.",
        },
        {
          title: "PS (build)",
          content:
            "did the child notice a problem, try something different, find the specific cause, or work toward a clear goal? ✓ if visible. — if not.",
        },
        {
          title: "concept",
          content:
            "at the end of the session, ask one direct question: \"what did we find out today?\" or \"why did that happen?\" ✓ if the child explains it in their own words. — if they say they don't know or repeat the question back.",
        },
      ],
    },
    {
      title: "worth remembering",
      content:
        "one sentence. specific. not \"built well\" — write \"tightened the left screw before the right without being asked\" or \"predicted the heavier bag would need more effort and was right.\" these notes are what make the robotics journey letter personal to this child.",
    },
    {
      title: "the four teacher questions — build only",
      content:
        "one per child per session. move on immediately. never fix. never tell.\n\n\"what is not working? what will you try?\"\n\"what did you change? what happened?\"\n\"which change made the bigger difference?\"\n\"point to the part that did the most important job.\"",
    },
    {
      title: "tool orientation — when and how",
      content:
        "tool orientation happens during the experiment segment, at the moment the tool is first needed. it is a short practical demonstration — 3–4 minutes — after which the child uses the tool immediately. it is never taught as a separate lesson. for a new child joining mid-programme, run the relevant orientation at the start of their first experiment segment.\n\nspring scale — session 1. hangs one washer, reads the number, tries the wrong angle, corrects.\nmeasuring tape — session 1. measures the table, tries starting from 1, sees the error, restarts from zero.\nprediction box — session 2. writes a sentence before the experiment starts.\nresult table — session 3. fills row by row, checks nothing is skipped.\nscrews and nuts + spanner — day 1 of the first model. bolt through hole, nut from the other side, spanner turns firm but not stripped.\ntray map — first disassembly day. every component has a home.",
    },
    {
      title: "robotics journey — paragraph options",
      content:
        "when you write the monthly letter, use the ability wording as your starting point. the final test on every paragraph: would i be proud if someone wrote this about my child? if yes — write it. if no — rewrite it.",
      subsections: [
        {
          title: "B&M",
          content:
            "\"they are putting parts together and getting them to fit and function.\" · \"they are following the step card accurately — each step before moving on.\" · \"they are finding what is broken and fixing it without needing to be pointed there.\" · \"they are improving the model on purpose and checking whether it worked.\"",
        },
        {
          title: "PS",
          content:
            "\"they notice when something is not working and say so without being prompted.\" · \"they try different approaches — not repeating what did not work.\" · \"they find the exact part causing the problem before they start fixing.\" · \"they keep going until the model does what it is supposed to do.\"",
        },
        {
          title: "O&U",
          content:
            "\"they spot specific things that changed — naming them without being asked.\" · \"their measurements are careful and their numbers go in the right place.\" · \"they think about what will happen before trying — not just act and see.\" · \"they explain why a result happened — not just what happened.\"",
        },
        {
          title: "LT",
          content:
            "\"they understand that results have causes — they look for what caused each one.\" · \"they know which specific change made the difference.\" · \"they draw on what they found before when approaching something new.\" · \"they think through what to test and how they will know if it worked.\"",
        },
      ],
    },
  ],
};

// ─── Robotics 8-12 Manual ──────────────────────────────────

const robotics812Manual: ManualConfig = {
  slug: "robotics-8-12",
  title: "teacher manual",
  subtitle: "robotics · ages 8-12 · facilitation guide",
  intro:
    "this book tracks the experiment and the build simultaneously every session. at 8–12, what matters above all is whether the child can explain why — not just what happened. five marks per session take under two minutes. the notes make the robotics journey letter specific to this child.",
  sections: [
    {
      title: "what this book is for",
      content:
        "at 8–12 the robotics experience book records whether a child is developing the habits of mechanical reasoning — not just building. observe whether their predictions are specific, their explanations are causal, and their builds are diagnosed before they are fixed.",
    },
    {
      title: "the five daily marks",
      content: "five ticks or dashes. under two minutes.",
      subsections: [
        {
          title: "O&U (experiment)",
          content:
            "did the child name something specific that changed, measure accurately, write a real prediction before testing, or explain a cause? ✓ if visible and unprompted. — if not.",
        },
        {
          title: "LT (experiment)",
          content:
            "did the child connect a result to the specific thing that caused it, or apply prior reasoning to a new situation? ✓ if visible. — if not.",
        },
        {
          title: "B&M (build)",
          content:
            "did the child connect deliberately, follow the card accurately, fix the right part, or state what they expected to change before improving? ✓ if visible. — if not.",
        },
        {
          title: "PS (build)",
          content:
            "did the child name what the model should be doing, try genuinely different approaches, name the failing part, or work toward a measurable goal? ✓ if visible. — if not.",
        },
        {
          title: "concept",
          content:
            "at the end of the session, ask one direct question that requires a causal answer: \"why did that happen?\" ✓ if the child names a cause and connects it to evidence. — if they only describe what happened.",
        },
      ],
    },
    {
      title: "worth remembering",
      content:
        "one sentence. specific. at 8–12 the most valuable notes capture reasoning. \"predicted 150g based on the previous session and was 10g off — tried to explain the gap\" is worth ten times more than \"did the experiment well.\"",
    },
    {
      title: "the four teacher questions — build only",
      content:
        "one per child per session. move on immediately. never fix. never tell.\n\n\"what is not working? what will you try?\"\n\"what did you change? what happened?\"\n\"which change made the bigger difference?\"\n\"point to the part that did the most important job.\"",
    },
    {
      title: "robotics journey — paragraph options",
      content:
        "the final test on every paragraph: would this paragraph be true of no other child in the class? if yes — write it. if no — add one specific detail from your daily notes until it is.",
      subsections: [
        {
          title: "B&M",
          content:
            "\"they are putting parts together deliberately — checking each connection before moving on.\" · \"they are following the step card accurately and noticing when a step has not produced the expected result.\" · \"they are finding the exact part that failed and fixing it — naming it before touching anything.\" · \"they are improving the model deliberately — stating what they expect to change before testing.\"",
        },
        {
          title: "PS",
          content:
            "\"they notice when the model is not working and name what it should be doing.\" · \"they try genuinely different approaches — not repeating what already failed.\" · \"they name the specific part that is failing and explain what it is failing to do.\" · \"they set a measurable goal and keep adjusting until the model reaches it.\"",
        },
        {
          title: "O&U",
          content:
            "\"their observations are specific — they name one clear thing that changed.\" · \"their measurements are accurate and every reading goes in the right place.\" · \"their predictions are specific — a value or a reason connected to what they found before.\" · \"their explanations are causal — they name the cause and connect it to the data.\"",
        },
        {
          title: "LT",
          content:
            "\"they understand that results have specific causes — they look for what caused each one.\" · \"they identify which specific change made the difference.\" · \"they apply what they found in one situation to reason about a different one.\" · \"they plan before testing — they know what they want to find out and what a good result looks like.\"",
        },
      ],
    },
  ],
};

// ─── Export ─────────────────────────────────────────────────

export const manualConfigs: Record<string, ManualConfig> = {
  "art-5-8": art58Manual,
  "art-8-12": art812Manual,
  "speaking-5-8": speaking58Manual,
  "speaking-8-12": speaking812Manual,
  "robotics-5-8": robotics58Manual,
  "robotics-8-12": robotics812Manual,
};

export function getManualConfig(slug: string): ManualConfig | undefined {
  return manualConfigs[slug];
}
