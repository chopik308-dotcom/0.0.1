import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BootScreen } from './components/boot-screen';
import { MetricsScreen } from './components/metrics-screen';
import { DescentScreen } from './components/descent-screen';
import { InputPromptScreen } from './components/input-prompt-screen';
import { screens } from './data/ui-copy';

export default function App() {
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);

  const nextScreen = () => {
    setCurrentScreenIndex((prev) => (prev + 1) % screens.length);
  };

  const prevScreen = () => {
    setCurrentScreenIndex((prev) => (prev - 1 + screens.length) % screens.length);
  };

  const renderScreen = () => {
    switch (screens[currentScreenIndex]) {
      case 'BOOT / WAKE':
        return <BootScreen />;
      case 'METRICS OVERLOAD':
        return <MetricsScreen />;
      case 'DIRECTIVE / DESCENT':
        return <DescentScreen />;
      case 'INPUT PROMPT':
        return <InputPromptScreen />;
      default:
        return <BootScreen />;
    }
  };

  return (
    <div 
      className="min-h-screen w-full relative overflow-hidden"
      style={{
        backgroundColor: '#030507',
        fontFamily: 'monospace',
      }}
    >
      {/* CRT screen effect */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.15), rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px)',
          zIndex: 50,
        }}
      />

      {/* Screen glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(242,245,247,0.02) 0%, transparent 70%)',
        }}
      />

      {/* Navigation */}
      <div className="fixed top-4 left-4 right-4 flex justify-between items-center z-40">
        <button
          onClick={prevScreen}
          className="p-2 border border-[#9AA7B3]/30 hover:border-[#F2F5F7] hover:bg-[#F2F5F7]/10 transition-all"
        >
          <ChevronLeft className="w-5 h-5" style={{ color: '#F2F5F7' }} />
        </button>

        <div className="text-center">
          <motion.div
            key={currentScreenIndex}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#9AA7B3] font-mono text-sm tracking-wider"
          >
            {screens[currentScreenIndex]}
          </motion.div>
          <div className="flex gap-2 mt-2 justify-center">
            {screens.map((_, idx) => (
              <div
                key={idx}
                className="w-2 h-2"
                style={{
                  backgroundColor: idx === currentScreenIndex ? '#FF2A2A' : '#9AA7B3',
                  opacity: idx === currentScreenIndex ? 1 : 0.3,
                }}
              />
            ))}
          </div>
        </div>

        <button
          onClick={nextScreen}
          className="p-2 border border-[#9AA7B3]/30 hover:border-[#F2F5F7] hover:bg-[#F2F5F7]/10 transition-all"
        >
          <ChevronRight className="w-5 h-5" style={{ color: '#F2F5F7' }} />
        </button>
      </div>

      {/* Main Content */}
      <div className="pt-24 pb-12 px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreenIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Status bar at bottom */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-[#9AA7B3]/20 p-3 backdrop-blur-sm" style={{ backgroundColor: 'rgba(3,5,7,0.8)' }}>
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="flex gap-6 text-xs font-mono">
            <span style={{ color: '#9AA7B3' }}>SYSTEM: ACTIVE</span>
            <span style={{ color: '#9AA7B3' }}>CONNECTION: STABLE</span>
          </div>
          <div className="flex gap-2 items-center">
            <motion.div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: '#FF2A2A' }}
              animate={{
                opacity: [1, 0.3, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            />
            <span className="text-xs font-mono" style={{ color: '#FF2A2A' }}>
              REC
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
