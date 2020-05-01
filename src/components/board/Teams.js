import React from 'react';


const Teams = ({user, players, changePlayerTeam}) => {
    const sortPlayers = (players) => {
        if(players){
            const redTeam = players.filter((player)=>player.team==="red")
            const blueTeam = players.filter((player)=>player.team==="blue")
            const watchers = players.filter((player)=>player.team === null)
            let spyMasterAddon = ""
            
            const redTeamList = redTeam.map((player)=>{
                if(player.spyMaster) spyMasterAddon = " ---- "
                return (<li className={"red-text text-darken-3 text-left spyMaster-"+player.spyMaster} key={player.id}>{spyMasterAddon+player.name+spyMasterAddon}</li>)
            })
            const blueTeamList = blueTeam.map((player)=>{
                if(player.spyMaster) spyMasterAddon = " ---- "
                return (<li className={"blue-text text-darken-3 text-left spyMaster-"+player.spyMaster} key={player.id}>{spyMasterAddon+player.name+spyMasterAddon}</li>)
            })
            const watchersList = watchers.map((player)=><li className="grey-text text-darken-3 text-left" key={player.id}>{player.name}</li>)
            return {redTeamList, blueTeamList, watchersList}}
        return []
    }

    const changeTeam = (team, e) => {
        changePlayerTeam(user, team)
    }

    return (
        <div className="center m-2 row">
            <div className="red lighten-4 red-text text-darken-4 col l10">CZERWONI</div>
            <button className="red btn-floating btn-small" onClick={changeTeam.bind(null, "red")}><i className="material-icons grey-text text-darken-3">+</i></button>
            <ul className="col l12 mt-0">
                {sortPlayers(players).redTeamList}
            </ul>

            <div className="blue lighten-4 blue-text text-darken-4 col l10">NIEBIESCY</div>
            <button className="btn-floating btn-small blue" onClick={changeTeam.bind(null, "blue")}><i className="material-icons grey-text text-darken-3">+</i></button>
            <ul className="col l12 mt-0">
                {sortPlayers(players).blueTeamList}
            </ul>

            <div className="grey lighten-4 grey-text text-darken-4 col l10">GOŚCIE:</div>
            <ul className="col l12 mt-0">
                {sortPlayers(players).watchersList}                
            </ul>
        </div>
    )
}



export default Teams
