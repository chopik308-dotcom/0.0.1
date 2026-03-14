import { motion } from 'motion/react';
import { TerminalLine } from './terminal-line';
import { getLinesByScreen, groupBySection } from '../data/ui-copy';

export function BootScreen() {
  const lines = getLinesByScreen('BOOT / WAKE');
  const sections = groupBySection(lines);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-4xl mx-auto p-8 space-y-8"
    >
      {/* Identity Section */}
      {sections['Identity'] && (
        <div className="space-y-2 border-l-2 border-[#9AA7B3]/30 pl-4">
          {sections['Identity'].map((line, idx) => (
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

      {/* System Section */}
      {sections['System'] && (
        <div className="space-y-3 mt-8">
          <div className="h-px bg-[#9AA7B3]/20 mb-6" />
          {sections['System'].map((line, idx) => (
            <TerminalLine
              key={line.key}
              text={line.text}
              severity={line.severity}
              animHint={line.anim_hint}
              delay={0.5 + idx * 0.2}
            />
          ))}
        </div>
      )}

      {/* Scan lines effect */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
        }}
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </motion.div>
  );
}
