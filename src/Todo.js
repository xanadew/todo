import React from 'react';

const Todo = ({todo, remove}) => {
    return (<button className="list-group-item" onClick={() => {remove(todo.id)}}>{todo.text}</button>);
  }

  export default Todo;