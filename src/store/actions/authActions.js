export const signUpAndIn = (user, auth) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const state = getState();
        const oldRealTimeDb = firebase.database();
        if (state.firebase.auth.uid) {
            firebase.auth().signOut()
            oldRealTimeDb.goOffline();
            oldRealTimeDb.ref(`/status/${state.firebase.auth.uid}`).set({status: 'offline', room: null})
        }        
        oldRealTimeDb.goOnline();
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            // Create user - then create doc in firestore
            .then((res)=>{
                return firestore.collection('users').doc(res.user['uid']).set({
                    name: user['player_name'],
                    uid: res.user['uid'],
                    team: null,
                    online: true,
                    spyMaster: false,
                    room: null
                })                
            })
            .then(()=>dispatch({type: "USER_CREATE_SUCCESS"}))
            .catch((err)=>{
                dispatch({type: "USER_CREATE_ERROR", err})}) 
            // When user is created - log in that user
            .then(()=>{
                firebase.auth().signInWithEmailAndPassword(
                    user.email,
                    user.password 
                )
            })
            .then(()=>dispatch({type: "USER_LOGIN_SUCCESS"}))
            .catch((err)=>{
                dispatch({type: "USER_LOGIN_ERROR", err})})        
    }
}

export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signOut()

        firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
            .then(()=>dispatch({type: "USER_LOGIN_SUCCESS"}))
            .catch((err)=>{
                dispatch({type: "USER_LOGIN_ERROR", err})
            })
    }
}

export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase()
        firebase.auth().signOut()
            .then(()=>dispatch({type: "USER_SIGNOUT_SUCCES"}))
            .catch((err)=>{dispatch({type: "USER_SIGNOUT_ERROR", err})})
    }
}
