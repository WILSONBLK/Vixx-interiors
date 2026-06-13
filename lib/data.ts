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
export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id:          'lekki-residence',
    slug:        'lekki-residence',
    title:       'The Lekki Residence',
    category:    'Living Spaces',
    description: 'A contemporary living and entertainment space designed around warmth, natural texture, and a signature orange accent.',
    location:    'Lekki Phase 1, Lagos',
    completedAt: '2024',
    image:       '/images/portfolio/living-room-1.jpg',
    images:      [
      '/images/portfolio/living-room-1.jpg',
      '/images/portfolio/living-room-2.jpg',
      '/images/portfolio/living-room-3.jpg',
      '/images/portfolio/living-room-4.jpg',
    ],
    overview:    'A full-scope residential redesign of the ground floor living and dining spaces within a four-bedroom duplex. The brief called for a space that felt both considered and lived-in – composed enough to entertain guests, comfortable enough to watch football on a Sunday afternoon.',
    challenge:   'The original layout fragmented the open-plan floor into disconnected zones, and the existing palette felt neither warm nor resolved. The client wanted drama without maximalism – presence without weight.',
    solution:    'We anchored the space with a sculptural L-shaped sectional in warm taupe, offset by a single burnt-orange swivel chair that became the room\'s statement piece. A bespoke media wall in dark charcoal and natural oak grounds the entertainment zone, while coffered ceilings with concealed amber cove lighting add architectural depth without structural intervention.',
    materials:   ['Calacatta marble flooring', 'Natural oak veneer', 'Charcoal lacquer panels', 'Crystal cluster chandelier', 'Velvet upholstery', 'Hand-knotted rug'],
    featured:    true,
  },
  {
    id:          'vi-penthouse',
    slug:        'vi-penthouse',
    title:       'Victoria Island Penthouse',
    category:    'Living Spaces',
    description: 'A full penthouse transformation blending coastal calm with metropolitan elegance.',
    location:    'Victoria Island, Lagos',
    completedAt: '2024',
    image:       '/images/portfolio/living-room-2.jpg',
    images:      [
      '/images/portfolio/living-room-2.jpg',
      '/images/portfolio/living-room-3.jpg',
      '/images/portfolio/living-room-4.jpg',
      '/images/portfolio/living-room-1.jpg',
    ],
    overview:    'A 400sqm penthouse on the 18th floor with panoramic views of the Lagos lagoon. The brief called for refined simplicity that let the view breathe while establishing a clear identity for each space.',
    challenge:   'Making a space feel intimate at scale – ensuring the living areas didn\'t feel like hotel lobbies despite their generous proportions.',
    solution:    'We introduced a series of intimate zones within the open plan, using rugs, ceiling elements, and carefully placed lighting to define each area. The palette of warm ivory, dusty rose, and brushed gold references the tones of the water at different times of day.',
    materials:   ['Travertine tile', 'Brushed brass fixtures', 'Linen upholstery', 'Custom stone coffee table', 'Rattan accents', 'Silk drapery'],
    featured:    true,
  },
  {
    id:          'ikoyi-master',
    slug:        'ikoyi-master',
    title:       'Ikoyi Master Bedroom',
    category:    'Master Bedrooms',
    description: 'A serene master suite designed around rest, texture, and the art of quiet materiality.',
    location:    'Ikoyi, Lagos',
    completedAt: '2023',
    image:       '/images/portfolio/living-room-3.jpg',
    images:      [
      '/images/portfolio/living-room-3.jpg',
      '/images/portfolio/living-room-4.jpg',
      '/images/portfolio/living-room-1.jpg',
      '/images/portfolio/living-room-2.jpg',
    ],
    overview:    'A master bedroom and ensuite redesign for a couple who wanted their bedroom to feel like a five-star sanctuary. The challenge was creating drama and comfort without sacrificing the sense of calm.',
    challenge:   'Balancing the client\'s differing preferences – one wanted warmth and texture, the other preferred clean lines and cool tones. The result needed to satisfy both without compromise.',
    solution:    'A custom upholstered headboard wall in deep charcoal velvet serves as the dramatic anchor, balanced by warm walnut bedside tables and ivory linen. Indirect lighting behind the headboard creates a glow that shifts from energising in the morning to deeply relaxing in the evening.',
    materials:   ['Charcoal velvet', 'Walnut timber', 'Ivory linen', 'Terrazzo ensuite tiles', 'Brass hardware', 'Custom rug'],
    featured:    false,
  },
  {
    id:          'lekki-office',
    slug:        'lekki-office',
    title:       'Lekki Commercial Office',
    category:    'Commercial Offices',
    description: 'A modern workspace designed to attract talent, impress clients, and support focused work.',
    location:    'Lekki Phase 1, Lagos',
    completedAt: '2023',
    image:       '/images/portfolio/living-room-4.jpg',
    images:      [
      '/images/portfolio/living-room-4.jpg',
      '/images/portfolio/living-room-1.jpg',
      '/images/portfolio/living-room-2.jpg',
      '/images/portfolio/living-room-3.jpg',
    ],
    overview:    'A 250sqm office fit-out for a fintech company that needed to communicate innovation, reliability, and ambition to both clients and new hires.',
    challenge:   'Creating distinct zones – a client-facing reception, collaborative open-plan desks, private meeting rooms, and a breakout area – within a relatively compact floor plate.',
    solution:    'We designed a modular layout that uses acoustic partitions and varying floor levels to define zones without closing them off. The brand colours (navy and gold) were woven into the design through furniture, artwork, and surface finishes.',
    materials:   ['Polished concrete floors', 'Acoustic felt panels', 'Custom joinery', 'Ergonomic seating', 'Biophilic elements', 'Integrated tech'],
    featured:    false,
  },
  {
    id:          'ajah-duplex',
    slug:        'ajah-duplex',
    title:       'The Ajah Duplex',
    category:    'Residential Interiors',
    description: 'A full residential transformation — warm tones, refined materiality, and considered spatial flow across every room.',
    location:    'Ajah, Lagos',
    completedAt: '2025',
    image:       '/images/portfolio/proj2-1.jpg',
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
    solution:    'We established a unified palette of warm neutrals, natural timber, and soft gold accents that threads through each floor. Custom joinery anchors the key rooms while carefully curated furniture and lighting complete each zone.',
    materials:   ['Natural timber veneer', 'Warm stone flooring', 'Bespoke upholstery', 'Brushed brass hardware', 'Woven textiles', 'Statement pendant lighting'],
    featured:    true,
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
  { label: 'Home',         href: '/'          },
  { label: 'About Studio', href: '/about'     },
  { label: 'Portfolio',    href: '/portfolio' },
  { label: 'Services',     href: '/services'  },
  { label: 'Contact',      href: '/contact'   },
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
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/vixxinteriors' },
  { id: 'tiktok',    label: 'TikTok',    href: 'https://www.tiktok.com/@vixxinteriors'   },
  { id: 'whatsapp',  label: 'WhatsApp',  href: 'https://wa.me/2348000000000'             },
]
