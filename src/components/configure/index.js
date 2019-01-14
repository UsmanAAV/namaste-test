import React from 'react';

export default class Configure extends React.Component {
  handleSetButton = (e) => {
    const { changeMonthlyLimit } = this.props;
    changeMonthlyLimit();
  }

  handleInput = (e) => {
    const { changeMonthlyLimitInput } = this.props;
    const { value } = e.target;
    changeMonthlyLimitInput(value);
  }

  handleSubmit = e => e.preventDefault();

  render() {
    const { montlyLimitInput } = this.props;
    return (
      <div className="content-main">
        <div className="form-inputs content-block">
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="amount" value={montlyLimitInput} onChange={this.handleInput} />
            <button type="button" name="Set" onClick={this.handleSetButton}>Set</button>
          </form>
        </div>
      </div>
    )
  }
}
