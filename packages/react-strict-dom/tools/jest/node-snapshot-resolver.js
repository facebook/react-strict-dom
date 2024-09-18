/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');

/**
 * Note that jest has a bug with custom snapshot resolvers that means
 * "resolveTestPath" is incorrectly used to resolve test paths in the other
 * jest "projects" that aren't using customer resolvers. Therefore, these
 * custom resolvers are implemented in a way that allows them to function
 * like the default resolver when resolving test paths.
 */

module.exports = {
  resolveSnapshotPath: (testPath) => {
    const snapshotPath = path.join(
      path.join(path.dirname(testPath), '__snapshots__'),
      path.basename(testPath) + '.snap-node'
    );
    return snapshotPath;
  },

  resolveTestPath: (snapshotPath) => {
    const ext = path.extname(snapshotPath);
    const testPath = path.join(
      path.dirname(snapshotPath),
      '..',
      path.basename(snapshotPath, ext)
    );
    return testPath;
  },

  testPathForConsistencyCheck: path.join(
    'consistency_check',
    '__tests__',
    'example.test.js'
  )
};
