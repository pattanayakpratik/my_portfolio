import { VoiceCommand } from "@/data/cypherData";

interface CypherCommandsProps {
  commands: VoiceCommand[];
}

export default function CypherCommands({ commands }: CypherCommandsProps) {
  return (
    <section className="mb-16">
      <div className="mb-6">
        <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--sec)] mb-1">
          Voice Command Protocol
        </h2>
        <h3 className="text-2xl sm:text-3xl font-bold">Natural Voice Interaction Matrix</h3>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-[var(--white-icon-tr)] bg-[var(--card-bg)]">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-[var(--component-bg)] border-b border-[var(--white-icon-tr)] text-[var(--white)] font-semibold">
            <tr>
              <th className="py-3.5 px-4 md:px-6">Category</th>
              <th className="py-3.5 px-4 md:px-6">Example Voice Trigger</th>
              <th className="py-3.5 px-4 md:px-6">Action Performed</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--white-icon-tr)] text-[var(--white-icon)]">
            {commands.map((cmd) => (
              <tr key={cmd.trigger} className="hover:bg-[var(--card-hover-bg)] transition-colors">
                <td className="py-3.5 px-4 md:px-6 font-medium text-[var(--sec)] whitespace-nowrap">
                  {cmd.category}
                </td>
                <td className="py-3.5 px-4 md:px-6 font-mono text-[var(--white)] font-medium">
                  {cmd.trigger}
                </td>
                <td className="py-3.5 px-4 md:px-6 leading-relaxed">{cmd.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
