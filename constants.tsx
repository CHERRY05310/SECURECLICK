
import { AttackType, LegalContent, MythFact } from './types';

export const ATTACK_TYPES: AttackType[] = [
  {
    id: 'phishing',
    title: 'Phishing',
    description: 'The most common vector. Fraudulent emails designed to steal credentials or install malware by creating a false sense of urgency.',
    anatomy: ['Deceptive Sender Name', 'Urgent or Threatening Language', 'Suspicious Links', 'Generic Greetings'],
    examples: ['Bank Account Locked Notification', 'Unpaid Invoice Attachment', 'Urgent Tax Refund Claim'],
    youtubeIds: { en: 'Y7zNlEMDmI8', te: 'N8_k-7vGat0' }
  },
  {
    id: 'smishing',
    title: 'Smishing',
    description: 'SMS Phishing. Exploys the higher trust users have in mobile messages compared to emails.',
    anatomy: ['Shortened Links (bit.ly, tinyurl)', 'Immediate Action Required', 'Impersonating Delivery Services'],
    examples: ['Package Delivery Delay', 'Lottery Win Claim', 'Bank App Update Required'],
    youtubeIds: { en: 'pY9fTq0-hsw', te: '7-pEOn1X6S0' }
  },
  {
    id: 'vishing',
    title: 'Vishing',
    description: 'Voice Phishing. Using VoIP or spoofed numbers to trick victims into sharing private info over a phone call.',
    anatomy: ['Spoofed Caller ID', 'Background Noise (Fake Office)', 'High Pressure Tactics', 'Request for OTPs'],
    examples: ['Technical Support Scam', 'IRS/CRA Tax Investigation', 'Credit Card Fraud Alert'],
    youtubeIds: { en: 'f2O8I3e-0zY', te: '5_XgU_C6mQk' }
  },
  {
    id: 'spear-phishing',
    title: 'Spear Phishing',
    description: 'Highly targeted attacks aimed at specific individuals or organizations using personalized information.',
    anatomy: ['Personalized Details (Name, Job Title)', 'Specific Business Context', 'Appears to come from a Trusted Colleague'],
    examples: ['CEO Fraud / Wire Transfer Request', 'Project Documents Request', 'Internal HR Update'],
    youtubeIds: { en: 'f2O8I3e-0zY', te: '5_XgU_C6mQk' }
  }
];

export const MYTHS_FACTS: MythFact[] = [
  {
    myth: "Only elderly people fall for social engineering scams.",
    fact: "Younger, tech-savvy users are often targets of sophisticated crypto and job scams."
  },
  {
    myth: "Antivirus software protects me from all social engineering.",
    fact: "Social engineering targets human psychology, not software vulnerabilities. Software cannot stop you from giving away your password."
  },
  {
    myth: "Scam emails always have poor grammar and spelling.",
    fact: "Modern AI (like LLMs) allows attackers to create perfect, professional-sounding emails in any language."
  }
];

export const LEGAL_AWARENESS: LegalContent[] = [
  {
    section: 'Section 66C',
    act: 'IT Act, 2000',
    description: 'Punishment for Identity Theft. Fraudulently using electronic signature, password or unique identification of others.',
    punishment: 'Imprisonment up to 3 years and fine up to 1 lakh rupees.',
    caseStudy: 'An attacker used a victim\'s Aadhaar details and password harvested via a fake KYC link to take a loan in their name.',
    videoUrl: 'https://www.youtube.com/watch?v=XW9xYfC_y6E'
  },
  {
    section: 'Section 66D',
    act: 'IT Act, 2000',
    description: 'Punishment for cheating by personation by using computer resource.',
    punishment: 'Imprisonment up to 3 years and fine up to 1 lakh rupees.',
    caseStudy: 'A victim received a fake email from an HR representative asking for sensitive documents to "update payroll".',
    videoUrl: 'https://www.youtube.com/watch?v=XW9xYfC_y6E'
  },
  {
    section: 'Section 66E',
    act: 'IT Act, 2000',
    description: 'Punishment for violation of privacy. Capturing or transmitting private images without consent.',
    punishment: 'Imprisonment up to 3 years or fine up to 2 lakh rupees, or both.',
    caseStudy: 'A "friend" on social media recorded a private video call without consent and used it for extortion/blackmail.',
    videoUrl: 'https://www.youtube.com/watch?v=kYv_j95Ppxo'
  }
];

export const RESOURCES = [
  { id: 1, title: 'Cyber Security Awareness Handbook', type: 'PDF', size: '2.4 MB' },
  { id: 2, title: 'Checklist for Safe Online Banking', type: 'DOCX', size: '1.1 MB' },
  { id: 3, title: 'Incident Reporting Guide', type: 'PDF', size: '0.8 MB' }
];
