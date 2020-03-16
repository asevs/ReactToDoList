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
margin-bottom:10px;
`;

class ToDoList extends Component {
  static defaultProps = {
    tasks: [],
    title: 'My stuff',
  };

  state = {
    tasks: this.props.tasks,
    draft: '',
  };

  componentDidMount = () => {
    API.get('/item/getAll').then(res => {
      const tasks = res.data;
      this.setState({ tasks });
    });
  };

  updateDraft = event => {
    this.setState({ draft: event.target.value });
  };

  itemAdd = () => {
    API.post('/item/add', {
      id: '',
      content: this.state.draft,
      status: 'false',
      createdItem: '',
    })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .then(this.componentDidMount)
      .then(this.setState({ draft: '' }));
  };

  removeAllTasks = () => {
    API.post('/relay/1')
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
        <DeleteButton onClick={this.removeAllTasks}>Przekaźnik</DeleteButton>
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
