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

  addRecordToHistory = (type) => {
    const { moneyAmountInput, history, monthBalance, dayBalance } = this.state;
    const newId = _.uniqueId();
    const newRecord = { id: newId, type, value: Number(moneyAmountInput), date: Date.now() };
    const changingAmount = moneyAmountInput * (type === 'expense' ? -1 : 1);
    const newMonthBalance = monthBalance + changingAmount;
    const newDayBalance = dayBalance + changingAmount;
    const updatedHistory = { ...history, [newId]: newRecord };
    this.setState({
      history: updatedHistory,
      moneyAmountInput: '',
      monthBalance: newMonthBalance,
      dayBalance: newDayBalance,
    });
  }

  render() {
    const {
      montlyLimit,
      montlyLimitInput,
      moneyAmountInput,
      history,
      monthBalance,
      dayBalance
    } = this.state;
    return (
      <Router>
        <div className="container">
          <div className="header-container">
            <header>
              <div className="app-title">
                <p>Planner</p>
              </div>
              <nav>
                <ul>
                  <li><NavLink to="/main">Main</NavLink></li>
                  <li><NavLink to="/configure">Configure</NavLink></li>
                </ul>
              </nav>
            </header>
          </div>
          <div className="main-container">
            <main>
              <Route
                path="/main"
                exact
                render={
                  props => (
                    <Main
                      {...props}
                      moneyAmountInput={moneyAmountInput}
                      changeMoneyAmountInput={this.changeMoneyAmountInput}
                      addRecordToHistory={this.addRecordToHistory}
                      monthBalance={monthBalance}
                      dayBalance={dayBalance}
                      history={history}
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
            </main>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
