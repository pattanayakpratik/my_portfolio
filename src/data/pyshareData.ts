export interface ComparisonMode {
  title: string;
  badge: string;
  badgeColor: string;
  icon: string;
  description: string;
  points: string[];
  actionText: string;
  actionUrl: string;
  isPrimary: boolean;
}

export interface QuickStep {
  step: string;
  title: string;
  desc: string;
}

export const pyshareComparisonModes = (liveUrl: string, downloadUrl: string): ComparisonMode[] => [
  {
    title: "Instant Web Mode (Zero Install)",
    badge: "ANY DEVICE · WORLDWIDE",
    badgeColor: "border-purple-500/40 text-purple-400 bg-purple-500/10",
    icon: "🌐",
    description:
      "Run PyShare directly inside your web browser. No software download or installation required on any device.",
    points: [
      "Works on iPhone, Android, iPad, Mac, Windows, Linux",
      "Peer-to-Peer WebRTC DataChannel transfer",
      "Encrypted browser-to-browser connection",
      "Connect via instant Room PIN or Camera QR scan",
      "Integrated media lightbox & shared web clipboard",
    ],
    actionText: "Launch Web App ↗",
    actionUrl: liveUrl,
    isPrimary: true,
  },
  {
    title: "Desktop App Mode (.exe)",
    badge: "STANDALONE WINDOWS · 100 MB/s",
    badgeColor: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10",
    icon: "💻",
    description:
      "Self-contained portable Windows application engineered for ultra-fast local offline file transfers.",
    points: [
      "100% offline Wi-Fi LAN / Hotspot speed (50–100 MB/s)",
      "1-click Cloudflare Internet Tunnel for remote sharing",
      "Files auto-saved directly to Desktop/PyShare_Files",
      "Native 1-click Windows OS clipboard push",
      "Zero Python or dependencies needed — portable .exe",
    ],
    actionText: "Download PyShare.exe ⬇",
    actionUrl: downloadUrl,
    isPrimary: false,
  },
];

export const pyshareQuickSteps: QuickStep[] = [
  {
    step: "01",
    title: "Open or Launch",
    desc: "Open pyshare.vercel.app on any browser, or double-click PyShare.exe on your Windows PC.",
  },
  {
    step: "02",
    title: "Scan QR or Enter PIN",
    desc: "Point your phone camera at the QR code, or type the rotating 4-digit PIN into the keypad.",
  },
  {
    step: "03",
    title: "Instant Transfer & Clipboard",
    desc: "Drag and drop files, stream videos with byte-range seeking, and beam text snippets instantly.",
  },
];
