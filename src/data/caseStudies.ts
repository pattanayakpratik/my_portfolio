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
    subtitle: "High-throughput chunked socket streaming and UDP broadcast discovery across heterogeneous devices",
    category: "Distributed Systems & Networking",
    readTime: "6 min read",
    date: "October 2026",
    summary:
      "PyShare solves the friction of moving multi-gigabyte datasets and media across local networks without uploading to external cloud drives. By coupling UDP broadcast beaconing for zero-configuration discovery with chunked TCP streams and a dual GUI/Web interface, it achieves wire-speed throughput with zero cloud dependencies.",
    highlights: [
      "Zero-config peer discovery via UDP broadcast sockets (port 5005)",
      "High-throughput chunked TCP transfer using 64KB optimized buffer slices",
      "End-to-end SHA-256 chunk hashing preventing corrupt partial writes",
      "Dual interface: Native desktop client (Tkinter) + embedded HTTP web server for mobile phones",
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
];
