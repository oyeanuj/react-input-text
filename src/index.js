import React, { PropTypes } from 'react';
import omit from 'lodash/object/omit.js';

class InputSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || ''
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value
    });
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = null;
  }

  handlePress(e) {
    if (e.key === 'Enter') {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      const value = e.target.value;
      if (value !== this.props.value) {
        this.props.onChange(value);
      }
      this.props.onEnter(value);
    }
  }

  handleChange(e) {
    const value = e.target.value;
    this.setState({value});
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(function() {
      this.props.onChange(value);
    }.bind(this), this.props.delay);
  }

  render() {
    const extendProps = omit(this.props, ['value', 'onKeyPress', 'onChange', 'delay']);
    return (
      <input {...extendProps}
        value={this.state.value}
        onKeyPress={this.handlePress.bind(this)}
        onChange={this.handleChange.bind(this)}/>
    );
  }
}
InputSelect.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onEnter: PropTypes.func,
  delay: PropTypes.number
};

InputSelect.defaultProps = {
  delay: 300
};

export default InputSelect;
