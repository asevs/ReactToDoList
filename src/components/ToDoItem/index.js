import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import API from '../../helpers/api';

const Item = styled.div`
  background: #258ea6;
  border-radius: 10px;
  padding: 5px;
  margin-bottom: 7px;
  color: ${props => (props.status ? '#1fd84d' : '#c7c8cb')}
  text-decoration: ${props => (props.status ? 'line-through' : 'auto')}
  `;
const ButtonDeleteById = styled.button`
  background: #232632;
  color: red;
  width: 80px;
  height: 32px;
  font-size: 1.3em;
  border: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const EditLink = styled(Link)`
  color: palavioletred;
  text-decoration: none;
  margin-left: 5px;
  &:hover {
    color: #fff;
  }
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  border: 2px solid #343744;
  background: #258ea6;
  border-radius: 10px;
  padding: 5px;
`;

class ToDoItem extends Component {
  static defaultProps = {
    status: false,
  };

  state = {
    status: this.props.status,
  };

  toggleStatus = () => {
    API.post(`/item/updatestatus/${this.props.id}/${!this.state.status}`)
      .then(this.setState({ status: !this.state.status }))
      .then(this.props.componentDidMount);
  };

  removeById = () => {
    API.delete(`/item/delete/${this.props.id}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .then(this.props.componentDidMount);
  };

  render() {
    const { id, text } = this.props;

    return (
      <Container>
        <Item onClick={this.toggleStatus} status={this.state.status}>
          {text}
        </Item>

        <ButtonDeleteById onClick={this.removeById}>x</ButtonDeleteById>
        <EditLink to={`/todo_items/${id}`}>edit</EditLink>
      </Container>
    );
  }
}

export default ToDoItem;
