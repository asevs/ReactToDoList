import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

class PageNotFound extends Component {

    state = {
        counter: 5
    }

    componentDidMount = () => {
        const intervalId = setInterval(this.countdown, 1000)
        this.setState({intervalId})
    }

    countdown = ()  => this.setState({counter: this.state.counter - 1})

    componentWillUnmount = () => {
        clearInterval(this.state.intervalId)
    }

    render() {
        
        const {location} = this.props;
        const {counter} = this.state;
        return(
            <div>
              <p>No match for <code>{location.pathname}</code></p>  
              <p>Redirect to homepage in {counter} seconds.</p>
              {counter === 0 && <Redirect to='/' />}
            </div>
        )
    }
}
export default PageNotFound;