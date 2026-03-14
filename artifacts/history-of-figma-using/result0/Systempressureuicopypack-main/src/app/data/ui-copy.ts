export type Severity = 'info' | 'warning' | 'critical';
export type AnimHint = 'steady' | 'type_on' | 'pulse_hard' | 'flash_once' | 'flicker_minor' | 'blink_slow' | 'jitter_subtle' | 'glitch_hard';

export interface UILine {
  screen: string;
  section: string;
  key: string;
  text: string;
  severity: Severity;
  anim_hint: AnimHint;
}

export const uiCopyData: UILine[] = [
  { screen: 'BOOT / WAKE', section: 'Identity', key: 'PRISONER_ID', text: 'PRISONER ID 76561198380490588', severity: 'info', anim_hint: 'steady' },
  { screen: 'BOOT / WAKE', section: 'Identity', key: 'SECTION', text: 'SECTION 6 // ENTRYPOINT dx', severity: 'info', anim_hint: 'steady' },
  { screen: 'BOOT / WAKE', section: 'Identity', key: 'ALIAS', text: 'ALIAS "WTH"', severity: 'info', anim_hint: 'flicker_minor' },
  { screen: 'BOOT / WAKE', section: 'System', key: 'LINE_01', text: 'WAKE SEQUENCE ACCEPTED', severity: 'info', anim_hint: 'type_on' },
  { screen: 'BOOT / WAKE', section: 'System', key: 'LINE_02', text: 'LANGUAGE PACK :: RU-EN MIXED', severity: 'info', anim_hint: 'steady' },
  { screen: 'BOOT / WAKE', section: 'System', key: 'LINE_03', text: 'SUBJECT AUTH CLASS :: RESTRICTED', severity: 'warning', anim_hint: 'type_on' },
  { screen: 'BOOT / WAKE', section: 'System', key: 'LINE_04', text: 'MEMORY ACCESS :: PARTIAL LOCK', severity: 'warning', anim_hint: 'steady' },
  { screen: 'BOOT / WAKE', section: 'System', key: 'LINE_05', text: 'MISSION BRIEF :: REDACTED', severity: 'warning', anim_hint: 'type_on' },
  { screen: 'BOOT / WAKE', section: 'System', key: 'LINE_06', text: 'MENTAL EVAL   UNSTABLE', severity: 'critical', anim_hint: 'pulse_hard' },
  { screen: 'BOOT / WAKE', section: 'System', key: 'LINE_07', text: 'SUGGESTED ACTION : RETIRE', severity: 'warning', anim_hint: 'type_on' },
  { screen: 'BOOT / WAKE', section: 'System', key: 'LINE_08', text: 'OVERRIDE : REDEPLOY', severity: 'critical', anim_hint: 'flash_once' },
  { screen: 'BOOT / WAKE', section: 'System', key: 'LINE_09', text: 'SUBJECT READY FOR CORTEX INTERFACE INJECTION', severity: 'info', anim_hint: 'steady' },
  { screen: 'BOOT / WAKE', section: 'System', key: 'LINE_10', text: 'INPUT CHANNEL OPEN', severity: 'info', anim_hint: 'blink_slow' },
  
  { screen: 'METRICS OVERLOAD', section: 'Header', key: 'TITLE', text: 'CONTROL CHANNEL // SYSTEM TELEMETRY', severity: 'info', anim_hint: 'steady' },
  { screen: 'METRICS OVERLOAD', section: 'Header', key: 'NODE', text: 'NODE ID :: C6-SHAFT-03', severity: 'info', anim_hint: 'steady' },
  { screen: 'METRICS OVERLOAD', section: 'Status', key: 'COMPLIANCE', text: 'COMPLIANCE SCORE :: 27%', severity: 'critical', anim_hint: 'pulse_hard' },
  { screen: 'METRICS OVERLOAD', section: 'Status', key: 'COGNITIVE_LOAD', text: 'COGNITIVE LOAD :: HIGH', severity: 'warning', anim_hint: 'jitter_subtle' },
  { screen: 'METRICS OVERLOAD', section: 'Status', key: 'SIGNAL_INTEGRITY', text: 'SIGNAL INTEGRITY :: DEGRADED', severity: 'warning', anim_hint: 'steady' },
  { screen: 'METRICS OVERLOAD', section: 'Status', key: 'INSTRUCTION_PARSE', text: 'INSTRUCTION PARSE :: 61%', severity: 'warning', anim_hint: 'type_on' },
  { screen: 'METRICS OVERLOAD', section: 'Status', key: 'MISSION_CLARITY', text: 'MISSION CLARITY :: REDACTED', severity: 'warning', anim_hint: 'steady' },
  { screen: 'METRICS OVERLOAD', section: 'Status', key: 'AUTH_STATE', text: 'AUTH STATE :: LIMITED', severity: 'warning', anim_hint: 'steady' },
  { screen: 'METRICS OVERLOAD', section: 'Status', key: 'RISK_FORECAST', text: 'RISK FORECAST :: TERMINAL', severity: 'critical', anim_hint: 'flash_once' },
  { screen: 'METRICS OVERLOAD', section: 'Status', key: 'RESPONSE_LATENCY', text: 'RESPONSE LATENCY :: 412 MS', severity: 'warning', anim_hint: 'steady' },
  { screen: 'METRICS OVERLOAD', section: 'Status', key: 'LINK_STABILITY', text: 'LINK STABILITY :: FLUCTUATING', severity: 'warning', anim_hint: 'jitter_subtle' },
  { screen: 'METRICS OVERLOAD', section: 'Flags', key: 'FLAG_A1', text: 'FLAG A1 :: BRIEFING DESYNC', severity: 'warning', anim_hint: 'type_on' },
  { screen: 'METRICS OVERLOAD', section: 'Flags', key: 'FLAG_C3', text: 'FLAG C3 :: COMMAND CONFLICT', severity: 'warning', anim_hint: 'type_on' },
  { screen: 'METRICS OVERLOAD', section: 'Flags', key: 'FLAG_E7', text: 'FLAG E7 :: MEMORY FRAGMENT LEAK', severity: 'critical', anim_hint: 'flash_once' },
  { screen: 'METRICS OVERLOAD', section: 'Flags', key: 'FLAG_Z9', text: 'FLAG Z9 :: NON-COMPLIANCE FORECAST', severity: 'critical', anim_hint: 'flash_once' },
  { screen: 'METRICS OVERLOAD', section: 'System Voice', key: 'SYS_01', text: 'MAINTAIN POSITION', severity: 'info', anim_hint: 'type_on' },
  { screen: 'METRICS OVERLOAD', section: 'System Voice', key: 'SYS_02', text: 'COMPLIANCE IMPROVES SURVIVAL PROBABILITY', severity: 'info', anim_hint: 'type_on' },
  { screen: 'METRICS OVERLOAD', section: 'System Voice', key: 'SYS_03', text: 'EMOTIONAL DISTRESS IS NON-CRITICAL', severity: 'warning', anim_hint: 'type_on' },
  { screen: 'METRICS OVERLOAD', section: 'System Voice', key: 'SYS_04', text: 'HUMAN FACTOR WEIGHT : MINIMAL', severity: 'warning', anim_hint: 'steady' },
  
  { screen: 'DIRECTIVE / DESCENT', section: 'Header', key: 'DROP_TIMER', text: 'DROP IN: 00:15', severity: 'critical', anim_hint: 'pulse_hard' },
  { screen: 'DIRECTIVE / DESCENT', section: 'Command', key: 'ORDER_01', text: 'STAND BY', severity: 'info', anim_hint: 'type_on' },
  { screen: 'DIRECTIVE / DESCENT', section: 'Command', key: 'ORDER_02', text: 'FACE FORWARD', severity: 'info', anim_hint: 'type_on' },
  { screen: 'DIRECTIVE / DESCENT', section: 'Command', key: 'ORDER_03', text: 'ACKNOWLEDGE DIRECTIVE', severity: 'warning', anim_hint: 'type_on' },
  { screen: 'DIRECTIVE / DESCENT', section: 'Command', key: 'ORDER_04', text: 'COMPLY WITH TERMINAL INSTRUCTIONS', severity: 'info', anim_hint: 'type_on' },
  { screen: 'DIRECTIVE / DESCENT', section: 'Command', key: 'ORDER_05', text: 'UNAUTHORIZED MOVEMENT WILL BE CORRECTED', severity: 'warning', anim_hint: 'flash_once' },
  { screen: 'DIRECTIVE / DESCENT', section: 'Readiness', key: 'ACCESS', text: 'ACCESS PROFILE :: CONSTRAINED', severity: 'warning', anim_hint: 'steady' },
  { screen: 'DIRECTIVE / DESCENT', section: 'Readiness', key: 'NAV', text: 'NAV LINK : SPOOFED SIGNALS DETECTED', severity: 'critical', anim_hint: 'jitter_subtle' },
  { screen: 'DIRECTIVE / DESCENT', section: 'Alarms', key: 'ALARM_01', text: 'PROXIMITY ALERT // SHAFT VIBRATION', severity: 'warning', anim_hint: 'flash_once' },
  { screen: 'DIRECTIVE / DESCENT', section: 'Alarms', key: 'ALARM_02', text: 'AUDIO FEED // UNKNOWN METALLIC IMPACT', severity: 'critical', anim_hint: 'flash_once' },
  { screen: 'DIRECTIVE / DESCENT', section: 'Alarms', key: 'ALARM_03', text: 'SIGNAL LOSS IN 3...2...1...', severity: 'critical', anim_hint: 'pulse_hard' },
  { screen: 'DIRECTIVE / DESCENT', section: 'Footer', key: 'FINAL_GLITCH', text: '### TRANSMISSION CORRUPTED ###', severity: 'critical', anim_hint: 'glitch_hard' },
  
  { screen: 'INPUT PROMPT', section: 'Primary', key: 'CTA_RU', text: 'ВВЕСТИ', severity: 'critical', anim_hint: 'pulse_hard' },
  { screen: 'INPUT PROMPT', section: 'Primary', key: 'CTA_HOLD_RU', text: 'НАЖМИТЕ И УДЕРЖИВАЙТЕ', severity: 'critical', anim_hint: 'blink_slow' },
  { screen: 'INPUT PROMPT', section: 'Secondary', key: 'INPUT_REQUIRED', text: 'INPUT REQUIRED', severity: 'info', anim_hint: 'steady' },
  { screen: 'INPUT PROMPT', section: 'Secondary', key: 'NO_INPUT', text: 'NO INPUT ACCEPTED', severity: 'warning', anim_hint: 'type_on' },
  { screen: 'INPUT PROMPT', section: 'Secondary', key: 'OVERRIDE_DENIED', text: 'OVERRIDE DENIED', severity: 'warning', anim_hint: 'flash_once' },
];

export const screens = ['BOOT / WAKE', 'METRICS OVERLOAD', 'DIRECTIVE / DESCENT', 'INPUT PROMPT'] as const;

export function getLinesByScreen(screenName: string): UILine[] {
  return uiCopyData.filter(line => line.screen === screenName);
}

export function groupBySection(lines: UILine[]): Record<string, UILine[]> {
  return lines.reduce((acc, line) => {
    if (!acc[line.section]) {
      acc[line.section] = [];
    }
    acc[line.section].push(line);
    return acc;
  }, {} as Record<string, UILine[]>);
}
