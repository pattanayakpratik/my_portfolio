import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const width = 1200;
const height = 630;

const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#04060A" />
      <stop offset="40%" stop-color="#080D1A" />
      <stop offset="100%" stop-color="#030408" />
    </linearGradient>

    <!-- Glowing Accent Orbs -->
    <radialGradient id="cyanGlow" cx="82%" cy="14%" r="55%">
      <stop offset="0%" stop-color="#06B6D4" stop-opacity="0.32" />
      <stop offset="40%" stop-color="#0284C7" stop-opacity="0.14" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>

    <radialGradient id="indigoGlow" cx="12%" cy="88%" r="52%">
      <stop offset="0%" stop-color="#6366F1" stop-opacity="0.25" />
      <stop offset="45%" stop-color="#4F46E5" stop-opacity="0.09" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>

    <linearGradient id="cyanTextGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#22D3EE" />
      <stop offset="50%" stop-color="#38BDF8" />
      <stop offset="100%" stop-color="#60A5FA" />
    </linearGradient>

    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#111827" stop-opacity="0.88" />
      <stop offset="100%" stop-color="#090E17" stop-opacity="0.94" />
    </linearGradient>

    <!-- Top Card Edge Accents -->
    <linearGradient id="cyanBorderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#06B6D4" stop-opacity="0.95" />
      <stop offset="100%" stop-color="#3B82F6" stop-opacity="0.15" />
    </linearGradient>

    <linearGradient id="purpleBorderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#C084FC" stop-opacity="0.95" />
      <stop offset="100%" stop-color="#6366F1" stop-opacity="0.15" />
    </linearGradient>

    <linearGradient id="blueBorderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#60A5FA" stop-opacity="0.95" />
      <stop offset="100%" stop-color="#06B6D4" stop-opacity="0.15" />
    </linearGradient>

    <!-- Cyber Grid Pattern -->
    <pattern id="grid" width="44" height="44" patternUnits="userSpaceOnUse">
      <path d="M 44 0 L 0 0 0 44" fill="none" stroke="rgba(255, 255, 255, 0.03)" stroke-width="1" />
      <circle cx="0" cy="0" r="1.5" fill="rgba(34, 211, 238, 0.16)" />
    </pattern>

    <!-- Card Shadow -->
    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#000000" flood-opacity="0.55" />
    </filter>
  </defs>

  <style>
    .font-sans { font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif; }
    .font-mono { font-family: 'Cascadia Code', 'Consolas', 'Courier New', monospace; }
  </style>

  <!-- Base Canvas -->
  <rect width="${width}" height="${height}" fill="url(#bg)" />

  <!-- Atmospheric Glows -->
  <rect width="${width}" height="${height}" fill="url(#cyanGlow)" />
  <rect width="${width}" height="${height}" fill="url(#indigoGlow)" />

  <!-- Grid Texture -->
  <rect width="${width}" height="${height}" fill="url(#grid)" />

  <!-- Outer Frame Glare Border -->
  <rect x="1" y="1" width="1198" height="628" fill="none" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1" />

  <!-- ================= TOP BAR ================= -->
  <!-- Left: Personal Branding & Monogram -->
  <g transform="translate(64, 46)">
    <!-- Monogram Squircle -->
    <rect x="0" y="0" width="52" height="52" rx="14" fill="#0C1424" stroke="rgba(34, 211, 238, 0.45)" stroke-width="1.5" />
    <text x="26" y="34" class="font-sans" font-size="21" font-weight="900" fill="#22D3EE" text-anchor="middle" letter-spacing="1">PP</text>

    <!-- Name & Handle -->
    <text x="68" y="25" class="font-sans" font-size="22" font-weight="800" fill="#FFFFFF" letter-spacing="0.3">Pratik Pattanayak</text>
    <text x="68" y="45" class="font-mono" font-size="13" font-weight="500" fill="#64748B">github.com/pattanayakpratik</text>
  </g>

  <!-- Right: Active Status Badge -->
  <g transform="translate(856, 48)">
    <rect x="0" y="0" width="280" height="46" rx="23" fill="rgba(16, 185, 129, 0.08)" stroke="rgba(16, 185, 129, 0.35)" stroke-width="1.2" />
    <!-- Pulse Indicator -->
    <circle cx="24" cy="23" r="8" fill="#10B981" fill-opacity="0.25" />
    <circle cx="24" cy="23" r="4.5" fill="#10B981" />
    <text x="42" y="28" class="font-sans" font-size="12" font-weight="800" fill="#34D399" letter-spacing="1">AVAILABLE FOR ROLES</text>
    <text x="206" y="28" class="font-sans" font-size="12" font-weight="500" fill="#64748B">· Mumbai</text>
  </g>

  <!-- ================= HERO HEADLINE ================= -->
  <g transform="translate(64, 134)">
    <!-- Role Title (Split cleanly to prevent font overlapping) -->
    <text x="0" y="44" class="font-sans" font-size="52" font-weight="900" letter-spacing="-1">
      <tspan fill="#FFFFFF">Backend &amp; </tspan>
      <tspan fill="url(#cyanTextGrad)">AI Engineer</tspan>
    </text>

    <!-- Pitch Subtitle -->
    <text x="0" y="84" class="font-sans" font-size="20" font-weight="400" fill="#94A3B8">
      Building scalable distributed backends, high-throughput APIs &amp; production Generative AI.
    </text>

    <!-- Credential Chips with Vector SVGs -->
    <g transform="translate(0, 108)">
      <!-- Chip 1: CGPI -->
      <g transform="translate(0, 0)">
        <rect x="0" y="0" width="144" height="28" rx="14" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
        <!-- Gold Star SVG -->
        <polygon points="18,6 20.4,12 26.5,12.4 21.8,16.2 23.3,22 18,18.8 12.7,22 14.2,16.2 9.5,12.4 15.6,12" fill="#FBBF24" />
        <text x="32" y="19" class="font-sans" font-size="12" font-weight="700" fill="#F8FAFC">8.65 CGPI</text>
        <text x="96" y="19" class="font-sans" font-size="11" font-weight="500" fill="#64748B">B.Sc. IT</text>
      </g>

      <!-- Chip 2: AWS Certified -->
      <g transform="translate(156, 0)">
        <rect x="0" y="0" width="186" height="28" rx="14" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
        <!-- Cloud SVG -->
        <path d="M 16 18 a 3.5 3.5 0 0 1 0 -7 a 5 5 0 0 1 9.5 -1.5 a 4 4 0 0 1 3.5 4.5 a 3.5 3.5 0 0 1 -1 7 z" fill="#38BDF8" />
        <text x="34" y="19" class="font-sans" font-size="12" font-weight="700" fill="#F8FAFC">AWS Certified</text>
        <text x="122" y="19" class="font-sans" font-size="11" font-weight="500" fill="#64748B">ML &amp; AI</text>
      </g>

      <!-- Chip 3: Open Source Repos -->
      <g transform="translate(354, 0)">
        <rect x="0" y="0" width="160" height="28" rx="14" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
        <!-- Lightning SVG -->
        <path d="M 18 5 L 12 15 L 17 15 L 14 23 L 22 12 L 17 12 Z" fill="#F59E0B" />
        <text x="28" y="19" class="font-sans" font-size="12" font-weight="700" fill="#F8FAFC">15+ Repos</text>
        <text x="96" y="19" class="font-sans" font-size="11" font-weight="500" fill="#64748B">Shipped</text>
      </g>
    </g>
  </g>

  <!-- ================= BENTO SHOWCASE GRID ================= -->
  <!-- 3 Equal Width Glass Cards (Width: 344 each, Gap: 20, Total: 1072) -->
  <g transform="translate(64, 286)">

    <!-- CARD 1: PyShare (Cyan Accent) -->
    <g transform="translate(0, 0)">
      <rect x="0" y="0" width="344" height="186" rx="16" fill="url(#cardGrad)" stroke="rgba(6, 182, 212, 0.28)" stroke-width="1" filter="url(#cardShadow)" />
      <!-- Top Colored Glow Border -->
      <path d="M 16 0 L 328 0" stroke="url(#cyanBorderGrad)" stroke-width="2.5" stroke-linecap="round" />

      <!-- Pill -->
      <rect x="18" y="16" width="112" height="22" rx="11" fill="rgba(6, 182, 212, 0.14)" stroke="rgba(6, 182, 212, 0.35)" stroke-width="1" />
      <text x="74" y="31" class="font-sans" font-size="10" font-weight="800" fill="#22D3EE" text-anchor="middle" letter-spacing="0.8">P2P FILE HUB</text>

      <!-- Title -->
      <text x="18" y="66" class="font-sans" font-size="22" font-weight="800" fill="#FFFFFF">PyShare Hub</text>

      <!-- Description -->
      <text x="18" y="92" class="font-sans" font-size="13" font-weight="400" fill="#94A3B8">
        Cross-device WebRTC P2P &amp; Wi-Fi LAN
      </text>
      <text x="18" y="110" class="font-sans" font-size="13" font-weight="400" fill="#94A3B8">
        transfer with universal clipboard sync.
      </text>

      <!-- Metric Footer Box -->
      <rect x="18" y="134" width="308" height="34" rx="8" fill="rgba(6, 182, 212, 0.08)" stroke="rgba(6, 182, 212, 0.2)" stroke-width="1" />
      <!-- Lightning Icon -->
      <path d="M 33 143 L 29 151 L 33 151 L 30 159 L 37 148 L 33 148 Z" fill="#22D3EE" />
      <text x="44" y="156" class="font-mono" font-size="12" font-weight="700" fill="#38BDF8">50-100 MB/s · Zero-Install P2P</text>
    </g>

    <!-- CARD 2: Cypher AI (Purple Accent) -->
    <g transform="translate(364, 0)">
      <rect x="0" y="0" width="344" height="186" rx="16" fill="url(#cardGrad)" stroke="rgba(168, 85, 247, 0.28)" stroke-width="1" filter="url(#cardShadow)" />
      <!-- Top Colored Glow Border -->
      <path d="M 16 0 L 328 0" stroke="url(#purpleBorderGrad)" stroke-width="2.5" stroke-linecap="round" />

      <!-- Pill -->
      <rect x="18" y="16" width="124" height="22" rx="11" fill="rgba(168, 85, 247, 0.14)" stroke="rgba(168, 85, 247, 0.35)" stroke-width="1" />
      <text x="80" y="31" class="font-sans" font-size="10" font-weight="800" fill="#C084FC" text-anchor="middle" letter-spacing="0.8">VOICE HUD ENGINE</text>

      <!-- Title -->
      <text x="18" y="66" class="font-sans" font-size="22" font-weight="800" fill="#FFFFFF">Cypher Assistant</text>

      <!-- Description -->
      <text x="18" y="92" class="font-sans" font-size="13" font-weight="400" fill="#94A3B8">
        Autonomous Tony Stark F.R.I.D.A.Y. HUD
      </text>
      <text x="18" y="110" class="font-sans" font-size="13" font-weight="400" fill="#94A3B8">
        with Vector Arc Reactor &amp; 32-band EQ.
      </text>

      <!-- Metric Footer Box -->
      <rect x="18" y="134" width="308" height="34" rx="8" fill="rgba(168, 85, 247, 0.08)" stroke="rgba(168, 85, 247, 0.2)" stroke-width="1" />
      <!-- Soundwave / Mic Icon -->
      <path d="M 33 144 a 2 2 0 0 1 2 2 v 4 a 2 2 0 0 1 -4 0 v -4 a 2 2 0 0 1 2 -2 z M 28 149 a 5 5 0 0 0 10 0 M 33 154 v 4" fill="none" stroke="#C084FC" stroke-width="1.4" stroke-linecap="round" />
      <text x="44" y="156" class="font-mono" font-size="12" font-weight="700" fill="#E879F9">Gemini 1.5 Flash · Windows EXE</text>
    </g>

    <!-- CARD 3: PulseEngine (Blue/Teal Accent) -->
    <g transform="translate(728, 0)">
      <rect x="0" y="0" width="344" height="186" rx="16" fill="url(#cardGrad)" stroke="rgba(59, 130, 246, 0.28)" stroke-width="1" filter="url(#cardShadow)" />
      <!-- Top Colored Glow Border -->
      <path d="M 16 0 L 328 0" stroke="url(#blueBorderGrad)" stroke-width="2.5" stroke-linecap="round" />

      <!-- Pill -->
      <rect x="18" y="16" width="138" height="22" rx="11" fill="rgba(59, 130, 246, 0.14)" stroke="rgba(59, 130, 246, 0.35)" stroke-width="1" />
      <text x="87" y="31" class="font-sans" font-size="10" font-weight="800" fill="#60A5FA" text-anchor="middle" letter-spacing="0.8">DISTRIBUTED PIPELINE</text>

      <!-- Title -->
      <text x="18" y="66" class="font-sans" font-size="22" font-weight="800" fill="#FFFFFF">PulseEngine</text>

      <!-- Description -->
      <text x="18" y="92" class="font-sans" font-size="13" font-weight="400" fill="#94A3B8">
        Event-driven analytics stream pipeline
      </text>
      <text x="18" y="110" class="font-sans" font-size="13" font-weight="400" fill="#94A3B8">
        with robust Transactional Outbox pattern.
      </text>

      <!-- Metric Footer Box -->
      <rect x="18" y="134" width="308" height="34" rx="8" fill="rgba(59, 130, 246, 0.08)" stroke="rgba(59, 130, 246, 0.2)" stroke-width="1" />
      <!-- Activity Pulse Line Icon -->
      <path d="M 28 152 h 3 l 2 -5 l 3 10 l 2 -7 l 2 3 h 3" fill="none" stroke="#60A5FA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <text x="48" y="156" class="font-mono" font-size="12" font-weight="700" fill="#93C5FD">FastAPI · Redis · Postgres · Docker</text>
    </g>

  </g>

  <!-- ================= BOTTOM DOCK ================= -->
  <g transform="translate(64, 510)">
    <!-- Tech Stack Chips -->
    <g transform="translate(0, 16)">
      <!-- Tech Chip 1: Python -->
      <rect x="0" y="0" width="76" height="34" rx="8" fill="rgba(255, 255, 255, 0.04)" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
      <text x="38" y="22" class="font-sans" font-size="13" font-weight="600" fill="#E2E8F0" text-anchor="middle">Python</text>

      <!-- Tech Chip 2: FastAPI -->
      <rect x="86" y="0" width="78" height="34" rx="8" fill="rgba(255, 255, 255, 0.04)" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
      <text x="125" y="22" class="font-sans" font-size="13" font-weight="600" fill="#E2E8F0" text-anchor="middle">FastAPI</text>

      <!-- Tech Chip 3: PostgreSQL -->
      <rect x="174" y="0" width="102" height="34" rx="8" fill="rgba(255, 255, 255, 0.04)" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
      <text x="225" y="22" class="font-sans" font-size="13" font-weight="600" fill="#E2E8F0" text-anchor="middle">PostgreSQL</text>

      <!-- Tech Chip 4: Redis -->
      <rect x="286" y="0" width="66" height="34" rx="8" fill="rgba(255, 255, 255, 0.04)" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
      <text x="319" y="22" class="font-sans" font-size="13" font-weight="600" fill="#E2E8F0" text-anchor="middle">Redis</text>

      <!-- Tech Chip 5: Docker -->
      <rect x="362" y="0" width="76" height="34" rx="8" fill="rgba(255, 255, 255, 0.04)" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
      <text x="400" y="22" class="font-sans" font-size="13" font-weight="600" fill="#E2E8F0" text-anchor="middle">Docker</text>

      <!-- Tech Chip 6: Next.js -->
      <rect x="448" y="0" width="80" height="34" rx="8" fill="rgba(255, 255, 255, 0.04)" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
      <text x="488" y="22" class="font-sans" font-size="13" font-weight="600" fill="#E2E8F0" text-anchor="middle">Next.js</text>

      <!-- Tech Chip 7: Gemini AI -->
      <rect x="538" y="0" width="94" height="34" rx="8" fill="rgba(255, 255, 255, 0.04)" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
      <text x="585" y="22" class="font-sans" font-size="13" font-weight="600" fill="#E2E8F0" text-anchor="middle">Gemini AI</text>

      <!-- Tech Chip 8: AWS -->
      <rect x="642" y="0" width="62" height="34" rx="8" fill="rgba(255, 255, 255, 0.04)" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
      <text x="673" y="22" class="font-sans" font-size="13" font-weight="600" fill="#E2E8F0" text-anchor="middle">AWS</text>
    </g>

    <!-- Right: Verified Domain Link Pill -->
    <g transform="translate(772, 10)">
      <rect x="0" y="0" width="300" height="46" rx="12" fill="#0C1424" stroke="rgba(34, 211, 238, 0.35)" stroke-width="1.2" />
      <!-- Globe Icon -->
      <circle cx="28" cy="23" r="10" fill="none" stroke="#22D3EE" stroke-width="1.5" />
      <line x1="18" y1="23" x2="38" y2="23" stroke="#22D3EE" stroke-width="1.2" />
      <ellipse cx="28" cy="23" rx="5" ry="10" fill="none" stroke="#22D3EE" stroke-width="1.2" />

      <!-- Domain Text -->
      <text x="48" y="28" class="font-mono" font-size="15" font-weight="700" fill="#38BDF8">pattanayakpratik.vercel.app</text>
    </g>
  </g>
</svg>
`;

async function main() {
  console.log('Rendering high-resolution OG image from SVG with Sharp...');
  const pngBuffer = await sharp(Buffer.from(svg))
    .png({ quality: 100, compressionLevel: 9 })
    .toBuffer();

  const outputPath = path.join(process.cwd(), 'public', 'og.image.png');
  fs.writeFileSync(outputPath, pngBuffer);
  console.log(`Successfully generated and wrote ${outputPath} (${pngBuffer.length} bytes)`);
}

main().catch((err) => {
  console.error('Error generating OG image:', err);
  process.exit(1);
});
