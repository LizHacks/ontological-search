import { Operations } from '../openapi';
import { State } from '../server';
import healthCheck from './health-check';
import translateStringToOntologyID from './translate-string-to-ontology-id';

const operations: Operations<State> = {
  healthCheck,
  translateStringToOntologyID,
};

export default operations;
