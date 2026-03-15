import { SomaSignal } from "../../shared-types/src/domain";

export interface SomaSignalEnvelope {
  sessionId: string;
  collectedAt: string;
  signals: SomaSignal[];
}

export interface SomaIngestionPort {
  ingest(envelope: SomaSignalEnvelope): Promise<void>;
}
