/**
 * Featured projects. To add a project, append an object to the array below.
 * `codeSnippet` powers the typewriter effect in the project modal — keep it
 * short (8–16 lines) and representative of the work.
 */

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  client?: string;
  role?: string;
  year: string;
  summary: string;
  outcome: string;
  highlights: string[];
  stack: string[];
  accent: "blue" | "violet";
  codeSnippet: {
    language: string;
    filename: string;
    code: string;
  };
};

export const projects: Project[] = [
  {
    id: "j-vis",
    title: "J-VIS",
    subtitle: "JERA Vision Intelligence System",
    client: "JERA (Japan)",
    role: "Led Detailed System Design (DSD) + backend implementation",
    year: "2025",
    summary:
      "Enterprise anomaly-detection platform for one of Japan's largest power companies.",
    outcome:
      "Delivered to production for JERA. Resolved a critical pre-prod bug with a feature flag + dual-database strategy in under 2 hours.",
    highlights: [
      "Led the Detailed System Design and owned backend implementation end to end",
      "Event-driven ingestion on AWS SQS + Lambda, persisted to DynamoDB and Snowflake",
      "Role-based access control (RBAC) across an EKS-hosted service mesh",
      "Shipped a flag + dual-database fix for a critical pre-prod defect in <2 hours",
    ],
    stack: [
      "AWS SQS",
      "AWS Lambda",
      "DynamoDB",
      "EKS",
      "Snowflake",
      "Node.js",
      "TypeScript",
      "RBAC",
    ],
    accent: "blue",
    codeSnippet: {
      language: "typescript",
      filename: "anomaly-router.ts",
      code: `// Feature-flagged dual-write kept ingestion safe during cutover
export async function routeEvent(event: SensorEvent) {
  const enriched = await enrich(event);

  if (flags.dualWrite) {
    await Promise.all([
      dynamo.put(enriched),
      snowflake.stage(enriched),
    ]);
  } else {
    await dynamo.put(enriched);
  }

  if (isAnomalous(enriched)) {
    await sqs.send(ALERT_QUEUE, enriched);
  }
}`,
    },
  },
  {
    id: "jugaad",
    title: "Jugaad",
    subtitle: "Real-Time Analytics Platform",
    year: "2024",
    summary:
      "Self-serve, drag-and-drop analytics over a live event stream — sub-second queries at scale.",
    outcome:
      "Sub-second queries on 1M–2.5M events/day. 80% reduction in ad-hoc reporting cycles via self-serve dashboards.",
    highlights: [
      "Change-data-capture from PostgreSQL via Debezium into Apache Kafka",
      "Apache Pinot serving layer for sub-second OLAP on millions of daily events",
      "Drag-and-drop dashboard builder so teams self-serve without engineering",
      "Cut ad-hoc reporting cycles by 80%",
    ],
    stack: [
      "Apache Kafka",
      "Apache Pinot",
      "Debezium CDC",
      "PostgreSQL",
      "Node.js",
      "React",
      "AWS Lambda",
      "SQS",
      "DynamoDB",
    ],
    accent: "violet",
    codeSnippet: {
      language: "sql",
      filename: "pinot-query.sql",
      code: `-- Sub-second aggregation served from Apache Pinot
SELECT
  toDateTime(eventTime, 'yyyy-MM-dd HH:00') AS bucket,
  COUNT(*)                                  AS events,
  AVG(latencyMs)                            AS p_avg
FROM events
WHERE eventTime > ago('PT24H')
GROUP BY bucket
ORDER BY bucket DESC
LIMIT 24;`,
    },
  },
  {
    id: "uptime-monitoring",
    title: "Uptime Monitoring System",
    subtitle: "Incident detection + multi-channel alerting",
    year: "2024",
    summary:
      "Real-time service monitoring with structured RCA workflows and multi-channel alerts.",
    outcome:
      "50% MTTR reduction. Multi-channel alerts (calls, SMS, email, Azure tickets) with structured RCA workflows.",
    highlights: [
      "WebSocket-driven live status with Dockerized probes across services",
      "Escalation across calls, SMS, email, and auto-created Azure tickets",
      "Structured root-cause-analysis workflows to standardize incident response",
      "Halved mean time to resolution (MTTR)",
    ],
    stack: ["Vue.js", "Node.js", "WebSocket", "Docker", "AWS", "Azure"],
    accent: "blue",
    codeSnippet: {
      language: "typescript",
      filename: "escalation.ts",
      code: `// Escalate across channels until the incident is acknowledged
async function escalate(incident: Incident) {
  for (const step of POLICY) {
    await notify(step.channel, incident);     // call | sms | email
    const acked = await waitForAck(step.timeout);
    if (acked) return;
  }
  await azure.createTicket(incident);          // last resort
}`,
    },
  },
  {
    id: "jera-stoppage",
    title: "JERA Stoppage Management",
    subtitle: "Near-real-time anomaly detection",
    client: "JERA (Japan)",
    year: "2024",
    summary:
      "Near-real-time stoppage detection with a redesigned operator UI, delivered across timezones.",
    outcome:
      "Near-real-time anomaly detection. Cross-timezone delivery with Japanese stakeholders and a redesigned operator UI.",
    highlights: [
      "Streaming ingestion through Azure Event Hub for near-real-time detection",
      "Redesigned the operator UI for faster situational awareness",
      "Coordinated delivery directly with Japanese stakeholders across timezones",
    ],
    stack: ["Azure Event Hub", "Node.js", "Vue.js"],
    accent: "violet",
    codeSnippet: {
      language: "typescript",
      filename: "event-hub-consumer.ts",
      code: `// Consume Azure Event Hub partitions and flag stoppages live
consumer.subscribe({
  processEvents: async (events, ctx) => {
    for (const e of events) {
      if (detectStoppage(e.body)) {
        await alerts.push(toOperatorView(e.body));
      }
    }
    await ctx.updateCheckpoint(events.at(-1));
  },
});`,
    },
  },
];
