const initState = {
    cards:[
    {id: 1, content: "Słoń", type: null}, 
    {id: 2, content: "Lodowiec", type: null}, 
    {id: 3, content: "Jabłko", type: null}, 
    {id: 4, content: "Dom", type: null}, 
    {id: 5, content: "Londyn", type: null} 
    ],
    players:[
        {id: 1, name: "Kamil", team: "red"},
        {id: 2, name: "Ania", team: "blue"},
        {id: 3, name: "Dafi", team: "blue"},
        {id: 4, name: "Tereska", team: "red"}
    ],
    words: [
        {id: 1, content: "Test 3", team: "red"},
        {id: 2, content: "Nos 5", team: "blue"},
        {id: 3, content: "Hak 2", team: "red"}
    ]
}

const gameReducer = (state = initState, action) => {
    return state
}

export default gameReducer