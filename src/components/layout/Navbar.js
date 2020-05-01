import React from 'react';
import {Link} from 'react-router-dom'; 
import adminImg from '../../img/admin.png'

const Navbar = () => {
    return (
        <nav className="nav-wrapper amber lighten-3">
            <Link to="../newcard"><img className="adminImg" src={adminImg} alt=""></img></Link>
            <div className="container">
                <Link to="../" className="brand-logo center grey-text text-darken-3">Tajniacy The Game</Link>
            </div>
        </nav>
    )
}

export default Navbar
