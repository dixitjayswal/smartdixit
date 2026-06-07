/**
 * Technical skills, grouped. The marquee uses the flat `marqueeSkills` list;
 * the grouped grid uses `skillGroups`. `years` is shown on hover in the marquee.
 */

export type Skill = {
  name: string;
  years?: number;
};

export type SkillGroup = {
  category: "Backend" | "Streaming" | "Cloud" | "Data" | "DevOps" | "Frontend" | "Auth" | "Languages";
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Backend",
    skills: [
      { name: "Node.js", years: 2.5 },
      { name: "TypeScript", years: 2.5 },
      { name: "Express", years: 2.5 },
      { name: "REST APIs", years: 2.5 },
      { name: "Microservices", years: 2 },
    ],
  },
  {
    category: "Streaming",
    skills: [
      { name: "Apache Kafka", years: 1.5 },
      { name: "Apache Pinot", years: 1 },
      { name: "Debezium", years: 1 },
      { name: "WebSocket", years: 2 },
    ],
  },
  {
    category: "Cloud",
    skills: [
      { name: "AWS Lambda", years: 2 },
      { name: "AWS SQS", years: 2 },
      { name: "DynamoDB", years: 2 },
      { name: "EKS", years: 1 },
      { name: "S3", years: 2 },
      { name: "ECR", years: 1.5 },
      { name: "Azure Event Hub", years: 1.5 },
      { name: "Azure AD", years: 1 },
    ],
  },
  {
    category: "Data",
    skills: [
      { name: "PostgreSQL", years: 2.5 },
      { name: "MySQL", years: 2 },
      { name: "DynamoDB", years: 2 },
      { name: "Snowflake", years: 1 },
    ],
  },
  {
    category: "DevOps",
    skills: [
      { name: "Docker", years: 2.5 },
      { name: "ArgoCD", years: 1 },
      { name: "Kong API Gateway", years: 1 },
      { name: "CI/CD", years: 2.5 },
    ],
  },
  {
    category: "Frontend",
    skills: [
      { name: "React", years: 2.5 },
      { name: "Vue", years: 2 },
      { name: "Next.js", years: 1.5 },
      { name: "Tailwind", years: 2 },
    ],
  },
  {
    category: "Auth",
    skills: [
      { name: "OAuth2", years: 2 },
      { name: "MSAL", years: 1 },
      { name: "RBAC", years: 2 },
    ],
  },
  {
    category: "Languages",
    skills: [
      { name: "TypeScript", years: 2.5 },
      { name: "JavaScript", years: 3 },
      { name: "Python", years: 2 },
      { name: "Java", years: 2 },
      { name: "C++", years: 3 },
    ],
  },
];

/** Flat list for the auto-scrolling marquee (de-duplicated, headline tech). */
export const marqueeSkills: Skill[] = [
  { name: "Node.js", years: 2.5 },
  { name: "TypeScript", years: 2.5 },
  { name: "Apache Kafka", years: 1.5 },
  { name: "Apache Pinot", years: 1 },
  { name: "Debezium", years: 1 },
  { name: "AWS Lambda", years: 2 },
  { name: "DynamoDB", years: 2 },
  { name: "EKS", years: 1 },
  { name: "Snowflake", years: 1 },
  { name: "PostgreSQL", years: 2.5 },
  { name: "Docker", years: 2.5 },
  { name: "ArgoCD", years: 1 },
  { name: "Kong", years: 1 },
  { name: "React", years: 2.5 },
  { name: "Vue", years: 2 },
  { name: "Next.js", years: 1.5 },
  { name: "WebSocket", years: 2 },
  { name: "Azure Event Hub", years: 1.5 },
];
