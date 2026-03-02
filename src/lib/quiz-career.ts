// Career Quiz — Data & Scoring Engine
// See CAREER_QUIZ_PRD.md for full specifications

// --- Types ---

export type AxisPole =
  | "making"
  | "relating"
  | "thinking"
  | "feeling"
  | "structured"
  | "fluid"
  | "individual"
  | "community";

export type AxisScores = Partial<Record<AxisPole, number>>;

export interface QuizAnswer {
  label: string;
  text: string;
  scores: AxisScores;
  tiebreaker?: string; // archetype slug
}

export interface QuizQuestion {
  id: number;
  question: string;
  answers: QuizAnswer[];
}

export interface ColorCard {
  id: string;
  name: string;
  hex: string;
  scores: AxisScores;
  tiebreaker?: string; // archetype slug
}

export interface ArchetypeProfile {
  slug: string;
  name: string;
  essenceLine: string;
  description: string;
  whatThisSays: string;
  careers: string[];
  howToBring: string;
  axes: {
    makingRelating: "making" | "relating";
    thinkingFeeling: "thinking" | "feeling";
    structuredFluid: "structured" | "fluid";
    individualCommunity: "individual" | "community";
  };
}

// --- Questions (Q1–Q9) ---

export const questions: QuizQuestion[] = [
  {
    id: 1,
    question: "When you imagine work that feels meaningful, what does it involve?",
    answers: [
      {
        label: "A",
        text: "Being part of something bigger than yourself",
        scores: { community: 2, relating: 1 },
      },
      {
        label: "B",
        text: "Helping someone through something difficult",
        scores: { relating: 2, feeling: 2 },
      },
      {
        label: "C",
        text: "Making or building something that didn\u2019t exist before",
        scores: { making: 2, fluid: 1 },
      },
      {
        label: "D",
        text: "Understanding something deeply and sharing what you found",
        scores: { thinking: 2, individual: 1 },
      },
    ],
  },
  {
    id: 2,
    question: "What kind of environment brings out your best?",
    answers: [
      {
        label: "A",
        text: "Structured with clear goals and systems",
        scores: { structured: 2, thinking: 1 },
      },
      {
        label: "B",
        text: "Open and flexible \u2014 you need room to improvise",
        scores: { fluid: 2, making: 1 },
      },
      {
        label: "C",
        text: "Quiet, focused, room to think and create alone",
        scores: { individual: 2, making: 2 },
      },
      {
        label: "D",
        text: "Collaborative, people-centered, lots of interaction",
        scores: { community: 2, relating: 2 },
      },
    ],
  },
  {
    id: 3,
    question: "What do people consistently come to you for?",
    answers: [
      {
        label: "A",
        text: "Help solving a problem or figuring something out",
        scores: { thinking: 2, structured: 1, individual: 1 },
      },
      {
        label: "B",
        text: "To be inspired or energized",
        scores: { community: 2, fluid: 1 },
      },
      {
        label: "C",
        text: "Emotional support or a listening ear",
        scores: { feeling: 2, relating: 2 },
      },
      {
        label: "D",
        text: "Your perspective or creative ideas",
        scores: { making: 2, feeling: 1 },
      },
    ],
  },
  {
    id: 4,
    question: "What kind of impact do you most want to have?",
    answers: [
      {
        label: "A",
        text: "Something you made changes how people see the world",
        scores: { making: 2, fluid: 2, individual: 1 },
      },
      {
        label: "B",
        text: "Someone\u2019s life is measurably better because of you",
        scores: { relating: 2, feeling: 2 },
      },
      {
        label: "C",
        text: "A community is stronger, more connected, more whole",
        scores: { community: 2, relating: 2 },
      },
      {
        label: "D",
        text: "A system or institution works better because of your work",
        scores: { structured: 2, thinking: 2 },
      },
    ],
  },
  {
    id: 5,
    question: "What frustrates you most at work?",
    answers: [
      {
        label: "A",
        text: "Working in isolation with no sense of collective purpose",
        scores: { community: 2, relating: 1 },
      },
      {
        label: "B",
        text: "Chaos, unclear goals, no system or structure",
        scores: { structured: 2, thinking: 2 },
      },
      {
        label: "C",
        text: "Work that feels disconnected from real people or real problems",
        scores: { relating: 2, feeling: 2 },
      },
      {
        label: "D",
        text: "Being told what to make or how to express something",
        scores: { making: 2, fluid: 2, individual: 1 },
      },
    ],
  },
  {
    id: 6,
    question:
      "If you had a free Saturday with no obligations, you\u2019d most likely spend it:",
    answers: [
      {
        label: "A",
        text: "Learning something \u2014 reading, researching, going deep on a topic",
        scores: { thinking: 2, individual: 2 },
      },
      {
        label: "B",
        text: "With people \u2014 friends, family, community, someone who needs you",
        scores: { relating: 2, community: 2 },
      },
      {
        label: "C",
        text: "Making something \u2014 writing, drawing, building, cooking, creating",
        scores: { making: 2, fluid: 2 },
      },
      {
        label: "D",
        text: "Doing something that matters \u2014 volunteering, advocating, contributing",
        scores: { community: 1, structured: 1 },
      },
    ],
  },
  {
    id: 7,
    question: "When you were a kid, what did you want to be?",
    answers: [
      {
        label: "A",
        text: "A scientist, detective, or someone who figured things out",
        scores: { thinking: 2, individual: 2 },
      },
      {
        label: "B",
        text: "A doctor, teacher, counselor, or someone who helped people",
        scores: { relating: 2, feeling: 2 },
      },
      {
        label: "C",
        text: "A leader, organizer, or someone who brought people together",
        scores: { community: 2, relating: 2 },
      },
      {
        label: "D",
        text: "An artist, writer, musician, or someone who made things",
        scores: { making: 2, fluid: 2 },
        tiebreaker: "creator",
      },
    ],
  },
  {
    id: 8,
    question: "What does a really good day feel like?",
    answers: [
      {
        label: "A",
        text: "You helped someone in a way that actually mattered",
        scores: { relating: 2, feeling: 2 },
      },
      {
        label: "B",
        text: "You made something you\u2019re proud of",
        scores: { making: 2, individual: 1 },
      },
      {
        label: "C",
        text: "You were part of something larger than yourself",
        scores: { community: 2, relating: 2 },
      },
      {
        label: "D",
        text: "You understood something you didn\u2019t understand before",
        scores: { thinking: 2, individual: 2 },
      },
    ],
  },
  {
    id: 9,
    question:
      "If you could only be remembered for one thing, what would you choose?",
    answers: [
      {
        label: "A",
        text: "A truth you uncovered or a problem you solved",
        scores: { thinking: 2, individual: 2 },
      },
      {
        label: "B",
        text: "A community or movement you helped build",
        scores: { community: 2, structured: 2 },
      },
      {
        label: "C",
        text: "The people whose lives were better because of you",
        scores: { relating: 2, feeling: 2 },
      },
      {
        label: "D",
        text: "Something you created that outlasted you",
        scores: { making: 2, fluid: 2 },
      },
    ],
  },
  {
    id: 10,
    question: "When you have to make a hard decision, you tend to:",
    answers: [
      {
        label: "A",
        text: "Think it through alone until it\u2019s clear",
        scores: { individual: 2, thinking: 2 },
      },
      {
        label: "B",
        text: "Talk to the people it affects",
        scores: { relating: 2, community: 1 },
      },
      {
        label: "C",
        text: "Trust your gut and move",
        scores: { fluid: 2, making: 1 },
      },
      {
        label: "D",
        text: "Map out the options and likely outcomes",
        scores: { structured: 2, thinking: 1 },
      },
    ],
  },
  {
    id: 11,
    question: "What kind of problem genuinely excites you?",
    answers: [
      {
        label: "A",
        text: "A human problem \u2014 someone struggling with something real",
        scores: { relating: 2, feeling: 2 },
      },
      {
        label: "B",
        text: "A creative problem \u2014 something that doesn\u2019t exist yet",
        scores: { making: 2, fluid: 2 },
      },
      {
        label: "C",
        text: "A systems problem \u2014 something broken that could work better",
        scores: { structured: 2, thinking: 1 },
      },
      {
        label: "D",
        text: "A knowledge problem \u2014 something no one has fully figured out",
        scores: { thinking: 2, individual: 2 },
      },
    ],
  },
  {
    id: 12,
    question: "When you\u2019re working on something with a group, you tend to:",
    answers: [
      {
        label: "A",
        text: "Bring the idea no one else thought of",
        scores: { making: 2, individual: 1 },
      },
      {
        label: "B",
        text: "Make sure everyone has what they need to contribute",
        scores: { relating: 2, community: 2 },
      },
      {
        label: "C",
        text: "Get into the details and work them out",
        scores: { thinking: 2, structured: 1 },
      },
      {
        label: "D",
        text: "Keep people focused on what actually matters",
        scores: { structured: 2, community: 1 },
      },
    ],
  },
  {
    id: 13,
    question: "What do you find easy that most people seem to find hard?",
    answers: [
      {
        label: "A",
        text: "Starting something from nothing",
        scores: { making: 2, fluid: 2 },
      },
      {
        label: "B",
        text: "Sitting with someone in pain without rushing to fix it",
        scores: { relating: 2, feeling: 2 },
      },
      {
        label: "C",
        text: "Staying with something complex for a long time",
        scores: { thinking: 2, individual: 2 },
      },
      {
        label: "D",
        text: "Getting very different people to trust each other",
        scores: { community: 2, relating: 1 },
      },
    ],
  },
];

// --- Color Cards (Q10 in PRD, now Q15 with 5 additional questions) ---

export const colorCards: ColorCard[] = [
  {
    id: "red",
    name: "Red",
    hex: "#c0392b",
    scores: { making: 2, fluid: 2 },
    tiebreaker: "performer",
  },
  {
    id: "blue",
    name: "Blue",
    hex: "#0ea5e9",
    scores: { relating: 2, structured: 2 },
  },
  {
    id: "green",
    name: "Green",
    hex: "#27ae60",
    scores: { structured: 2, individual: 2 },
  },
  {
    id: "yellow",
    name: "Yellow",
    hex: "#f1c40f",
    scores: { fluid: 2, making: 2 },
    tiebreaker: "visionary",
  },
  {
    id: "violet",
    name: "Violet",
    hex: "#7209b7",
    scores: { feeling: 2, fluid: 2 },
    tiebreaker: "creator",
  },
  {
    id: "brown",
    name: "Brown",
    hex: "#7b4f2e",
    scores: { structured: 2, relating: 2 },
  },
  {
    id: "gray",
    name: "Gray",
    hex: "#7f8c8d",
    scores: { thinking: 2, individual: 2 },
  },
  {
    id: "black",
    name: "Black",
    hex: "#1a1a1a",
    scores: { making: 2, thinking: 2 },
    tiebreaker: "investigator",
  },
];

// --- Archetype Profiles ---

export const archetypes: ArchetypeProfile[] = [
  {
    slug: "creator",
    name: "The Creator",
    essenceLine: "You were made to make things",
    description:
      "You have always had a need to express something \u2014 to take what\u2019s inside and put it into the world in a form others can experience. A blank page, a blank canvas, an empty document is not intimidating to you. It\u2019s an invitation. The problem isn\u2019t that you don\u2019t know what you want to make. The problem is that life keeps asking you to do other things instead.",
    whatThisSays:
      "You process the world through making. When you can\u2019t create, something goes quiet in you that shouldn\u2019t be quiet. You\u2019re not being precious about it \u2014 you\u2019re being honest about what keeps you alive.",
    careers: [
      "Writer",
      "Illustrator",
      "Graphic Designer",
      "Filmmaker",
      "UX Designer",
      "Architect",
      "Game Designer",
      "Content Creator",
      "Art Director",
      "Musician",
      "Photographer",
      "Animator",
    ],
    howToBring:
      "Start with one hour a week that is only for making \u2014 not consuming, not planning, just making. It doesn\u2019t have to be good. It doesn\u2019t have to be shared. Pick one medium and show up for it consistently. Many Creators find their way in through side projects that quietly become the main thing. Etsy shops, newsletters, YouTube channels, open source contributions \u2014 the path in is usually smaller than you think and longer than you want.",
    axes: {
      makingRelating: "making",
      thinkingFeeling: "feeling",
      structuredFluid: "fluid",
      individualCommunity: "individual",
    },
  },
  {
    slug: "healer",
    name: "The Healer",
    essenceLine: "You were made to restore people",
    description:
      "You have a gift for sitting with people in their pain without needing to fix it immediately. You notice when someone is off before they say anything. You are the person people call when they don\u2019t know who else to call. This is not a burden \u2014 it\u2019s a calling. You were wired for the kind of work that requires you to be fully present with another human being.",
    whatThisSays:
      "You give people permission to be exactly where they are. That is rarer than it sounds. Most people want to fix, advise, or move on. You can stay.",
    careers: [
      "Therapist",
      "Counselor",
      "Social Worker",
      "Nurse",
      "Physical Therapist",
      "Occupational Therapist",
      "Life Coach",
      "Chaplain",
      "Palliative Care",
      "School Counselor",
      "Community Health Worker",
      "Doula",
    ],
    howToBring:
      "You\u2019re probably already doing this informally \u2014 being the person people turn to. Consider formalizing it in small ways: volunteer crisis line work, peer support training, or simply being more intentional about the listening relationships already in your life. Many Healers start with a certification or short course in counseling, coaching, or a therapeutic modality. The credential matters less than the practice of showing up fully for another person.",
    axes: {
      makingRelating: "relating",
      thinkingFeeling: "feeling",
      structuredFluid: "fluid",
      individualCommunity: "community",
    },
  },
  {
    slug: "guide",
    name: "The Guide",
    essenceLine: "You were made to help others find their way",
    description:
      "You have a natural instinct for meeting people where they are and walking with them toward somewhere better. You don\u2019t just share knowledge \u2014 you shape how people think. The most satisfying moments in your life have probably involved watching someone understand something they didn\u2019t understand before, or become something they weren\u2019t before you met them.",
    whatThisSays:
      "You carry other people\u2019s potential seriously. You see what someone could be before they see it themselves. That\u2019s a gift most people never receive from anyone.",
    careers: [
      "Teacher",
      "Professor",
      "Corporate Trainer",
      "Career Coach",
      "Mentor",
      "Instructional Designer",
      "Curriculum Developer",
      "Tutor",
      "Workshop Facilitator",
      "Youth Worker",
      "Academic Advisor",
      "Spiritual Director",
    ],
    howToBring:
      "Start mentoring someone \u2014 formally or informally. Offer to teach something you know in your current organization. Create a resource, course, or workshop around something you understand deeply. Many Guides discover their path through informal mentorship that grows into something more. The act of teaching forces you to understand things more deeply and gives you evidence that you\u2019re good at it.",
    axes: {
      makingRelating: "relating",
      thinkingFeeling: "feeling",
      structuredFluid: "structured",
      individualCommunity: "community",
    },
  },
  {
    slug: "investigator",
    name: "The Investigator",
    essenceLine: "You were made to find things out",
    description:
      "You have never been satisfied with surface explanations. You need to know why \u2014 the real why, not the polite why. You are at your best when you\u2019re given a hard question, a pile of information, and time to dig. The research is not the means to an end for you. The research is the thing.",
    whatThisSays:
      "You have a higher tolerance for complexity and ambiguity than most people, and you use it to get to truth others give up on. The world needs people who won\u2019t stop asking.",
    careers: [
      "Research Scientist",
      "Journalist",
      "Data Analyst",
      "Historian",
      "Forensic Analyst",
      "UX Researcher",
      "Policy Analyst",
      "Academic",
      "Archaeologist",
      "Intelligence Analyst",
      "Medical Researcher",
      "Investigative Reporter",
    ],
    howToBring:
      "Pick one question you\u2019ve always wanted to investigate and spend thirty days going deep on it. Write about what you find \u2014 even privately. Many Investigators find their entry point through writing, whether that\u2019s a newsletter, a blog, or a research side project. The discipline of publishing forces rigor. Consider whether there\u2019s a research or analysis function in your current role you\u2019ve been underutilizing.",
    axes: {
      makingRelating: "making",
      thinkingFeeling: "thinking",
      structuredFluid: "structured",
      individualCommunity: "individual",
    },
  },
  {
    slug: "builder",
    name: "The Builder",
    essenceLine: "You were made to make things work",
    description:
      "You look at a broken system and see a fixable problem. You look at an inefficient process and feel a physical need to improve it. You are at your best when there is something concrete to build, optimize, or solve \u2014 and at your worst when you\u2019re asked to just talk about it without doing anything. The satisfaction of something working because you made it work is one of the deepest pleasures available to you.",
    whatThisSays:
      "You create order where there was chaos, function where there was friction. That is a form of generosity most people don\u2019t recognize as such.",
    careers: [
      "Software Engineer",
      "Civil Engineer",
      "Product Manager",
      "Operations Manager",
      "Architect",
      "Urban Planner",
      "Systems Analyst",
      "Supply Chain Manager",
      "Manufacturing Engineer",
      "Infrastructure Engineer",
      "Entrepreneur",
    ],
    howToBring:
      "Find the broken thing closest to you and fix it. In your home, your team, your community. Build something small from scratch \u2014 a tool, a process, a physical object. Many Builders find their entry point through side projects that solve a problem they personally have. The constraint of a real problem you actually care about produces better work than any hypothetical.",
    axes: {
      makingRelating: "making",
      thinkingFeeling: "thinking",
      structuredFluid: "structured",
      individualCommunity: "individual",
    },
  },
  {
    slug: "connector",
    name: "The Connector",
    essenceLine: "You were made to bring people together",
    description:
      "You have a gift for seeing what people have in common before they see it themselves. You remember names, circumstances, and who should meet whom. You thrive in the space between people \u2014 facilitation, relationship-building, community-weaving. When a group comes alive because of something you did, that is your version of a perfect day.",
    whatThisSays:
      "You understand that most of the best things in the world happen at the intersection of the right people. You are someone who creates those intersections.",
    careers: [
      "Community Manager",
      "Event Producer",
      "Partnerships Manager",
      "Recruiter",
      "Nonprofit Director",
      "Social Entrepreneur",
      "PR Professional",
      "Network Organizer",
      "Political Organizer",
      "HR Leader",
      "Ambassador",
    ],
    howToBring:
      "Start with one introduction a week \u2014 someone you know who should know someone else you know. Build or join a community around something you care about. Many Connectors find their path by organizing something small first: a dinner, a Slack group, a local meetup. The practice of convening people is its own skill and it compounds over time.",
    axes: {
      makingRelating: "relating",
      thinkingFeeling: "feeling",
      structuredFluid: "fluid",
      individualCommunity: "community",
    },
  },
  {
    slug: "advocate",
    name: "The Advocate",
    essenceLine: "You were made to fight for what\u2019s right",
    description:
      "You have never been able to look away from injustice. You feel a specific kind of anger when systems fail people \u2014 not a hot rage, but a cold, determined one that asks: what can be done? You are at your best when there is a cause, a case, or a community that needs someone to speak up clearly and persistently on its behalf.",
    whatThisSays:
      "You carry a strong moral compass and the willingness to act on it even when it\u2019s uncomfortable. The world has always needed people like you. It needs them now more than ever.",
    careers: [
      "Lawyer",
      "Public Defender",
      "Policy Analyst",
      "Nonprofit Leader",
      "Journalist",
      "Civil Rights Organizer",
      "Social Worker",
      "Lobbyist",
      "Human Rights Researcher",
      "Public Health Officer",
      "Labor Organizer",
      "Environmental Activist",
    ],
    howToBring:
      "Find the cause closest to your actual life and show up for it consistently \u2014 not just online but in person. Volunteer with an organization doing the work. Use your professional skills in service of something you believe in. Many Advocates find that their day job gradually tilts toward the mission when they stop keeping the two separate.",
    axes: {
      makingRelating: "relating",
      thinkingFeeling: "thinking",
      structuredFluid: "structured",
      individualCommunity: "community",
    },
  },
  {
    slug: "performer",
    name: "The Performer",
    essenceLine: "You were made to move people",
    description:
      "You have a need to communicate that goes beyond information transfer. You want people to feel something \u2014 to laugh, to cry, to think differently, to leave changed. Whether it\u2019s on a stage, in a meeting room, in a classroom, or in a video \u2014 you are most alive when you have an audience and something true to say to them.",
    whatThisSays:
      "You understand that how something is said is inseparable from what is said. You use presence, timing, and energy as tools. That is a craft, and yours is real.",
    careers: [
      "Actor",
      "Comedian",
      "Public Speaker",
      "Teacher",
      "Podcast Host",
      "YouTuber",
      "Trainer",
      "Motivational Speaker",
      "Emcee",
      "Storyteller",
      "Broadcast Journalist",
      "Musician",
      "Dancer",
    ],
    howToBring:
      "Find an audience, even a small one, and practice performing for them regularly. A local open mic, a YouTube channel with ten subscribers, a team meeting where you present \u2014 frequency matters more than scale at the start. Many Performers find their entry point through teaching or facilitation, which scratches the same itch with a lower barrier to entry. Toastmasters is genuinely useful and deeply underrated.",
    axes: {
      makingRelating: "making",
      thinkingFeeling: "feeling",
      structuredFluid: "fluid",
      individualCommunity: "community",
    },
  },
  {
    slug: "steward",
    name: "The Steward",
    essenceLine: "You were made to tend and care",
    description:
      "You find meaning in the long, patient work of caring for something \u2014 a person, a place, a tradition, a community. You are not drawn to the dramatic gesture or the big launch. You are drawn to the consistent showing up, the quiet maintenance, the trust that builds slowly between you and whatever you tend. This is not a small thing. Most of what holds the world together is stewarded by people like you.",
    whatThisSays:
      "You understand that care is a practice, not an event. You are someone people and places can rely on. That kind of reliability is a form of love.",
    careers: [
      "Nurse",
      "Elder Care Worker",
      "Librarian",
      "Conservationist",
      "Park Ranger",
      "Museum Curator",
      "School Counselor",
      "Hospice Worker",
      "Archivist",
      "Gardener",
      "Facilities Manager",
    ],
    howToBring:
      "Identify what you are already tending \u2014 and tend it more intentionally. It could be a relationship, a garden, a community space, a tradition in your family. Many Stewards find their way in through volunteer work with populations or places that need consistent care. The key is longevity \u2014 showing up for the same thing over time is where the meaning accumulates.",
    axes: {
      makingRelating: "relating",
      thinkingFeeling: "feeling",
      structuredFluid: "structured",
      individualCommunity: "community",
    },
  },
  {
    slug: "visionary",
    name: "The Visionary",
    essenceLine: "You were made to see what isn\u2019t there yet",
    description:
      "You have always lived slightly ahead of the present. You see problems before they arrive and possibilities before others can imagine them. You are at your best when you\u2019re given a hard problem, a blank slate, and permission to think differently. The future is not abstract to you \u2014 it\u2019s a place you can almost touch.",
    whatThisSays:
      "You carry ideas that need to exist in the world. The gap between what is and what could be is not frustrating to you \u2014 it\u2019s motivating. That orientation is rare and it\u2019s needed.",
    careers: [
      "Entrepreneur",
      "Futurist",
      "Startup Founder",
      "Innovation Strategist",
      "Product Visionary",
      "Architect",
      "Urban Designer",
      "Science Fiction Writer",
      "R&D Leader",
      "Social Entrepreneur",
      "Venture Capitalist",
      "Chief Strategy Officer",
    ],
    howToBring:
      "Give your ideas a container \u2014 a notebook, a newsletter, a side project. Many Visionaries lose their best thinking because they never write it down or build on it consistently. Find a problem you care about and spend ninety days thinking about it seriously. The path for Visionaries often starts with a hypothesis: what if this existed? Build the smallest possible version of it and see what happens.",
    axes: {
      makingRelating: "making",
      thinkingFeeling: "thinking",
      structuredFluid: "fluid",
      individualCommunity: "individual",
    },
  },
];

// --- Scoring Engine ---

const ALL_POLES: AxisPole[] = [
  "making",
  "relating",
  "thinking",
  "feeling",
  "structured",
  "fluid",
  "individual",
  "community",
];

export function accumulateScores(
  answerScores: AxisScores[]
): Record<AxisPole, number> {
  const totals = Object.fromEntries(
    ALL_POLES.map((pole) => [pole, 0])
  ) as Record<AxisPole, number>;

  for (const scores of answerScores) {
    for (const [pole, value] of Object.entries(scores)) {
      totals[pole as AxisPole] += value as number;
    }
  }

  return totals;
}

type AxisKey =
  | "makingRelating"
  | "thinkingFeeling"
  | "structuredFluid"
  | "individualCommunity";

interface AxisPair {
  key: AxisKey;
  poleA: AxisPole;
  poleB: AxisPole;
}

const AXIS_PAIRS: AxisPair[] = [
  { key: "makingRelating", poleA: "making", poleB: "relating" },
  { key: "thinkingFeeling", poleA: "thinking", poleB: "feeling" },
  { key: "structuredFluid", poleA: "structured", poleB: "fluid" },
  { key: "individualCommunity", poleA: "individual", poleB: "community" },
];

// All 16 axis combinations mapped to deliberate archetype slugs.
// Combos with two matching archetypes use the first as default; tiebreakers override.
const COMBO_MAP: Record<string, string> = {
  "making-thinking-structured-individual": "investigator", // tiebreaker → builder
  "making-thinking-structured-community":  "builder",
  "making-thinking-fluid-individual":      "visionary",
  "making-thinking-fluid-community":       "visionary",
  "making-feeling-structured-individual":  "creator",
  "making-feeling-structured-community":   "performer",
  "making-feeling-fluid-individual":       "creator",     // tiebreaker → creator
  "making-feeling-fluid-community":        "performer",   // tiebreaker → connector
  "relating-thinking-structured-individual": "advocate",
  "relating-thinking-structured-community":  "advocate",
  "relating-thinking-fluid-individual":      "investigator",
  "relating-thinking-fluid-community":       "advocate",
  "relating-feeling-structured-individual":  "steward",
  "relating-feeling-structured-community":   "guide",     // tiebreaker → steward
  "relating-feeling-fluid-individual":       "healer",
  "relating-feeling-fluid-community":        "healer",    // tiebreaker → connector
};

export function determineArchetype(
  scores: Record<AxisPole, number>,
  tiebreakers: string[]
): ArchetypeProfile {
  // Determine dominant pole for each axis
  const profile = {} as Record<AxisKey, string>;

  for (const { key, poleA, poleB } of AXIS_PAIRS) {
    profile[key] = scores[poleA] >= scores[poleB] ? poleA : poleB;
  }

  const comboKey = `${profile.makingRelating}-${profile.thinkingFeeling}-${profile.structuredFluid}-${profile.individualCommunity}`;
  const primarySlug = COMBO_MAP[comboKey] ?? "creator";

  // Check if a tiebreaker overrides the primary within this same combo
  const comboMatches = archetypes.filter(
    (a) =>
      a.axes.makingRelating === profile.makingRelating &&
      a.axes.thinkingFeeling === profile.thinkingFeeling &&
      a.axes.structuredFluid === profile.structuredFluid &&
      a.axes.individualCommunity === profile.individualCommunity
  );
  const tiebreakerMatch = comboMatches.find((a) => tiebreakers.includes(a.slug));
  const resolvedSlug = tiebreakerMatch?.slug ?? primarySlug;

  return archetypes.find((a) => a.slug === resolvedSlug) ?? archetypes[0];
}

// --- Lookup helper ---

export function findArchetype(slug: string): ArchetypeProfile | undefined {
  return archetypes.find((a) => a.slug === slug);
}
