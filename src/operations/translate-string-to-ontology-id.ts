import { Response, ok, TranslateStringToOntologyIDCmd, TranslateStringToOntologyIDResponse } from '../openapi';
import { State } from '../server';
import fetch from 'node-fetch';

export default async function handler(
  state: State,
  args: TranslateStringToOntologyIDCmd,
  _fetch = fetch,
): Response<TranslateStringToOntologyIDResponse, any> {

  const { logger } = state;
  const { text } = args;
  const search_term = text.toLowerCase();

  logger.debug('Sending request to graph database');

  const query = `
  LET search_term = "${search_term}"
  FOR doc IN terms
    FILTER POSITION(PUSH(doc.synonyms, doc.title), search_term)
    FOR related_doc IN 0..1
        ANY (doc._id)
        GRAPH "on"
    RETURN related_doc
    `;

  return _fetch('http://arango:8529/_db/ontologies_1/_api/cursor', {
    method: 'post',
    body: JSON.stringify({ query, count: true }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res: any) => res.json())
    .then((res: any) => res.result.map((record: any) => record.id))
    .then((response: any) => {
      logger.debug(response);
      return ok(response);
    });
}
