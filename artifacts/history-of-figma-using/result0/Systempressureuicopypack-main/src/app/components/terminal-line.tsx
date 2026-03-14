import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import type { Severity, AnimHint } from '../data/ui-copy';

interface TerminalLineProps {
  text: string;
  severity: Severity;
  animHint: AnimHint;
  delay?: number;
}

const severityColors = {
  info: '#F2F5F7',
  warning: '#9AA7B3',
  critical: '#FF2A2A',
};

export function TerminalLine({ text, severity, animHint, delay = 0 }: TerminalLineProps) {
  const [displayText, setDisplayText] = useState('');
  const [showFlash, setShowFlash] = useState(false);
  const [isTyping, setIsTyping] = useState(animHint === 'type_on');

  // Typewriter effect
  useEffect(() => {
    if (animHint === 'type_on') {
      setIsTyping(true);
      let currentIndex = 0;
      const typingDelay = setTimeout(() => {
        const interval = setInterval(() => {
          if (currentIndex <= text.length) {
            setDisplayText(text.slice(0, currentIndex));
            currentIndex++;
            // Random stalls as per spec
            if (Math.random() < 0.1) {
              clearInterval(interval);
              setTimeout(() => {
                const newInterval = setInterval(() => {
                  if (currentIndex <= text.length) {
                    setDisplayText(text.slice(0, currentIndex));
                    currentIndex++;
                  } else {
                    clearInterval(newInterval);
                    setIsTyping(false);
                  }
                }, Math.random() * 20 + 20);
              }, 100);
            }
          } else {
            clearInterval(interval);
            setIsTyping(false);
          }
        }, Math.random() * 20 + 20);
      }, delay);

      return () => clearTimeout(typingDelay);
    } else {
      setDisplayText(text);
    }
  }, [text, animHint, delay]);

  // Flash effect
  useEffect(() => {
    if (animHint === 'flash_once') {
      const timer = setTimeout(() => {
        setShowFlash(true);
        setTimeout(() => setShowFlash(false), 50);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [animHint, delay]);

  const getAnimationProps = () => {
    switch (animHint) {
      case 'pulse_hard':
        return {
          animate: {
            opacity: [1, 0.6, 1],
            scale: [1, 1.02, 1],
          },
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        };
      case 'blink_slow':
        return {
          animate: {
            opacity: [1, 0.3, 1],
          },
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        };
      case 'flicker_minor':
        return {
          animate: {
            opacity: [1, 0.95, 1, 0.92, 1],
          },
          transition: {
            duration: 0.15,
            repeat: Infinity,
            repeatDelay: 3,
          },
        };
      case 'jitter_subtle':
        return {
          animate: {
            x: [0, 1, -1, 2, 0],
          },
          transition: {
            duration: 1.2,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        };
      case 'glitch_hard':
        return {
          animate: {
            x: [0, -5, 5, -3, 3, 0],
            opacity: [1, 0.8, 1, 0.6, 1, 0.9, 1],
            skewX: [0, -2, 2, -1, 0],
          },
          transition: {
            duration: 0.3,
            repeat: Infinity,
            repeatDelay: 0.5,
          },
        };
      default:
        return {};
    }
  };

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, ...getAnimationProps().animate }}
        transition={{ delay, ...getAnimationProps().transition }}
        className="relative"
        style={{
          color: severityColors[severity],
          fontFamily: 'monospace',
          fontSize: '14px',
          lineHeight: '1.6',
          letterSpacing: '0.02em',
        }}
      >
        {isTyping ? displayText : text}
        {isTyping && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="inline-block w-2 h-3.5 ml-0.5 bg-current align-middle"
          />
        )}
      </motion.div>

      {/* Ghost layer effect */}
      <div
        className="absolute left-0 pointer-events-none"
        style={{
          top: '6px',
          color: severityColors[severity],
          opacity: 0.15,
          fontFamily: 'monospace',
          fontSize: '14px',
          lineHeight: '1.6',
          letterSpacing: '0.02em',
        }}
      >
        {displayText || text}
      </div>

      {/* Flash effect */}
      {showFlash && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundColor: '#FF2A2A',
            mixBlendMode: 'screen',
          }}
        />
      )}
    </div>
  );
}
