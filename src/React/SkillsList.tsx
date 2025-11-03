import React, { useState } from "react";

type SectionId =
  | "Software Architecture"
  | "Web Development"
  | "REST API Development"
  | "DevOps"
  | "CI/CD Pipelines";

type Section = {
  id: SectionId;
  summary: string;
  level: number; // 0 - 100
  highlights: string[];
  tools: string[];
};

const CategoryIcons: Record<SectionId, React.ReactElement> = {
  "Software Architecture": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6 text-[var(--sec)] opacity-80"
    >
      <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18L19.82 7 12 10.82 4.18 7 12 4.18zM4 8.97l7 3.5v7.56L4 16.53V8.97zm16 0v7.56l-7 3.5v-7.56l7-3.5z"></path>
    </svg>
  ),
  "Web Development": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6 text-[var(--sec)] opacity-80"
    >
      <path d="M21 3c.55 0 1 .45 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4c0-.55.45-1 1-1h18zM4 11v8h16v-8H4zm16-2V5H4v4h16zM6 6h2v2H6V6zm4 0h2v2h-2V6z"></path>
    </svg>
  ),
  "REST API Development": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6 text-[var(--sec)] opacity-80"
    >
      <path d="M8 7h8v2H8V7zm0 4h8v2H8v-2zm0 4h5v2H8v-2z"></path>
      <path d="M3 5h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm0 2v10h18V7H3z"></path>
    </svg>
  ),
  "DevOps": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6 text-[var(--sec)] opacity-80"
    >
      <path d="M12 6a6 6 0 0 0-5.197 3H4a4 4 0 1 0 0 8h2.803A6 6 0 0 0 12 20a6 6 0 0 0 5.197-3H20a4 4 0 1 0 0-8h-2.803A6 6 0 0 0 12 6zm0 2a4 4 0 0 1 3.464 2H12a4 4 0 0 0-3.464 2H6a2 2 0 1 1 0-4h2.536A4 4 0 0 1 12 8zm0 8a4 4 0 0 1-3.464-2H12a4 4 0 0 0 3.464-2H18a2 2 0 1 1 0 4h-2.536A4 4 0 0 1 12 16z"></path>
    </svg>
  ),
  "CI/CD Pipelines": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6 text-[var(--sec)] opacity-80"
    >
      <path d="M4 4h6v6H4V4zm1 1v4h4V5H5zm9-1h6v6h-6V4zm1 1v4h4V5h-4zM4 14h6v6H4v-6zm1 1v4h4v-4H5zm9-1h6v6h-6v-6zm1 1v4h4v-4h-4z"></path>
    </svg>
  ),
};

const sections: Section[] = [
  {
    id: "Software Architecture",
    summary:
      "Design scalable, resilient systems using proven patterns and clear technical documentation.",
    level: 95,
    highlights: [
      "System design for scale, availability and cost control",
      "Domain-driven design (DDD), hexagonal/clean architectures",
      "Microservices and modular monoliths with clear bounded contexts",
      "Event-driven patterns: pub/sub, outbox, Saga, CQRS",
      "Observability: structured logging, metrics, tracing",
    ],
    tools: [
      "AWS",
      "GCP",
      "Docker",
      "Kubernetes",
      "Terraform",
      "PostgreSQL",
      "Redis",
      "Kafka",
      "OpenAPI",
      "ADR Docs",
    ],
  },
  {
    id: "Web Development",
    summary:
      "Build delightful web experiences with modern stacks, performance-first and accessible by default.",
    level: 95,
    highlights: [
      "SPA/MPA with React + Astro for optimal DX and performance",
      "Type-safe tooling: TypeScript end-to-end",
      "Component systems, design tokens and Tailwind-driven UIs",
      "SSR/SSG, image optimization and Core Web Vitals focus",
      "Security hardening: auth, input validation, OWASP top 10",
    ],
    tools: [
      "TypeScript",
      "React",
      "Astro",
      "TailwindCSS",
      "Vite",
      "Jest",
      "Playwright",
      "Zod",
      "Vitest",
    ],
  },
  {
    id: "REST API Development",
    summary:
      "Design clean, versioned REST APIs with strong contracts, monitoring, and robust error handling.",
    level: 90,
    highlights: [
      "Resource modeling, pagination, filtering and HATEOAS where it helps",
      "Versioning and backward compatibility strategies",
      "AuthN/Z: OAuth2/OIDC, JWT, sessions, API keys",
      "Validation, idempotency, rate limiting and caching",
      "Documentation with OpenAPI + automated examples",
    ],
    tools: [
      "Node.js",
      "Express",
      "Fastify",
      "NestJS",
      "OpenAPI/Swagger",
      "Postman",
      "Prisma",
      "tRPC",
      "FastAPI",
    ],
  },
  {
    id: "DevOps",
    summary:
      "Operational excellence: from containerization to cloud infra, observability, and cost-aware scaling.",
    level: 88,
    highlights: [
      "Containerization and orchestration with Docker & Kubernetes",
      "IaC with Terraform; environments and secrets management",
      "Blue/green, canary and feature-flagged rollouts",
      "Zero-downtime migrations and disaster recovery drills",
      "Monitoring/alerting SLIs/SLOs with actionable dashboards",
    ],
    tools: [
      "Docker",
      "Kubernetes",
      "Terraform",
      "Helm",
      "ArgoCD",
      "Grafana",
      "Prometheus",
      "Loki",
      "Datadog",
    ],
  },
  {
    id: "CI/CD Pipelines",
    summary:
      "Ship confidently with automated quality gates, preview envs, and secure, repeatable releases.",
    level: 88,
    highlights: [
      "Multi-stage pipelines (build, test, security, deploy)",
      "Caching and artifact management for speedy feedback",
      "Preview deployments and ephemeral environments",
      "Conventional commits, semantic-release, changelogs",
      "Automated checks: lint, typecheck, tests and bundle size",
    ],
    tools: [
      "GitHub Actions",
      "GitLab CI",
      "Docker Buildx",
      "Nx/Turborepo",
      "semantic-release",
      "Snyk",
      "Trivy",
      "ESLint",
      "tsc",
    ],
  },
];

const meterGradient = "bg-gradient-to-r from-[var(--sec)]/90 via-white/40 to-[var(--sec)]/70";

const SkillsList = () => {
  const [openItem, setOpenItem] = useState<SectionId | null>(null);

  const toggleItem = (item: SectionId) => {
    setOpenItem((prev) => (prev === item ? null : item));
  };

  return (
    <div className="text-left pt-3 md:pt-9 w-full max-w-[560px]">
      <h3 className="text-[var(--white)] text-3xl md:text-4xl font-semibold md:mb-6">
        What I do?
      </h3>
      <ul className="space-y-4 mt-4 text-lg">
        {sections.map((section) => (
          <li key={section.id} className="w-full">
            <div
              onClick={() => toggleItem(section.id)}
              className="group relative w-full bg-[#1414149c] rounded-2xl text-left hover:bg-opacity-80 transition-all border border-[var(--white-icon-tr)] cursor-pointer overflow-hidden"
            >
              {/* top shimmer bar */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--sec)]/60 to-transparent opacity-70"></div>

              <div className="flex items-start gap-3 p-4">
                <div className="flex-shrink-0 mt-0.5">{CategoryIcons[section.id]}</div>
                <div className="flex flex-col gap-2 flex-grow min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <span className="block truncate text-[var(--white)] text-lg font-medium">
                      {section.id}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className={`w-6 h-6 text-[var(--white)] transform transition-transform flex-shrink-0 ${
                        openItem === section.id ? "rotate-180" : ""
                      }`}
                    >
                      <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
                    </svg>
                  </div>
                  <p className="text-[var(--white-icon)] text-sm leading-snug">
                    {section.summary}
                  </p>

                  {/* skill meter */}
                  <div className="mt-1">
                    <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                      <div
                        className={`h-full ${meterGradient}`}
                        style={{ width: `${section.level}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-[var(--white-icon)] mt-1">
                      <span>Proficiency</span>
                      <span>{section.level}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded content */}
              <div
                className={`transition-[max-height,opacity] duration-300 px-4 ${
                  openItem === section.id
                    ? "max-h-[800px] pb-4 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                {/* Highlights */}
                <div className="grid grid-cols-1 gap-3 pt-1">
                  <ul className="space-y-2 text-[var(--white-icon)] text-[13px]">
                    {section.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-[2px] text-[var(--sec)]">●</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tools */}
                  <div className="pt-1">
                    <div className="text-[12px] uppercase tracking-wide text-[var(--white-icon)]/80 mb-1">
                      Tools & Tech
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {section.tools.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-full border border-[var(--white-icon-tr)] text-[12px] text-[var(--white)] bg-white/5 hover:bg-white/10 transition-colors"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillsList;
