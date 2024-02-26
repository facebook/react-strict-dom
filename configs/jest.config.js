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
    '**/packages/**/src/**/*.{js,jsx}',
    '!**/__tests__/**',
    '!**/node_modules/**',
    '!**/tests/**',
    '!**/types/**'
  ],

  /*
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 85,
      lines: 90,
      statements: 90
    }
  },
  */

  projects: [
    {
      displayName: 'react-strict-dom (DOM)',
      fakeTimers: {
        enableGlobally: true
      },
      moduleNameMapper: {
        '^react-strict-dom$': '<rootDir>/packages/react-strict-dom/src/dom'
      },
      rootDir: process.cwd(),
      setupFiles: ['<rootDir>/configs/jest-setup.js'],
      snapshotFormat: {
        printBasicPrototype: false
      },
      snapshotResolver: '<rootDir>/configs/jest-dom-resolver.js',
      testEnvironment: 'jsdom',
      testMatch: [
        '<rootDir>/packages/react-strict-dom/tests/*-test.js',
        '<rootDir>/packages/react-strict-dom/tests/*-test.dom.js'
      ],
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
        '^react-strict-dom$': '<rootDir>/packages/react-strict-dom/src/native'
      },
      rootDir: process.cwd(),
      setupFiles: ['<rootDir>/configs/jest-setup.js'],
      snapshotFormat: {
        printBasicPrototype: false
      },
      snapshotResolver: '<rootDir>/configs/jest-native-resolver.js',
      // snapshotSerializers: ['<rootDir>/configs/jest-native-serializer.js'],
      testEnvironment: 'node',
      testMatch: [
        '<rootDir>/packages/react-strict-dom/tests/*-test.js',
        '<rootDir>/packages/react-strict-dom/tests/*-test.native.js'
      ],
      testPathIgnorePatterns: [
        '<rootDir>/packages/react-strict-dom/tests/babel-test.js'
      ],
      transform: {
        '\\.[jt]sx?$': ['babel-jest', babelConfig()]
      }
    },
    {
      displayName: 'eslint-plugin-react-strict-dom',
      fakeTimers: {
        enableGlobally: true
      },
      moduleNameMapper: {
        '^react-strict-dom$': '<rootDir>/packages/react-strict-dom/src/native'
      },
      rootDir: process.cwd(),
      setupFiles: ['<rootDir>/configs/jest-setup.js'],
      snapshotFormat: {
        printBasicPrototype: false
      },
      testEnvironment: 'node',
      testMatch: ['<rootDir>/packages/eslint-plugin/tests/*-test.js'],
      transform: {
        '\\.[jt]sx?$': ['babel-jest', babelConfig()]
      }
    }
  ]
};
