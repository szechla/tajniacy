const initState = {
    cards: []
}

const cardReducer = (state = initState, action) => {
    switch(action.type){
        case "CREATE_CARD":
            console.log("Card created")
            return state;
        case "CREATE_CARD_ERROR":
            console.log("Something wrong")
            return state;
        default:
            return state;
    }
}

export default cardReducer;