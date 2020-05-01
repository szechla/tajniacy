import React, { Component } from 'react'
import { connect } from 'react-redux'

import { addHint } from "../../store/actions/gameActions"

class Words extends Component {
    state = {
        newHint: null
    }

    handleChange = (e) => {
        this.setState({
            newHint: e.target.value
        })
    }

    handleSubmit = (e) => {
        const {room, addHint, user} = this.props
        e.preventDefault()
        if (!room.active || room.turn != user.team) return
        addHint(this.state.newHint, room)
    }

    render(){
        const { room, user } = this.props
        const hints = room && room.hints
        const hintsList = hints && hints.map(hint => <li className={hint.team+'-text text-darken-1'} key={hint.id}>{hint.hint}</li>).reverse()
        let hintInput = user.spyMaster && room.turn === user.team ? 
        (<form action="" onSubmit={this.handleSubmit} className="row center-children">
            <div className="input-field col l10">
                <input id="newHint" type="text" onChange={this.handleChange}/>
                <label htmlFor="newHint">Dodaj podpowiedź</label>                         
            </div>
            <div className="col l2">
                <button className="btn-floating btn-small waves-effect waves-light amber lighten-3"><i className="material-icons grey-text text-darken-3">+</i></button>
            </div>
        </form>) : (null)
        
        return (
            <div className="center m-2">
                <div className="">Podpowiedzi:</div>
                {hintInput}
                <ul>
                    {hintsList}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addHint: (word, room) => dispatch(addHint(word, room))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Words)
