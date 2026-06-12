// ── Brand / Theme ────────────────────────────────────────────────────────────
export type Theme = 'dark' | 'light'

// ── Navigation ───────────────────────────────────────────────────────────────
export interface NavLink {
  label: string
  href:  string
}

// ── Stats ────────────────────────────────────────────────────────────────────
export interface StatItem {
  value: string
  label: string
}

// ── Services ─────────────────────────────────────────────────────────────────
export interface Service {
  id:          string
  number:      string
  title:       string
  description: string
  features:    string[]
  icon:        string
}

// ── Process ──────────────────────────────────────────────────────────────────
export interface ProcessStep {
  number:      string
  title:       string
  description: string
  duration:    string
}

// ── FAQ ──────────────────────────────────────────────────────────────────────
export interface FAQItem {
  id:       string
  question: string
  answer:   string
}

// ── Portfolio ─────────────────────────────────────────────────────────────────
export interface PortfolioProject {
  id:          string
  slug:        string
  title:       string
  category:    string
  description: string
  location:    string
  completedAt: string
  image:       string
  images:      string[]
  overview:    string
  challenge:   string
  solution:    string
  materials:   string[]
  featured:    boolean
}

// ── Why Choose ───────────────────────────────────────────────────────────────
export interface WhyItem {
  icon:        string
  title:       string
  description: string
}

// ── Contact Form ─────────────────────────────────────────────────────────────
export interface ContactFormData {
  name:        string
  email:       string
  phone:       string
  location:    string
  projectType: string
  services:    string[]
  budget:      string
  timeline:    string
  message:     string
}

// ── HexMotif ─────────────────────────────────────────────────────────────────
export type HexVariant = 'solid' | 'outline' | 'dual'
export type HexSize    = 'xs' | 'sm' | 'md' | 'lg' | number
