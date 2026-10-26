export default function PyShareArchitecture() {
  return (
    <section className="mb-16">
      <div className="mb-6">
        <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--sec)] mb-1">
          Core Architecture
        </h2>
        <h3 className="text-2xl sm:text-3xl font-bold">Engineered for Speed, Privacy & Fluidity</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* WebRTC */}
        <div className="p-6 rounded-2xl border border-[var(--white-icon-tr)] bg-[var(--card-bg)] flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="size-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-lg text-purple-400">
              🌐
            </span>
            <div>
              <h4 className="font-semibold text-base text-[var(--white)]">
                WebRTC P2P DataChannels
              </h4>
              <span className="text-xs font-mono text-purple-400">
                Zero Cloud Intermediaries · Pure P2P
              </span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-[var(--white-icon)] leading-relaxed">
            Direct browser-to-browser encrypted transfers with STUN signaling. Files stream
            peer-to-peer across phones, tablets, and computers worldwide with direct-to-disk File System Access API writing.
          </p>
        </div>

        {/* HTTP 206 */}
        <div className="p-6 rounded-2xl border border-[var(--white-icon-tr)] bg-[var(--card-bg)] flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="size-10 rounded-xl bg-[var(--sec)]/15 border border-[var(--sec)]/30 flex items-center justify-center text-lg text-[var(--sec)]">
              ⚡
            </span>
            <div>
              <h4 className="font-semibold text-base text-[var(--white)]">
                HTTP 206 Partial Content
              </h4>
              <span className="text-xs font-mono text-[var(--sec)]">
                Instant Media Scrubbing & Playback
              </span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-[var(--white-icon)] leading-relaxed">
            RFC 7233 byte-range requests for audio and video media. Users can instantly
            scrub through multi-gigabyte video files in the in-app lightbox with zero
            buffering pauses across iOS Safari and Android Chrome.
          </p>
        </div>

        {/* Security Hardening v4.8.0 */}
        <div className="p-6 rounded-2xl border border-[var(--white-icon-tr)] bg-[var(--card-bg)] flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="size-10 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-lg text-rose-400">
              🛡️
            </span>
            <div>
              <h4 className="font-semibold text-base text-[var(--white)]">
                v4.8.0 Security Hardening
              </h4>
              <span className="text-xs font-mono text-rose-400">
                Rate Limiter · CSRF & Traversal Defense
              </span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-[var(--white-icon)] leading-relaxed">
            Thread-safe sliding window rate-limiter on PIN authentication, canonical path traversal
            rejection, `Sec-Fetch-Site` intranet defense, and non-blocking `/api/zip` semaphore controls.
          </p>
        </div>

        {/* Clipboard */}
        <div className="p-6 rounded-2xl border border-[var(--white-icon-tr)] bg-[var(--card-bg)] flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="size-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-lg text-blue-400">
              📋
            </span>
            <div>
              <h4 className="font-semibold text-base text-[var(--white)]">
                Universal Shared Clipboard
              </h4>
              <span className="text-xs font-mono text-blue-400">
                Bidirectional Beam + OS Injection
              </span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-[var(--white-icon)] leading-relaxed">
            Instantly share links, phone numbers, notes, and addresses across devices. Includes
            1-click native Windows OS clipboard push on the host studio and modal drawer on
            mobile devices with 1-tap copy.
          </p>
        </div>

        {/* Dual-Grace PIN & Discovery */}
        <div className="p-6 rounded-2xl border border-[var(--white-icon-tr)] bg-[var(--card-bg)] flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="size-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-lg text-emerald-400">
              🔒
            </span>
            <div>
              <h4 className="font-semibold text-base text-[var(--white)]">
                Dual-Grace 30s PIN & mDNS
              </h4>
              <span className="text-xs font-mono text-emerald-400">
                Zero-Config Pairing · Grace Rollover
              </span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-[var(--white-icon)] leading-relaxed">
            Dynamic QR code pairing and rotating 4-digit PIN with a dual-grace window ensures entering
            the PIN right at the boundary never causes lockouts. Features Zeroconf mDNS discovery
            broadcasting across local networks.
          </p>
        </div>

        {/* Cyberpunk & Liquid Glass UI */}
        <div className="p-6 rounded-2xl border border-[var(--white-icon-tr)] bg-[var(--card-bg)] flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="size-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-lg text-amber-400">
              💎
            </span>
            <div>
              <h4 className="font-semibold text-base text-[var(--white)]">
                Cyberpunk &amp; Liquid Glass UI
              </h4>
              <span className="text-xs font-mono text-amber-400">
                Ultra-Wide Studio · Floating Queue
              </span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-[var(--white-icon)] leading-relaxed">
            Responsive 1180px+ desktop layout, frosted glass surfaces with specular borders,
            and a global floating upload queue drawer with real-time MB/s speed meters.
          </p>
        </div>
      </div>
    </section>
  );
}
