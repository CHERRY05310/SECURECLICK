
export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
  CYBER_BLUE = 'cyber-blue',
  NEON_GREEN = 'neon-green'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'User' | 'Admin' | 'Analyst';
}

export interface AttackType {
  id: string;
  title: string;
  description: string;
  anatomy: string[];
  examples: string[];
  youtubeIds: {
    en: string;
    te: string;
  };
}

export interface LegalContent {
  section: string;
  act: string;
  description: string;
  punishment: string;
  caseStudy: string;
  videoUrl?: string;
}

export interface ThreatAnalysisResult {
  status: 'Safe' | 'Suspicious' | 'Dangerous';
  riskLevel: number;
  summary: string;
  analyticalReasoning: string[]; // Step-by-step logical breakdown
  technicalAudit: {
    anomalies: string[];
    riskScore: number;
  };
  psychologicalAudit: {
    triggers: string[];
    riskScore: number;
  };
  suggestedActions: string[];
}

export interface MythFact {
  myth: string;
  fact: string;
}
