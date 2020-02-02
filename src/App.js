import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import ToDoList from "./containers/ToDoList";
import ToDoEditForm from "./components/ToDoEditForm";
import PageNotFound from "./components/PageNotFound";

const Container = styled.div`
  background: #2b2e39;
  margin: 0 auto;
  width: 80%;
  max-width: 600px;
  padding: 14px;
  border-radius: 14px;
  margin-top: 14px;
`;

class App extends Component {
  render() {
    return (
      <Router>
        <Container>
          <Switch>
            <Route exact path="/" component={ToDoList} />
            <Route exact path="/todo_items/:id" component={ToDoEditForm} />
            <Route component={PageNotFound} />
          </Switch>
        </Container>
      </Router>
    );
  }
}

export default App;
