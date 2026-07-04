/**
 * Experience + education timeline. Most recent first.
 * `kind` switches the marker style between work and education entries.
 */

export type TimelineEntry = {
  kind: "work" | "education";
  role: string;
  org: string;
  period: string;
  current?: boolean;
  detail?: string;
};

export const timeline: TimelineEntry[] = [
  {
    kind: "work",
    role: "Senior Software Engineer",
    org: "Thinkbiz Technology",
    period: "Jun 2026 — Present",
    current: true,
    detail:
      "Architecting an Indoor Positioning System for an enterprise Location Management System — evaluating BLE, Wi-Fi RTT, and geomagnetic approaches, and leading vendor discovery.",
  },
  {
    kind: "work",
    role: "Sr. Full Stack Developer",
    org: "Thinkbiz Technology",
    period: "May 2025 — Jun 2026",
    detail:
      "Architected AWS event pipelines and led detailed system design for enterprise clients including JERA (Japan).",
  },
  {
    kind: "work",
    role: "Jr. Full Stack Engineer",
    org: "Thinkbiz Technology",
    period: "Dec 2023 — May 2025",
    detail:
      "Built real-time analytics and monitoring systems across Kafka, Pinot, and AWS — from CDC pipelines to self-serve dashboards.",
  },
  {
    kind: "education",
    role: "B.Tech, Computer Science & Engineering",
    org: "CHARUSAT",
    period: "2020 — 2024",
    detail: "CGPA 8.80 / 10.",
  },
];
