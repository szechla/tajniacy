import React from 'react';
import {Link} from 'react-router-dom'; 
import adminImg from '../../img/admin.png'
import { signOut } from '../../store/actions/authActions'
import { connect } from 'react-redux'
// import { Redirect} from 'react-router-dom'

const Navbar = ({user, signOut}) => {
    let signOutButton = user.uid ? (<button className="btn btn-small pink right" onClick={signOut}>Opusć pokój</button>) : null
    return (
        <nav className="nav-wrapper amber lighten-3">
            <Link to="../newcard"><img className="adminImg" src={adminImg} alt=""></img></Link>
            <div className="container">
                <Link to="../" className="brand-logo center grey-text text-darken-3">Tajniacy The Game</Link>
            </div>
            <Link to="../">{signOutButton}</Link>
        </nav>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
