import { C } from './tokens.js';

// ─── Life Chart ────────────────────────────────────────────────
// Each row must sum to 100. Bands: play · learning · making · work · civic
export const LIFE_DATA = [
  { age:  0, play: 95, learning:  5, making:  0, work:  0, civic:  0 },
  { age:  3, play: 85, learning: 13, making:  2, work:  0, civic:  0 },
  { age:  7, play: 70, learning: 25, making:  4, work:  0, civic:  1 },
  { age: 11, play: 55, learning: 35, making:  7, work:  0, civic:  3 },
  { age: 15, play: 40, learning: 42, making: 12, work:  0, civic:  6 },
  { age: 18, play: 30, learning: 44, making: 14, work:  5, civic:  7 },
  { age: 21, play: 20, learning: 30, making: 15, work: 25, civic: 10 },
  { age: 23, play: 15, learning: 20, making: 15, work: 40, civic: 10 },
  { age: 25, play: 12, learning: 15, making: 17, work: 44, civic: 12 },
  { age: 27, play: 12, learning: 15, making: 17, work: 44, civic: 12 },
];

export const LIFE_EVENTS = [
  { age:  7, label: 'Lagos, early years' },
  { age: 15, label: 'Secondary school · first writings' },
  { age: 18, label: 'African Leadership University · founding class' },
  { age: 20, label: 'First Class Honours · graduated ALU' },
  { age: 21, label: 'Joined Paystack · built PMO from scratch' },
  { age: 23, label: 'Treasury operations across Nigeria, Ghana, SA & Kenya' },
  { age: 24, label: 'Motitomi · community practice begins' },
  { age: 25, label: 'Head of Operations · Ladder Microfinance Bank' },
  { age: 27, label: 'Building · Gathering · Advocating' },
];

// ─── Stories ───────────────────────────────────────────────────
export const STORIES = [
  {
    id: 1,
    title: 'On Third Spaces and the Infrastructure of Belonging',
    date: '2025-10-12',
    excerpt: 'What makes a place feel like yours without owning it? Lagos has given me more answers than most cities would — and more questions than I expected.',
    tags: ['community', 'Lagos', 'gathering'],
    notionUrl: 'https://motitomi.notion.site',
    recommendations: {
      book:    { title: 'The Great Good Place',          author: 'Ray Oldenburg' },
      song:    { title: 'Brown Skin Girl',               artist: 'Beyoncé ft. Wizkid' },
      film:    { title: 'The Burial of Kojo',            director: 'Blitz Bazawule' },
      place:   { name: 'Freedom Park',                   city: 'Lagos Island' },
      article: { title: 'The Case for the Third Place',  publication: 'The Atlantic' },
    },
  },
  {
    id: 2,
    title: 'What Treasury Operations Taught Me About Trust',
    date: '2025-07-04',
    excerpt: 'Moving money across four African markets taught me that trust is the real currency. Everything else is just float — and float, eventually, runs out.',
    tags: ['operations', 'fintech', 'Africa'],
    notionUrl: 'https://motitomi.notion.site',
    recommendations: {
      book:    { title: 'Working in Public',                    author: 'Nadia Eghbal' },
      song:    { title: 'Many Things',                          artist: 'Asa' },
      film:    { title: 'Coded Bias',                           director: 'Shalini Kantayya' },
      place:   { name: 'Bature Brewery',                        city: 'Abuja' },
      article: { title: 'The Infrastructure of African Finance', publication: 'Rest of World' },
    },
  },
  {
    id: 3,
    title: 'Risograph and the Case for Slow Making',
    date: '2025-04-20',
    excerpt: 'In a world optimised for scale, learning to print one page at a time felt like an act of resistance. And then it felt like joy.',
    tags: ['making', 'craft', 'motitomi'],
    notionUrl: 'https://motitomi.notion.site',
    recommendations: {
      book:    { title: 'The Art of Noticing', author: 'Rob Walker' },
      song:    { title: 'Superstar',           artist: 'Tiwa Savage' },
      film:    { title: 'Jiro Dreams of Sushi', director: 'David Gelb' },
      place:   { name: '16by16',               city: 'Lagos' },
      article: { title: 'In Praise of Slowness', publication: 'Aeon' },
    },
  },
  {
    id: 4,
    title: 'When Infrastructure Is Personal: Lagos and the Floods',
    date: '2024-09-30',
    excerpt: 'The first time my street flooded, I called it bad luck. The second time, I took photos. The third time, I started building a petition.',
    tags: ['civic', 'Lagos', 'advocacy'],
    notionUrl: 'https://motitomi.notion.site',
    recommendations: {
      book:    { title: 'Invisible Cities',          author: 'Italo Calvino' },
      song:    { title: 'Wetin We Gain',             artist: 'Victor AD' },
      film:    { title: 'When the Levees Broke',     director: 'Spike Lee' },
      place:   { name: 'National Museum Lagos',      city: 'Onikan' },
      article: { title: 'Who Gets to Build a City?', publication: 'The Guardian' },
    },
  },
];

// ─── Gallery ───────────────────────────────────────────────────
export const GALLERY_ITEMS = [
  { id: 1, type: 'photo', src: 'https://picsum.photos/seed/tomi-g1/800/600', caption: 'Open House Lagos · 2024',           theme: 'community' },
  { id: 2, type: 'photo', src: 'https://picsum.photos/seed/tomi-g2/600/800', caption: 'Risograph Session · 16by16 · 2024', theme: 'making'    },
  { id: 3, type: 'video', src: null, poster: 'https://picsum.photos/seed/tomi-g3/800/450', caption: 'In Good Company · 2025', theme: 'community' },
  { id: 4, type: 'photo', src: 'https://picsum.photos/seed/tomi-g4/800/550', caption: 'Lagos Architecture Tour · 2023',    theme: 'civic'     },
  { id: 5, type: 'audio', src: null, caption: 'Conscious Liberation · poetry reading · 2025',                              theme: 'making'    },
  { id: 6, type: 'photo', src: 'https://picsum.photos/seed/tomi-g5/600/750', caption: 'MINTings Market · 2024',            theme: 'community' },
  { id: 7, type: 'photo', src: 'https://picsum.photos/seed/tomi-g6/800/600', caption: 'ALU Graduation · 2019',             theme: 'work'      },
  { id: 8, type: 'video', src: null, poster: 'https://picsum.photos/seed/tomi-g8/800/450', caption: 'ELEVATE Workshop · 2024', theme: 'work'  },
  { id: 9, type: 'photo', src: 'https://picsum.photos/seed/tomi-g9/600/800', caption: 'Pottery · craft residency · 2024',  theme: 'making'    },
];

// ─── Work ──────────────────────────────────────────────────────
export const WORK_WORLDS = [
  {
    num: '01', eyebrow: 'Build', color: C.forest,
    title: 'Operations & Strategy',
    subtitle: 'Nearly a decade building financial infrastructure across Africa — from treasury systems to microfinance banking, turning complex operational puzzles into scalable, elegant systems.',
    items: [
      {
        t: 'Head of Operations, Ladder MFB',
        d: 'Leading six operational workstreams for Paystack\'s Ladder Microfinance Bank — BizOps, Customer Compliance, Disputes & Fraud, Customer Engagement, People Ops, and FinOps. Coordinating 60+ people across legal, engineering, treasury and compliance.',
        active: true,
        callout: null,
      },
      {
        t: 'PMO Architect',
        d: 'Built Paystack\'s Project Management Office from the ground up. Introduced cross-functional collaboration frameworks that scaled with the company\'s growth from startup to Stripe acquisition.',
        active: false,
        callout: null,
      },
      {
        t: 'Treasury Operations · Multi-Market',
        d: 'Launched and scaled treasury operations across Nigeria, Ghana, South Africa and Kenya — growing markets by 17× and 80× respectively in two years.',
        active: false,
        callout: null,
      },
      {
        t: 'Knowledge Systems & Business Continuity',
        d: 'Designed cross-cultural knowledge infrastructure — glossaries, wiktionaries, and institutional memory systems — enabling seamless integration across diverse teams and markets.',
        active: true,
        callout: null,
      },
    ],
    tags: ['PMP Certified', 'Lean Methodology', 'SERVQUAL', 'Regulatory Compliance', 'Financial Modeling', 'Knowledge Management'],
  },
  {
    num: '02', eyebrow: 'Gather', color: C.terracotta,
    title: 'Motitomi & Community',
    subtitle: 'Motitomi means "I have become enough for myself." A practice centred on intentional living and collaborative creative spaces — building the infrastructure for curious people to discover and create in abundance.',
    items: [
      {
        t: 'Open House Lagos',
        d: 'Architectural heritage tours celebrating Lagos\'s built environment — its history, its character, its overlooked beauty. Walking the city as an act of reclamation.',
        active: true,
        callout: { label: 'Join the next tour', href: 'https://motitomi.notion.site' },
      },
      {
        t: 'MINTings',
        d: 'Made In Nigeria Things. A curated celebration of Nigerian-made products — skincare, craft, food — highlighting quality, story, and the potential for growth.',
        active: true,
        callout: null,
      },
      {
        t: 'In Good Company',
        d: 'Community sessions exploring third spaces and belonging. The kind of gathering where strangers become collaborators over a shared question.',
        active: true,
        callout: { label: 'RSVP for next session', href: 'https://motitomi.notion.site' },
      },
      {
        t: 'Craft & Making',
        d: 'Risograph printing at 16by16 × Iwalewabooks, pottery, embroidery, zine-making — reconnecting with the tactile in a data-driven world.',
        active: false,
        callout: null,
      },
    ],
    tags: ['Community Organizing', 'Event Design', 'Cultural Curation', 'Creative Direction', 'Notion Systems'],
  },
  {
    num: '03', eyebrow: 'Advocate', color: C.indigo,
    title: 'Civic & Literary Work',
    subtitle: 'Lagos is home. Its infrastructure, its flooding, its transportation — these aren\'t abstract problems. They\'re the texture of daily life. I write about them, organize around them, and build tools for citizens to act.',
    items: [
      {
        t: 'Lagos Flooding Activism',
        d: 'Citizens\' Resource Guide website, petition to the Ministry of Environment, and an exhibition on loss and flooding experiences. Infrastructure as a civic concern, not just an engineering one.',
        active: true,
        callout: { label: 'Sign the petition', href: '#' },
      },
      {
        t: 'Transportation Manifesto',
        d: 'A zine project connecting personal experience to systemic infrastructure challenges. Because the way a city moves is the way it thinks.',
        active: true,
        callout: null,
      },
      {
        t: 'Poetry & Publishing',
        d: 'Working on a novel and a poetry collection. "Conscious Liberation" submitted to the Evaristo Prize for African Poetry. Writing as a way of seeing.',
        active: true,
        callout: null,
      },
      {
        t: 'ELEVATE Mentorship',
        d: 'Documentation and automation workshop for young accountants through Goodly Accounting — the CAR framework: Complete, Accurate, Retrievable.',
        active: false,
        callout: null,
      },
    ],
    tags: ['Civic Technology', 'Poetry', 'Zine-Making', 'Urban Planning', 'Public Writing'],
  },
];
