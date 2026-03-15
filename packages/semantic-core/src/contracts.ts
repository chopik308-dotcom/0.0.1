import {
  DeterministicLink,
  HypothesisLink,
  NoteSource,
  SemanticUnit,
  TensionMarker,
} from "../../shared-types/src/domain";

export interface DeterministicPassResult {
  units: SemanticUnit[];
  links: DeterministicLink[];
  tensions: TensionMarker[];
}

export interface ProbabilisticPassResult {
  hypotheses: HypothesisLink[];
}

export interface SemanticPipeline {
  runDeterministic(notes: NoteSource[]): DeterministicPassResult;
  runProbabilistic(notes: NoteSource[]): ProbabilisticPassResult;
}
