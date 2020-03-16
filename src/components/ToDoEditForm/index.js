import React, { Component } from 'react';
import { Formik } from 'formik';
import { withRouter } from 'react-router-dom';
import * as _ from 'ramda';
import API from '../../helpers/api';
import {
  SubmitButton,
  TextInput,
  Label,
  Select,
  ErrorMsg,
} from '../../helpers/theme';

class ToDoEditForm extends Component {
  state = {
    toDoItem: null,
    fetched: false,
    disabled: false,
  };

  itemId = () => this.props.match.params.id;

  componentDidMount = () => {
    API.get(`/item/${this.itemId()}`).then(res => {
      const toDoItem = res.data;
      this.setState({ toDoItem, fetched: true });
    });
  };

  render() {
    return (
      <div>
        Edit form for {this.itemId()}
        {this.state.fetched ? (
          <Formik
            initialValues={{ ...this.state.toDoItem }}
            onSubmit={values => {
              API.post(`/item/update`, {
                ...values,
              });
              this.props.history.push('/todolist');
            }}
            validate={values => {
              const errors = {};

              if (!values.content) {
                errors.content = 'Required';
              } else if (values.content.length < 4) {
                errors.content = 'Too short. Use min 4 characters.';
              } else if (values.content.includes('fuck you')) {
                errors.content = 'Mind your language!';
              }

              if (_.isEmpty(errors)) {
                this.setState({ disabled: false });
              } else {
                this.setState({ disable: true });
              }
              return errors;
            }}
            render={({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <Label>
                  Content *<ErrorMsg>{errors.content}</ErrorMsg>
                  <TextInput
                    name="content"
                    onChange={handleChange}
                    value={values.content}
                  />
                </Label>

                <Label>
                  Priority
                  <Select
                    name="Priority"
                    onChange={handleChange}
                    value={values.priority}
                  >
                    <option value="low">Low</option>
                    <option value="high">High</option>
                    <option value="Urgent">Urgent</option>
                  </Select>
                </Label>
                <Label>
                  Done?
                  <input
                    type="checkbox"
                    name="status"
                    value={values.status}
                    checked={values.status}
                    onChange={handleChange}
                  />
                </Label>
                <br />
                <SubmitButton type="submit" disabled={this.state.disabled}>
                  Update
                </SubmitButton>
              </form>
            )}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}
export default withRouter(ToDoEditForm);
