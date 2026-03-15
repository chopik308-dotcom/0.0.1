export type UUID = string;

export interface NoteSource {
  id: UUID;
  title: string;
  content: string;
  importedAt: string;
  sourceType: "markdown" | "text" | "chat";
}

export interface SemanticUnit {
  id: UUID;
  term: string;
  noteIds: UUID[];
}

export interface Container extends SemanticUnit {
  childUnitIds: UUID[];
}

export interface DeterministicLink {
  id: UUID;
  sourceUnitId: UUID;
  targetUnitId: UUID;
  reason: string;
}

export interface HypothesisLink {
  id: UUID;
  sourceUnitId: UUID;
  targetUnitId: UUID;
  score: number;
  requiresConfirmation: true;
}

export interface TensionMarker {
  id: UUID;
  unitId: UUID;
  description: string;
  severity: "low" | "medium" | "high";
}

export interface SessionAnchor {
  id: UUID;
  label: string;
  kind:
    | "word-of-day"
    | "note-of-day"
    | "symptom-of-day"
    | "conflict-of-day"
    | "unresolved-phrase";
}

export interface MapRevision {
  id: UUID;
  createdAt: string;
  importedNotesCount: number;
  newNodes: number;
  newLinks: number;
  newTensions: number;
}

export interface ConsolidationEvent {
  id: UUID;
  createdAt: string;
  revisionId: UUID;
  summary: string;
}

export interface TimelineEvent {
  id: UUID;
  timestamp: string;
  revisionId: UUID;
  eventType: "import" | "consolidation" | "clarification";
}

export interface ThesaurusEntry {
  id: UUID;
  lemma: string;
  relatedTerms: string[];
}

export interface SomaSignal {
  id: UUID;
  label: string;
  intensity: number;
}

export interface CognitionSignal {
  id: UUID;
  label: string;
  confidence: number;
}
