import React from 'react';

export default class Input extends React.Component {
  handleInput = (e) => {
    const isNumber = value => {
      const regex = new RegExp(/^-?\d*\.?\d*$/);
      return regex.test(value);
    };
    const { value } = e.target;
    const { changeValue } = this.props;
    if (isNumber(value)) {
      changeValue(value);
    }
  }

  render() {
    const { name, value } = this.props;
    return (
      <input type="text" name={name} value={value} onChange={this.handleInput} />
    );
  }
};
