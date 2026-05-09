/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import { css, html } from 'react-strict-dom';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import RootLayout from './RootLayout';
import TimingDemo from './demos/TimingDemo';
import SpringDemo from './demos/SpringDemo';
import ParallelDemo from './demos/ParallelDemo';
import SequenceDemo from './demos/SequenceDemo';
import DelayDemo from './demos/DelayDemo';
import InterpolationDemo from './demos/InterpolationDemo';
import TransformDemo from './demos/TransformDemo';
import CombinedTransformDemo from './demos/CombinedTransformDemo';
import InterruptibleDemo from './demos/InterruptibleDemo';

const demos = [
  {
    name: 'Timing',
    description: 'Animate opacity with duration-based easing',
    component: TimingDemo,
    color: '#3B82F6'
  },
  {
    name: 'Spring',
    description: 'Physics-based spring animation',
    component: SpringDemo,
    color: '#8B5CF6'
  },
  {
    name: 'Parallel',
    description: 'Multiple animations running together',
    component: ParallelDemo,
    color: '#EF4444'
  },
  {
    name: 'Sequence',
    description: 'Chained animations in order',
    component: SequenceDemo,
    color: '#14B8A6'
  },
  {
    name: 'Delay',
    description: 'Staggered animations with delays',
    component: DelayDemo,
    color: '#F59E0B'
  },
  {
    name: 'Interpolation',
    description: 'Map values to rotation and scale',
    component: InterpolationDemo,
    color: '#EC4899'
  },
  {
    name: 'Transform',
    description: 'Rotation transform animation',
    component: TransformDemo,
    color: '#F97316'
  },
  {
    name: 'Combined',
    description: 'Multiple transforms animated together',
    component: CombinedTransformDemo,
    color: '#10B981'
  },
  {
    name: 'Interruptible',
    description: 'Stop and restart animations mid-flight',
    component: InterruptibleDemo,
    color: '#A855F7'
  }
];

console.log(RootLayout);

export default function App() {
  return (
    <React.StrictMode>
      <SafeAreaProvider>
        <html.div data-layoutconformance="strict" style={styles.root}>
          <RootLayout>
            <html.div style={styles.container}>
              <html.div style={styles.header}>
                <html.h1 style={styles.title}>React Strict Animated</html.h1>
                <html.p style={styles.subtitle}>
                  A declarative animation library for react-strict-dom
                </html.p>
              </html.div>
              <html.div style={styles.demoGrid}>
                {demos.map((demo) => (
                  <html.div key={demo.name} style={styles.demoCard}>
                    <html.div style={styles.cardHeader}>
                      <html.div
                        style={[
                          styles.colorDot,
                          { backgroundColor: demo.color }
                        ]}
                      />
                      <html.h2 style={styles.demoTitle}>{demo.name}</html.h2>
                    </html.div>
                    <html.p style={styles.demoDescription}>
                      {demo.description}
                    </html.p>
                    <html.div style={styles.demoContent}>
                      <demo.component />
                    </html.div>
                  </html.div>
                ))}
              </html.div>
            </html.div>
          </RootLayout>
        </html.div>
      </SafeAreaProvider>
    </React.StrictMode>
  );
}

const styles = css.create({
  root: {
    backgroundColor: '#1a1a2e'
  },
  container: {
    minHeight: '100vh',
    padding: 32
  },
  header: {
    textAlign: 'center',
    marginBottom: 48,
    paddingTop: 24
  },
  title: {
    fontSize: 42,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 12,
    letterSpacing: -1
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '400'
  },
  demoGrid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 24,
    maxWidth: 1400,
    marginInline: 'auto'
  },
  demoCard: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    padding: 24,
    width: 320,
    minHeight: 280,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(255, 255, 255, 0.1)'
  },
  cardHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8
  },
  colorDot: {
    width: 10,
    height: 10,
    borderRadius: 5
  },
  demoTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff'
  },
  demoDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.5)',
    marginBottom: 24,
    lineHeight: 1.4
  },
  demoContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingTop: 16,
    rowGap: 16
  }
});
