export const changePlayerTeam = (user, team) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore()
        firestore.collection("users").doc(user.uid).update({
            team: team
        })
    }
}

export const addHint = (hint, room) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase()
        const firestore = getFirestore()

        const newHint = {
            hint: hint,
            team: room.turn,
            id: `${hint.replace(/\s+/g,"_")}@${Math.floor(Math.random()*999)}`
        }

        firestore.collection("rooms").doc(room.room_name).update({
            hints: firebase.firestore.FieldValue.arrayUnion(newHint)
        })
    }
}