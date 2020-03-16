import React, { Component, Suspense, lazy } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import styled from 'styled-components';
import ToDoList from './containers/ToDoList';
import ToDoEditForm from './components/ToDoEditForm';
import PageNotFound from './components/PageNotFound';
import Login from './containers/Login';
import Register from './containers/Register';
import Navbar from './containers/Navbar';
import {
  CurrentUserProvider,
  CurrentUserConsumer,
} from './context/CurrentUser.context';
import Home from './containers/Home';

const Container = styled.div`
  background: #258ea6;
  margin: 0 auto;
  width: 80%;
  max-width: 600px;
  padding: 14px;
  border-radius: 14px;
  box-shadow: 0px 10px 50px #555;
  margin-top: 30px;
`;

const Stats = lazy(() => import('./containers/Stats'));

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <CurrentUserConsumer>
        {({ user }) =>
          user ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          )
        }
      </CurrentUserConsumer>
    )}
  />
);

class App extends Component {
  render() {
    return (
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <CurrentUserProvider>
            <Navbar />

            <Switch>
              <Route exact path="/" component={Home} />
              <Container>
                <Route exact path="/todolist" component={ToDoList} />
                <PrivateRoute
                  exact
                  path="/todo_items/:id"
                  component={ToDoEditForm}
                />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />

                <Route exact path="/stats" component={Stats} />
                {/* <Route component={PageNotFound} />    TODO: repair this shit! */}
              </Container>
            </Switch>
          </CurrentUserProvider>
        </Suspense>
      </Router>
    );
  }
}

export default App;
