import React from 'react'

const Board = ({gameCards, markCard, room, user}) => {
    
    const handleClick = (e) => {
        const cardId = e.target.id
        if (!room.active) return
        room.turn === user.team ? markCard(room.room_name, cardId) : alert("Poczekaj na swoją turę!")
    }

    const drawBoard = (cards) => {

        const cardList = gameCards && gameCards.map(card=> {
            let cardStyle = card.clicked ? (`${card.team} card white-text`) : 
            (user.spyMaster ? (`${card.team} card lighten-3 spyMasterCards`) : ("amber card lighten-4"))
            return(
            <div className="col l2 l25" key={card.id}>
                <div className={cardStyle}>
                    <div id={card.id} className="truncate break auto-width center card-content card-title"  onClick={handleClick}>
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
