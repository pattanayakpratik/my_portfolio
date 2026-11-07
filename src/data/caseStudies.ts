export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  date: string;
  summary: string;
  highlights: string[];
  architecturePoints: {
    title: string;
    description: string;
    codeSnippet?: string;
  }[];
  benchmarks: {
    metric: string;
    value: string;
    detail: string;
  }[];
  githubUrl: string;
  showcaseUrl: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "pyshare",
    slug: "pyshare-architecture",
    title: "Designing a Zero-Config P2P LAN File Transfer Engine",
    subtitle: "High-throughput chunked socket streaming, UDP broadcast discovery, and v4.9.3 security hardening",
    category: "Distributed Systems & Networking",
    readTime: "7 min read",
    date: "November 2026",
    summary:
      "PyShare solves the friction of moving multi-gigabyte datasets, seekable media, and universal clipboard across local networks without external cloud drives. By coupling UDP broadcast beaconing for zero-configuration discovery with chunked TCP streams, v4.9.3 sliding-window rate limiting, LAN Quick Chat, and a dual Cyberpunk/Liquid Glass interface, it achieves wire-speed throughput with zero cloud dependencies.",
    highlights: [
      "Zero-config peer discovery via UDP broadcast sockets (port 5005 & port 53535)",
      "High-throughput chunked TCP transfer using 64KB optimized buffer slices & 4MB window scaling",
      "End-to-end SHA-256 chunk hashing preventing corrupt partial writes",
      "v4.9.3 Upgrades: LAN Quick Chat, Knock-to-Join approval flow, and active peer inspector with IP masking",
      "HTTP 206 Partial Content byte-range streaming for seekable audio/video & recursive folder uploads",
      "Dual interface: Native desktop studio + embedded HTTP web server for mobile devices",
    ],
    architecturePoints: [
      {
        title: "1. Zero-Configuration Peer Discovery via UDP Broadcast",
        description:
          "Rather than requiring users to manually lookup and enter IP addresses, PyShare hosts broadcast periodic JSON datagram beacons containing machine hostnames and listening ports to the broadcast address (255.255.255.255:5005). Clients listen asynchronously on a background daemon thread, populating the active peer table with zero manual user friction.",
        codeSnippet: `def broadcast_beacon(port: int, host_name: str):\n    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)\n    sock.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)\n    payload = json.dumps({"host": host_name, "port": port}).encode()\n    while is_running:\n        sock.sendto(payload, ("255.255.255.255", 5005))\n        time.sleep(2.0)`,
      },
      {
        title: "2. Chunked TCP Streaming & Stream Integrity",
        description:
          "File transfers utilize dedicated TCP sockets. Files are decomposed into 64KB chunk buffers. The receiver receives a binary header indicating file size, name, and total chunk count before streaming payload bytes directly to disk with an active SHA-256 incremental checksum to ensure zero bit rot.",
        codeSnippet: `CHUNK_SIZE = 64 * 1024  # 64 KB optimal TCP window slice\nwith open(filepath, "rb") as f:\n    hasher = hashlib.sha256()\n    while chunk := f.read(CHUNK_SIZE):\n        client_sock.sendall(chunk)\n        hasher.update(chunk)\nclient_sock.sendall(hasher.digest())`,
      },
      {
        title: "3. Universal Web Mode for Cross-Ecosystem Devices",
        description:
          "iOS and Android devices cannot run native Python Tkinter applications. To resolve this, PyShare includes a lightweight embedded HTTP/WS server. A mobile device simply scans the generated on-screen QR code to open an in-browser web app, uploading or downloading files directly through standard browser multipart HTTP streams.",
      },
      {
        title: "4. v4.9.3 Sliding-Window PIN Rate Limiter, CSRF Defense & LAN Quick Chat",
        description:
          "To protect local hosts from brute-force PIN guessing, PyShare integrates a thread-safe sliding window rate limiter on `/login` (5 consecutive failures enforce a 30s client lockout). Mutating endpoints validate `Origin` and `Sec-Fetch-Site` against intranet drive-by CSRF attacks, while v4.9.3 adds an in-memory 30-message rolling LAN Quick Chat buffer with sender attribution and clipboard image paste.",
      },
    ],
    benchmarks: [
      { metric: "Discovery Latency", value: "< 850 ms", detail: "Automatic UDP peer detection on standard Wi-Fi router" },
      { metric: "Throughput", value: "92 MB/s", detail: "Sustained local transfer over 5GHz Wi-Fi / Gigabit LAN" },
      { metric: "Cloud Egress Cost", value: "$0.00", detail: "100% peer-to-peer with zero intermediary cloud servers" },
    ],
    githubUrl: "https://github.com/pattanayakpratik/PyShare",
    showcaseUrl: "/projects/pyshare",
  },
  {
    id: "cypher",
    slug: "cypher-architecture",
    title: "Building an Asynchronous Desktop Voice Orchestrator",
    subtitle: "Low-latency audio streaming, decoupled PyQt event loops, and multi-tier intent resolution",
    category: "AI & Desktop Systems",
    readTime: "7 min read",
    date: "October 2026",
    summary:
      "Cypher is a native desktop voice assistant engineered for productivity automation. By isolating microphone polling into background QThreads, implementing dynamic energy threshold calibration, and cascading regex heuristics into LLM calls, Cypher provides instant system command execution while maintaining a silky 60fps GUI.",
    highlights: [
      "Decoupled multi-threaded audio pipeline preventing UI freeze during STT processing",
      "Dynamic ambient noise calibration adapting microphone gain to background noise",
      "Sub-15ms fast-path intent classifier for native desktop automation actions",
      "Audio-reactive PyQt HUD with four synchronized visual states",
    ],
    architecturePoints: [
      {
        title: "1. Thread Isolation: Decoupling Audio from the Qt Event Loop",
        description:
          "Desktop voice assistants frequently suffer from GUI stuttering when the main thread blocks on microphone I/O or cloud API responses. Cypher isolates audio capture into a dedicated QThread worker. Custom Qt signals emit state transitions ('listening', 'processing', 'speaking') to update the HUD safely across thread boundaries.",
        codeSnippet: `class VoiceWorker(QThread):\n    state_changed = pyqtSignal(str)\n    transcription_ready = pyqtSignal(str)\n\n    def run(self):\n        with sr.Microphone() as source:\n            self.recognizer.adjust_for_ambient_noise(source, duration=0.6)\n            self.state_changed.emit("listening")\n            audio = self.recognizer.listen(source)\n            self.state_changed.emit("processing")\n            text = self.recognizer.recognize_google(audio)\n            self.transcription_ready.emit(text)`,
      },
      {
        title: "2. Multi-Tier Intent Resolution Pipeline",
        description:
          "Sending every simple query ('open notepad', 'volume up', 'what time is it?') to an LLM incurs unnecessary latency and API cost. Cypher uses a two-tier evaluation model: Tier 1 matches deterministic regex heuristics executed locally in <15ms; Tier 2 passes open-ended reasoning queries to conversational LLMs with short contextual system prompts.",
      },
      {
        title: "3. Audio-Reactive State Machine",
        description:
          "The user interface renders distinct glowing visual feedback for each state in the interaction cycle. When text-to-speech output commences, speech generation runs asynchronously with speech synthesizer hooks to immediately return the HUD to 'IDLE' upon audio playback completion.",
      },
    ],
    benchmarks: [
      { metric: "Local Action Latency", value: "< 14 ms", detail: "Fast-path regex system execution without network overhead" },
      { metric: "GUI Frame Rate", value: "60 FPS", detail: "Main Qt thread never blocked during background audio I/O" },
      { metric: "Noise Adaptation", value: "600 ms", detail: "Automatic background noise threshold calibration on startup" },
    ],
    githubUrl: "https://github.com/pattanayakpratik/Cypher",
    showcaseUrl: "/projects/cypher",
  },
  {
    id: "pulseengine",
    slug: "pulseengine-architecture",
    title: "Designing a Fault-Tolerant Distributed Notification & Dynamic Segmentation Engine",
    subtitle: "ACID Transactional Outbox, two-lane priority worker queues, Redis Lua rate limiting, and AST-based SQL resolvers",
    category: "Distributed Systems & Cloud Infrastructure",
    readTime: "8 min read",
    date: "November 2026",
    summary:
      "Modern applications struggle with notification infrastructure: marketing broadcasts cause head-of-line blocking delaying critical OTPs, dual-write operations cause data loss during broker hiccups, and manual segmentation queries burden engineering. PulseEngine eliminates these bottlenecks by coupling an ACID Transactional Outbox pattern with two-lane priority Celery/Redis workers, a 24-hour atomic idempotency guard, and an AST-based dynamic JSON-to-SQL segment compiler.",
    highlights: [
      "ACID Transactional Outbox eliminating dual-write broker data loss in PostgreSQL 16",
      "Two-lane priority worker isolation preventing marketing broadcasts from delaying OTPs/alerts",
      "Redis Lua token-bucket rate limiter with atomic 24-hour idempotency locking",
      "Dynamic AST parser compiling arbitrary nested JSON logic directly to parameterized SQL",
      "Live Vercel analytics dashboard with real-time SSE metrics and chaos engineering simulator",
    ],
    architecturePoints: [
      {
        title: "1. ACID Transactional Outbox Pattern",
        description:
          "Rather than publishing notifications directly to message queues inside HTTP route handlers (which risks broker disconnection data loss), PulseEngine commits notifications and outbox_events within a single atomic PostgreSQL transaction. Dedicated relay workers poll outbox events using 'SELECT ... FOR UPDATE SKIP LOCKED' before streaming to Redis broker lanes.",
        codeSnippet: `async def commit_notification_with_outbox(session, notification_data, payload):\n    async with session.begin():\n        notif = Notification(**notification_data)\n        session.add(notif)\n        await session.flush()\n        outbox = OutboxEvent(\n            aggregate_id=notif.id,\n            event_type="notification.dispatched",\n            payload=payload,\n            priority=notif.priority,\n        )\n        session.add(outbox)`,
      },
      {
        title: "2. Two-Lane Priority Worker Queue Isolation",
        description:
          "To completely eliminate Head-of-Line blocking, PulseEngine routes tasks into isolated lanes: Lane 1 (Critical: OTPs, security alerts) with sub-100ms SLA, and Lane 2 (Bulk: marketing broadcasts, batch engagement) with asynchronous background throttling. Critical workers never poll the bulk queue, guaranteeing urgent communications arrive without queue lag.",
      },
      {
        title: "3. AST-Based Dynamic JSON-to-SQL Segment Resolver",
        description:
          "Instead of running slow in-memory filtering or hardcoding cohort queries, PulseEngine parses abstract syntax tree (AST) JSON rules into secure, parameterized PostgreSQL SQL with GIN/B-tree index optimization.",
      },
      {
        title: "4. Chaos Simulation & Real-Time SSE Dashboard",
        description:
          "The system includes built-in chaos endpoints simulating broker packet loss, worker failover, and rate-limit backpressure. A responsive Next.js 16 dashboard subscribes to Server-Sent Events (SSE) to render live delivery percentiles, queue depth, and chaos recovery in real time.",
      },
    ],
    benchmarks: [
      { metric: "Critical OTP Dispatch Latency", value: "< 45 ms", detail: "High-priority queue isolated from background marketing blasts" },
      { metric: "Idempotency TTL Window", value: "24 Hours", detail: "Zero duplicate dispatches across network timeouts and retries" },
      { metric: "Delivery Guarantee", value: "ACID Guaranteed", detail: "Transactional outbox prevents data loss on broker failure" },
    ],
    githubUrl: "https://github.com/pattanayakpratik/PulseEngine",
    showcaseUrl: "https://pulse-engine-dashboard-ten.vercel.app",
  },
];
