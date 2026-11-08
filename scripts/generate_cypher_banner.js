import sharp from 'sharp';
import fs from 'fs';

async function generateBanner() {
  const CANVAS_W = 1044;
  const CANVAS_H = 596;

  // 1. Create the dark sci-fi background canvas with liquid aurora meshes and high-tech grid
  const bgSvg = `
  <svg width="${CANVAS_W}" height="${CANVAS_H}" viewBox="0 0 ${CANVAS_W} ${CANVAS_H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#040713" />
        <stop offset="45%" stop-color="#070c22" />
        <stop offset="100%" stop-color="#02040a" />
      </linearGradient>

      <!-- Liquid Aurora Blobs -->
      <radialGradient id="cyanBlob" cx="42%" cy="40%" r="55%">
        <stop offset="0%" stop-color="#00F2FE" stop-opacity="0.36" />
        <stop offset="50%" stop-color="#06B6D4" stop-opacity="0.16" />
        <stop offset="100%" stop-color="#00F2FE" stop-opacity="0" />
      </radialGradient>

      <radialGradient id="violetBlob" cx="68%" cy="55%" r="50%">
        <stop offset="0%" stop-color="#7F00FF" stop-opacity="0.32" />
        <stop offset="60%" stop-color="#A855F7" stop-opacity="0.10" />
        <stop offset="100%" stop-color="#7F00FF" stop-opacity="0" />
      </radialGradient>

      <radialGradient id="magentaBlob" cx="18%" cy="85%" r="45%">
        <stop offset="0%" stop-color="#F43F5E" stop-opacity="0.25" />
        <stop offset="60%" stop-color="#D946EF" stop-opacity="0.10" />
        <stop offset="100%" stop-color="#F43F5E" stop-opacity="0" />
      </radialGradient>

      <radialGradient id="mascotGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#00F2FE" stop-opacity="0.45" />
        <stop offset="50%" stop-color="#0284C7" stop-opacity="0.20" />
        <stop offset="100%" stop-color="#00F2FE" stop-opacity="0" />
      </radialGradient>

      <filter id="glowBlur" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="65" />
      </filter>
    </defs>

    <!-- Base Canvas Card with sleek 26px rounded corners -->
    <rect x="8" y="8" width="1028" height="580" rx="26" fill="url(#bgGrad)" stroke="rgba(255,255,255,0.08)" stroke-width="1.5" />

    <!-- Aurora Glows -->
    <circle cx="480" cy="260" r="280" fill="url(#cyanBlob)" filter="url(#glowBlur)" />
    <circle cx="740" cy="320" r="260" fill="url(#violetBlob)" filter="url(#glowBlur)" />
    <circle cx="200" cy="450" r="200" fill="url(#magentaBlob)" filter="url(#glowBlur)" />
    <!-- Spotlight behind mascot robot -->
    <circle cx="928" cy="130" r="130" fill="url(#mascotGlow)" filter="url(#glowBlur)" />

    <!-- High-Tech Coordinate Grid -->
    <g stroke="rgba(255,255,255,0.025)" stroke-width="1">
      <line x1="8" y1="110" x2="1036" y2="110" />
      <line x1="8" y1="225" x2="1036" y2="225" />
      <line x1="8" y1="345" x2="1036" y2="345" />
      <line x1="8" y1="465" x2="1036" y2="465" />
      <line x1="180" y1="8" x2="180" y2="588" />
      <line x1="380" y1="8" x2="380" y2="588" />
      <line x1="580" y1="8" x2="580" y2="588" />
      <line x1="780" y1="8" x2="780" y2="588" />
    </g>

    <!-- Sci-Fi Corner Reticles -->
    <g stroke="#00F2FE" stroke-opacity="0.45" stroke-width="1.5" fill="none">
      <path d="M 28 40 L 28 28 L 40 28" />
      <path d="M 1004 28 L 1016 28 L 1016 40" />
      <path d="M 28 556 L 28 568 L 40 568" />
      <path d="M 1004 568 L 1016 568 L 1016 556" />
    </g>

    <!-- Top Status HUD Bar -->
    <g font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, monospace">
      <circle cx="38" cy="38" r="3.5" fill="#10B981" />
      <text x="50" y="42" fill="#94A3B8" font-size="11" letter-spacing="1">
        PROTOCOL: <tspan fill="#00F2FE" font-weight="bold">F.R.I.D.A.Y. HUD</tspan> · ENGINE: <tspan fill="#38BDF8">GEMINI 1.5 FLASH</tspan>
      </text>

      <text x="820" y="42" text-anchor="end" fill="#94A3B8" font-size="11" letter-spacing="1">
        TELEMETRY: <tspan fill="#10B981" font-weight="bold">ACTIVE 60FPS</tspan> · ARCH: <tspan fill="#F8FAFC">WIN x64</tspan>
      </text>
    </g>
  </svg>
  `;

  // 2. Prepare Main HUD Window (cypher_gui_idle.png)
  const WIN_W = 750;
  const WIN_H = 460;
  const WIN_X = 42;
  const WIN_Y = 56;

  const winFrameSvg = `
  <svg width="${WIN_W}" height="${WIN_H}" viewBox="0 0 ${WIN_W} ${WIN_H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="winGlass" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#0a1020" />
        <stop offset="100%" stop-color="#04070e" />
      </linearGradient>
      <linearGradient id="winBorder" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="rgba(255, 255, 255, 0.25)" />
        <stop offset="45%" stop-color="rgba(0, 242, 254, 0.4)" />
        <stop offset="100%" stop-color="rgba(255, 255, 255, 0.08)" />
      </linearGradient>
    </defs>

    <!-- Main Window Background with glass border -->
    <rect x="1" y="1" width="${WIN_W - 2}" height="${WIN_H - 2}" rx="18" fill="url(#winGlass)" stroke="url(#winBorder)" stroke-width="1.5" />

    <!-- Title Bar Division -->
    <line x1="1" y1="36" x2="${WIN_W - 1}" y2="36" stroke="rgba(255,255,255,0.08)" stroke-width="1" />

    <!-- Window Traffic Dots -->
    <circle cx="22" cy="18" r="4.5" fill="#EF4444" opacity="0.85" />
    <circle cx="36" cy="18" r="4.5" fill="#F59E0B" opacity="0.85" />
    <circle cx="50" cy="18" r="4.5" fill="#10B981" opacity="0.85" />

    <!-- Window Title -->
    <text x="${WIN_W / 2}" y="22" text-anchor="middle" fill="#E2E8F0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" letter-spacing="0.5">
      Cypher AI — Autonomous Holographic Command Interface
    </text>

    <!-- Window Status Badge -->
    <rect x="${WIN_W - 105}" y="9" width="90" height="18" rx="9" fill="rgba(16, 185, 129, 0.12)" stroke="rgba(16, 185, 129, 0.3)" stroke-width="1" />
    <circle cx="${WIN_W - 93}" cy="18" r="3" fill="#10B981" />
    <text x="${WIN_W - 84}" y="21.5" fill="#10B981" font-family="monospace" font-size="9" font-weight="bold" letter-spacing="1">
      STANDBY
    </text>
  </svg>
  `;

  // Scale cypher_gui_idle.png with fit: 'contain' inside 746 x 418 on #04070c background so NOTHING is clipped!
  const idleInner = await sharp('public/projects/cypher/cypher_gui_idle.png')
    .resize(WIN_W - 4, WIN_H - 40, {
      fit: 'contain',
      background: '#04070c'
    })
    .png()
    .toBuffer();

  const windowComposite = await sharp(Buffer.from(winFrameSvg))
    .composite([
      { input: idleInner, top: 38, left: 2 }
    ])
    .png()
    .toBuffer();

  // 3. Floating Widget 1: Neon Magenta Vocalizing & Equalizer Card (from cypher_gui_speaking.png)
  const SPEAK_W = 310;
  const SPEAK_H = 175;
  const speakSnippet = await sharp('public/projects/cypher/cypher_gui_speaking.png')
    .extract({
      left: 120,
      top: 180,
      width: 1200,
      height: 720
    })
    .resize(SPEAK_W - 4, SPEAK_H - 36, { fit: 'cover', position: 'bottom' })
    .png()
    .toBuffer();

  const speakCardSvg = `
  <svg width="${SPEAK_W}" height="${SPEAK_H}" viewBox="0 0 ${SPEAK_W} ${SPEAK_H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="speakBorder" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="rgba(244, 63, 94, 0.7)" />
        <stop offset="50%" stop-color="rgba(217, 70, 239, 0.45)" />
        <stop offset="100%" stop-color="rgba(255, 255, 255, 0.15)" />
      </linearGradient>
    </defs>
    <!-- Background -->
    <rect x="1" y="1" width="${SPEAK_W - 2}" height="${SPEAK_H - 2}" rx="16" fill="rgba(8, 12, 24, 0.92)" stroke="url(#speakBorder)" stroke-width="1.5" />
    
    <!-- Title -->
    <circle cx="16" cy="18" r="3.5" fill="#F43F5E" />
    <text x="26" y="22" fill="#F43F5E" font-family="monospace" font-size="10.5" font-weight="bold" letter-spacing="1">
      32-BAND AUDIO SPECTRUM
    </text>
    <rect x="${SPEAK_W - 85}" y="9" width="73" height="18" rx="9" fill="rgba(244, 63, 94, 0.15)" stroke="rgba(244, 63, 94, 0.4)" stroke-width="1" />
    <text x="${SPEAK_W - 48}" y="21.5" text-anchor="middle" fill="#F43F5E" font-family="monospace" font-size="9" font-weight="bold">
      SPEAKING
    </text>
    <line x1="1" y1="34" x2="${SPEAK_W - 1}" y2="34" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
  </svg>
  `;

  const speakCard = await sharp(Buffer.from(speakCardSvg))
    .composite([
      { input: speakSnippet, top: 35, left: 2 }
    ])
    .png()
    .toBuffer();

  // 4. Floating Widget 2: Credentials & Telemetry Vault Card (from cypher_settings_dialog.png)
  const VAULT_W = 295;
  const VAULT_H = 225;
  const vaultSnippet = await sharp('public/projects/cypher/cypher_settings_dialog.png')
    .resize(VAULT_W - 4, VAULT_H - 36, { fit: 'cover', position: 'top' })
    .png()
    .toBuffer();

  const vaultCardSvg = `
  <svg width="${VAULT_W}" height="${VAULT_H}" viewBox="0 0 ${VAULT_W} ${VAULT_H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="vaultBorder" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="rgba(0, 242, 254, 0.7)" />
        <stop offset="50%" stop-color="rgba(56, 189, 248, 0.4)" />
        <stop offset="100%" stop-color="rgba(255, 255, 255, 0.15)" />
      </linearGradient>
    </defs>
    <!-- Background -->
    <rect x="1" y="1" width="${VAULT_W - 2}" height="${VAULT_H - 2}" rx="16" fill="rgba(8, 12, 24, 0.94)" stroke="url(#vaultBorder)" stroke-width="1.5" />
    
    <!-- Title -->
    <circle cx="16" cy="18" r="3.5" fill="#00F2FE" />
    <text x="26" y="22" fill="#00F2FE" font-family="monospace" font-size="10.5" font-weight="bold" letter-spacing="1">
      CREDENTIALS VAULT
    </text>
    <rect x="${VAULT_W - 88}" y="9" width="76" height="18" rx="9" fill="rgba(6, 182, 212, 0.15)" stroke="rgba(6, 182, 212, 0.4)" stroke-width="1" />
    <text x="${VAULT_W - 50}" y="21.5" text-anchor="middle" fill="#00F2FE" font-family="monospace" font-size="9" font-weight="bold">
      ENCRYPTED
    </text>
    <line x1="1" y1="34" x2="${VAULT_W - 1}" y2="34" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
  </svg>
  `;

  const vaultCard = await sharp(Buffer.from(vaultCardSvg))
    .composite([
      { input: vaultSnippet, top: 35, left: 2 }
    ])
    .png()
    .toBuffer();

  // 5. Floating Mascot Avatar: The authentic 3D Robot Mascot (from cypher_robot.png)
  const MASCOT_SIZE = 145;
  const mascotImg = await sharp('src/assets/projects/cypher_robot.png')
    .resize(MASCOT_SIZE, MASCOT_SIZE, { fit: 'contain' })
    .png()
    .toBuffer();

  const mascotBadgeSvg = `
  <svg width="156" height="42" viewBox="0 0 156 42" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="154" height="40" rx="20" fill="rgba(8, 14, 28, 0.9)" stroke="rgba(0, 242, 254, 0.45)" stroke-width="1.5" />
    <circle cx="18" cy="21" r="4" fill="#00F2FE" />
    <text x="30" y="25" fill="#F8FAFC" font-family="monospace" font-size="10" font-weight="bold" letter-spacing="1">
      AI COMPANION
    </text>
  </svg>
  `;

  // 6. Master Composition
  console.log('Compositing master banner...');
  const baseCanvas = await sharp(Buffer.from(bgSvg)).png().toBuffer();

  await sharp(baseCanvas)
    .composite([
      // Main HUD Window
      { input: windowComposite, left: WIN_X, top: WIN_Y },
      // Overlay Vault Card (Right)
      { input: vaultCard, left: 728, top: 325 },
      // Overlay Speaking Card (Left)
      { input: speakCard, left: 28, top: 385 },
      // Mascot Robot (Top Right)
      { input: mascotImg, left: 852, top: 58 },
      // Mascot Label Pill
      { input: Buffer.from(mascotBadgeSvg), left: 846, top: 215 }
    ])
    .png({ quality: 100, compressionLevel: 8 })
    .toFile('src/assets/projects/cypher_banner.png');

  // Copy to public/projects/cypher/banner.png
  fs.copyFileSync('src/assets/projects/cypher_banner.png', 'public/projects/cypher/banner.png');

  // Replace src/assets/projects/cypher.png
  fs.copyFileSync('src/assets/projects/cypher_banner.png', 'src/assets/projects/cypher.png');

  console.log('Successfully updated Cypher banner assets.');
}

generateBanner().catch(console.error);
