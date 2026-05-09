"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import {
  ImageFlipbook,
  type FlipbookPage,
} from "@/components/ImageFlipbook";

/**
 * Imagine Playground — teacher reference book for STEM 3–5.
 *
 * 11 core build projects.
 * Each project page covers: connect → construct → contemplate →
 * continue (the four-part lesson structure used in the manual).
 *
 * Same flipbook pattern as ArtiverseBookModal / ArtistotleBookModal.
 */

type Lesson = {
  number: number;
  title: string;
  whatChildrenDo: string[];
  whatChildrenLearn: string[];
  materials: string[];
  grouping: string;
  connect: string[];
  construct: string[];
  contemplate: string[];
  continueStep: string[];
  avoid: string[];
};

const LESSONS: Lesson[] = [
  {
    number: 1,
    title: "train time",
    whatChildrenDo: [
      "Look at the train set.",
      "Join track pieces.",
      "Make a train track.",
      "Join train cars.",
      "Count the track pieces and train cars.",
      "Put numbers in order.",
      "Build a train engine.",
    ],
    whatChildrenLearn: [
      "Counting.",
      "Order: 1, 2, 3, 4.",
      "What comes next.",
      "Joining pieces.",
      "Building step by step.",
      "Long and short.",
    ],
    materials: [
      "Track pieces (the railway path).",
      "Train cars (small compartments that sit on the track).",
      "Sticky notes with numbers 1–5+ written before class.",
      "Marker.",
      "Inspiration picture of a train engine.",
    ],
    grouping:
      "Teacher explains to all 10 children together. Then divide into 3 groups (3, 3, 4). Each group makes its own track and train.",
    connect: [
      "Gather all children. Say: 'Today we are going to build a train and a train track.'",
      "Ask: 'What does a train look like? What sound does a train make? What does a train do?'",
      "Show one track piece. Say: 'This is a track piece. Track pieces join together to make the path for the train.' Join two track pieces slowly.",
      "Show one train car. Say: 'This is a train car. Train cars sit on the track.' Join two train cars together. Place them on the track.",
      "Say: 'The train cars move on the track.'",
    ],
    construct: [
      "Divide children into 3 groups. Give each group some track pieces.",
      "Say: 'Each group will build one track. Everyone should get a turn to add a piece.'",
      "Move from group to group. Help only when a child is stuck. Let them try first.",
      "Ask: 'How many track pieces have you used? Is your track becoming longer? Which piece will you add next?'",
      "Now give train cars and number sticky notes. Say: 'Put number 1 on the first train car. What comes after 1? Yes, 2.'",
      "Continue with 3, 4, 5. Children place cars on the track, stick numbers in order, and say the numbers aloud.",
    ],
    contemplate: [
      "Bring all children's attention to the tracks.",
      "Ask each group: 'How many track pieces did your group use? How many train cars did your group use?'",
      "Ask all: 'Which track is long? Which is short? What number comes after 1? What comes after 2?'",
      "Children point, count, compare, and answer in simple words. Don't answer for them too quickly.",
    ],
    continueStep: [
      "Say: 'Our train also needs an engine. The engine is the front part of the train.' Show the inspiration picture.",
      "Say: 'You can use it for an idea. Your engine does not have to look exactly the same.'",
      "Children stay in groups and build a train engine. Encourage them to try, don't fix every design.",
      "Ask: 'What part is the front? How will your engine join the train?'",
      "End by asking each group to show: their track, their numbered train cars, their engine.",
    ],
    avoid: [
      "Do not call the track and train car the same thing.",
      "Do not stick all numbers yourself.",
      "Do not let one child do everything.",
      "Do not skip counting aloud.",
    ],
  },
  {
    number: 2,
    title: "first trip",
    whatChildrenDo: [
      "Play a movement game like a train.",
      "Build a model from Model Card 1.",
      "Build a double-ended track.",
      "Move the train from station to destination.",
      "Try different ways to stop the train.",
      "Explore red action bricks.",
      "Extend the track and add stops.",
      "Explore green action bricks.",
    ],
    whatChildrenLearn: [
      "A journey has steps.",
      "Start and stop.",
      "How action bricks change what the train does.",
      "Completing a task step by step.",
      "Solving a simple problem: 'How do we make the train stop?'",
    ],
    materials: [
      "Train, track pieces, Model Card 1.",
      "Red action bricks, red stop brick, green action bricks.",
      "Materials for station and destination.",
    ],
    grouping:
      "Movement game with all 10 children. Building in 2 or 3 small groups (5 children each, or 3–4 each).",
    connect: [
      "Ask: 'Have you taken a train, subway, or tram? Where did you go?'",
      "Say: 'Now we will play the choo choo train game.' Children stand in a line, hands on shoulders of the child in front.",
      "Say: 'When I say go, you walk like a train. When I say red light, you slow down and stop.'",
      "Practise once. Repeat 2–3 times.",
    ],
    construct: [
      "Show Model Card 1. Children build the model in groups.",
      "Then say: 'Now build a double-ended track. A double-ended track has two ends — the train can go from one end to the other.'",
      "Build with about 8 track pieces. Say: 'One end is the train station. The other end is the harbor.'",
      "Tell the story: 'The passenger wants to go fishing at the harbor. Can you help them reach the harbor?'",
      "Children move the train and try stopping it different ways: by hand, with the red action brick, with the red stop brick. Don't correct immediately — let them explore.",
    ],
    contemplate: [
      "Show: stopping by hand, with the red action brick, with the red stop brick.",
      "Ask: 'How many red action bricks did you use? Where did you place the red action brick? Why? Where did the train stop?'",
      "Help them say: 'The train stopped here. The red brick made the train stop.'",
    ],
    continueStep: [
      "Say: 'Now make a longer track and create more stops.'",
      "Children extend the tracks. Say: 'Try using the green action bricks.'",
      "Ask: 'What did you see when the train went over the green brick? How can we help the train get back to the station?'",
    ],
    avoid: [
      "Do not only show the action bricks. Let children use them.",
      "Do not stop the train for the children every time.",
      "Do not skip the question: 'Where did the train stop?'",
      "Do not let one child control the train the whole time.",
    ],
  },
  {
    number: 3,
    title: "load the train",
    whatChildrenDo: [
      "Learn what freight means.",
      "Place a number on a train car.",
      "Count objects.",
      "Load the correct number of objects.",
      "Compare quantities.",
      "Check if the train has the right amount.",
    ],
    whatChildrenLearn: [
      "Number means quantity.",
      "Counting objects carefully.",
      "Matching a number to the correct amount.",
      "More and less.",
      "Checking their own work.",
    ],
    materials: [
      "Train cars.",
      "Number bricks (or sticky notes with numbers).",
      "Small objects for loading — crayons, erasers, blocks, small classroom objects.",
      "Inspiration pictures 1 and 2.",
      "Optional crane.",
    ],
    grouping:
      "Explain together. 3 groups (3, 3, 4). Each group gets train cars, number notes, and small objects.",
    connect: [
      "Say: 'Today we are going to load a freight train. Freight means things that a train carries.'",
      "Show small objects. Say: 'These objects are freight.'",
      "Say: 'It is important to put the correct amount on the train. Too many things — the train becomes too heavy. Too few — it has not carried what it needed to.'",
    ],
    construct: [
      "Demonstrate first. Take one train car. Stick number 3 on it. Say: 'This train car has number 3. We must load 3 objects.' Count aloud and place 3 objects.",
      "Children work in groups. Each child gets turns to: pick a number, place it on a car, count that many objects, and load.",
      "Move between groups. Ask: 'What number is on your train car? How many objects will you load? Can you count them one by one? Do you have too many, too few, or correct?'",
      "If a child loads the wrong amount, don't scold. Say: 'Let us check by counting' — count together.",
    ],
    contemplate: [
      "Each group shows one loaded train car. Ask: 'What number is on this train car? How many objects did you load? Let us count and check. Does the number match the objects?'",
      "Lead a discussion. Help children understand: 'The number tells us how many. We count to check.'",
    ],
    continueStep: [
      "Repeat with different numbers.",
      "Ask groups to compare: 'Which train car has more freight? Which has less? How do you know?' Children count and compare.",
    ],
    avoid: [
      "Do not let children randomly fill the train.",
      "Do not skip counting aloud.",
      "Do not only ask 'Is it correct?' — ask them to count and check.",
      "Keep numbers small for younger children.",
    ],
  },
  {
    number: 4,
    title: "longest track",
    whatChildrenDo: [
      "Compare two trains.",
      "Measure trains.",
      "Build tracks.",
      "Measure how far tracks reach.",
      "Compare long and short.",
      "Build tall towers or cranes.",
      "Measure height.",
    ],
    whatChildrenLearn: [
      "Long and short.",
      "Longer and shorter.",
      "Measuring with a tape measure and with objects.",
      "Comparing results.",
      "Recording what they find.",
    ],
    materials: [
      "Train cars, track pieces.",
      "Tape measure, pencils.",
      "Number bricks or same-sized blocks for non-standard measuring.",
      "Inspiration pictures 1–4.",
    ],
    grouping:
      "Teacher demonstrates with all watching. 3 groups for track-building. Pairs for tower/crane.",
    connect: [
      "Show two trains side by side — one with 2 cars, one with 3 cars.",
      "Ask: 'Which train is shorter? Longer? How can you tell?' Children point and answer.",
      "Use a tape measure. Measure both trains. Say the numbers clearly. Record on paper.",
      "Now use number bricks. Place them along the train and count. Say: 'This is another way to measure — same-sized blocks.' Discuss: 'Did both ways show which is longer?'",
    ],
    construct: [
      "Say: 'Each group will build a train track that reaches as far across the room as possible. Start at the wall. Build outwards.'",
      "Children build using all available track pieces. They may make curves.",
      "Explain: 'When we measure, we are measuring how far the track reaches from the wall — not every curved piece.'",
      "Demonstrate: place one end of the tape at the wall, stretch it straight to where the track stops, read the measurement.",
      "Each group measures its track and notes the reading.",
    ],
    contemplate: [
      "Bring all children together. Ask: 'Which track reached the farthest? Which was longest? How did we measure? Why is it useful to measure distance?'",
      "Help them notice: 'A track may have many curves, but we measured how far it reached from the wall.'",
    ],
    continueStep: [
      "Say: 'We can measure many things — including height.' Children work in pairs to build a tower or crane.",
      "Each pair measures their model. Ask: 'Which tower is taller? Shorter? How do you know?'",
      "If ready, ask them to work together to build one mega crane. Measure and document it.",
    ],
    avoid: [
      "Do not just ask children to guess — let them measure.",
      "Do not measure the curved track piece by piece if the task is to measure how far it reaches.",
      "Do not let children argue without checking through measurement.",
      "Do not skip recording results.",
    ],
  },
  {
    number: 5,
    title: "train sound",
    whatChildrenDo: [
      "Play a movement train game.",
      "Learn yellow and blue action meanings.",
      "Build a model and a track.",
      "Move passengers from picnic area to gas station.",
      "Use action bricks.",
      "Describe the train's journey.",
      "Test the white action brick with a tunnel.",
    ],
    whatChildrenLearn: [
      "Action bricks change what the train does.",
      "Sounds can be signals.",
      "A journey has steps in order.",
      "Bricks can solve problems.",
    ],
    materials: [
      "Train, track pieces.",
      "Action bricks: yellow, blue, white, red, green.",
      "Printable model Card 1, crayons.",
      "Tunnel image printout.",
      "Model pieces for picnic area, gas station, train.",
    ],
    grouping:
      "Movement game with all 10. Building in 2–3 small groups.",
    connect: [
      "Ask: 'Have you been to a train station? What did you see? How did you know a train was coming?'",
      "Help them say: 'Trains make a whistle sound.' Ask: 'What makes trains move?'",
      "Now play the choo choo game. Children stand in a line, hands on shoulders.",
      "'Yellow light' = walk and say choo choo. 'Blue light' = stop and say bloop bloop (refilling gas).",
      "Play 2–3 rounds. If ready, add red and green from earlier games.",
    ],
    construct: [
      "Show printable Model Card 1. In groups, children build picnic area, gas station, and train.",
      "Then say: 'Build a double-ended track.' Children build.",
      "Story: 'The passengers want to go from the picnic area to the gas station. Can you help them get there?'",
      "Children move the train and use action bricks. Let them test blue and yellow bricks freely.",
    ],
    contemplate: [
      "Ask: 'Where did you place the blue brick? Why? Where did you place the yellow brick? Why?'",
      "Connect: 'The yellow brick makes a sound. A train sound can warn people that a train is coming.'",
      "Ask: 'Can you describe the train's journey?' Help them say: 'The train started at the picnic area. Then it passed the yellow brick. Then it went to the gas station.'",
    ],
    continueStep: [
      "Say: 'Now build a longer track and create more stops.' Use all action bricks in the right places.",
      "Ask: 'What happened when the train went over the white brick?' Place the tunnel printout over the track. Place white bricks on both sides of the tunnel.",
      "Watch what happens when the train goes through the tunnel. Ask: 'What happened to the train light? Why would a train need light in a tunnel?'",
    ],
    avoid: [
      "Do not only say the colour names. Let children connect each colour to an action.",
      "Do not skip the journey description.",
      "Do not place all action bricks yourself.",
      "Do not rush the tunnel observation.",
    ],
  },
  {
    number: 6,
    title: "o-shaped track — looping",
    whatChildrenDo: [
      "Understand repeating actions.",
      "Make a body movement loop.",
      "Build an O-shaped track.",
      "Build places to visit.",
      "Send the train around the track.",
      "Notice that the journey can repeat.",
      "Compare O-shaped with double-ended track.",
    ],
    whatChildrenLearn: [
      "Repeating sequence.",
      "Loop means doing something again and again.",
      "Different track shapes have different uses.",
      "Some tracks let the train repeat the same journey.",
    ],
    materials: [
      "Curved track pieces, straight track pieces.",
      "Train, action bricks, building pieces for destinations.",
      "Inspiration image.",
    ],
    grouping:
      "Movement loop with all 10. Track building in small groups. Discussion all together.",
    connect: [
      "Ask: 'What is something you do many times every day or every week?' (brushing teeth, washing hands, eating, sleeping, cleaning room).",
      "Say: 'When we do something again and again, we are repeating it.'",
      "Model a short action sequence in a circle: hop, clap, spin. Say: 'Now copy me and repeat the same actions again.'",
      "Repeat at least twice. For younger children, use only one or two actions. Say: 'This is like a loop — we do it again and again.'",
    ],
    construct: [
      "Say: 'Now we will build an O-shaped train track.' Show that O-shaped means round or loop-like.",
      "In groups, children use curved + straight track pieces (recommended: 6 curved, 4 straight).",
      "Say: 'Now build two or three places you would like to visit on the train.' Children build destinations.",
      "Story: 'The passengers want to picnic in the forest then visit the beautiful castle. Can you help them?'",
      "Remind: 'Use action bricks so the train can stop at each place. If a stop has drinks, water, or gas — use the blue brick.' Children test.",
    ],
    contemplate: [
      "Say: 'The passengers enjoyed the trip so much they want to do it again. Can the train take the same trip again? How?'",
      "Help them notice: 'The O-shaped track lets the train go around and repeat the journey.'",
      "Ask: 'Which action bricks did you use? Why?' Children explain by pointing and speaking.",
    ],
    continueStep: [
      "Say: 'Now build a double-ended track next to the O-shaped track.' Children build it nearby.",
      "Ask: 'What is different about these two tracks? Can the train repeat the same journey on the double-ended track? Why or why not?'",
      "Help them notice: 'The O-shaped track goes around again. The double-ended track has two ends, so it does not loop in the same way.'",
    ],
    avoid: [
      "Do not say 'loop' without showing repetition.",
      "Do not skip the body movement loop.",
      "Do not skip the comparison with the double-ended track.",
      "Do not make the track for children. Let them build.",
    ],
  },
  {
    number: 7,
    title: "y-shaped track — conditional statements",
    whatChildrenDo: [
      "Play a coloured ticket game.",
      "Understand that different tickets lead to different stops.",
      "Build a Y-shaped track.",
      "Create stops.",
      "Use coloured bricks as tickets.",
      "Move the train by choosing a path.",
      "Use if-then language.",
      "Compare track shapes.",
    ],
    whatChildrenLearn: [
      "Choice.",
      "If-then thinking.",
      "Signals.",
      "Different paths.",
      "Changing a route to reach a destination.",
      "Solving route problems.",
    ],
    materials: [
      "Y-shaped track and switch.",
      "Train.",
      "Coloured bricks for stops + matching coloured bricks as tickets.",
      "Action bricks, building pieces.",
      "Both track switches for extension.",
    ],
    grouping:
      "Coloured ticket game with all 10. Building in small groups. One child at a time as conductor.",
    connect: [
      "Say: 'We are going to play the coloured tickets game.' Choose at least 3 places in the classroom as train stops (playground, park, zoo, school).",
      "Place a different colour brick at each stop (red at playground, blue at zoo, yellow at park).",
      "Use matching coloured bricks as tickets. Say: 'I am the conductor. I will give you a ticket. If you have a red ticket, then you go to the playground.'",
      "Repeat with several children. Use 'if' and 'then' each time.",
    ],
    construct: [
      "Show the Y-shaped track and the track switch. Say: 'This track gives the train two choices.'",
      "Each group builds a Y-shaped track with at least two stops. Different colours mark different stops.",
      "One child becomes the conductor and gives colour-brick tickets.",
      "Say: 'If the passenger has a red ticket, then the train should go to the red stop.'",
      "Remind: 'To guide the train, move the red switch on the track. Use action bricks to help the train stop.' Children test.",
    ],
    contemplate: [
      "Say: 'Trains give signals to show where they want to go. The coloured ticket was a signal.'",
      "Ask: 'What signals can trains give?' Possible answers: choo choo sound, light, colour, decoration.",
      "Ask: 'Can trains give signals without making sounds?' Help them think of: flashing lights, colour signal, decorations.",
      "Ask: 'Which signal do you think is best? Why?'",
    ],
    continueStep: [
      "Say: 'Now try using both track switches to make a track with more destinations.' Children build a three-ended or Q-shaped track.",
      "Ask: 'How will you give signals now there are more destinations? How will you help the train go back and visit other stops?'",
      "Help them test the green action brick for returning.",
    ],
    avoid: [
      "Do not skip the classroom ticket game.",
      "Do not use if-then only once. Repeat it clearly.",
      "Do not move the switch for children every time.",
      "Do not let children build stops without matching colours.",
    ],
  },
  {
    number: 8,
    title: "journey — trouble on the road",
    whatChildrenDo: [
      "Talk about traffic rules.",
      "Look at traffic signs.",
      "Pretend to drive trains around the classroom.",
      "Slow down or stop at marked areas.",
      "Build models from building cards.",
      "Build a Y-shaped track.",
      "Place models beside the track.",
      "Place action bricks randomly.",
      "Explore what each button or brick does.",
      "Solve road problems using signs.",
      "Create their own traffic signs or models.",
    ],
    whatChildrenLearn: [
      "Traffic rules keep people safe.",
      "Signs remind us what to do.",
      "Problems can be solved by choosing the right sign or action.",
      "Action bricks can change train behaviour.",
      "Route and safety decisions.",
    ],
    materials: [
      "Train, Y-shaped track pieces, building cards.",
      "Action bricks.",
      "Four traffic signs from the set.",
      "Materials to create signs or models, pencils.",
      "Inspiration pictures 1–4.",
    ],
    grouping:
      "Traffic discussion + movement with all 10. Building in small groups. Driving the train by turns.",
    connect: [
      "Ask: 'Do you know any traffic rules? What are they? Why do we need to follow them?'",
      "Say: 'Everybody needs to follow traffic rules. Traffic signs remind people what to do.'",
      "Show the four traffic signs. Ask: 'What do you think this sign means?' Let children guess.",
      "Place the signs around the classroom. Say: 'Now pretend you are each driving your own high-speed train. When you come near a traffic sign, slow down or stop.'",
      "Teacher acts as police officer (or one child does). Children move carefully. Remind: 'Look for the signs. Slow down. Stop here.'",
    ],
    construct: [
      "Each group picks a building card and builds the model.",
      "Say: 'Now build a Y-shaped track and place your models beside it.'",
      "Place action bricks in random places along the track. Place the train on the track.",
      "Say: 'Now explore what happens.' Children take turns driving the train.",
      "After each action brick, ask: 'What happened after the train passed this brick?' Children observe.",
    ],
    contemplate: [
      "Say: 'Let us talk about the problems we saw.'",
      "Ask: 'What did you see after the train passed each stop? What problem happened? How can we solve it? Which traffic sign do we need?'",
      "Children choose signs and explain. Connect: problem → sign → solution.",
    ],
    continueStep: [
      "Say: 'Now you can play and use all the traffic signs.'",
      "Ask: 'What other important things should we remember to stay safe in traffic?'",
      "Say: 'You can create your own traffic signs or models to keep people safe.' Children create and place along the track.",
      "Ask each group: 'Why did you place this sign here? What problem does it solve?'",
    ],
    avoid: [
      "Do not tell the sign meaning immediately. Let children guess first.",
      "Do not skip the pretend traffic movement game.",
      "Do not place action bricks only in correct places. Random placement helps children notice problems.",
      "Do not skip asking: 'Which sign solves the problem?'",
    ],
  },
  {
    number: 9,
    title: "ramps",
    whatChildrenDo: [
      "Talk about slides.",
      "Learn that gravity pulls things down.",
      "Hear a story.",
      "Build ramps using magna tiles.",
      "Roll cars or objects down ramps.",
      "Predict how far objects will go.",
      "Mark where they stop.",
      "Record results on graphs.",
      "Compare small and big ramps.",
      "Build a larger ramp.",
      "Try to make a car roll past number 10.",
    ],
    whatChildrenLearn: [
      "Things move down a slope because of gravity.",
      "Shape affects movement.",
      "Some things roll and some things slide.",
      "Bigger ramps may change how far things move.",
      "We can predict, test, mark, and record results.",
      "Numbers help us compare distance.",
    ],
    materials: [
      "Magna Tiles (used to build the ramp itself + as ramp material).",
      "Track template pages, glue or tape, scissors, pencils.",
      "Cars or rolling objects.",
      "Number bricks or number markers.",
      "Result graphs, crayons or coloured pencils.",
      "Inspiration photo, figures for story (if available).",
    ],
    grouping:
      "Story + introduction with all 10. Ramp building and testing in pairs (5 pairs) or as one group. Children take turns rolling; while waiting, others predict, watch, and record.",
    connect: [
      "Ask: 'What is it like to go down a slide? How do you move from the top to the bottom?'",
      "Say: 'You move down because gravity pulls things down. Gravity is a force that pulls things towards the earth.'",
      "Say: 'Today we will build ramps and see how far cars roll.'",
      "Show the inspiration photo or use figures to act out the Parker / Ms Engels / Arty story about building a ramp ride with numbers at the bottom.",
    ],
    construct: [
      "Tape or glue the six template pages together to make one long track. Place it flat.",
      "Working in pairs, children build the two smallest ramps from the inspiration photo — using magna tiles.",
      "Children also build the sides of the track. Place number bricks/markers in the correct places.",
      "Place the smallest ramp on the track. Before rolling, ask: 'How far do you think it will go?' Children guess a number.",
      "One child rolls the car. Mark where it stops with a pencil (different colours for different cars).",
      "Repeat with the bigger ramp. Children predict, roll, mark.",
      "Show how to record on the graph. Each ramp has its own graph; results are recorded after each roll.",
    ],
    contemplate: [
      "Ask: 'How far do you think the car will roll? Will it stop between 3 and 4? Will it roll past 10? Was your prediction correct? Does it become easier to guess after watching a few times?'",
      "Children look at the marks and the graph; they compare what they predicted with what happened.",
      "Help them say: 'I thought it would stop at 5, but it stopped at 7. The bigger ramp made it go farther.'",
    ],
    continueStep: [
      "Ask: 'How can we make the car go faster? How can we make it roll farther?' Children answer.",
      "Say: 'Now build the large ramp shown on the inspiration card.' Children use magna tiles from the smaller ramps to build it.",
      "Children test by rolling cars. Then say: 'Try to build a car that rolls past number 10.' Children build, test, adjust, try again.",
    ],
    avoid: [
      "Do not skip prediction before rolling.",
      "Do not forget to mark where the car stops.",
      "Do not skip the graph.",
      "Do not let children only roll cars for fun without observing distance.",
      "Do not explain gravity in a complicated way.",
    ],
  },
  {
    number: 10,
    title: "chain reaction",
    whatChildrenDo: [
      "Look at an inspiration photo.",
      "Listen to a story.",
      "Understand that one event can cause another event.",
      "Build chain reactions in pairs.",
      "Test them.",
      "Explain first cause, first event, and last event.",
      "Combine chain reactions into one long chain reaction.",
      "Adjust until it works.",
    ],
    whatChildrenLearn: [
      "Cause and effect.",
      "One action can trigger another action.",
      "Order of events.",
      "Testing and fixing.",
      "Prediction: 'Will this work?'",
    ],
    materials: [
      "Inspiration photo.",
      "Building pieces.",
      "Classroom space for testing.",
      "Objects that can move, fall, push, or trigger another action.",
    ],
    grouping:
      "Story with all 10. Building in pairs (5 pairs). Final chain reaction by combining all pairs' work.",
    connect: [
      "Show the inspiration photo. Ask: 'What do you see?' Let children describe.",
      "Say: 'This is a ride called Free Fall. I will read a story. Listen for what happens first and what happens next.'",
      "Read the Matt and Sienna Free Fall story (machine pulls rope → top of tower → lever releases → platform drops → flag goes up).",
      "Ask: 'What caused the platform to drop? What happened next?'",
      "Explain: 'The first trigger was the lever moving and releasing the rope. That caused the platform to drop. When the platform landed, it caused the flag to go up.'",
      "Say: 'This is called a chain reaction. One event causes another event.'",
    ],
    construct: [
      "Make 5 pairs. Say: 'You will work in pairs to create your own chain reaction. One event should cause another event to happen.'",
      "Show inspiration photos. Ask: 'How can you make an object move without touching it?'",
      "Say: 'Build separate parts first. Then put them together and test.'",
      "Children build a first trigger; that trigger moves something; that something causes another event.",
      "Move around. Ask: 'What will happen first? What will that make happen next? What do you think will happen at the end?'",
      "Let children test. If it fails, say: 'Try changing one part.' Don't fix everything for them.",
    ],
    contemplate: [
      "Each pair shows their chain reaction. Ask: 'What was the first cause or trigger? What was the first event? What was the last event? Did it happen the way you predicted? Why or why not?'",
      "Help them use simple words: 'First this moved. Then this fell. Then the flag went up.'",
    ],
    continueStep: [
      "Say: 'Now let us combine all the chain reactions into one long chain reaction.'",
      "Choose one place in the classroom. Each pair brings their part. Children connect the parts.",
      "Say: 'We will test it. If it does not work, we will adjust it.' Children take turns setting it off.",
      "If it stops midway, ask: 'Where did it stop? What can we change?' Children adjust and try again.",
    ],
    avoid: [
      "Do not build the chain reaction for children.",
      "Do not skip the story explanation.",
      "Do not say 'chain reaction' without explaining first event and next event.",
      "Do not treat failure as wrong. Failure is part of testing.",
    ],
  },
  {
    number: 11,
    title: "probability",
    whatChildrenDo: [
      "Play a guessing game.",
      "Guess colours.",
      "Understand clues.",
      "Listen to a story.",
      "Build or use a wheel model.",
      "Predict which colour the wheel will land on.",
      "Spin the wheel.",
      "Record results.",
      "Count results.",
      "Understand that more spaces can mean better chance.",
      "Build a prize using colours collected from spins.",
    ],
    whatChildrenLearn: [
      "Prediction.",
      "Chance.",
      "Some outcomes are more likely.",
      "Recording data.",
      "Counting results.",
      "Comparing more and less.",
    ],
    materials: [
      "Red, yellow, and blue bricks.",
      "Wheel model (or inspiration card for the model).",
      "Results graphs or charts, crayons or coloured pencils.",
      "Bricks or elements in different colours.",
      "Figures or inspiration photo for the story.",
    ],
    grouping:
      "Introduction + story with all 10. Spinning by turns — while one spins, all predict and record. Building the prize in small groups.",
    connect: [
      "Say: 'I am thinking of a colour. You have to guess it.' Give clues — for red: 'It is the colour of a round fruit. It is the colour of a fire engine.' Children guess.",
      "Now place 3 bricks in front: red, yellow, blue. Say: 'I am thinking of one of these three colours. Guess which one.'",
      "Ask: 'Was this easier or harder than the first guessing game?'",
      "Explain: 'This time you had only three colours to choose from, but I did not give clues.'",
      "Read the Spin to Win story. Arty guesses red because it's his favourite; Teresa guesses turquoise because there are three turquoise spaces and only one of each other colour. The wheel lands on red.",
      "Ask: 'Which colour did Arty guess? Why did Teresa guess turquoise? Where did the wheel land?'",
    ],
    construct: [
      "Children look at the wheel model on the inspiration card and build it. (If building takes too long, use a ready model.)",
      "Say: 'This flag at the top is the pointer. It shows where the wheel stops.'",
      "Ask: 'Which colour do you think the wheel will land on?' Explain: 'This is a game of chance. We do not know for sure where the wheel will stop. We can guess, but we cannot be sure.'",
      "Give each child a results graph. Children take turns spinning. Before each spin, ask each child: 'Which colour do you think it will land on?'",
      "Children mark the actual result on the graph next to the correct colour. Repeat several times.",
      "Make sure: every child predicts, records, and marks the actual colour — not only their guess.",
    ],
    contemplate: [
      "After many spins, ask children to look at their graphs.",
      "Ask: 'How many times did the wheel land on red? Yellow? Blue? Turquoise?'",
      "Ask: 'Which colour do you predict next? If we spin three times, how many times do you think it will land on turquoise? Why?'",
      "Explain simply: 'There are more turquoise spaces on the wheel. So the wheel has a better chance of landing on turquoise. Better chance means it may happen more often, but it is still not guaranteed.'",
    ],
    continueStep: [
      "Say: 'Now we will use the wheel to play another game. Each time the wheel lands on a colour, everyone will choose one brick or element of that colour.'",
      "Spin 5 times. After each spin children identify the colour and pick one brick or element of that colour.",
      "After 5 spins, in small groups, children use their collected pieces to build a prize.",
      "Ask: 'What colours did you get? Which colour did you get the most? What did you build?'",
    ],
    avoid: [
      "Do not say 'probability' without explaining it simply.",
      "Do not skip recording results.",
      "Do not let children mark guesses instead of actual results.",
      "Do not promise that turquoise will definitely win. Say it has a better chance.",
    ],
  },
];

// ─── Page renderers ──────────────────────────────────────────────

/**
 * Imagine Playground cover — uses the printed activity-book cover image
 * so teachers see the same artwork as the printed book. Same component
 * is reused as the books-row thumbnail (size="thumb") and as the
 * full first page of the flipbook (size="full").
 */
export function ImaginePlaygroundCoverArt({
  size = "full",
}: {
  size?: "full" | "thumb";
}) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-brand-cream">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/imagine-playground-book/cover.png"
        alt="the imagine playground book — building with blocks of many kinds"
        className="h-full w-full object-contain"
        draggable={false}
      />
    </div>
  );
}

function CoverPage() {
  return <ImaginePlaygroundCoverArt size="full" />;
}

function TocPage() {
  return (
    <div className="flex h-full w-full flex-col bg-brand-cream p-6 md:p-10">
      <p className="text-[10px] font-bold tracking-normal text-brand-orange">
        contents
      </p>
      <h2 className="mt-2 text-[22px] font-extrabold lowercase leading-tight text-ink md:text-[26px]">
        11 build projects
      </h2>
      <p className="mt-1 text-[11px] italic leading-relaxed text-ink-muted md:text-[12px]">
        Each project runs in fixed order across the year — children meet
        every project 2–3 times, deeper each time.
      </p>
      <ol className="mt-4 space-y-1.5 overflow-y-auto pr-2 scroll-visible">
        {LESSONS.map((l) => (
          <li
            key={l.title}
            className="flex items-baseline gap-2 text-[12px] leading-snug text-ink-muted md:text-[12.5px]"
          >
            <span className="w-5 shrink-0 text-right font-bold text-brand-orange">
              {l.number}.
            </span>
            <span className="flex-1">{l.title}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function StructurePage() {
  return (
    <div className="flex h-full w-full flex-col bg-brand-cream p-6 md:p-10">
      <p className="text-[10px] font-bold tracking-normal text-brand-orange">
        how every session runs
      </p>
      <h3 className="mt-2 text-[20px] font-extrabold lowercase leading-tight text-ink md:text-[24px]">
        four parts · the same structure every time
      </h3>
      <ol className="mt-5 space-y-3">
        {[
          {
            n: 1,
            label: "connect / engage",
            body: "The teacher introduces the idea — through a question, a story, or a body movement game.",
          },
          {
            n: 2,
            label: "construct / explore",
            body: "Children build, try, test, and play. The teacher circulates and asks questions, doesn't fix.",
          },
          {
            n: 3,
            label: "explain / contemplate / debrief",
            body: "Children talk about what happened. The teacher helps them put words to it.",
          },
          {
            n: 4,
            label: "continue / elaborate",
            body: "Children try a harder or extended version. Same project, deeper layer.",
          },
        ].map((s) => (
          <li
            key={s.n}
            className="flex items-start gap-3 rounded-xl bg-brand-white p-3 ring-1 ring-ink/5"
          >
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 text-[12px] font-extrabold text-brand-orange">
              {s.n}
            </span>
            <div>
              <p className="text-[12px] font-extrabold lowercase text-ink">
                {s.label}
              </p>
              <p className="mt-0.5 text-[11.5px] leading-relaxed text-ink-muted">
                {s.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-[10.5px] italic leading-relaxed text-ink-muted">
        For every lesson, the teacher first gives instructions to all 10
        children together, then children work in small groups.
      </p>
    </div>
  );
}

function LessonPage({ lesson }: { lesson: Lesson }) {
  return (
    <div className="flex h-full w-full flex-col gap-3 overflow-hidden bg-brand-cream p-5 md:p-7">
      <div>
        <p className="text-[10px] font-bold tracking-normal text-ink-subtle">
          project {lesson.number}
        </p>
        <h3 className="mt-1 text-[20px] font-extrabold lowercase leading-tight text-ink md:text-[24px]">
          {lesson.title}
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto pr-1 scroll-visible">
        <Section label="what children will do" items={lesson.whatChildrenDo} />
        <Section label="what children are learning" items={lesson.whatChildrenLearn} />
        <Section label="materials" items={lesson.materials} />
        <p className="mt-3 text-[10px] font-bold tracking-normal text-brand-orange">
          grouping
        </p>
        <p className="mt-1 text-[11.5px] leading-relaxed text-ink-muted">
          {lesson.grouping}
        </p>

        <Stage label="a · connect / engage" items={lesson.connect} />
        <Stage label="b · construct / explore" items={lesson.construct} />
        <Stage label="c · contemplate / debrief" items={lesson.contemplate} />
        <Stage label="d · continue / elaborate" items={lesson.continueStep} />

        <p className="mt-4 text-[10px] font-bold tracking-normal text-brand-orange">
          common mistakes to avoid
        </p>
        <ul className="mt-1.5 space-y-0.5">
          {lesson.avoid.map((a) => (
            <li
              key={a}
              className="text-[11.5px] leading-relaxed text-ink-muted"
            >
              · {a}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Section({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="mt-3">
      <p className="text-[10px] font-bold tracking-normal text-brand-orange">
        {label}
      </p>
      <ul className="mt-1.5 space-y-0.5">
        {items.map((i) => (
          <li key={i} className="text-[11.5px] leading-relaxed text-ink-muted">
            · {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Stage({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="mt-4">
      <p className="text-[10px] font-bold tracking-normal text-brand-orange">
        {label}
      </p>
      <ol className="mt-1.5 space-y-1.5">
        {items.map((s, i) => (
          <li
            key={s}
            className="flex items-start gap-2 text-[11.5px] leading-relaxed text-ink-muted"
          >
            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 text-[9px] font-extrabold text-brand-orange">
              {i + 1}
            </span>
            <span className="flex-1">{s}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

// ─── Build pages ────────────────────────────────────────────────

function buildPages(): FlipbookPage[] {
  const pages: FlipbookPage[] = [];
  pages.push({ kind: "node", node: <CoverPage /> });
  pages.push({ kind: "node", node: <TocPage /> });
  pages.push({ kind: "node", node: <StructurePage /> });
  for (const lesson of LESSONS) {
    pages.push({ kind: "node", node: <LessonPage lesson={lesson} /> });
  }
  return pages;
}

// ─── Modal ──────────────────────────────────────────────────────

export function ImaginePlaygroundBookModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  if (typeof document === "undefined") return null;

  const pages = buildPages();

  return createPortal(
    <div className="fixed inset-0 z-[100] flex flex-col bg-bg">
      <header className="flex shrink-0 items-center justify-between gap-4 border-b border-ink/5 bg-brand-orange px-4 py-3 text-white md:px-8">
        <div className="min-w-0">
          <p className="text-[10px] font-bold tracking-normal text-white/80">
            teacher reference
          </p>
          <h2 className="truncate text-[18px] font-extrabold lowercase leading-tight md:text-[22px]">
            the imagine playground book · stem 3–5
          </h2>
        </div>
        <button
          onClick={onClose}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
          aria-label="close imagine playground book"
        >
          <X className="h-4 w-4" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-3xl px-3 py-5 md:px-6 md:py-8">
          <div className="rounded-2xl bg-white p-3 shadow-card ring-1 ring-ink/5 md:p-5">
            <p className="mb-3 text-[11px] italic leading-relaxed text-ink-muted md:text-[12px]">
              11 core build projects with the four-part lesson structure for
              every session.
            </p>
            <ImageFlipbook
              pages={pages}
              altPrefix="imagine playground book page"
            />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
