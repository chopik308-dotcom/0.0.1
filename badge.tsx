import { motion } from 'motion/react';
import { TerminalLine } from './terminal-line';
import { getLinesByScreen, groupBySection } from '../data/ui-copy';
import { useState } from 'react';

export function InputPromptScreen() {
  const lines = getLinesByScreen('INPUT PROMPT');
  const sections = groupBySection(lines);
  const [inputValue, setInputValue] = useState('');
  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);

  const handleMouseDown = () => {
    setIsHolding(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setHoldProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsHolding(false);
        setHoldProgress(0);
        // Submit action
        console.log('INPUT SUBMITTED:', inputValue);
      }
    }, 20);

    const handleMouseUp = () => {
      clearInterval(interval);
      setIsHolding(false);
      setHoldProgress(0);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-2xl mx-auto p-8 space-y-8"
    >
      {/* Primary CTA */}
      {sections['Primary'] && (
        <div className="space-y-6">
          <div className="text-center space-y-4">
            {sections['Primary'].map((line, idx) => (
              <div key={line.key}>
                <TerminalLine
                  text={line.text}
                  severity={line.severity}
                  animHint={line.anim_hint}
                  delay={idx * 0.2}
                />
              </div>
            ))}
          </div>

          {/* Input Field */}
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full bg-transparent border-2 border-[#FF2A2A] p-4 font-mono text-[#F2F5F7] text-lg focus:outline-none focus:border-[#FF2A2A] focus:shadow-[0_0_20px_rgba(255,42,42,0.5)]"
              placeholder="_ _ _ _ _ _ _ _"
              style={{
                caretColor: '#FF2A2A',
              }}
            />
            <motion.div
              className="absolute inset-0 border-2 border-[#FF2A2A] pointer-events-none"
              animate={{
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </div>

          {/* Hold Button */}
          <div className="relative">
            <motion.button
              onMouseDown={handleMouseDown}
              className="w-full bg-[#FF2A2A] text-[#030507] font-mono p-6 text-xl relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(255,42,42,0.5)',
                  '0 0 40px rgba(255,42,42,0.8)',
                  '0 0 20px rgba(255,42,42,0.5)',
                ],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            >
              SUBMIT // HOLD
              
              {/* Progress bar */}
              {isHolding && (
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-[#F2F5F7]"
                  initial={{ width: 0 }}
                  animate={{ width: `${holdProgress}%` }}
                />
              )}
            </motion.button>
          </div>
        </div>
      )}

      {/* Secondary Messages */}
      {sections['Secondary'] && (
        <div className="mt-8 space-y-3 border-t border-[#9AA7B3]/20 pt-6">
          {sections['Secondary'].map((line, idx) => (
            <TerminalLine
              key={line.key}
              text={line.text}
              severity={line.severity}
              animHint={line.anim_hint}
              delay={1 + idx * 0.2}
            />
          ))}
        </div>
      )}

      {/* Vignette effect */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 30%, rgba(3,5,7,0.8) 100%)',
        }}
      />
    </motion.div>
  );
}
