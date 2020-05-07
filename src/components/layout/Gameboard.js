// Import react, redux and firebase moduls
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import * as firebase from 'firebase/app';
// import { Redirect } from 'react-router-dom'

// Import app components
import Hints from '../board/Hints'
import Board from "../board/Board"
import Teams from "../board/Teams"

// Import functions
import { changePlayerTeam } from '../../store/actions/gameActions';
import { markCard, newCards } from '../../store/actions/cardActions';
import { changeTurn, checkGameOver, resetRoom } from '../../store/actions/roomActions'

class Gameboard extends Component {
    state = {
        room: {},
        user: []
    }

    checkOnlineStatus = (user, room) => {
        // Declare referense do databases and collections
        const firestoreDb = firebase.firestore();
        const oldRealTimeDb = firebase.database();
        const usersRef = firestoreDb.collection('users')
        const roomsRef = firestoreDb.collection('rooms')        

        if(user.uid && room){
            oldRealTimeDb
                .ref(`/status/${user.uid}`)
                .onDisconnect()
                .set({status: 'offline', room: null})
                .then(()=>{
                    usersRef
                    .doc(user.uid)
                    .set({online: true, room: room ? room.room_name : "no_room"}, {merge: true}); 
                    // Add online player to firestore room collection
                    roomsRef.doc(room.room_name).update({players: firebase.firestore.FieldValue.arrayUnion(user.uid)})
                    // Set Firebase Realtime Database status for current player
                    oldRealTimeDb.ref(`/status/${user.uid}`).set({status: "online", room: room.room_name})
                })
            }
    }

    turnInfo = (room) => {
        switch (room && room.active){
            case true:
                switch (room.turn){
                    case "red":
                        return <h5 className="brand-logo red-text red lighten-5 py-2">KOLEJKA CZERWONYCH</h5>
                    case "blue":
                        return <h5 className="brand-logo blue-text blue lighten-5 py-2">KOLEJKA NIEBIESKICH</h5>
                    default:
                        return
                }
            case false:    
                switch (room.winner){
                    case "red":
                        return <h5 className="brand-logo red-text black lighten-3 py-2">WYGRALI CZERWONI</h5>
                    case "blue":
                        return <h5 className="brand-logo blue-text black lighten-3 py-2">WYGRALI NIEBIESCY</h5>
                    default:
                        return
                } 
            default:
                return "Loading..."
        }
    }                
        
    endTurn = (turn) => {
        const {user, room, changeTurn} = this.props
        const roomTurn = turn ? room.turn : turn
        if (!room.active) return
        room.turn === user.team ? changeTurn(room.room_name, roomTurn) : alert("Poczekaj na swoją turę!")      

    }

    newGame = () => {
        const {room, newCards, resetRoom} = this.props
        newCards(room.room_name)
        resetRoom(room)
    }

    spyMaster = () => {
        const {user} = this.props
        const firestoreDb = firebase.firestore();
        user.spyMaster ? firestoreDb.collection("users").doc(user.uid).update({spyMaster: false}) : firestoreDb.collection("users").doc(user.uid).update({spyMaster: true})
    }

    render() {
        const { room, allPlayers, user, auth, changePlayerTeam, markCard } = this.props
        const gameCards = room && room.cards
        let roomPlayers = []
        let turnInfo = this.turnInfo(room)

        let redScore = gameCards && [...gameCards].filter((item) => { return (item.team === "red" && !item.clicked) }).length
        let blueScore = gameCards && [...gameCards].filter((item) => { return (item.team === "blue" && !item.clicked) }).length
        
        if (room ) {
            roomPlayers = allPlayers && allPlayers.filter((player => player.room === room.room_name))
        }

        this.checkOnlineStatus(user, room)

        if(!auth.uid) return (<div className="loading"></div>)

        return (                           
            <div className="row">
                <div className="col s2 l2"><Hints room={room}/></div>
                <div className="col s8 l8">
                    <div className="row">
                        <div className="col l4 center">
                            <h4><span className="red-text red lighten-4 text-darken-3 px-2">{redScore}</span>
                            <span className=""> : </span>
                            <span className="blue-text blue lighten-4 text-darken-3 px-2">{blueScore}</span></h4>
                        </div>
                        <div className="col l4 center">{turnInfo}</div>    
                        <div className="col l4 center input-field"><button className="btn-large pink" onClick={this.endTurn}>KONIEC TURY</button></div>           
                    </div>     
                    <Board gameCards={gameCards} markCard={markCard} room={room} user={user}/>
                    <div className="row">
                        <div className="col l6 center input-field"><button className="btn amber lighten-2 grey-text text-darken-3" onClick={this.spyMaster}>Mistrz gry</button></div>
                        <div className="col l6 center input-field"><button className="btn amber lighten-2 grey-text text-darken-3" onClick={this.newGame}>Nowa Gra</button></div>                    
                    </div>  
                </div>
                <div className="col s2 l2"><Teams user={user} players={roomPlayers} changePlayerTeam={changePlayerTeam} checkGameOver={checkGameOver}/></div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const roomName = ownProps.match.params.room_name
    return {
        room: state.firestore.ordered.rooms && state.firestore.ordered.rooms.find(room=>room.room_name === roomName),
        allPlayers: state.firestore.ordered.users,
        user: state.firebase.profile,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changePlayerTeam: (user, team) => dispatch(changePlayerTeam(user, team)),
        markCard: (room, cardId) => dispatch(markCard(room, cardId)),
        newCards: (room) => dispatch(newCards(room)),
        changeTurn: (room, currentTurn) => dispatch(changeTurn(room, currentTurn)),
        checkGameOver: (room) => dispatch(checkGameOver(room)),
        resetRoom: (room) => dispatch(resetRoom(room))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: "cards"},
        {collection: "rooms"},
        {collection: "users"}
    ]) 
    )(Gameboard)
