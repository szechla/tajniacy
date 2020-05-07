import React from 'react'

const Board = ({gameCards, markCard, room, user}) => {
    
    const handleClick = (e) => {
        const cardId = e.target.id
        if (!room.active) return
        if (user.spyMaster) return
        room.turn === user.team ? markCard(room.room_name, cardId) : alert("Poczekaj na swoją turę!")
    }

    const drawBoard = (cards) => {

        const cardList = gameCards && gameCards.map(card=> {
            let cardStyle = card.clicked ? 
            user.spyMaster ? (`${card.team} card white-text opacity20`) : (`${card.team} card white-text`) : 
            (user.spyMaster ? (`${card.team} card accent-2 spyMasterCards`) : ("amber card lighten-4"))
            return(
            <div className="col l2 l25" key={card.id}>
                <div className={cardStyle}>
                    <div id={card.id} className="break auto-width center card-content card-title"  onClick={handleClick}>
                        {card.content}
                    </div>
                </div>
            </div>
            )
        })
        return cardList
    }

    return (
        <div className="row"> { drawBoard(gameCards) } </div>   
    )
}

export default Board
