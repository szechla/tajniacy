import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { signUpAndIn } from '../../store/actions/authActions'
import { createRoom } from '../../store/actions/roomActions'
import { newCards } from '../../store/actions/cardActions'

class Home extends Component {
    state = {
        player_name: null,
        room_name: null,
        email: null,
        password: "password1"
    }

    checkInputFields = () => {
        const inputFields = [].slice.call(document.getElementsByTagName("input"))
        if (inputFields.find(item=> item.value === "" )) {
            alert("Wypełnij wszystkie pola!");
            return false
        }
        else {
            return true
        }      
    }

    handleNameChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,  
            email: `${e.target.value.replace(" ", "_")}@t.tt`  
        })
    }    
    
    handleRoomChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleEnterRoom = async (e) => {
        e.preventDefault();  
        const checkInputs = this.checkInputFields();  
        if(checkInputs && this.props.rooms.find(room=>room.room_name === this.state.room_name)){
            this.props.signUpAndIn(this.state)
            if(true) this.props.history.push('/rooms/' + this.state.room_name)
        }
        else if (checkInputs){
            alert("Nie istnieje taki pokój. Stwórzy nowy!")
            return
        }
    }

    handleCreateRoom = (e) => {
        e.preventDefault();

        const checkInputs = this.checkInputFields()
        if(checkInputs && this.props.rooms.find(room=>room.room_name === this.state.room_name)){
            alert("Taki pokój już istnieje. Stwórz inny lub dołącz do tego.")
        }
        else if (checkInputs){
            this.props.createRoom(this.state.room_name)
            this.props.newCards(this.state.room_name)
            this.props.history.push('/rooms/' + this.state.room_name)
        }
    }

    render() {
        return (
            <div className="container">
                <h2 className="center">WELCOME</h2>
                <form action="" className="container">
                    <div className="input-field">
                        <input type="text" id="player_name" name="player_name" onChange={this.handleNameChange}/>
                        <label htmlFor="player_name">Nazwa gracza</label>
                    </div>
                    <div className="input-field">
                        <input type="text" id="room_name" name="room_name" onChange={this.handleRoomChange}/>
                        <label htmlFor="room_name">Nazwa pokoju</label>
                    </div>
                    <button className="btn red" onClick={this.handleEnterRoom}>Wejdź do pokoju</button>
                    <button className="btn right blue" onClick={this.handleCreateRoom}>Stwórz pokój</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        rooms: state.firestore.ordered.rooms,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUpAndIn: (user)=>{dispatch(signUpAndIn(user))},
        createRoom: (room)=>{dispatch(createRoom(room))},
        newCards: (room)=>{dispatch(newCards(room))}
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: "users"},
        {collection: "rooms"}
])
)(Home)
