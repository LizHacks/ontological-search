export interface TranslateStringToOntologyIDCmd {
  text: string;
}

export interface TranslateStringToOntologyIDResponse {
  term_ids: string[];
  parent_term_ids: string[];
  child_term_ids: string[];
}
