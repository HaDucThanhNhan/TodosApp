import React, { Component } from 'react';
import './App.css';
import TodoItem from './component/todoItem';
import tick from "./img/tick.svg";


class App extends Component {
  constructor() {
    super();
    this.state = {
      inputItem: "",
      currentState: "",
      todoItems: [
        { title: "Đi ăn kem", isComplete: true },
        { title: "Dẫn gấu đi dạo", isComplete: false },
        { title: "Đi ngắm bông", isComplete: true }
      ]
    }
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onChange = this.onChange.bind(this);
    this.allItemClick = this.allItemClick.bind(this);
    this.onActiveClicked = this.onActiveClicked.bind(this);
    this.onAllClicked = this.onAllClicked.bind(this);
    this.onCompleteClicked = this.onCompleteClicked.bind(this);
  }
  onItemClicked(item) {
    const complete = item.isComplete;
    const index = this.state.todoItems.indexOf(item);
    const { todoItems } = this.state;
    return (event) => {
      this.setState({
        inputItem: "",
        todoItems: [
          ...todoItems.slice(0, index),
          { title: item.title, isComplete: !complete },
          ...todoItems.slice(index + 1)
        ]
      })
    }
  }
  onKeyUp(event) {
    if (event.keyCode === 13) {
      let text = event.target.value;
      text = text.trim();
      if (text) {
        const { todoItems } = this.state;
        this.setState({
          inputItem: "",
          todoItems: [
            { title: text, isComplete: false },
            ...todoItems
          ]
        })
      }
    }
  }
  onChange(event) {
    this.setState({
      inputItem: event.target.value
    })
  }
  allItemClick() {
    let { todoItems } = this.state;
    let list = [...todoItems];
    let completeItems = list.reduce(function (count, item) {
      return (item.isComplete === true) ? (count + 1) : count;
    }, 0);
    for (let item of list) {
      if (completeItems < (list.length)) {
        item.isComplete = true
      } else {
        item.isComplete = !item.isComplete
      }
    }
    this.setState({
      todoItems: [
        ...todoItems = list
      ]
    })

  }
  onActiveClicked() {
    this.setState({
      currentState: "active"
    })
  }
  onAllClicked() {
    this.setState({
      currentState: "all"
    })
  }
  onCompleteClicked() {
    this.setState({
      currentState: "complete"
    })
  }



  render() {
    const { todoItems, inputItem, currentState } = this.state;
    let current= todoItems;
    let count=0;      
    for (let item of todoItems){
      if(item.isComplete===false){
        count=count+1;
      }
    }
    if (currentState === "active") {
        current=todoItems.filter((item)=>item.isComplete===false)    
    }
    if (currentState === "complete") {
      current=todoItems.filter((item)=>item.isComplete===true)    
    }
  
    if (todoItems.length) {
      return <div className="App">
        <div className="header">
          <img src={tick} alt="" onClick={this.allItemClick} />
          <input type="text"
            placeholder="Add a new todo item"
            onKeyUp={this.onKeyUp}
            value={inputItem}
            onChange={this.onChange}
          />
        </div>
          {current.map((item, index) => <TodoItem
            item={item} key={index} onClick={this.onItemClicked(item)} />
          )}
        <div className="footer">
          <p>{count}  item left</p>
          <div className="btn">
            <button className="btn-all" onClick={this.onAllClicked}>All</button>
            <button className="btn-active" onClick={this.onActiveClicked}>Active</button>
            <button className="btn-complete" onClick={this.onCompleteClicked}>Completed</button>
          </div>
        </div>
      </div>
    }


  }

}

export default App;
