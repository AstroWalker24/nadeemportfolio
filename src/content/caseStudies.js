// ── Case Study Data ───────────────────────────────────────────────
// Each case study corresponds to a route: /work/:slug

export const caseStudies = [
  {
    slug: 'nova-ui',
    title: 'nova-ui',
    tagline: 'A zero-runtime accessible React component library.',
    year: '2025',
    role: 'Lead Engineer & Designer',
    status: 'active',
    gradient: 'linear-gradient(135deg, #1a1040 0%, #0f2040 50%, #0B0F14 100%)',
    accentColor: '#818CF8',
    overview:
      'nova-ui is a headless React component library built with developer experience and accessibility at its core. Every component ships with zero runtime styles, full TypeScript types, and meets WCAG 2.1 AA standards out of the box.',
    problem: {
      heading: 'The Problem',
      body: `Most component libraries force a tradeoff: either beautiful pre-styled components that are hard to customize, or headless primitives that require significant boilerplate. Teams waste weeks building design systems on top of libraries that were never designed for customization.

Accessibility is often an afterthought — bolted on after a user reports a bug, accumulating technical debt and legal risk across entire engineering organizations.`,
    },
    solution: {
      heading: 'The Solution',
      body: `nova-ui ships as a collection of headless, composable primitives. Each component handles only behavior and accessibility — no opinionated styles. You bring your own CSS.

The API is designed to feel native: every component maps to an underlying HTML element with all standard props passed through. ARIA attributes, keyboard navigation, and focus management are baked in — not optional.`,
    },
    architecture: {
      heading: 'Architecture',
      body: 'Built on a headless-first principle with a clean three-layer model.',
      points: [
        {
          title: 'Behavior Layer',
          desc: 'Custom hooks that manage state, keyboard events, and ARIA attributes. Fully testable in isolation without any DOM.',
        },
        {
          title: 'Composition Layer',
          desc: 'Compound component pattern — parent/child relationships expose context implicitly, eliminating prop drilling at depth.',
        },
        {
          title: 'Styling Layer',
          desc: 'Class-based API. Components expose className at every level plus data-* attributes for state-based CSS targeting.',
        },
        {
          title: 'Type Safety',
          desc: 'Strict TypeScript generics on collection components ensure slot props are inferred correctly throughout the component tree.',
        },
      ],
    },
    stack: [
      { name: 'React',      category: 'UI'      },
      { name: 'TypeScript', category: 'Language' },
      { name: 'Vite',       category: 'Tooling'  },
      { name: 'Vitest',     category: 'Testing'  },
      { name: 'Storybook',  category: 'Docs'     },
      { name: 'CSS',        category: 'Styling'  },
    ],
    metrics: [
      { label: 'Components',  value: '40+'    },
      { label: 'Runtime CSS', value: '0 KB'   },
      { label: 'Stars',       value: '1.2k'   },
      { label: 'WCAG',        value: '2.1 AA' },
    ],
    screenshots: [
      {
        gradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
        label: 'Component Showcase',
        caption: 'Full library browser with live prop controls and accessibility tree view',
      },
      {
        gradient: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
        label: 'Accessibility Audit',
        caption: 'Automated WCAG audits integrated into the CI/CD pipeline on every PR',
      },
      {
        gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        label: 'API Reference',
        caption: 'Auto-generated API docs from TypeScript types — always in sync with the source',
      },
      {
        gradient: 'linear-gradient(135deg, #0d0d1e 0%, #1e1b4b 100%)',
        label: 'Theme Editor',
        caption: 'Live design token editor with real-time component preview',
      },
    ],
    links: {
      github: 'https://github.com/yourusername/nova-ui',
      live: 'https://nova-ui.dev',
    },
  },

  {
    slug: 'shipyard',
    title: 'shipyard',
    tagline: 'Self-hosted deployment platform for zero-downtime releases.',
    year: '2025',
    role: 'Sole Engineer',
    status: 'wip',
    gradient: 'linear-gradient(135deg, #0a1628 0%, #0d2137 50%, #0B0F14 100%)',
    accentColor: '#34D399',
    overview:
      'Shipyard is a self-hosted deployment platform that makes shipping code as simple as a git push. It watches your repositories, builds Docker images automatically, and deploys with zero-downtime blue-green rollouts — all within 60 seconds.',
    problem: {
      heading: 'The Problem',
      body: `Existing deployment platforms are either too expensive at scale (Heroku, Render) or require serious DevOps expertise to self-host (Kubernetes, Nomad). Small teams and solo developers are stuck paying $50-200 per month per service or maintaining a complex homelab setup.

Blue-green deployments — the gold standard for zero-downtime releases — typically require load balancer expertise and custom scripting to implement correctly. Most teams skip them entirely and accept maintenance windows.`,
    },
    solution: {
      heading: 'The Solution',
      body: `Shipyard runs as a single Go binary on any VPS. Point it at a GitHub webhook, define your services in a simple YAML file, and it handles the rest. Docker builds are triggered automatically on push, health checks gate deployments, and traffic is atomically switched when the new container is healthy.

The control plane exposes a clean HTTP API consumed by a minimal web UI and a CLI tool. The entire system fits in 12 MB with no external dependencies.`,
    },
    architecture: {
      heading: 'Architecture',
      body: 'A single binary with clearly separated concerns, designed for reliability over features.',
      points: [
        {
          title: 'Webhook Listener',
          desc: 'Receives GitHub push events, validates HMAC signatures, and enqueues build jobs into a persistent Redis queue.',
        },
        {
          title: 'Build Worker',
          desc: 'Pulls source code, runs docker build in an isolated context, and tags images with the commit SHA.',
        },
        {
          title: 'Deploy Orchestrator',
          desc: 'Spins up a new container, runs health checks in a loop, and atomically swaps the proxy target on the first 200 response.',
        },
        {
          title: 'Reverse Proxy',
          desc: 'Built-in Nginx-compatible proxy with hot-reload capability. No external load balancer required.',
        },
      ],
    },
    stack: [
      { name: 'Go',         category: 'Backend'      },
      { name: 'Docker',     category: 'Infra'        },
      { name: 'PostgreSQL', category: 'Database'     },
      { name: 'Redis',      category: 'Queue'        },
      { name: 'SQLite',     category: 'Config Store' },
      { name: 'GitHub API', category: 'Integration'  },
    ],
    metrics: [
      { label: 'Deploy Time', value: '<60s'  },
      { label: 'Downtime',    value: '0 ms'  },
      { label: 'Stars',       value: '340'   },
      { label: 'Binary Size', value: '12 MB' },
    ],
    screenshots: [
      {
        gradient: 'linear-gradient(135deg, #022c22 0%, #064e3b 100%)',
        label: 'Deploy Dashboard',
        caption: 'Real-time deployment log stream with per-step status indicators',
      },
      {
        gradient: 'linear-gradient(135deg, #0a2818 0%, #022c22 100%)',
        label: 'Service Config',
        caption: 'YAML-based service definition editor with live schema validation',
      },
      {
        gradient: 'linear-gradient(135deg, #0d2b1d 0%, #052e16 100%)',
        label: 'Deploy History',
        caption: 'Full audit trail with one-click rollback to any previous build',
      },
      {
        gradient: 'linear-gradient(135deg, #031a11 0%, #022c22 100%)',
        label: 'CLI Tool',
        caption: 'shipyard deploy — push to production from your terminal in seconds',
      },
    ],
    links: {
      github: 'https://github.com/yourusername/shipyard',
      live: null,
    },
  },

  {
    slug: 'trace',
    title: 'trace',
    tagline: 'Distributed tracing SDK for Node.js microservices.',
    year: '2024',
    role: 'Core Engineer',
    status: 'active',
    gradient: 'linear-gradient(135deg, #1a0a00 0%, #2d1200 50%, #0B0F14 100%)',
    accentColor: '#FB923C',
    overview:
      'trace is a lightweight, OpenTelemetry-compatible distributed tracing SDK for Node.js microservices. It instruments your application with sub-millisecond overhead and ships with zero dependencies — drop it in and start seeing your request flows immediately.',
    problem: {
      heading: 'The Problem',
      body: `Debugging failures in distributed systems is notoriously hard. A request touches six services before returning an error — which one failed? When? How long did each hop take?

Existing tracing solutions work, but come with significant bundle bloat and complex setup. The official OpenTelemetry SDK for Node.js has 23 transitive dependencies and adds roughly 1 MB to your build — an unacceptable cost for latency-sensitive services.`,
    },
    solution: {
      heading: 'The Solution',
      body: `trace wraps Node.js AsyncLocalStorage to propagate trace context automatically across async boundaries — no manual instrumentation required. Context flows through your existing code without any changes to your business logic.

The wire format is OpenTelemetry-compatible, so spans are exported to any OTLP backend: Jaeger, Grafana Tempo, Honeycomb, or Datadog. Zero lock-in.`,
    },
    architecture: {
      heading: 'Architecture',
      body: 'Zero-dependency design with automatic async context propagation.',
      points: [
        {
          title: 'Context Propagation',
          desc: 'AsyncLocalStorage-based context that survives async boundaries, Promises, and Node.js event emitters without any code changes.',
        },
        {
          title: 'Span Collection',
          desc: 'Lock-free in-memory ring buffer collects spans. A batch exporter flushes every 5 seconds or when the buffer reaches capacity.',
        },
        {
          title: 'OTLP Exporter',
          desc: 'Serializes spans to OTLP protobuf format using hand-written encoding — no protobufjs dependency required.',
        },
        {
          title: 'Auto-Instrumentation',
          desc: 'Module-level monkey-patching of http, https, and popular frameworks (Express, Fastify, Koa) at startup time.',
        },
      ],
    },
    stack: [
      { name: 'Node.js',            category: 'Runtime'       },
      { name: 'gRPC',               category: 'Transport'     },
      { name: 'Protobuf',           category: 'Serialization' },
      { name: 'AsyncLocalStorage',  category: 'Context'       },
      { name: 'TypeScript',         category: 'Language'      },
      { name: 'Jest',               category: 'Testing'       },
    ],
    metrics: [
      { label: 'Overhead',      value: '<1 ms' },
      { label: 'Dependencies',  value: '0'     },
      { label: 'Stars',         value: '89'    },
      { label: 'OTLP',          value: 'v1.0'  },
    ],
    screenshots: [
      {
        gradient: 'linear-gradient(135deg, #1c0a00 0%, #431407 100%)',
        label: 'Trace Timeline',
        caption: 'Waterfall view of a full request spanning 4 microservices and 18 spans',
      },
      {
        gradient: 'linear-gradient(135deg, #150700 0%, #3b0e00 100%)',
        label: 'Span Details',
        caption: 'Per-span metadata, custom tags, events, and error stack traces',
      },
      {
        gradient: 'linear-gradient(135deg, #200d00 0%, #431407 100%)',
        label: 'Service Map',
        caption: 'Auto-generated dependency graph derived directly from live trace data',
      },
      {
        gradient: 'linear-gradient(135deg, #0f0500 0%, #292200 100%)',
        label: 'SDK Setup',
        caption: 'Three-line integration — trace.init(), then ship',
      },
    ],
    links: {
      github: 'https://github.com/yourusername/trace',
      live: null,
    },
  },
];

/**
 * Look up a case study by slug. Returns null if not found.
 */
export const getCaseStudyBySlug = (slug) =>
  caseStudies.find((cs) => cs.slug === slug) ?? null;

/**
 * Return the previous and next case studies relative to a given slug.
 */
export const getAdjacentCaseStudies = (slug) => {
  const idx = caseStudies.findIndex((cs) => cs.slug === slug);
  return {
    prev: idx > 0 ? caseStudies[idx - 1] : null,
    next: idx < caseStudies.length - 1 ? caseStudies[idx + 1] : null,
  };
};
