export const createCard = (card) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection("cards").add({
            ...card,
        })
        .then(()=>{
            dispatch ({
                type: "CREATE_CARD",
                card
            })
        })
        .catch(()=>{
            dispatch ({
                type: "CREATE_CARD_ERROR",
                card
            })
        })
    }
}

export const markCard = (room, cardId) => {
    return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();

    firestore.collection("rooms").doc(room).get()
        .then(docs => docs.data())
        .then(roomData => { 
            let clickedCard = [...roomData.cards].find(card => card.id === cardId)
            clickedCard.clicked = true

            const checkForWin = (cardColor) => {
                return ([...roomData.cards].filter((item) => { return (item.team === cardColor && !item.clicked) }).length)
            }

            if (clickedCard.team !== roomData.turn) {
                switch (clickedCard.team){
                    case "red":
                    case "blue":
                    case "amber":
                        firestore.collection("rooms").doc(room).update({
                            cards: roomData.cards,
                            turn: roomData.turn === "red" ? "blue" : "red"
                        })
                        break
                    default:
                        break
                }
            }

            if (checkForWin(clickedCard.team) === 0) {
                switch (clickedCard.team){                    
                    case "red":
                    case "blue":
                        firestore.collection("rooms").doc(room).update({
                            cards: roomData.cards,
                            winner: clickedCard.team,
                            active: false
                        }) 
                        break                       
                    case "black":
                        firestore.collection("rooms").doc(room).update({
                            cards: roomData.cards,
                            winner: roomData.turn === "red" ? "blue" : "red",
                            active: false
                        })
                        break
                    default:
                        firestore.collection("rooms").doc(room).update({
                            cards: roomData.cards
                        })
                }
            }
            else {
                firestore.collection("rooms").doc(room).update({
                    cards: roomData.cards
                })
            }         
        })    
    }
}

export const newCards = (room) => {
    return (dispatch, getState, {getFirestore}) => {
        const newRoomCards = []

        // Segrate cards
        const segregateCards = (team, n) => {
            let j = 0
            while(j < n){
                const randomCardId = Math.floor(Math.random()*newRoomCards.length)
                if(newRoomCards[randomCardId].team === "amber") {
                    newRoomCards[randomCardId].team = team
                    j++
                }
            }             
    }

        const firestore = getFirestore();
        // Set all players to regular players (not SpyMasters)
        firestore.collection("rooms").doc(room).get()
            .then(data=>data.data())
            .then(roomData => {
                for(let i=0; i<roomData.players.length; i++){
                    firestore.collection("users").doc(roomData.players[i]).update({
                        spyMaster: false
                    })
                }            
            })
            // Then get new cards
            .then(()=>{                
            firestore.collection("cards").get()
                .then(cardsCollection =>cardsCollection.docs.map(docs=>{return {id: docs.id, ...docs.data()}} ))
                .then(allCards => {
                    let i = 0

                    // Get 25 cards from database
                    while(i < 25){
                        let randomCardId = Math.floor(Math.random()*allCards.length)
                        let newCard = allCards[randomCardId]
                        if(!newRoomCards.find(item => item.content === newCard.content)){  
                            newRoomCards.push(newCard)
                            i++
                        }
                    }

                    newRoomCards.map(item=>item.team = "amber")
                    newRoomCards.map(item=>item.clicked = false)
                    
                    segregateCards("red", 8);
                    segregateCards("blue", 7);
                    segregateCards("black", 1)
                    
                    // Update firestore collection
                    firestore.collection("rooms").doc(room).update({
                        cards: newRoomCards
                    })
                })    
            })  
    }
}

    

        
