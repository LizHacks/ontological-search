import * as config from 'config';
import { Server } from 'hapi';
import irisSetup, { Iris } from '@repositive/iris';
import { Logger } from './util/log';
import { Option, Some, None } from 'funfix';

import routes from './openapi';
import operations from './operations';

// tslint:disable-next-line
const pack = require('../package.json');

export type CurrentEnvironment = 'dev' | 'prod';

export interface State {
  logger: Logger;
  currentEnv: CurrentEnvironment;
  getIris: () => Option<Iris>;
}

export default async function init({
  logger,
  _irisSetup = irisSetup,
  _config = config,
  _pack = pack,
}: {
    logger: Logger,
    _irisSetup?: any,
    _config?: typeof config,
    _pack?: { name: string, version: string },
  }) {

  // get current environment (NB: default is 'dev')
  const currentEnv: CurrentEnvironment = _config.get<any>('currentEnvironment');
  if (!['dev', 'prod'].includes(currentEnv)) {
    throw new Error(`Current Environment variable ${currentEnv} is not an expected value`);
  }

  const server = new Server({
    port: config.get('port'),
    routes: {
      cors: true,
    },
  });

  const _iris: Option<Iris> = None;
  function getIris() {
    return _iris;
  }

  const stateArgs: State = {
    logger,
    currentEnv,
    getIris,
  };

  // Register the openapi routes with State and the implemented operations
  await server.register({ plugin: routes<State>(stateArgs, operations) });

  return server;
}
