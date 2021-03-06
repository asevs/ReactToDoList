import React, { Component } from 'react';
import styled from 'styled-components';
import ToDoItem from '../../components/ToDoItem';
import NewTodoForm from '../../components/NewToDoForm';
import API from '../../helpers/api';

const Header = styled.h1`
  color: #fff;
`;
const DeleteButton = styled.button`
border-radius: 10px;
background: red
padding: 5px;
color: #fff;
margin-bottom: 10px;
`;

class ToDoList extends Component {
  static defaultProps = {
    tasks: [],
    lists: [],
    title: 'My stuff',
  };

  state = {
    tasks: this.props.tasks,
    draft: '',
  };

  componentDidMount = () => {
    API.get(`/list/getAll`).then(res => {
      const lists = res.data;
      console.log(lists)
      const tasks = lists['0'].toDoItems;
      this.setState({ tasks, lists });
    });
  };

  updateDraft = event => {
    this.setState({ draft: event.target.value });
  };

  

  itemAdd = () => {
    API.post(`/list/add`, this.state.lists)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .then(this.componentDidMount)
      .then(this.setState({ draft: '' }));
  };

  removeAllTasks = () => {
    API.delete(`/item/delete/all`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .then(this.componentDidMount);
  };

  render() {
    const { title } = this.props;
    const { tasks, draft } = this.state;

    return (
      <div>
        <Header>{title}</Header>
        <DeleteButton onClick={this.removeAllTasks}>Remove All</DeleteButton>
        {tasks.map(task => (
          <ToDoItem
            id={task.id}
            key={task.id}
            text={task.content}
            status={task.status}
            componentDidMount={this.componentDidMount}
          />
        ))}
        <NewTodoForm
          onSubmit={this.itemAdd}
          onChange={this.updateDraft}
          draft={draft}
        />
      </div>
    );
  }
}

export default ToDoList;
