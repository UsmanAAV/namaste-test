import React from 'react';
import Input from './Input.jsx';

export default class Main extends React.Component {
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
    const { moneyAmountInput, monthBalance, dayBalance, history, changeMoneyAmountInput } = this.props;
    return (
      <div className="content-main">
        <div className="form-inputs content-block">
          <div className="labels">
            <div className="balance-label"><p>You have {monthBalance} left for the month</p></div>
            <div className="balance-label">{dayBalance} left for the day</div>
          </div>
          <div className="redline" />
          <form className="form-controls main" onSubmit={this.handleSubmit}>
            <Input name="amount" value={moneyAmountInput} changeValue={changeMoneyAmountInput} />
            <button className="controls expense" type="button" name="expense" onClick={this.handleButton('expense')}>expense</button>
            <button className="controls income" type="button" name="income" onClick={this.handleButton('income')}>income</button>
          </form>
        </div>
        <div className="history content-block">
          {Object.values(history)
            .map(({ id, date, value, type }) => (
              <div key={id} className="history-record">
                <div className={`controls record-type ${type}`}>{type === 'expense' ? '-' : '+'}</div>
                <div>
                  <span className="record-value">{value}</span>
                  <br />
                  <span className="record-date">{Date(date)}</span>
                </div>
                <button className="controls delete" type="button" name="delete-record" onClick={this.handleDeleteRecord(id)}>x</button>
              </div>)
            )}
        </div>
      </div>
    )
  }
}
