// Import CSS files
import './index.css';
// Import App Component
import App from './App';
import * as serviceWorker from './serviceWorker';
// Import React
import React from 'react';
import ReactDOM from 'react-dom';
// Import Redux, Thunk and Firebase elements
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk"
import { Provider, useSelector } from 'react-redux';
import rootReducer from './store/reducers/rootReducer';
import { createFirestoreInstance, getFirestore, reduxFirestore } from 'redux-firestore';
import { ReactReduxFirebaseProvider, getFirebase, isLoaded } from 'react-redux-firebase';
import fbConfig from './config/fbConfig';
import firebase from 'firebase/app'

// Create redux store
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({getFirestore, getFirebase})),
    reduxFirestore(firebase)
  )
)

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <div className="loading"></div>;
  return children
}

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
  presence: 'presence'
}

// Create props for redux-firestore
const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <AuthIsLoaded>
          <App />
        </AuthIsLoaded>
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
