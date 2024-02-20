/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

module.exports = function topologicalSort(start, depsFileInfo_) {
  let depsFileInfo = depsFileInfo_;

  const outboundDepsMap = new Map();
  for (const { inbound, outbound } of depsFileInfo) {
    if (outboundDepsMap.has(outbound)) {
      const inbounds = outboundDepsMap.get(outbound);
      outboundDepsMap.set(outbound, [...inbounds, inbound]);
    } else {
      outboundDepsMap.set(outbound, [inbound]);
    }
  }

  // Filter out deps which can't be reached from `start`
  const filterDepsSet = new Set();
  let depsToProcess = [start];
  while (depsToProcess.length > 0) {
    const nextDep = depsToProcess.shift();
    if (!filterDepsSet.has(nextDep)) {
      filterDepsSet.add(nextDep);
      if (outboundDepsMap.has(nextDep)) {
        depsToProcess = [...depsToProcess, ...outboundDepsMap.get(nextDep)];
      }
    }
  }

  depsFileInfo = depsFileInfo.filter(({ outbound }) =>
    filterDepsSet.has(outbound)
  );

  // Construct inbound depsMap
  const inboundDepsMap = new Map([[start, []]]);
  for (const { inbound, outbound } of depsFileInfo) {
    if (inboundDepsMap.has(inbound)) {
      const outbounds = inboundDepsMap.get(inbound);
      inboundDepsMap.set(inbound, [...outbounds, outbound]);
    } else {
      inboundDepsMap.set(inbound, [outbound]);
    }
  }

  const indegrees = new Map(); // Map<string, number>
  for (const { inbound, outbound } of depsFileInfo) {
    indegrees.set(inbound, 0);
    indegrees.set(outbound, 0);
  }

  for (const outbounds of inboundDepsMap.values()) {
    for (const outbound of outbounds) {
      indegrees.set(outbound, indegrees.get(outbound) + 1);
    }
  }

  const filesWithoutInternalDeps = [];
  for (const inbound of inboundDepsMap.keys()) {
    if (indegrees.get(inbound) === 0) {
      filesWithoutInternalDeps.push(inbound);
    }
  }

  const orderedFiles = [];
  while (filesWithoutInternalDeps.length > 0) {
    const nextFile = filesWithoutInternalDeps.shift();
    orderedFiles.push(nextFile);

    for (const outbound of inboundDepsMap.get(nextFile)) {
      const nextInDegree = indegrees.get(outbound) - 1;
      indegrees.set(outbound, nextInDegree);
      if (nextInDegree === 0) {
        filesWithoutInternalDeps.push(outbound);
      }
    }
  }

  return orderedFiles;
};
