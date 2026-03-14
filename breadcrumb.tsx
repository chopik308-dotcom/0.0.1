import { motion } from 'motion/react';
import { TerminalLine } from './terminal-line';
import { getLinesByScreen, groupBySection } from '../data/ui-copy';

export function MetricsScreen() {
  const lines = getLinesByScreen('METRICS OVERLOAD');
  const sections = groupBySection(lines);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-6xl mx-auto p-8 space-y-6"
    >
      {/* Header */}
      {sections['Header'] && (
        <div className="space-y-2 pb-4 border-b border-[#FF2A2A]/30">
          {sections['Header'].map((line, idx) => (
            <TerminalLine
              key={line.key}
              text={line.text}
              severity={line.severity}
              animHint={line.anim_hint}
              delay={idx * 0.1}
            />
          ))}
        </div>
      )}

      {/* Status Grid */}
      {sections['Status'] && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
          {sections['Status'].map((line, idx) => (
            <div key={line.key} className="border border-[#9AA7B3]/20 p-3">
              <TerminalLine
                text={line.text}
                severity={line.severity}
                animHint={line.anim_hint}
                delay={0.3 + idx * 0.05}
              />
            </div>
          ))}
        </div>
      )}

      {/* Flags */}
      {sections['Flags'] && (
        <div className="mt-8 space-y-2 border-l-2 border-[#FF2A2A]/50 pl-4">
          <div className="text-[#FF2A2A] font-mono text-xs mb-3">
            CRITICAL FLAGS
          </div>
          {sections['Flags'].map((line, idx) => (
            <TerminalLine
              key={line.key}
              text={line.text}
              severity={line.severity}
              animHint={line.anim_hint}
              delay={1 + idx * 0.15}
            />
          ))}
        </div>
      )}

      {/* System Voice */}
      {sections['System Voice'] && (
        <div className="mt-8 space-y-3 bg-[#9AA7B3]/5 p-6 border border-[#9AA7B3]/20">
          <div className="text-[#9AA7B3] font-mono text-xs mb-3">
            {'>'} SYSTEM VOICE
          </div>
          {sections['System Voice'].map((line, idx) => (
            <TerminalLine
              key={line.key}
              text={line.text}
              severity={line.severity}
              animHint={line.anim_hint}
              delay={1.5 + idx * 0.2}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
