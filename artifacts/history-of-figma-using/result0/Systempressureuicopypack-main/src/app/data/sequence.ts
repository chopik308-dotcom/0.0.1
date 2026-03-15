import { screens } from './ui-copy';

export type ScreenName = (typeof screens)[number];

export type SequenceEventType = 'enter' | 'exit' | 'critical_surge' | 'blackout' | 'flash';

export interface SequenceEvent {
  type: SequenceEventType;
  atMs: number;
  durationMs?: number;
  note?: string;
}

export interface SequenceTriggers {
  enter: string[];
  exit: string[];
}

export interface SequenceTransition {
  type: 'next' | 'jump' | 'loop';
  toStepId?: string;
}

export interface SequenceStep {
  id: string;
  screen: ScreenName;
  durationMs: number;
  triggers: SequenceTriggers;
  events: SequenceEvent[];
  transition: SequenceTransition;
}

export const sequenceSteps: SequenceStep[] = [
  {
    id: 'wake',
    screen: 'BOOT / WAKE',
    durationMs: 12000,
    triggers: {
      enter: ['session_start', 'bio_link_open'],
      exit: ['wake_complete'],
    },
    events: [
      { type: 'enter', atMs: 0, note: 'boot_channel_open' },
      { type: 'flash', atMs: 1500, durationMs: 240, note: 'cold_start_flash' },
      { type: 'critical_surge', atMs: 8600, durationMs: 1900, note: 'memory_lock_warning' },
      { type: 'exit', atMs: 11800, note: 'handoff_metrics' },
    ],
    transition: { type: 'next' },
  },
  {
    id: 'metrics',
    screen: 'METRICS OVERLOAD',
    durationMs: 14000,
    triggers: {
      enter: ['telemetry_sync'],
      exit: ['telemetry_archive', 'compliance_snapshot'],
    },
    events: [
      { type: 'enter', atMs: 0, note: 'metrics_stream_online' },
      { type: 'critical_surge', atMs: 4400, durationMs: 2100, note: 'risk_forecast_spike' },
      { type: 'flash', atMs: 10200, durationMs: 260, note: 'alarm_ping' },
      { type: 'exit', atMs: 13700, note: 'handoff_descent' },
    ],
    transition: { type: 'next' },
  },
  {
    id: 'descent',
    screen: 'DIRECTIVE / DESCENT',
    durationMs: 16000,
    triggers: {
      enter: ['directive_lock'],
      exit: ['signal_drop'],
    },
    events: [
      { type: 'enter', atMs: 0, note: 'drop_protocol_started' },
      { type: 'flash', atMs: 5200, durationMs: 180, note: 'impact_detected' },
      { type: 'critical_surge', atMs: 9200, durationMs: 2600, note: 'proximity_alarm' },
      { type: 'blackout', atMs: 14300, durationMs: 900, note: 'transmission_loss' },
      { type: 'exit', atMs: 15800, note: 'handoff_input' },
    ],
    transition: { type: 'next' },
  },
  {
    id: 'input',
    screen: 'INPUT PROMPT',
    durationMs: 12000,
    triggers: {
      enter: ['input_gate_open'],
      exit: ['input_timeout', 'sequence_restart'],
    },
    events: [
      { type: 'enter', atMs: 0, note: 'prompt_armed' },
      { type: 'critical_surge', atMs: 2600, durationMs: 1700, note: 'input_required' },
      { type: 'flash', atMs: 7600, durationMs: 250, note: 'override_denied' },
      { type: 'exit', atMs: 11800, note: 'loop_back_boot' },
    ],
    transition: { type: 'loop' },
  },
];

export const totalSequenceDurationMs = sequenceSteps.reduce((sum, step) => sum + step.durationMs, 0);

export const screenToIndex = screens.reduce((acc, screenName, index) => {
  acc[screenName] = index;
  return acc;
}, {} as Record<ScreenName, number>);

export function resolveNextStepIndex(currentIndex: number): number {
  const currentStep = sequenceSteps[currentIndex];

  if (currentStep.transition.type === 'jump' && currentStep.transition.toStepId) {
    const jumpIndex = sequenceSteps.findIndex((step) => step.id === currentStep.transition.toStepId);
    return jumpIndex >= 0 ? jumpIndex : (currentIndex + 1) % sequenceSteps.length;
  }

  if (currentStep.transition.type === 'loop') {
    return 0;
  }

  return (currentIndex + 1) % sequenceSteps.length;
}
