export interface VoiceCommand {
  category: string;
  trigger: string;
  action: string;
}

export const cypherVoiceCommands: VoiceCommand[] = [
  {
    category: "Generative Intelligence",
    trigger: '"Cypher, explain quantum computing like I\'m five"',
    action: "Google Gemini 1.5 Flash conversational synthesis & neural voice reply",
  },
  {
    category: "System Automation",
    trigger: '"Cypher, open Visual Studio Code and Google Chrome"',
    action: "Automated app orchestration & window management",
  },
  {
    category: "Live Web & Weather",
    trigger: '"Cypher, what is the weather in Mumbai?"',
    action: "Real-time OpenWeather API lookup & verbal meteorological breakdown",
  },
  {
    category: "News Briefings",
    trigger: '"Cypher, tell me the latest technology news"',
    action: "Live NewsData API query & concise audio news briefing",
  },
  {
    category: "Communications",
    trigger: '"Cypher, send an email to..."',
    action: "Interactive voice-composed SMTP email dispatch with confirmation",
  },
  {
    category: "Hardware Diagnostics",
    trigger: '"Cypher, system status"',
    action: "Audible telemetry summary for CPU, Memory, Battery, and Disk storage",
  },
];
