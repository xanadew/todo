import React, {Component} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import TodoForm from './TodoForm.js';
import Title from './Title.js';
import TodoList from './TodoList';


class TodoApp extends Component{
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
    this.apiUrl = '//57b1924b46b57d1100a3c3f8.mockapi.io/api/todos'
  }
  componentDidMount(){
    axios.get(this.apiUrl)
      .then((res) => {
        this.setState({data:res.data});
      });
  }
  addTodo(val){
    const todo = {text: val}
    // Update data
    axios.post(this.apiUrl, todo)
       .then((res) => {
          this.state.data.push(res.data);
          this.setState({data: this.state.data});
       });
  }
  handleRemove(id){
    const remainder = this.state.data.filter((todo) => {
      if(todo.id !== id) return todo;
    });
    // Update state with filter
    axios.delete(this.apiUrl+'/'+id)
      .then((res) => {
        this.setState({data: remainder});      
      })
  }
 
  render(){
    return (
      <div>
        <Title todoCount={this.state.data.length}/>
        <TodoForm addTodo={this.addTodo.bind(this)}/>
        <TodoList 
          todos={this.state.data} 
          remove={this.handleRemove.bind(this)}
        />
      </div>
    );
  }
}
ReactDOM.render(<TodoApp />, document.getElementById('container'));
export default TodoApp;