import React, { Component } from 'react';
import "./todoItem.css";
import classNames from "classnames";
import check from "../img/check.svg";
import checkDone from "../img/checkDone.svg"


class TodoItem extends Component {

    render() {
        const { item, onClick } = this.props;
        let url = check;
        if (item.isComplete) {
            url = checkDone;
        }

        return (
            <div
                className={classNames('todoItem', 
                {complete: item.isComplete === true })}>
                <img onClick={onClick} alt=""
                 src={url}/>
                <p>{item.title}</p>
            </div>
        );
    }
}

export default TodoItem;
