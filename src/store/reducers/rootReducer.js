// Import combine, firebase and firestore reducers
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

// Import custom reducers
import gameReducer from '../reducers/gameReducer'
import cardReducer from '../reducers/cardReducer'
import authReducer from '../reducers/authReducer'

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    game: gameReducer,
    card: cardReducer,
    auth: authReducer
})

export default rootReducer