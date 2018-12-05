import { Logger } from 'pino';
import * as R from 'ramda';
import {
  TranslateStringToOntologyIDCmd, TranslateStringToOntologyIDResponse,
} from './definitions';
import { Plugin, ServerRoute, Request, ResponseToolkit } from 'hapi';
import { Status, Headers } from './status';

export * from './definitions';
export * from './status';

export type Response<T, H extends Headers> = Promise<Status<T, H>>;
export type APIResponse<N extends number, P, H extends Headers> = [N, P, H];

export type Operation<T> = (state: T, params: any) => Response<any, any>;

export interface Operations<T> {
  healthCheck: (state: T, args: any) => Response<any, any>;
  // tslint:disable-next-line:max-line-length
  translateStringToOntologyID: (state: T, args: TranslateStringToOntologyIDCmd) => Response<TranslateStringToOntologyIDResponse, any>;
}

const reply = R.curry((state: any, operation: Operation<any>, request: Request, responseToolkit: ResponseToolkit) => {
  const args = request.method === 'get' ? request.query : request.payload;
  // TODO: Validate args

  return operation(state, args)
    .then((result) => {
      if (Array.isArray(result) && result.length === 3) {
        const [body, code, headers] = result;
        const withCode = responseToolkit.response(body).code(code);
        return R.toPairs(headers as {[k: string]: string}).reduce((acc, [k, v]) => acc.header(k, v), withCode);
      } else {
        return responseToolkit.response(result);
      }
    })
    .catch((error) => {
      console.error(error);
      return error;
    });

});

function genRoutes<T>(state: T, operations: Operations<T>): ServerRoute[] {
  const replyState = reply(state);
  return [
    {
      method: 'get',
      path: `/ontology_service/health`,
      handler: replyState(operations.healthCheck),
    },
    {
      method: 'post',
      path: '/ontology_service/translate-string-to-ontology-id',
      handler: replyState(operations.translateStringToOntologyID),
    },
  ];
}

export default function setupPlugin<T>(state: T, operations: Operations<T>): Plugin<any> {
  return {
    name: 'OpenAPI',
    async register(server) {
      server.route(genRoutes(state, operations));
    },
  } as Plugin<any>;
}
