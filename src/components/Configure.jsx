import React from 'react';
import Input from './Input.jsx';

export default class Configure extends React.Component {
  handleSetButton = () => {
    const { monthlyLimitInput, setMonthlyLimit } = this.props;
    if (monthlyLimitInput === '') {
      return;
    }
    setMonthlyLimit();
  }

  handleSubmit = e => e.preventDefault();

  render() {
    const { monthlyLimit, monthlyLimitInput, changeMonthlyLimitInput } = this.props;
    return (
      <div className="content-main">
        <div className="form-inputs content-block">
          <div className="labels">
            <p>Monthly Amount</p>
            <p>Current: <span className="number">{monthlyLimit}</span></p>
          </div>
          <div className="redline" />
          <form className="form-controls configure" onSubmit={this.handleSubmit}>
            <Input
              value={monthlyLimitInput}
              name="amount"
              placeholder="enter new monthly limit here..."
              changeValue={changeMonthlyLimitInput}
            />
            <button className="controls set" type="button" name="set" onClick={this.handleSetButton}>Set</button>
          </form>
        </div>
      </div>
    )
  }
}
