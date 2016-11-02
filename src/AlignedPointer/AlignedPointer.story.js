import React from 'react'
import { storiesOf } from '@kadira/storybook'
import AlignedPointer from '.'
import PreviewContainer from '../PreviewContainer/PreviewContainer'
import Preview from '../Preview'

storiesOf('AlignedPointer', module)
  .add('Regular', () => (
    <PreviewContainer
      shade='dark'
    >
      <Preview
        label='Right'
        theme={{ content: styles.preview }}
      >
        <AlignedPointer
          pointerVertical='Center'
          pointerHorizontal='Left'
          targetVertical='Center'
          targetHorizontal='Right'
          portal={<div>Portal here</div>}
          targetTriggers={['Click inside']}
          portalTriggers={['Click outside']}
        >
          Click Me
        </AlignedPointer>
      </Preview>
      <Preview
        label='Bottom'
        theme={{ content: styles.preview }}
      >
        <AlignedPointer
          pointerVertical='Top'
          pointerHorizontal='Center'
          targetVertical='Bottom'
          targetHorizontal='Center'
          portal={<div>Portal here</div>}
          targetTriggers={['Click inside']}
          portalTriggers={['Click outside']}
        >
          Click Me
        </AlignedPointer>
      </Preview>
      <Preview
        label='Left'
        theme={{ content: styles.preview }}
      >
        <AlignedPointer
          pointerVertical='Center'
          pointerHorizontal='Right'
          targetVertical='Center'
          targetHorizontal='Left'
          portal={<div>Portal here</div>}
          targetTriggers={['Click inside']}
          portalTriggers={['Click outside']}
        >
          Click Me
        </AlignedPointer>
      </Preview>
      <Preview
        label='Top'
        theme={{ content: styles.preview }}
      >
        <AlignedPointer
          pointerVertical='Bottom'
          pointerHorizontal='Center'
          targetVertical='Top'
          targetHorizontal='Center'
          portal={<div>Portal here</div>}
          targetTriggers={['Click inside']}
          portalTriggers={['Click outside']}
        >
          Click Me
        </AlignedPointer>
      </Preview>
    </PreviewContainer>
  ))

const commonStyle = {
  padding: 8,
  color: '#232323',
  fontFamily: 'sans-serif',
}

const styles = {
  target: {
    ...commonStyle,
    backgroundColor: 'cyan',
  },
  portal: {
    ...commonStyle,
    backgroundColor: 'purple',
    color: 'white',
    height: 40,
    fontSize: 12,
  },
  preview: {
    alignItems: 'center',
  },
}
