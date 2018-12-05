import 'source-map-support/register';
import init from './server';
import logger from './util/log';

init({ logger })
  .then((server: any) => {
    logger.info(`Starting server...`);
    return server.start().then(() => {
      logger.info(`Server started in ${server.info.uri}`);
    });
  })
  .catch((err: any) => {
    logger.error(err);
    process.exit(1);
  });
