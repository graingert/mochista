import path from 'path';
import log from '.../utils/logger';

export default function resetRequireCache(filesToDelete, { root = process.cwd() } = {}) {
  filesToDelete = filesToDelete.map(f => path.resolve(root, f));
  log.verbose(`Resetting ${filesToDelete.length} files`);

  for (const cacheFile in require.cache) {
    if (filesToDelete.includes(cacheFile)) {
      log.silly('', cacheFile);
      delete require.cache[cacheFile];
    }
  }
}

export function resetEntireRequireCache() {
  log.warn('Resetting entire require cache');

  for (const cacheFile in require.cache) {
    // if (require.cache.hasOwnProperty(cacheFile) && !cacheFile.includes('node_modules')) {
    if (require.cache.hasOwnProperty(cacheFile)) {
      log.verbose('', cacheFile);
      delete require.cache[cacheFile];
    }
  }
}
