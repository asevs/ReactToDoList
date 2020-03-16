import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { CurrentUserConsumer } from '../../context/CurrentUser.context';
import GoogleLogin from 'react-google-login';
import API from '../../helpers/api';
import styled from 'styled-components';
import './styled.css';

const LoginForm = styled.div``;



const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
);

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      loginError: false,
      redirect: false,
      logged: false,
      basicLoginStatus: '',
      formErrors: {
        email: '',
        password: '',
      },
    };
    this.signup = this.signup.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        Email: ${this.state.email}
        Password: ${this.state.password}
      `);
    } else {
      console.error('FORM INVALID - DISPLAY ERROR MESSAGE');
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case 'email':
        formErrors.email = emailRegex.test(value)
          ? ''
          : 'invalid email address';
        break;
      case 'password':
        formErrors.password =
          value.length < 8 ? 'minimum 8 characters required' : '';
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };
  basicLogin = () => {
    API.post(`/user/checkUser`, {
      email: this.state.email,
      password: this.state.password,
    }).then(res => {
      const basicLoginStatus = res.data;
      console.log(basicLoginStatus);
      if (basicLoginStatus === 'logged') {
        this.setState({ logged: true });
        this.props.history.push('/');
      }
    });
  };

  logout = () => {
    this.setState({ logged: false });
  }

  signup(res, type) {
    if (type === 'google') {
      API.post(`/user/addBasicUser`, {
        name: res.profileObj.givenName,
        fullName: res.profileObj.name,
        email: res.profileObj.email,
        googleId: res.profileObj.googleId,
        image: res.profileObj.imageUrl,
      })
        .then(resource => {
          
          if (res.profileObj.email != null) {
            this.setState({ logged: true });
            this.props.history.push('/');
          }
          console.log(this.state.logged)

        })
    }
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { formErrors } = this.state;

    const responseGoogle = response => {
      console.log('google console');
      console.log(response);
      this.signup(response, 'google');
    };

    return (
      <CurrentUserConsumer>
        {({ user, login, processing }) => (
          <div>
            {user && <Redirect to={from} />}
            <p>You must log in to view the page at {from.pathname}</p>
            {processing ? (
              <div>Authenticating...</div>
            ) : (
              <LoginForm className="wrapper">
                <div className="form-wrapper">
                  <h1>Log in</h1>
                  <form onSubmit={this.handleSubmit} noValidate>
                    <div className="email">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className={formErrors.email.length > 0 ? 'error' : null}
                        placeholder="Email"
                        name="email"
                        noValidate
                        onChange={this.handleChange}
                      ></input>
                      {formErrors.email.length > 0 && (
                        <span className="errorMessage">{formErrors.email}</span>
                      )}
                    </div>
                    <div className="password">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        className={
                          formErrors.password.length > 0 ? 'error' : null
                        }
                        placeholder="Password"
                        name="password"
                        noValidate
                        onChange={this.handleChange}
                      ></input>
                      {formErrors.password.length > 0 && (
                        <span className="errorMessage">
                          {formErrors.password}
                        </span>
                      )}
                    </div>
                    <div className="login">
                      <button onClick={this.basicLogin} type="submit">
                        Log In
                      </button>
                    </div>
                  </form>
                  <GoogleLogin
                    clientId="107912156588-klm38tdt5c6a76kc9u6pj1ul1qq3m111.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                  />
                  <div className="facebook">
                    <button onClick={login}>Facebook</button>
                  </div>
                </div>
              </LoginForm>
            )}
          </div>
        )}
      </CurrentUserConsumer>
    );
  }
}

export default Login;
