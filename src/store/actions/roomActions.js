export const createRoom = (room) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore()
        
        firestore.collection("rooms").doc(room).set({
            room_name: room,
            players: [],
            cards: [],
            hints: [],
            active: true,
            winner: null
        })
    }
}

export const changeTurn = (room, currentTurn) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore()

        const newTurn = () => {
            switch (currentTurn){
                case "red":
                    return "blue"
                case "blue":
                    return "red"
                case "gameOver-blue":
                    return "gameOver-blue"
                case "gameOver-red":
                    return "gameOver-red"
                default:
                    console.log(currentTurn)
                    return "gameOver-red"
            }
        }

        firestore.collection("rooms").doc(room).update({
            turn: newTurn()
        })
    }
}

export const checkGameOver = (room) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore()

        // Check if every red or blue card is marked
        if (room && [...room.cards].filter((item) => { return (item.team === "red" && !item.clicked) }).length === 0) {
            firestore.collection("rooms").doc(room.room_name).update({active: false, winner: "red"})
        } 
        else if(room && [...room.cards].filter((item) => { return (item.team === "blue" && !item.clicked) }).length === 0) {
            firestore.collection("rooms").doc(room.room_name).update({active: false, winner: "blue"})
        }

        // Handle marking black card
        else if(room && [...room.cards].find(item => { return (item.team === "black" && item.clicked)})) {
            if(room && room.turn === "red"){ 
                firestore.collection("rooms").doc(room.room_name).update({active: false, winner: "blue"}) 
            }
            if(room && room.turn === "blue") { 
                firestore.collection("rooms").doc(room.room_name).update({active: false, winner: "red"}) 
            }
        }
    }
}

export const resetRoom = (room) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();

        firestore.collection("rooms").doc(room.room_name).update({
            active: true,
            turn: "red",
            winner: "null",
            hints: []
        })
    }
}