import debugLogger from 'debug-logger';
import config from '.../config';
import pkg from '.../package.json';

debugLogger.inspectOptions = {
  colors: config.noColors ? false : config.colors,
};

debugLogger.levels.silly = {
  color: debugLogger.colors.magenta,
  prefix: '',
  namespaceSuffix: ':silly'
};
debugLogger.levels.verbose = {
  color: debugLogger.colors.magenta,
  prefix: '',
  namespaceSuffix: ':verb '
};

debugLogger.levels.inf = debugLogger.levels.info;
debugLogger.levels.wrn = debugLogger.levels.warn;
debugLogger.levels.sil = debugLogger.levels.silly;
debugLogger.levels.verb = debugLogger.levels.verbose;
debugLogger.levels.vrb = debugLogger.levels.verbose;
debugLogger.levels.err = debugLogger.levels.error;

export function createLogger( namespace ) {
  // debugLogger.debug.enable( namespace + '*' );
  debugLogger.debug.enable( namespace + ':log' );
  debugLogger.debug.enable( namespace + ':error' );
  debugLogger.debug.enable( namespace + ':warn' );
  if ( config.debug ) {
    debugLogger.debug.enable( namespace + ':debug' );
  }
  if ( config.verbose ) {
    debugLogger.debug.enable( namespace + '*' );
  }

  const logger = debugLogger( namespace );
  const log = logger.log;
  log.logger = logger;
  Object.assign( log, logger );
  return log;
}

export default createLogger( pkg.name );