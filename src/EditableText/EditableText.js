/* @flow */
import React from 'react'
import Theme from 'js-theme'
import { Colors, Fonts, Spacing } from '@workflo/styles'
import Slate from 'slate'
import Trigger from '../Trigger'
import View from '../View'

/**
 * Property types
 */

type SizeT = 'Tiny' | 'Small' | 'Base' | 'Large' | 'Huge'

type PropsT = {
  isEditing?: boolean,
  multipleLines?: boolean,
  readOnly?: boolean,
  onChange?: Function,
  onStartEdit?: Function,
  onStopEdit?: Function,
  size?: SizeT,
  theme: Object,
  value: String,
}

/**
 * Default properties
 */

const defaultProps = {
  isEditing: false,
  multipleLines: false,
  readOnly: false,
  size: 'Base',
  onChange: () => {},
  onStartEdit: () => {},
  onStopEdit: () => {},
}

/**
 * State type
 */

type StateT = {
  editorState: Slate.State,
  isFocused: boolean,
}

/**
 * EditableText component
 */

class EditableText extends React.Component {
  props: PropsT
  state: StateT

  static defaultProps = defaultProps

  constructor(props) {
    super(props)
    this.state = {
      editorState: Slate.Plain.deserialize(props.value || ''),
      isFocused: false,
    }
  }

  componentWillReceiveProps({ value }: PropsT) {
    if (this.props.value !== value) {
      this.setState({
        editorState: Slate.Plain.deserialize(value || ''),
      })
    }
  }

  focus = () => {
    this.setState({
      editorState: this.state.editorState.transform().focus().apply(),
    })
  }

  blur = () => {
    this.setState({
      editorState: this.state.editorState.transform().blur().apply(),
    })
  }

  select = () => {
    this.setState({
      editorState: this.state.editorState.transform().selectAll().apply(),
    })
  }

  focusAndSelect = () => {
    this.setState({
      editorState: this.state.editorState.transform().selectAll().focus().apply(),
    })
  }

  render() {
    const {
      isEditing,
      multipleLines,
      readOnly,
      value,
      size,
      theme,
      onChange,
      onStartEdit,
      onStopEdit,
      ...props
    } = this.props

    const { editorState } = this.state

    return (
      <View {...theme.text} {...props} inline>
        <Slate.Editor
          state={editorState}
          style={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            minWidth: '0.65em',
          }}
          schema={{
            nodes: {
              line: props => (
                <span {...props.attributes}>
                  {props.children}
                </span>
              ),
            },
          }}
          readOnly={readOnly}
          spellCheck={false}
          onChange={this.handleChange}
          onDocumentChange={this.handleDocumentChange}
          onSelectionChange={this.handleSelectionChange}
          onKeyDown={this.handleKeyDown}
        />
      </View>
    )
  }

  handleKeyDown = (event, data, state) => {
    if (data.key == 'enter') {
      if (!this.props.multipleLines) {
        event.preventDefault()
        return state
      }
    }
    return null
  }

  handleSelectionChange = (selection: Slate.Selection, state: Slate.State) => {
    if (selection.isFocused != this.state.isFocused) {
      this.setState({ isFocused: selection.isFocused })
      if (selection.isFocused) {
        this.props.onStartEdit && this.props.onStartEdit()
      } else {
        this.props.onStopEdit && this.props.onStopEdit()
      }
    }
  }

  handleChange = (state: Slate.State) => {
    this.setState({
      editorState: state,
    })
  }

  handleDocumentChange = (document: Slate.Document, state: Slate.State) => {
    let text = Slate.Plain.serialize(state)
    this.props.onChange && this.props.onChange(text)
  }
}

/**
 * Theming
 */

const sizeStyles = {
  Tiny: {
    ...Fonts.tiny,
  },
  Small: {
    ...Fonts.small,
  },
  Base: {
    ...Fonts.base,
  },
  Large: {
    ...Fonts.large,
  },
  Huge: {
    ...Fonts.huge,
  },
}

const defaultTheme = ({ isEditing, readOnly, size, value }: PropsT) => ({
  text: {
    display: 'inline-block',
    boxShadow: 'inset 0px -1px 0px 0px transparent',
    ...(readOnly && {
      cursor: 'default',
    }),
    ...(!readOnly && {
      ':hover': {
        boxShadow: `inset 0px -1px 0px 0px ${Colors.grey300}`,
      },
    }),
    ...(!value && {
      minWidth: '0.65em',
    }),
    ...(isEditing && {
      boxShadow: `inset 0px -1px 0px 0px ${Colors.grey300}`,
    }),
    ...(sizeStyles[size] || sizeStyles['Base']),
  },
})

/**
 * Exporting
 */

const ThemedEditableText = Theme('EditableText', defaultTheme, { withRef: true })(
  EditableText
)
export default ThemedEditableText
