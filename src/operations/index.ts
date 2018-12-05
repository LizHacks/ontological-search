import { Operations } from '../openapi';
import { State } from '../server';
import translateStringToOntologyID from './translate-string-to-ontology-id';

const operations: Operations<State> = {
  translateStringToOntologyID,
};

export default operations;
