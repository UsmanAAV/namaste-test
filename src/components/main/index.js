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

  handleDeleteRecord = id => (e) => {
    const { removeRecordFromHistory } = this.props;
    removeRecordFromHistory(id);
  };

  handleSubmit = e => e.preventDefault();

  render() {
    const { moneyAmountInput, monthBalance, dayBalance, history } = this.props;
    return (
      <div className="content-main">
        <div className="form-inputs content-block">
          <div className="labels">
            <div className="monthBalance"><p>You have {monthBalance} left for the month</p></div>
            <div className="dayBalance">{dayBalance}left for the day</div>
          </div>
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="amount" value={moneyAmountInput} onChange={this.handleInput} />
            <button type="button" name="expense" onClick={this.handleButton('expense')}>expense</button>
            <button type="button" name="income" onClick={this.handleButton('income')}>income</button>
          </form>
        </div>
        <div className="history content-block">
          {Object.values(history)
            .map(({ id, date, value, type }) => (
              <div key={id}>
                <div className={`record-type ${type}`}>{type === 'expense' ? '-' : '+'}</div>
                <span className="record-value">{value}</span>
                <span className="record-date">{Date(date)}</span>
                <button type="button" name="delete-record" onClick={this.handleDeleteRecord(id)}>x</button>
              </div>)
            )}
        </div>
      </div>
    )
  }
}
