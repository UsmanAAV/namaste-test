import React, { Component } from 'react';
import _ from 'lodash';
import { BrowserRouter as Router, Route, NavLink, Redirect } from "react-router-dom";
import Main from './components/main';
import Configure from './components/configure';
import './App.css';

class App extends Component {
  state = {
    montlyLimit: 0,
    montlyLimitInput: '',
    moneyAmountInput: '',
    monthBalance: 0,
    dayBalance: 0,
    history: {},
  };

  changeMonthlyLimit = () => {
    const { monthBalance, montlyLimit, montlyLimitInput } = this.state;
    const newMonthlyLimit = Number(montlyLimitInput);
    const updatedMonthBalance = monthBalance + (newMonthlyLimit - montlyLimit);
    const updatedDayBalance = Math.floor(updatedMonthBalance / 30);
    this.setState({
      montlyLimit: newMonthlyLimit,
      montlyLimitInput: '',
      monthBalance: updatedMonthBalance,
      dayBalance: updatedDayBalance,
    });
  };

  isNumber = value => {
    const regex = new RegExp(/^-?\d*\.?\d*$/);
    return regex.test(value);
  };

  changeMonthlyLimitInput = value => {
    if (this.isNumber(value)) {
      this.setState({ montlyLimitInput: value });
    }
  };

  changeMoneyAmountInput = value => {
    if (this.isNumber(value)) {
      this.setState({ moneyAmountInput: value });
    }
  };

  getUpdatedBalances = (type, value) => {
    const { monthBalance, dayBalance } = this.state;
    const newValue = value * (type === 'expense' ? -1 : 1);
    const newMonthBalance = monthBalance + newValue;
    const newDayBalance = dayBalance + newValue;
    return { monthBalance: newMonthBalance, dayBalance: newDayBalance };
  }

  addRecordToHistory = (type) => {
    const { moneyAmountInput, history } = this.state;
    const newId = _.uniqueId();
    const newRecord = { id: newId, type, value: Number(moneyAmountInput), date: Date.now() };
    const updatedHistory = { ...history, [newId]: newRecord };
    this.setState({
      ...this.getUpdatedBalances(type, moneyAmountInput),
      history: updatedHistory,
      moneyAmountInput: '',
    });
  }

  removeRecordFromHistory = (id) => {
    const { history } = this.state;
    const { type, value } = history[id];
    const updatedHistory = _.omit(history, id);
    this.setState({
      ...this.getUpdatedBalances(type, -value),
      history: updatedHistory,
      moneyAmountInput: '',
    });
  }

  render() {
    const {
      montlyLimit,
      montlyLimitInput,
      moneyAmountInput,
      history,
      monthBalance,
      dayBalance,
    } = this.state;
    return (
      <Router>
        <div className="container">
          <header>
            <div className="header-container">
              <div className="app-title">
                <h3>Planner</h3>
              </div>
              <nav className="menu-top">
                <ul className="menu-main">
                  <li className="menu-item"><NavLink to="/main">Main</NavLink></li>
                  <li className="menu-item"><NavLink to="/configure">Configure</NavLink></li>
                </ul>
              </nav>
            </div>
          </header>
          <main>
            <div className="main-container">
              <Route
                path="/main"
                exact
                render={
                  props => (
                    <Main
                      {...props}
                      moneyAmountInput={moneyAmountInput}
                      monthBalance={monthBalance}
                      dayBalance={dayBalance}
                      history={history}
                      changeMoneyAmountInput={this.changeMoneyAmountInput}
                      addRecordToHistory={this.addRecordToHistory}
                      removeRecordFromHistory={this.removeRecordFromHistory}
                    />
                  )
                }
              />
              <Route
                path="/configure"
                exact
                render={
                  props => (
                    <Configure
                      {...props}
                      montlyLimit={montlyLimit}
                      montlyLimitInput={montlyLimitInput}
                      changeMonthlyLimit={this.changeMonthlyLimit}
                      changeMonthlyLimitInput={this.changeMonthlyLimitInput}
                    />
                  )
                }
              />
              <Route exact path="/" component={() => <Redirect to="/configure" />}/>
            </div>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
