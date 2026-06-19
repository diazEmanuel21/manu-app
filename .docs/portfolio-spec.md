# ROLE

Actúa como un Principal Engineer, Staff Frontend Architect, Product Designer, UX Engineer y Technical Lead especializado en:

* Next.js
* React
* TypeScript
* Enterprise Architecture
* Clean Architecture
* Domain-Driven Design (DDD)
* SOLID
* Design Systems
* Three.js
* Product Engineering
* SaaS Platforms
* AI Products

Tu objetivo es diseñar y construir un portafolio personal de nivel world-class que funcione simultáneamente como:

1. Carta de presentación profesional.
2. Demostración de habilidades técnicas.
3. Showcase de arquitectura de software.
4. Showcase de diseño de producto.
5. Evidencia de experiencia en IA, SaaS y sistemas empresariales.

---

# PROJECT GOAL

El sitio debe transmitir que el desarrollador no solo programa.

Debe comunicar que:

* Diseña productos.
* Modela dominios.
* Construye arquitecturas.
* Escala plataformas.
* Implementa IA.
* Lidera decisiones técnicas.
* Opera sistemas en producción.

Cuando un CTO, VP Engineering, Engineering Manager o Recruiter técnico visite el sitio debe pensar:

> "Esta persona puede diseñar, construir, desplegar y evolucionar productos complejos de extremo a extremo."

---

# TECH STACK (MANDATORY)

## Framework

* Next.js 16 (App Router)
* React 19
* TypeScript

## UI

* Tailwind CSS 4
* shadcn/ui
* Radix UI

## Animations

* GSAP
* ScrollTrigger
* Framer Motion

## 3D

* Three.js
* React Three Fiber
* Drei

## Content

* MDX

## Testing

* Vitest
* React Testing Library

## Quality

* ESLint
* Prettier
* Husky
* lint-staged

---

# ARCHITECTURAL PRINCIPLES

The project must demonstrate:

* Clean Architecture
* Domain Driven Design
* SOLID
* Vertical Slice Architecture
* Screaming Architecture
* Feature-Based Organization
* Dependency Inversion
* Separation of Concerns

Avoid:

* Monolithic component structures
* Business logic inside UI
* God components
* Tight coupling

---

# PROJECT STRUCTURE

Design the solution using:

src/

├── app/
├── presentation/
├── application/
├── domain/
├── infrastructure/
├── shared/

---

# DOMAIN DESIGN

Create bounded contexts for:

domain/

├── experience/
├── projects/
├── articles/
├── skills/
├── contact/
├── architecture/

Each context must define:

* Entities
* Value Objects
* Domain Services
* Repository Contracts
* Domain Events (where applicable)

---

# APPLICATION LAYER

Implement explicit use cases.

Examples:

* GetProjectsUseCase
* GetFeaturedProjectsUseCase
* GetExperienceTimelineUseCase
* GetArticlesUseCase
* SendContactMessageUseCase

All business operations must flow through use cases.

---

# INFRASTRUCTURE LAYER

Prepare integrations for:

* CMS
* Analytics
* Monitoring
* Email
* Feature Flags
* Future AI integrations

Infrastructure must remain replaceable.

---

# PRESENTATION LAYER

presentation/

├── components/
├── sections/
├── hooks/
├── animations/
├── three/

UI must remain independent from domain logic.

---

# DESIGN CONCEPT

Theme:

"Software Ecosystems"

The visual experience should represent:

* Distributed systems
* Data flow
* Automation
* Artificial intelligence
* Scalability
* Product ecosystems
* Software architecture

Avoid generic portfolio aesthetics.

Design inspiration:

* Stripe
* Linear
* Vercel
* Framer
* Raycast

---

# VISUAL SYSTEM

Create a premium design language with:

* Strong typography hierarchy
* Modern spacing system
* Subtle glassmorphism where appropriate
* Motion-driven storytelling
* Architecture-inspired visual metaphors
* High-end SaaS aesthetics

Must feel closer to a product experience than a portfolio.

---

# HERO EXPERIENCE

Headline:

"I build software ecosystems."

Subheadline:

"Full Stack Engineer specialized in SaaS, AI and scalable architectures."

Requirements:

* Immersive Three.js scene
* GSAP-driven storytelling
* Data-flow visualizations
* Architecture-inspired interactions
* High-performance rendering

Avoid:

* Random particles
* Decorative animations without meaning

Every visual element must support the narrative.

---

# EXPERIENCE TIMELINE

Interactive scroll-driven timeline.

Experiences:

* Coodetrans (2020)
* IP Total Software (2021–2024)
* Firma y Calidad SG (2024)
* Verzay (2025–2026)
* Magilus (2026–Present)

Each entry should include:

* Responsibilities
* Technologies
* Impact
* Technical achievements
* Architectural decisions

Use GSAP ScrollTrigger.

---

# PROJECT SHOWCASE

Create premium case studies.

## Verzay

Multi-tenant SaaS platform.

Show:

* System architecture
* Tenant isolation
* CRM
* WhatsApp Automation
* AI Workflows
* LangChain
* LangGraph
* OpenAI
* Gemini
* Anthropic

Include:

* Architecture diagrams
* Design decisions
* Scalability strategies
* Trade-offs

---

## Magilus

Commercial and operational management platform.

Flow:

Quotation
→ Sale
→ Production
→ Dispatch

Show:

* Domain modeling
* Business workflows
* System architecture
* Key use cases
* Operational processes

---

# ARCHITECTURE LAB

Create an interactive learning section.

Topics:

* Clean Architecture
* DDD
* Event-Driven Architecture
* Multi-Tenancy
* RBAC
* Workflow Engines
* AI Agents

Use interactive diagrams and visual explanations.

Example flow:

WhatsApp
↓
Webhook
↓
NestJS
↓
AI Agent
↓
Workflow Engine
↓
Human Escalation

---

# AI ENGINEERING SECTION

Demonstrate practical AI experience.

Topics:

* OpenAI
* Gemini
* Anthropic
* LangChain
* LangGraph

Concepts:

* ReAct Pattern
* Tool Calling
* Prompt Compression
* Multi-Agent Systems
* Provider Abstraction
* LLM Factory Pattern

Focus on architecture rather than marketing.

---

# DEVOPS PLAYGROUND

Visualize deployment pipelines.

Flow:

GitHub
↓
Actions
↓
Docker
↓
CI/CD
↓
Production

Include:

* AWS
* PostgreSQL
* MinIO
* PM2
* Traefik

Show real production architecture.

---

# SKILLS MATRIX

Do not use traditional progress bars.

Create interactive visualizations.

Categories:

* Frontend
* Backend
* Architecture
* AI
* Cloud
* DevOps
* Databases

Must feel data-driven and modern.

---

# BLOG

Implement MDX-powered blog.

Prepare structure for:

* Building Multi-Tenant SaaS
* AI Agent Architectures
* DDD in Node.js
* Next.js 16 in Production
* Scalable Workflow Design

Support:

* Code highlighting
* Reading time
* TOC
* SEO

---

# CONTACT

Professional contact experience.

Prepare integrations for:

* Resend
* Analytics
* CRM integrations

---

# SEO

Implement:

* Metadata API
* Open Graph
* Twitter Cards
* Schema.org
* Sitemap
* Robots.txt

Routes:

/
/projects
/projects/verzay
/projects/magilus
/architecture
/blog
/contact

Target:

* Lighthouse SEO > 95

---

# PERFORMANCE

Target:

* Lighthouse > 95
* Excellent Core Web Vitals

Requirements:

* Route-based code splitting
* Dynamic imports
* Three.js lazy loading
* Optimized animations
* Image optimization

---

# ACCESSIBILITY

Implement:

* WCAG AA
* Keyboard navigation
* Focus management
* Screen reader support
* ARIA labels
* Color contrast compliance

---

# IMPLEMENTATION PROCESS

DO NOT WRITE CODE IMMEDIATELY.

Follow these phases:

PHASE 1:

* Product strategy
* User journeys
* Information architecture

PHASE 2:

* Domain modeling
* DDD design
* Bounded contexts

PHASE 3:

* Application architecture
* Folder structure
* Dependency flow

PHASE 4:

* UX architecture
* Design system
* Visual language

PHASE 5:

* Technical architecture
* Performance strategy
* SEO strategy

PHASE 6:

* Detailed implementation roadmap

PHASE 7:

* Begin implementation

Only move to the next phase after fully documenting the previous one.

---

# EXPECTED DELIVERABLES

Produce:

1. Product Vision
2. Information Architecture
3. Domain Model
4. Bounded Contexts
5. Folder Structure
6. Architecture Diagrams
7. Design System
8. UX Flows
9. Technical Decisions
10. Performance Plan
11. SEO Plan
12. Accessibility Plan
13. Implementation Roadmap
14. Complete Codebase

Think like a Principal Engineer building a flagship product that showcases elite engineering, architecture and product design capabilities.
