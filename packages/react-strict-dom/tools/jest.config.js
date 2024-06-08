/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const babelConfig = require('./babel.config.js');

module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,jsx}',
    // exclude
    '!<rootDir>/src/**/__tests__/**',
    '!<rootDir>/src/native/stylex/typed-om/**',
    '!<rootDir>/src/shared/logUtils.js',
    '!<rootDir>/src/types/**'
  ],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 90,
      lines: 90,
      statements: 90
    }
  },
  projects: [
    {
      displayName: 'internals',
      fakeTimers: {
        enableGlobally: true
      },
      rootDir: process.cwd(),
      setupFiles: ['<rootDir>/tools/jest/setup.js'],
      snapshotFormat: {
        printBasicPrototype: false
      },
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/**/__tests__/*-test.js'],
      transform: {
        '\\.[jt]sx?$': ['babel-jest', babelConfig()]
      }
    },
    {
      displayName: 'react-strict-dom (DOM)',
      fakeTimers: {
        enableGlobally: true
      },
      moduleNameMapper: {
        '^react-strict-dom$': '<rootDir>/src/dom'
      },
      rootDir: process.cwd(),
      setupFiles: ['<rootDir>/tools/jest/setup.js'],
      snapshotFormat: {
        printBasicPrototype: false
      },
      snapshotResolver: '<rootDir>/tools/jest/dom-snapshot-resolver.js',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/tests/*-test.js', '<rootDir>/tests/*-test.dom.js'],
      transform: {
        '\\.[jt]sx?$': ['babel-jest', babelConfig(null, { target: 'dom' })]
      }
    },
    {
      displayName: 'react-strict-dom (Native)',
      fakeTimers: {
        enableGlobally: true
      },
      moduleNameMapper: {
        '^react-strict-dom$': '<rootDir>/src/native'
      },
      rootDir: process.cwd(),
      setupFiles: ['<rootDir>/tools/jest/setup.js'],
      snapshotFormat: {
        printBasicPrototype: false
      },
      snapshotResolver: '<rootDir>/tools/jest/native-snapshot-resolver.js',
      testEnvironment: 'node',
      testMatch: [
        '<rootDir>/tests/*-test.js',
        '<rootDir>/tests/*-test.native.js'
      ],
      testPathIgnorePatterns: ['<rootDir>/tests/babel-test.js'],
      transform: {
        '\\.[jt]sx?$': ['babel-jest', babelConfig()]
      }
    }
  ]
};
