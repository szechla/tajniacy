// Import react modules
import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
// Import custom components
import Navbar from './components/layout/Navbar'
import Home from './components/layout/Home'
import Gameboard from './components/layout/Gameboard'
import NewCard from './components/master/NewCard.js'
import SignIn from './components/master/SignIn.js'

class App extends Component{
  render(){
    return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Route exact path ='/' component={Home}/>
        <Route exact path ='/rooms/:room_name' component={Gameboard}/>
        <Route path ='/newcard' component={NewCard}/>
        <Route path ='/signin' component={SignIn}/>
      </div>
    </BrowserRouter>
  )
}
}

export default App;
