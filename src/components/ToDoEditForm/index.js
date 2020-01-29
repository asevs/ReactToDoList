import React, {Component} from 'react'
import API from '../../helpers/api'
import {Formik} from 'formik'

class ToDoEditForm extends Component {

    state = {
        toDoItem: '',
        fetched: false,
    }

    componentDidMount = () => {
        API.get(`/item/${this.itemId()}`)
        .then(res => {
            const toDoItem = res.data;
            this.setState = ({toDoItem, fetched: true})
      })
    }

    itemId = () => this.props.match.params.id

    render() {
        return(
            <div>
                Edit form for {this.itemId()}
                {this.state.fetched
                ? <p>Loading...</p>
                : <Formik
                initialValues={{...this.state.toDoItem}}
                onSubmit={(values)=> {
                    console.log('submitted',values)
                }}
                render={({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    isSubmitting
                }) => (
                    <form onSubmit={handleSubmit}>
                        <input 
                        name='content'
                        onChange={handleChange}
                        value={values.content}
                        />
                        <br/>
                        <button type='submit'>Update</button>
                    </form>
                )
            }
            />
            }
            </div>
        )
    }
}
export default ToDoEditForm