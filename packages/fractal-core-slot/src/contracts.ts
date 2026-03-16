export interface FractalCoreAdapter {
  name: string;
  version: string;
  enrichSemanticMap(inputRevisionId: string): Promise<string>;
}

export interface FractalIntegrationPlan {
  status: "deferred" | "experimental" | "active";
  notes: string;
}
