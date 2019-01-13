import React from 'react';

export default class Configure extends React.Component {
  handleSetButton = (e) => {
    const { changeMonthlyLimit } = this.props;
    changeMonthlyLimit();
  }

  handleInput = (e) => {
    e.preventDefault();
    const { changeMonthlyLimitInput } = this.props;
    const { value } = e.target;
    changeMonthlyLimitInput(value);
  }

  render() {
    const { montlyLimitInput } = this.props;
    return (
      <div className="content-main">
        <form>
          <input type="text" name="amount" value={montlyLimitInput} onChange={this.handleInput} />
          <button type="button" name="Set" onClick={this.handleSetButton}>Set</button>
        </form>
      </div>
    )
  }
}
