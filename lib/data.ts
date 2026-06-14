import type {
  Service,
  ProcessStep,
  FAQItem,
  PortfolioProject,
  StatItem,
  WhyItem,
} from '@/types'

// ── Stats ────────────────────────────────────────────────────────────────────
export const STATS: StatItem[] = [
  { value: '30+',  label: 'Projects Completed' },
  { value: '4+',   label: 'Years in Practice' },
  { value: '2',    label: 'Design Awards' },
]

// ── Services ─────────────────────────────────────────────────────────────────
export const SERVICES: Service[] = [
  {
    id:          'residential',
    number:      '01',
    title:       'Residential Design',
    description: 'Full-scope interior design for homes, duplexes, and apartments across Lagos. From the first sketch to the final styling, every detail is considered.',
    features:    ['Space planning & layout', 'Material & finish selection', 'Custom furniture design', 'Lighting design', 'Art & décor curation'],
    icon:        'Home',
  },
  {
    id:          'commercial',
    number:      '02',
    title:       'Commercial Design',
    description: 'Offices, retail spaces, restaurants, and hospitality environments that elevate the human experience and reinforce your brand identity.',
    features:    ['Brand-aligned environments', 'Workflow optimisation', 'Guest experience design', 'Acoustic & lighting strategy', 'FF&E specification'],
    icon:        'Building2',
  },
  {
    id:          'consultation',
    number:      '03',
    title:       'Design Consultation',
    description: 'A focused two-hour session for those who need direction, not full management. Walk away with a clear vision, a material palette, and an action plan.',
    features:    ['Space assessment', 'Mood board & palette', 'Furniture recommendations', 'Priority action list', 'Follow-up Q&A'],
    icon:        'MessageSquare',
  },
  {
    id:          'sourcing',
    number:      '04',
    title:       'Furniture Sourcing',
    description: 'We curate, source, and procure furniture and accessories from trusted local craftsmen and international suppliers – handling logistics from door to placement.',
    features:    ['Custom manufacturing', 'International procurement', 'Quality inspection', 'Delivery coordination', 'Installation oversight'],
    icon:        'Sofa',
  },
  {
    id:          'planning',
    number:      '05',
    title:       'Space Planning',
    description: 'Before a single piece of furniture is selected, we optimise the flow, function, and proportion of your space using measured plans and 3D visualisations.',
    features:    ['Measured floor plans', '3D space layouts', 'Traffic flow analysis', 'Scale furniture plans', 'Zoning strategy'],
    icon:        'LayoutGrid',
  },
  {
    id:          'management',
    number:      '06',
    title:       'Project Management',
    description: 'We coordinate contractors, suppliers, and timelines end-to-end – so you step back from the complexity and step into a finished space.',
    features:    ['Contractor coordination', 'Timeline management', 'Budget tracking', 'Site supervision', 'Snagging & handover'],
    icon:        'ClipboardList',
  },
]

// ── Process ──────────────────────────────────────────────────────────────────
export const PROCESS_STEPS: ProcessStep[] = [
  {
    number:      '01',
    title:       'Discovery',
    description: 'We start with a detailed consultation – understanding how you live, what you love, and what the space needs to become. Nothing is assumed.',
    duration:    'Week 1',
  },
  {
    number:      '02',
    title:       'Site Survey',
    description: 'We visit your space to take precise measurements, assess natural light, identify structural constraints, and document everything that will inform the design.',
    duration:    'Week 1–2',
  },
  {
    number:      '03',
    title:       'Concept Design',
    description: 'Mood boards, layout options, material palettes, and lighting concepts are presented. You choose a direction; we refine it until it feels exactly right.',
    duration:    'Weeks 3–5',
  },
  {
    number:      '04',
    title:       'Design Development',
    description: 'Detailed technical drawings, furniture specifications, finish schedules, and supplier contacts are assembled into a complete design package.',
    duration:    'Weeks 5–8',
  },
  {
    number:      '05',
    title:       'Procurement',
    description: 'We source, order, and track every item – from custom-made pieces to imported accessories – keeping you informed at every milestone.',
    duration:    'Weeks 8–14',
  },
  {
    number:      '06',
    title:       'Installation & Reveal',
    description: 'We coordinate delivery, supervise installation, and dress every surface. Then we hand you the keys to a space that exceeds the brief.',
    duration:    'Weeks 14–16',
  },
]

// ── FAQ ──────────────────────────────────────────────────────────────────────
export const FAQ_ITEMS: FAQItem[] = [
  {
    id:       'timeline',
    question: 'How long does a full interior design project take?',
    answer:   'A full residential project typically takes 12–16 weeks from discovery to reveal, depending on the scope, the availability of materials, and site conditions. Consultation-only engagements can be completed in a single session.',
  },
  {
    id:       'location',
    question: 'Which areas do you cover?',
    answer:   'We are based in Lagos and serve clients across Lekki, Victoria Island, Ikoyi, Ajah, Ikeja, and Abuja. For the right project, we travel across Nigeria and internationally.',
  },
  {
    id:       'pricing',
    question: 'How do you structure your fees?',
    answer:   'Our fees are project-based, calculated after a brief review of your scope, square footage, and complexity. We offer full-service packages, procurement-only, and consultation-only options. There are no hidden charges – everything is agreed before we begin.',
  },
  {
    id:       'vacate',
    question: 'Do I need to move out during the project?',
    answer:   'For major renovation and full-fit-out projects, relocating temporarily is recommended. For partial redesigns or furniture-only projects, you can often remain in the space. We will advise specifically based on your project.',
  },
  {
    id:       'existing',
    question: 'Can you work with furniture I already own?',
    answer:   'Absolutely. Many of our clients retain pieces with sentimental or financial value. We assess what works within the new design and integrate it thoughtfully, supplementing only where necessary.',
  },
  {
    id:       'renovation',
    question: 'Do you handle construction and renovation work?',
    answer:   'We work closely with trusted contractors and can manage renovation scopes as part of a full project. We do not operate our own construction team, but we oversee all site work and hold contractors to the design standard.',
  },
  {
    id:       'start',
    question: 'How do I get started?',
    answer:   'Simply reach out via WhatsApp or our contact form. We will arrange a brief introductory call to understand your project, after which we will send a proposal tailored to your scope and timeline.',
  },
  {
    id:       'remote',
    question: 'Do you offer remote design services?',
    answer:   'Yes. For clients outside Lagos, we offer virtual consultations, remote concept design packages, and supplier coordination. A site visit is required before the final installation phase.',
  },
]

// ── Portfolio ─────────────────────────────────────────────────────────────────
// Projects are grouped by distinct image sets from the project library.
// The gallery shows numbered collections only — no metadata is exposed to visitors.
export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id:          'project-01',
    slug:        'project-01',
    title:       'Residential Interior',
    category:    'Residential',
    description: 'A considered residential interior — warm textures, layered lighting, and composed materiality throughout.',
    location:    'Lagos',
    completedAt: '2025',
    image:       '/images/portfolio/proj-f-1.png',
    images:      [
      '/images/portfolio/proj-f-1.png',
      '/images/portfolio/proj-f-2.png',
      '/images/portfolio/proj-f-3.png',
      '/images/portfolio/proj-f-4.png',
      '/images/portfolio/proj-f-5.png',
      '/images/portfolio/proj-b-1.jpg',
    ],
    overview:    'A full-scope residential interior spanning living, dining, and bedroom spaces. Every element was chosen for its relationship to the whole — form, texture, and light working in concert.',
    challenge:   'Creating spaces that feel curated but never staged. The client wanted warmth without weight, presence without clutter.',
    solution:    'We worked with a tightly edited palette of warm neutrals and natural materials, anchoring each room with a single statement piece and letting the light do the rest.',
    materials:   ['Natural stone flooring', 'Warm timber veneer', 'Bespoke upholstery', 'Brass hardware', 'Woven textiles', 'Ambient pendant lighting'],
    featured:    true,
  },
  {
    id:          'project-02',
    slug:        'project-02',
    title:       'Duplex Residence',
    category:    'Residential',
    description: 'A full residential transformation — warm tones, refined materiality, and considered spatial flow across every room.',
    location:    'Lagos',
    completedAt: '2025',
    image:       '/images/portfolio/proj-f-3.png',
    images:      [
      '/images/portfolio/proj2-1.jpg',
      '/images/portfolio/proj2-2.jpg',
      '/images/portfolio/proj2-3.jpg',
      '/images/portfolio/proj2-4.jpg',
      '/images/portfolio/proj2-5.jpg',
      '/images/portfolio/proj2-6.jpg',
    ],
    overview:    'A full-scope duplex redesign spanning living, dining, and bedroom spaces. The client wanted a home that felt immediately warm and personal without sacrificing a clean, modern sensibility.',
    challenge:   'Bringing coherence to a multi-floor residence where each room had been furnished independently over time, resulting in a fragmented visual language and poor spatial flow.',
    solution:    'We established a unified palette of warm neutrals, natural timber, and soft gold accents that threads through each floor.',
    materials:   ['Natural timber veneer', 'Warm stone flooring', 'Bespoke upholstery', 'Brushed brass hardware', 'Woven textiles', 'Statement pendant lighting'],
    featured:    true,
  },
  {
    id:          'project-03',
    slug:        'project-03',
    title:       'Private Suite',
    category:    'Residential',
    description: 'A private residential suite — serene, edited, and deeply personal.',
    location:    'Lagos',
    completedAt: '2025',
    image:       '/images/portfolio/proj-f-4.png',
    images:      [
      '/images/portfolio/proj-c-1.jpg',
      '/images/portfolio/proj-c-2.jpg',
      '/images/portfolio/proj-c-3.jpg',
      '/images/portfolio/proj-c-4.jpg',
      '/images/portfolio/proj-c-5.jpg',
      '/images/portfolio/proj-c-6.jpg',
    ],
    overview:    'A private residence designed around the rituals of daily living. Each space was refined to serve its function with quiet elegance.',
    challenge:   'The brief required both intimacy and openness — spaces that feel expansive without sacrificing warmth.',
    solution:    'Layered lighting, carefully proportioned furniture, and a restrained palette create spaces that breathe.',
    materials:   ['Marble surfaces', 'Linen upholstery', 'Walnut joinery', 'Concealed lighting', 'Brass fixtures', 'Hand-knotted rug'],
    featured:    false,
  },
  {
    id:          'project-04',
    slug:        'project-04',
    title:       'Contemporary Living',
    category:    'Residential',
    description: 'A contemporary Lagos interior — confident proportions, considered detailing, and a palette that rewards attention.',
    location:    'Lagos',
    completedAt: '2026',
    image:       '/images/portfolio/proj-f-2.png',
    images:      [
      '/images/portfolio/proj-d-1.jpg',
      '/images/portfolio/proj-d-2.jpg',
      '/images/portfolio/proj-d-3.jpg',
      '/images/portfolio/proj-d-4.jpg',
      '/images/portfolio/proj-d-5.jpg',
      '/images/portfolio/proj-d-6.jpg',
    ],
    overview:    'A complete interior design commission for a contemporary Lagos home. The client sought a space that felt both distinctly modern and timelessly comfortable.',
    challenge:   'Balancing visual impact with livability — creating rooms that photograph beautifully but live even better.',
    solution:    'Strong architectural elements anchor each space while softer furnishings and layered textiles provide warmth and depth.',
    materials:   ['Travertine flooring', 'Brushed brass accents', 'Velvet upholstery', 'Custom cabinetry', 'Sculptural lighting', 'Curated art'],
    featured:    false,
  },
  {
    id:          'project-05',
    slug:        'project-05',
    title:       'Studio Interiors',
    category:    'Residential',
    description: 'A precise, intimate interior study — architecture, material, and light in careful dialogue.',
    location:    'Lagos',
    completedAt: '2024',
    image:       '/images/portfolio/proj-f-5.png',
    images:      [
      '/images/portfolio/proj-a-1.jpg',
      '/images/portfolio/proj-a-2.jpg',
      '/images/portfolio/proj-a-3.jpg',
      '/images/portfolio/proj-a-4.jpg',
    ],
    overview:    'A focused interior study exploring the relationship between material quality and spatial experience. Every surface was chosen to contribute to a coherent sensory whole.',
    challenge:   'Working within a defined brief to achieve maximum impact through restraint.',
    solution:    'Precise material selection and considered placement create spaces that feel both resolved and alive.',
    materials:   ['Stone surfaces', 'Timber accents', 'Curated lighting', 'Woven fabrics'],
    featured:    false,
  },
  {
    id:          'project-06',
    slug:        'project-06',
    title:       'Warm Residence',
    category:    'Residential',
    description: 'A warm, layered residential interior — rich textures, considered lighting, and a curated material palette.',
    location:    'Lagos',
    completedAt: '2025',
    image:       '/images/portfolio/proj-b-1.jpg',
    images:      [
      '/images/portfolio/proj-b-1.jpg',
      '/images/portfolio/proj-b-2.jpg',
      '/images/portfolio/proj-b-3.jpg',
      '/images/portfolio/proj-b-4.jpg',
      '/images/portfolio/proj-b-5.jpg',
      '/images/portfolio/proj-b-6.jpg',
    ],
    overview:    'A full-scope residential interior where every surface and material choice contributes to a cohesive, lived-in warmth.',
    challenge:   "Translating the client's desire for comfort and elegance into a space that felt personal rather than prescribed.",
    solution:    'A restrained palette of warm neutrals and natural materials, anchored by curated art and layered ambient lighting.',
    materials:   ['Natural stone flooring', 'Warm timber veneer', 'Bespoke upholstery', 'Brass hardware', 'Woven textiles', 'Curated art'],
    featured:    false,
  },
]

// ── Why Choose ───────────────────────────────────────────────────────────────
export const WHY_ITEMS: WhyItem[] = [
  {
    icon:        'Eye',
    title:       'Attention to Detail',
    description: 'We obsess over proportion, scale, and finish. Every specification is considered before it reaches site.',
  },
  {
    icon:        'Users',
    title:       'Collaborative Process',
    description: 'Your vision leads. We provide the expertise, the network, and the execution to bring it to life precisely.',
  },
  {
    icon:        'Shield',
    title:       'Trusted Suppliers',
    description: 'Over four years we have built relationships with the finest craftsmen and suppliers in Nigeria and beyond.',
  },
  {
    icon:        'Clock',
    title:       'On Time, On Brief',
    description: 'We manage timelines with the same precision we bring to design. No surprises, no delays without warning.',
  },
]

// ── Navigation ────────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'Home',          href: '/'          },
  { label: 'About Studio',  href: '/about'     },
  { label: 'Portfolio',     href: '/portfolio' },
  { label: 'Services',      href: '/services'  },
  { label: 'Start Project', href: '/start'     },
  { label: 'Contact',       href: '/contact'   },
]

// ── Budget Options ────────────────────────────────────────────────────────────
export const BUDGET_OPTIONS = [
  '₦1M – ₦5M',
  '₦5M – ₦10M',
  '₦10M – ₦25M',
  '₦25M – ₦50M',
  '₦50M+',
]

export const TIMELINE_OPTIONS = [
  '0 – 3 months',
  '3 – 6 months',
  '6 – 12 months',
  'Flexible / Not sure',
]

export const PROJECT_TYPE_OPTIONS = [
  'Residential',
  'Commercial',
  'Hospitality',
  'Other',
]

// ── Social links ──────────────────────────────────────────────────────────────
// Update handles/number before launch; structure is permanent.
export const SOCIAL_LINKS = [
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/vixx_interiors?igsh=MWlqZzY5MHpnaDBpaQ==' },
  { id: 'tiktok',    label: 'TikTok',    href: 'https://www.tiktok.com/@vixxinteriors'                              },
  { id: 'whatsapp',  label: 'WhatsApp',  href: 'https://wa.me/2348065672607'                                        },
]
