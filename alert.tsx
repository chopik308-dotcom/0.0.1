import { motion } from 'motion/react';
import { TerminalLine } from './terminal-line';
import { getLinesByScreen, groupBySection } from '../data/ui-copy';
import { useEffect, useState } from 'react';

export function DescentScreen() {
  const lines = getLinesByScreen('DIRECTIVE / DESCENT');
  const sections = groupBySection(lines);
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-4xl mx-auto p-8 space-y-6"
    >
      {/* Header with Timer */}
      {sections['Header'] && (
        <div className="text-center pb-6 border-b-2 border-[#FF2A2A]">
          <motion.div
            className="text-6xl font-mono"
            style={{ color: '#FF2A2A' }}
            animate={{
              opacity: [1, 0.6, 1],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
          >
            {String(countdown).padStart(2, '0')}
          </motion.div>
          <div className="text-[#9AA7B3] font-mono text-sm mt-2">
            DROP SEQUENCE INITIATED
          </div>
        </div>
      )}

      {/* Commands */}
      {sections['Command'] && (
        <div className="space-y-3 mt-8">
          <div className="text-[#F2F5F7] font-mono text-sm mb-4">
            MANDATORY DIRECTIVES
          </div>
          {sections['Command'].map((line, idx) => (
            <div key={line.key} className="pl-4 border-l border-[#9AA7B3]/40">
              <TerminalLine
                text={`${idx + 1}. ${line.text}`}
                severity={line.severity}
                animHint={line.anim_hint}
                delay={0.5 + idx * 0.2}
              />
            </div>
          ))}
        </div>
      )}

      {/* Readiness */}
      {sections['Readiness'] && (
        <div className="mt-8 space-y-2 bg-[#FF2A2A]/10 p-4 border border-[#FF2A2A]/30">
          {sections['Readiness'].map((line, idx) => (
            <TerminalLine
              key={line.key}
              text={line.text}
              severity={line.severity}
              animHint={line.anim_hint}
              delay={1.5 + idx * 0.1}
            />
          ))}
        </div>
      )}

      {/* Alarms */}
      {sections['Alarms'] && (
        <div className="mt-8 space-y-3">
          <motion.div
            className="text-[#FF2A2A] font-mono text-xs mb-3"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            !!! PROXIMITY ALERTS !!!
          </motion.div>
          {sections['Alarms'].map((line, idx) => (
            <TerminalLine
              key={line.key}
              text={line.text}
              severity={line.severity}
              animHint={line.anim_hint}
              delay={2 + idx * 0.3}
            />
          ))}
        </div>
      )}

      {/* Final Glitch */}
      {sections['Footer'] && (
        <div className="mt-12 text-center">
          {sections['Footer'].map((line) => (
            <TerminalLine
              key={line.key}
              text={line.text}
              severity={line.severity}
              animHint={line.anim_hint}
              delay={3.5}
            />
          ))}
        </div>
      )}

      {/* Screen shake effect on critical countdown */}
      {countdown <= 5 && countdown > 0 && (
        <motion.div
          className="fixed inset-0 pointer-events-none"
          animate={{
            x: [0, -2, 2, -2, 0],
            y: [0, 2, -2, 1, 0],
          }}
          transition={{
            duration: 0.1,
            repeat: Infinity,
          }}
        />
      )}
    </motion.div>
  );
}
