import React from 'react';
import Input from './Input.jsx';

export default class Configure extends React.Component {
  handleSetButton = () => {
    const { setMonthlyLimit } = this.props;
    setMonthlyLimit();
  }

  handleSubmit = e => e.preventDefault();

  render() {
    const { monthlyLimitInput, changeMonthlyLimitInput } = this.props;
    return (
      <div className="content-main">
        <div className="form-inputs content-block">
          <form onSubmit={this.handleSubmit}>
            <Input value={monthlyLimitInput} name="amount" changeValue={changeMonthlyLimitInput} />
            <button type="button" name="set" onClick={this.handleSetButton}>Set</button>
          </form>
        </div>
      </div>
    )
  }
}
