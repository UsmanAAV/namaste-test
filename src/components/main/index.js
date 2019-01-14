import React from 'react';

export default class Main extends React.Component {
  handleInput = (e) => {
    const { changeMoneyAmountInput } = this.props;
    const { value } = e.target;
    changeMoneyAmountInput(value);
  }

  handleButton = type => () => {
    const { addRecordToHistory } = this.props;
    addRecordToHistory(type);
  }

  render() {
    const { moneyAmountInput } = this.props;
    return (
      <div className="content-main">
        <div className="form-inputs content-block">
          <div className="labels">
            <div className="monthBalance">montlyLimit rest</div>
            <div className="dayBalance">dailyLimit rest</div>
          </div>
          <form>
            <input type="text" name="amount" value={moneyAmountInput} onChange={this.handleInput} />
            <button type="button" name="expense" onClick={this.handleButton('expense')}>expense</button>
            <button type="button" name="income" onClick={this.handleButton('income')}>income</button>
          </form>
        </div>
        <div className="history content-block">
          history
        </div>
      </div>
    )
  }
}
