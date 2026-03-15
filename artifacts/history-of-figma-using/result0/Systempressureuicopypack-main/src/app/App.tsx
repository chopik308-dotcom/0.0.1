import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BootScreen } from './components/boot-screen';
import { MetricsScreen } from './components/metrics-screen';
import { DescentScreen } from './components/descent-screen';
import { InputPromptScreen } from './components/input-prompt-screen';
import { screens } from './data/ui-copy';
import {
  resolveNextStepIndex,
  screenToIndex,
  sequenceSteps,
  totalSequenceDurationMs,
} from './data/sequence';

export default function App() {
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepStartedAt, setStepStartedAt] = useState(Date.now());
  const [now, setNow] = useState(Date.now());
  const [activeTrigger, setActiveTrigger] = useState('sequence_boot');
  const [isCriticalSurgeActive, setIsCriticalSurgeActive] = useState(false);
  const [isBlackoutActive, setIsBlackoutActive] = useState(false);
  const [isFlashActive, setIsFlashActive] = useState(false);

  const isDebugMode = useMemo(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return new URLSearchParams(window.location.search).get('debug') === '1';
  }, []);

  const currentStep = sequenceSteps[currentStepIndex];

  const sequenceElapsedMs = useMemo(() => {
    const previousStepsDuration = sequenceSteps
      .slice(0, currentStepIndex)
      .reduce((sum, step) => sum + step.durationMs, 0);

    const currentStepElapsed = Math.min(now - stepStartedAt, currentStep.durationMs);
    return previousStepsDuration + Math.max(0, currentStepElapsed);
  }, [currentStep.durationMs, currentStepIndex, now, stepStartedAt]);

  const nextScreen = () => {
    setCurrentScreenIndex((prev) => (prev + 1) % screens.length);
  };

  const prevScreen = () => {
    setCurrentScreenIndex((prev) => (prev - 1 + screens.length) % screens.length);
  };

  useEffect(() => {
    if (isDebugMode) {
      return;
    }

    setCurrentScreenIndex(screenToIndex[currentStep.screen]);
    setStepStartedAt(Date.now());
    setNow(Date.now());
    setActiveTrigger(currentStep.triggers.enter.join(' • '));

    const eventTimeouts = currentStep.events.map((event) =>
      window.setTimeout(() => {
        switch (event.type) {
          case 'enter':
          case 'exit':
            setActiveTrigger(event.note ?? event.type);
            break;
          case 'critical_surge': {
            setIsCriticalSurgeActive(true);
            setActiveTrigger(event.note ?? 'critical_surge');
            window.setTimeout(() => setIsCriticalSurgeActive(false), event.durationMs ?? 1200);
            break;
          }
          case 'blackout': {
            setIsBlackoutActive(true);
            setActiveTrigger(event.note ?? 'blackout');
            window.setTimeout(() => setIsBlackoutActive(false), event.durationMs ?? 500);
            break;
          }
          case 'flash': {
            setIsFlashActive(true);
            setActiveTrigger(event.note ?? 'flash');
            window.setTimeout(() => setIsFlashActive(false), event.durationMs ?? 180);
            break;
          }
          default:
            break;
        }
      },
      event.atMs),
    );

    const transitionTimeout = window.setTimeout(() => {
      setActiveTrigger(currentStep.triggers.exit.join(' • '));
      setCurrentStepIndex((prev) => resolveNextStepIndex(prev));
    }, currentStep.durationMs);

    return () => {
      eventTimeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
      window.clearTimeout(transitionTimeout);
      setIsCriticalSurgeActive(false);
      setIsBlackoutActive(false);
      setIsFlashActive(false);
    };
  }, [currentStep, isDebugMode]);

  useEffect(() => {
    if (isDebugMode) {
      return;
    }

    const tick = window.setInterval(() => {
      setNow(Date.now());
    }, 200);

    return () => window.clearInterval(tick);
  }, [isDebugMode]);

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
          background:
            'repeating-linear-gradient(0deg, rgba(0,0,0,0.15), rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px)',
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

      {isCriticalSurgeActive && (
        <motion.div
          className="fixed inset-0 pointer-events-none"
          style={{ backgroundColor: 'rgba(255, 42, 42, 0.08)', zIndex: 45 }}
          animate={{ opacity: [0.2, 0.75, 0.2] }}
          transition={{ duration: 0.35, repeat: Infinity }}
        />
      )}

      {isBlackoutActive && (
        <motion.div
          className="fixed inset-0 pointer-events-none"
          style={{ backgroundColor: '#000000', zIndex: 48 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }}
        />
      )}

      {isFlashActive && (
        <motion.div
          className="fixed inset-0 pointer-events-none"
          style={{ backgroundColor: '#F2F5F7', zIndex: 47 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.08 }}
        />
      )}

      {/* Navigation */}
      {isDebugMode ? (
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
              DEBUG MODE · {screens[currentScreenIndex]}
            </motion.div>
          </div>

          <button
            onClick={nextScreen}
            className="p-2 border border-[#9AA7B3]/30 hover:border-[#F2F5F7] hover:bg-[#F2F5F7]/10 transition-all"
          >
            <ChevronRight className="w-5 h-5" style={{ color: '#F2F5F7' }} />
          </button>
        </div>
      ) : (
        <div className="fixed top-4 left-4 right-4 z-40 border border-[#9AA7B3]/30 bg-[#030507]/80 p-3 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-4 text-xs">
            <span style={{ color: '#9AA7B3' }}>SEQUENCE MODE</span>
            <span style={{ color: '#F2F5F7' }}>{currentStep.screen}</span>
            <span style={{ color: '#9AA7B3' }}>
              {(sequenceElapsedMs / 1000).toFixed(1)}s / {(totalSequenceDurationMs / 1000).toFixed(0)}s
            </span>
          </div>
          <div className="mt-2 h-1 w-full bg-[#9AA7B3]/20">
            <motion.div
              className="h-full"
              style={{ backgroundColor: '#FF2A2A' }}
              animate={{ width: `${Math.min((sequenceElapsedMs / totalSequenceDurationMs) * 100, 100)}%` }}
            />
          </div>
          <div className="mt-2 text-[11px] tracking-wide" style={{ color: '#9AA7B3' }}>
            TRIGGER: {activeTrigger}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="pt-24 pb-12 px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={isDebugMode ? currentScreenIndex : currentStepIndex}
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
      <div
        className="fixed bottom-0 left-0 right-0 border-t border-[#9AA7B3]/20 p-3 backdrop-blur-sm"
        style={{ backgroundColor: 'rgba(3,5,7,0.8)' }}
      >
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="flex gap-6 text-xs font-mono">
            <span style={{ color: '#9AA7B3' }}>SYSTEM: ACTIVE</span>
            <span style={{ color: '#9AA7B3' }}>
              MODE: {isDebugMode ? 'DEBUG NAVIGATION' : 'SEQUENCE TIMELINE'}
            </span>
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
