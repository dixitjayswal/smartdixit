/**
 * About / story paragraphs. First-person, three short paragraphs.
 * Edit the strings directly — they render in order.
 */

export const about = {
  eyebrow: "About",
  heading: "I build the parts of the system you only notice when they break.",
  paragraphs: [
    "I'm a backend engineer who works on distributed, event-driven systems — the queues, streams, and pipelines that move millions of events a day without dropping them on the floor. Most of my work lives in Node.js and TypeScript on AWS, with a lot of Kafka, SQS, and Lambda in between.",
    "I do it at Thinkbiz Technology, where I've shipped systems like J-VIS — an anomaly-detection platform for JERA, one of Japan's largest power companies — and Jugaad, a real-time analytics platform serving sub-second queries over 2.5M events a day. I owned the detailed system design on J-VIS and the streaming layer on Jugaad.",
    "What I actually care about is reliability and observability: systems that tell you what's wrong before a customer does, and code that the next engineer can read without a meeting. I'd rather ship something boring that stays up than something clever that pages someone at 3am.",
  ],
} as const;
