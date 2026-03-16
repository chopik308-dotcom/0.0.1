import { ThesaurusEntry } from "../../shared-types/src/domain";

export interface ThesaurusLookupRequest {
  term: string;
  locale?: string;
}

export interface ThesaurusLookupResponse {
  entries: ThesaurusEntry[];
  source: "stub" | "local" | "remote";
}

export interface ThesaurusProvider {
  lookup(request: ThesaurusLookupRequest): Promise<ThesaurusLookupResponse>;
}
