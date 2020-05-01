import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

import {createCard} from '../../store/actions/cardActions';
import { signOut } from '../../store/actions/authActions'

class NewCard extends Component {
    state = {
        card: {
            content: null,
            id: null
        }
    }

    handleSubmit = (e) => {
        const {cards} = this.props
        e.preventDefault();
        console.log(cards)
        if (cards && cards.find(item => item.content.toUpperCase() === this.state.card.content.toUpperCase())){
            alert ("Taka karta już istnieje")
            return
        }
        this.props.createCard(this.state.card)

        document.getElementById("newCardInput").value = ""
    }

    handleChange = (e) => {
        this.setState({
            card: {
                content: e.target.value}
        })
    }

    render() {
        if (this.props.user.email !== "admin@a.tt") return <Redirect to="/signin"/>
        return (
            <div className="container">
                <h1 className="center">New card</h1>
                <form action="" onSubmit={this.handleSubmit}>
                    <div className="input-field">
                        <input id="newCardInput" type="text" onChange={this.handleChange}/>
                        <label htmlFor="">Add new word</label>
                        <button className="btn green">Dodaj nowe słowo!</button>
                    </div>
                </form>
                <button className="btn-small pink" onClick={this.props.signOut}>Wyloguj</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cards: state.firestore.ordered.cards,
        user: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createCard: (card) => dispatch(createCard(card)),
        signOut: () => dispatch(signOut())
        }
    }


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{collection: "cards"}])    
    )
    (NewCard)
