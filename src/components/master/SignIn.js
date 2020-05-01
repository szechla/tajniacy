import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'
import { Redirect} from 'react-router-dom'

class SignIn extends Component {
    state = {
        email: null,
        password: null
    }

    handleChange = (e) => {
        let newValue = e.target.name === "login" ? `${e.target.value}@a.tt` : e.target.value
        let stateValue = e.target.name === "login" ? "email" : e.target.name
        this.setState({
            [stateValue]: newValue
        })
    }

    handleSubmit = (e) => {
        const {signIn} = this.props
        e.preventDefault();
        signIn(this.state)
        this.props.history.push('/newcard')
    }

    render() {
        if(this.props.user.email === "admin@a.tt") return <Redirect to ="/newcard"/>
        return (
            <div className="center container">
                <h1 className="center">Log In</h1>
                <form action="" onSubmit={this.handleSubmit}>
                    <div className="container input-field">
                        <input type="text" name="login" onChange={this.handleChange}/>
                        <label htmlFor="login">Login</label>
                    </div>
                    <div className="center container input-field">
                        <input type="password" name="password" onChange={this.handleChange}/>
                        <label htmlFor="password">Hasło</label>
                    </div>
                    <button className="btn lime">Zaloguj</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (credentials) => dispatch(signIn(credentials))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
