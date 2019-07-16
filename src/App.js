import React, { Component } from 'react';
import './App.css';
import TodoItem from './component/todoItem';
import tick from "./img/tick.svg";


class App extends Component {
  constructor() {
    super();
    this.state = {
      newItem: '',
      todoItems: [
        { title: "Di cho", isComplete: true },
        { title: "Di an kem", isComplete: false },
        { title: "Di xem phim" }
      ]
    }
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onChange = this.onChange.bind(this);

  }
  onItemClicked(item) {
    return (event) => {
      const isComplete = item.isComplete;
      const { todoItems } = this.state;
      const index = todoItems.indexOf(item)
      this.setState({
        todoItems: [
          ...todoItems.slice(0, index),
          {
            ...item,
            isComplete: !isComplete
          },
          ...todoItems.slice(index + 1)
        ]
      })
    };
  }
  onChange(event) {
    this.setState({
      newItem: event.target.value
    });
  }
  onKeyUp(event) {
    if (event.keyCode === 13) {
      let text = event.target.value;
      if (!text) {
        return;
      }
      text = text.trim();
      if (!text) {
        return;
      }
      this.setState({
        newItem:"",
        todoItems: [
          { title: text, isComplete: false },
          ...this.state.todoItems
        ]
      })

    }

  }
  render() {
    const { todoItems, newItem } = this.state;

    if (todoItems.length) {
      return (
        <div className="App">
          <div className="header">
            <img src={tick} alt="" width={32} height={32} />
            <input type="text"
              placeholder="Add a new item"
              value={newItem}
              onChange={this.onChange}
              onKeyUp={this.onKeyUp} />
          </div>
          {todoItems.length && todoItems.map((item, index) =>
            <TodoItem
              key={index}
              item={item}
              onClick={this.onItemClicked(item)} />
          )}
        </div>
      );
    }
  }
}

export default App;
