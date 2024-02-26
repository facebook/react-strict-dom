/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import * as React from 'react';
import { ScrollView } from 'react-native';
import { css, html } from 'react-strict-dom';
import { tokens } from './tokens.stylex';

type ExampleBlockProps = $ReadOnly<{
  title: string,
  children: React.Node
}>;

const egStyles = css.create({
  container: { borderTopWidth: 1 },
  h1: { padding: 10, backgroundColor: '#eee' },
  content: { padding: 10 },
  div: {
    paddingBottom: 50,
    paddingTop: 50,
    backgroundColor: 'white'
  }
});

function ExampleBlock(props: ExampleBlockProps) {
  const { title, children } = props;
  return (
    <html.div style={egStyles.container}>
      <html.h1 style={egStyles.h1}>{title}</html.h1>
      <html.div style={egStyles.content}>{children}</html.div>
    </html.div>
  );
}

const BGCOLOR_INACTIVE = 'red';
const BGCOLOR_ACTIVE = 'blue';

const TRANSLATE_NONE = 'translateX(0px)';
const TRANSLATE_RIGHT = 'translateX(150px)';

const SCALE_INACTIVE = 'translateX(0px) scale(1)';
const SCALE_ACTIVE = 'translateX(150px) scale(0.25)';

const ROTATE_INACTIVE = 'rotate(0deg)';
const ROTATE_ACTIVE = 'rotate(45deg)';

const SKEW_INACTIVE = 'skewX(0deg)';
const SKEW_ACTIVE = 'skewX(35deg)';

type ClickEventData = {
  altKey: boolean,
  button: ?number,
  ctrlKey: boolean,
  metaKey: boolean,
  pageX: ?number,
  pageY: ?number,
  shiftKey: boolean
};

export default function App(): React.MixedElement {
  const [clickData, setClickData] = React.useState({ color: 'red', text: '' });
  const [clickEventData, setClickEventData] = React.useState<ClickEventData>({
    altKey: false,
    ctrlKey: false,
    metaKey: false,
    shiftKey: false,
    button: null,
    pageX: null,
    pageY: null
  });
  const [imageLoadText, setImageLoadText] = React.useState('');
  const [imageErrorText, setImageErrorText] = React.useState('');
  const [backgroundColor, setBackgroundColor] =
    React.useState(BGCOLOR_INACTIVE);
  const [opacity, setOpacity] = React.useState(1);
  const [transform, setTransform] = React.useState(TRANSLATE_NONE);
  const [scale, setScale] = React.useState(SCALE_INACTIVE);
  const [toggleTransform, setToggleTransform] = React.useState(false);
  const [rotate, setRotate] = React.useState(ROTATE_INACTIVE);
  const [skew, setSkew] = React.useState(SKEW_INACTIVE);
  const [fadeUpActive, setFadeUpActive] = React.useState(true);
  const [animate, setAnimate] = React.useState(false);

  return (
    <ScrollView>
      <html.div style={egStyles.div}>
        <ExampleBlock title="HTML elements">
          <html.div data-testid="testid" role="none">
            div
          </html.div>
          <html.span suppressHydrationWarning={true}>span</html.span>
          <html.p>paragraph</html.p>

          <html.div />

          <html.span>
            <html.a href="https://google.com">anchor</html.a>,
            <html.code>code</html.code>,<html.em>em</html.em>,
            <html.strong>strong</html.strong>,
            <html.span>
              H<html.sub>2</html.sub>0
            </html.span>
            ,
            <html.span>
              E=mc<html.sup>2</html.sup>
            </html.span>
          </html.span>

          <html.div />

          <html.pre>pre</html.pre>

          <html.div />

          <html.h1>h1</html.h1>
          <html.h2>h2</html.h2>
          <html.h3>h3</html.h3>
          <html.h4>h4</html.h4>
          <html.h5>h5</html.h5>
          <html.h6>h6</html.h6>

          <html.span>
            line <html.br /> break
          </html.span>
          <html.hr />

          {/* text inheritance and text children */}
          <html.div>Text inside div (kind of) works</html.div>
          <html.div style={styles.inheritedText}>
            <html.div>
              <html.span>Text style inheritance works</html.span>
            </html.div>
          </html.div>

          <html.img
            onLoad={(e) => {
              console.log(e.type, e);
            }}
            width={150}
            height={150}
            src="http://placehold.jp/150x150.png"
            style={styles.objContain}
          />

          <html.div />
          <html.label for="id">label</html.label>
          <html.div />
          <html.button>button</html.button>
          <html.div />
          {/*<html.input placeholder="input type:date" type="date" />*/}
          <html.div />
          <html.input placeholder="input type:email" type="email" />
          <html.div />
          <html.input placeholder="input type:number" type="number" />
          <html.div />
          <html.input placeholder="input type:search" type="search" />
          <html.div />
          <html.input placeholder="input type:tel" type="tel" />
          <html.div />
          <html.input placeholder="input type:text" type="text" />
          <html.div />
          <html.input
            placeholder="input inputMode:numeric"
            inputMode="numeric"
          />
          <html.div />
          <html.input placeholder="input enterKeyHint:go" enterKeyHint="go" />
          <html.div />
          <html.select>
            <html.optgroup label="optgroup">
              <html.option label="option 1" />
              <html.option label="option 2" />
              <html.option label="option 3" />
            </html.optgroup>
          </html.select>
          <html.div />
          <html.textarea placeholder="textarea" />
        </ExampleBlock>

        {/* variables & themes */}
        <ExampleBlock title="Variables & Theming">
          <html.p style={styles.inheritedText}>Global variables</html.p>
          <html.div style={styles.square} />

          <html.p style={[themedTokens, styles.inheritedText]}>
            Direct theming
          </html.p>
          <html.div style={[themedTokens, styles.square]} />

          <html.div style={themedTokens}>
            <html.p style={styles.inheritedText}>Inherit theming</html.p>
            <html.div style={styles.square} />
          </html.div>

          <html.div style={themedTokens}>
            <html.div style={themedTokensAlt}>
              <html.p style={styles.inheritedText}>Nested theming</html.p>
              <html.div style={styles.square} />
            </html.div>
          </html.div>
        </ExampleBlock>

        {/* block layout emulation */}
        <ExampleBlock title="Layout">
          <html.p>display:block emulation</html.p>
          <html.div>
            <html.div style={styles.square} />
            <html.div style={[styles.square, { backgroundColor: 'blue' }]} />
          </html.div>

          {/* flex row undoes block layout emulation and correct flex child layout */}
          <html.p>display:flex defaults and children</html.p>
          <html.div style={styles.row}>
            <html.div style={[styles.square, styles.w1000]} />
            <html.div style={[styles.square, styles.blueSquare]}>
              <html.div style={styles.whiteBox}>
                <html.p>Back to block</html.p>
                <html.div style={styles.square} />
                <html.div style={[styles.square, styles.bgGreen]} />
              </html.div>
            </html.div>
          </html.div>

          <html.p>display:block resets flex properties</html.p>
          {/* display block undoes row layout and emulates block again */}
          <html.div style={[styles.row, styles.blockW300]}>
            <html.div style={styles.square} />
            <html.div style={[styles.square, styles.bgBlue]} />
          </html.div>

          {/* block and inline layout emulation */}
          <html.p>
            display:inline within display:block is{' '}
            <html.strong>not</html.strong> emulated
          </html.p>
          <html.div>
            <html.div style={styles.redBox}>
              <html.div style={styles.greenBox} />
              <html.span style={styles.bgYellow}>one</html.span>
              <html.span style={styles.bgYellow}>two</html.span>
            </html.div>
            <html.span style={styles.bgYellow}>one</html.span>
            <html.span style={styles.bgYellow}>two</html.span>
            <html.div style={styles.redBox} />
          </html.div>
        </ExampleBlock>

        {/* positioning (static by default) */}
        <ExampleBlock title="Position">
          <html.div style={[styles.p50, styles.relative]}>
            <html.div style={styles.p50}>
              <html.div style={[styles.square, styles.absTopLeft]} />
            </html.div>
            <html.div style={[styles.relative, styles.p50]}>
              <html.div style={[styles.square, styles.absTopLeft]} />
            </html.div>
          </html.div>
        </ExampleBlock>

        {/* visibility */}
        <ExampleBlock title="Visibility">
          <html.div style={styles.flex}>
            <html.div style={[styles.square, styles.visibilityCollapse]} />
            <html.div style={[styles.square, styles.visibilityHidden]} />
            <html.div style={[styles.square, styles.visibilityVisible]} />
          </html.div>
        </ExampleBlock>

        {/* event emulation */}
        <ExampleBlock title="Events">
          <html.input
            onChange={(e) => {
              console.log(e.type, e.target.value);
            }}
            onKeyDown={(e) => {
              console.log(e.type, e.key);
            }}
            onInput={(e) => {
              console.log(e.type, e.target.value);
            }}
          />
          <html.textarea
            onChange={(e) => {
              console.log(e.type, e.target.value);
            }}
            onKeyDown={(e) => {
              console.log(e.type, e.key);
            }}
            onInput={(e) => {
              console.log(e.type, e.target.value);
            }}
          />
          <html.div
            onClick={(e) => {
              setClickData((data) => ({
                color: data.color === 'red' ? 'blue' : 'red',
                text: 'click'
              }));
              setClickEventData({
                altKey: e.altKey,
                button: e.button,
                ctrlKey: e.ctrlKey,
                metaKey: e.metaKey,
                pageX: e.pageX,
                pageY: e.pageY,
                shiftKey: e.shiftKey
              });
            }}
            style={[styles.h100, styles.dynamicBg(clickData.color)]}
          >
            <html.span style={styles.bgWhite}>{clickData.text}</html.span>
            <html.div style={styles.flex}>
              <html.div style={styles.flexGrow}>
                <html.div>
                  <html.span>
                    {clickEventData.altKey ? '✅' : '🚫'} altKey
                  </html.span>
                </html.div>
                <html.div>
                  <html.span>
                    {clickEventData.ctrlKey ? '✅' : '🚫'} ctrlKey
                  </html.span>
                </html.div>
                <html.div>
                  <html.span>
                    {clickEventData.metaKey ? '✅' : '🚫'} metaKey
                  </html.span>
                </html.div>
                <html.div>
                  <html.span>
                    {clickEventData.shiftKey ? '✅' : '🚫'} shiftKey
                  </html.span>
                </html.div>
              </html.div>
              <html.div style={styles.flexGrow}>
                <html.div>
                  <html.span>button: {clickEventData.button}</html.span>
                </html.div>
                <html.div>
                  <html.span>pageX: {clickEventData.pageX}</html.span>
                </html.div>
                <html.div>
                  <html.span>pageY: {clickEventData.pageY}</html.span>
                </html.div>
              </html.div>
            </html.div>
          </html.div>

          <html.img
            onLoad={(e) => {
              setImageLoadText(`${e.type}: loaded`);
            }}
            width={150}
            height={150}
            src="http://placehold.jp/150x150.png"
            style={styles.objContain}
          />
          <html.span>{imageLoadText}</html.span>
          <html.img
            onError={(e) => {
              setImageErrorText(`${e.type}: errored`);
            }}
            width={150}
            height={150}
            src="http://error"
            style={styles.objContain}
          />
          <html.span>{imageErrorText}</html.span>
        </ExampleBlock>

        {/* CSS transitions shim */}
        <ExampleBlock title="CSS Transitions">
          <html.p>Color</html.p>
          <html.div
            style={[
              styles.square,
              styles.transitionBackgroundColor,
              styles.dynamicBg(backgroundColor)
            ]}
          />
          <html.button
            onClick={() =>
              setBackgroundColor(
                backgroundColor === BGCOLOR_INACTIVE
                  ? BGCOLOR_ACTIVE
                  : BGCOLOR_INACTIVE
              )
            }
          >
            Toggle
          </html.button>

          <html.p>Opacity</html.p>
          <html.div
            style={[
              styles.square,
              styles.transitionOpacity,
              styles.dynamicOpacity(opacity)
            ]}
          />
          <html.button onClick={() => setOpacity(opacity === 0 ? 1 : 0)}>
            Toggle
          </html.button>

          <html.p>Translate</html.p>
          <html.div
            style={[
              styles.square,
              styles.transitionTransform,
              styles.dynamicTransform(transform)
            ]}
          />
          <html.button
            onClick={() =>
              setTransform(
                transform === TRANSLATE_NONE ? TRANSLATE_RIGHT : TRANSLATE_NONE
              )
            }
          >
            Toggle
          </html.button>

          <html.p>Translate and Scale</html.p>
          <html.div
            style={[
              styles.square,
              styles.transitionTransform,
              styles.dynamicTransform(scale)
            ]}
          />
          <html.button
            onClick={() =>
              setScale(scale === SCALE_INACTIVE ? SCALE_ACTIVE : SCALE_INACTIVE)
            }
          >
            Toggle
          </html.button>

          <html.p>Rotate</html.p>
          <html.div
            style={[
              styles.square,
              styles.transitionTransform,
              styles.dynamicTransform(rotate)
            ]}
          />
          <html.button
            onClick={() =>
              setRotate(
                rotate === ROTATE_INACTIVE ? ROTATE_ACTIVE : ROTATE_INACTIVE
              )
            }
          >
            Toggle
          </html.button>

          <html.p>Skew</html.p>
          <html.div
            style={[
              styles.square,
              styles.transitionTransform,
              styles.dynamicTransform(skew)
            ]}
          />
          <html.button
            onClick={() =>
              setSkew(skew === SKEW_INACTIVE ? SKEW_ACTIVE : SKEW_INACTIVE)
            }
          >
            Toggle
          </html.button>
          <html.p>Transform + Opacity</html.p>
          <html.div
            style={[
              styles.square,
              styles.transitionAll,
              styles.dynamicOpacity(fadeUpActive ? 1 : 0),
              styles.dynamicTransform(
                fadeUpActive ? 'translateY(0)' : 'translateY(100px)'
              )
            ]}
          />
          <html.button onClick={() => setFadeUpActive(!fadeUpActive)}>
            Toggle
          </html.button>
        </ExampleBlock>
        <ExampleBlock title="Keyframe Animations">
          <html.div
            style={[
              styles.square,
              styles.bgRed,
              animate && styles.keyframeAnimation
            ]}
          />
          <html.button onClick={() => setAnimate(!animate)}>
            {animate ? 'Reset' : 'Start'}
          </html.button>
        </ExampleBlock>
        <ExampleBlock title="Hover">
          <html.div style={styles.squareHover} />
        </ExampleBlock>
      </html.div>
    </ScrollView>
  );
}

const animateSequence = css.keyframes({
  '0%': {
    transform: 'translateX(0px) rotate(0deg)'
  },
  '50%': {
    transform: 'translateX(150px) rotate(0deg)'
  },
  '100%': {
    transform: 'translateX(150px) rotate(180deg)'
  }
});

const themedTokens = css.createTheme(tokens, {
  squareColor: 'purple',
  textColor: 'purple'
});

const themedTokensAlt = css.createTheme(tokens, {
  squareColor: 'orange',
  textColor: 'darkorange'
});

const styles = css.create({
  keyframeAnimation: {
    animationDuration: '1s',
    animationIterationCount: 1,
    animationName: animateSequence,
    animationTimingFunction: 'ease',
    transform: 'translateX(150px)'
  },
  row: {
    display: 'flex',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1
  },
  square: {
    height: 100,
    width: 100,
    backgroundColor: tokens.squareColor
  },
  squareHover: {
    height: 100,
    width: 100,
    backgroundColor: {
      default: 'red',
      ':hover': 'blue'
    }
  },
  inheritedText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: tokens.textColor
  },
  paragraph: {
    marginBlock: 24,
    fontSize: 24
  },
  transitionAll: {
    backgroundColor: 'red',
    pointerEvents: 'none',
    transitionDuration: '500ms',
    transitionProperty: 'all',
    transitionTimingFunction: 'ease'
  },
  transitionBackgroundColor: {
    backgroundColor: 'red',
    transitionDuration: '500ms',
    transitionProperty: 'backgroundColor',
    transitionTimingFunction: 'ease'
  },
  transitionOpacity: {
    backgroundColor: 'red',
    transitionDuration: '0.5s',
    transitionProperty: 'opacity',
    transitionTimingFunction: 'ease'
  },
  transitionTransform: {
    backgroundColor: 'red',
    transitionDuration: '500ms',
    transitionProperty: 'transform',
    transitionTimingFunction: 'ease'
  },
  objContain: {
    objectFit: 'contain'
  },
  flex: {
    display: 'flex'
  },
  flexGrow: {
    flexGrow: 1
  },
  blockW300: { width: 300, display: 'block' },
  w1000: { width: 1000 },
  blueSquare: {
    backgroundColor: 'blue',
    boxSizing: 'border-box',
    height: 'auto',
    width: 1000
  },
  whiteBox: {
    marginTop: 10,
    backgroundColor: 'white'
  },
  bgWhite: {
    backgroundColor: 'white'
  },
  bgRed: {
    backgroundColor: 'red'
  },
  bgGreen: {
    backgroundColor: 'green'
  },
  bgBlue: {
    backgroundColor: 'blue'
  },
  bgYellow: {
    backgroundColor: 'yellow'
  },
  redBox: {
    padding: 50,
    backgroundColor: 'red'
  },
  greenBox: {
    padding: 20,
    marginRight: 100,
    backgroundColor: 'green'
  },
  p50: {
    padding: 50
  },
  absTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  relative: {
    position: 'relative'
  },
  h100: {
    height: 100
  },
  dynamicBg: (color: string) => ({
    backgroundColor: color
  }),
  dynamicOpacity: (opacity: number) => ({
    opacity
  }),
  dynamicTransform: (transform: string) => ({
    transform
  }),
  visibilityCollapse: {
    visibility: 'collapse'
  },
  visibilityHidden: {
    visibility: 'hidden'
  },
  visibilityVisible: {
    visibility: 'visible'
  }
});
